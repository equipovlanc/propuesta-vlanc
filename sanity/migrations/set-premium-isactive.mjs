/**
 * Migración: marca como ACTIVOS todos los servicios premium ya existentes.
 *
 * Por qué hace falta: `initialValue: true` en Sanity solo se aplica a los items
 * NUEVOS que crees a partir de ahora. Los servicios que ya existen se quedan con
 * `isActive: null` (sin valor). La web los sigue mostrando (el código usa
 * `isActive !== false`), así que NO se pierde nada, pero en el Studio el
 * interruptor se vería apagado, lo cual es confuso. Este script pone `true`
 * explícito para que lo que ves en el Studio coincida con lo que sale en la web.
 *
 * Uso (desde la raíz de este repo, que ya tiene @sanity/client instalado):
 *
 *   1) Crea un token de ESCRITURA en https://sanity.io/manage
 *      (proyecto j14bbmni → API → Tokens → Add API token → permisos "Editor")
 *
 *   2) Simulacro, no escribe nada:
 *      SANITY_WRITE_TOKEN=sk... node sanity/migrations/set-premium-isactive.mjs --dry-run
 *      (PowerShell:  $env:SANITY_WRITE_TOKEN="sk..." ; node sanity/migrations/set-premium-isactive.mjs --dry-run)
 *
 *   3) Aplicar de verdad:
 *      SANITY_WRITE_TOKEN=sk... node sanity/migrations/set-premium-isactive.mjs
 *
 * Es idempotente: puedes ejecutarlo las veces que quieras. Solo toca los
 * servicios que no tienen valor; nunca reactiva uno que hayas desactivado a mano.
 */
import { createClient } from '@sanity/client'

const token = process.env.SANITY_WRITE_TOKEN
const dryRun = process.argv.includes('--dry-run')

if (!token) {
    console.error('Falta SANITY_WRITE_TOKEN (token con permisos de escritura).')
    process.exit(1)
}

const client = createClient({
    projectId: 'j14bbmni',
    dataset: 'production',
    apiVersion: '2024-06-24',
    useCdn: false,
    token,
})

const query = `*[_type == "proposal"]{
  _id,
  title,
  "services": premiumServices.services[]{_key, subtitle, isActive}
}`

const docs = await client.fetch(query)

let totalDocs = 0
let totalItems = 0
const tx = client.transaction()

for (const doc of docs) {
    const pending = (doc.services || []).filter(s => s && s._key && (s.isActive === null || s.isActive === undefined))
    if (pending.length === 0) continue

    totalDocs++
    totalItems += pending.length

    const patchSet = {}
    for (const s of pending) {
        patchSet[`premiumServices.services[_key=="${s._key}"].isActive`] = true
    }

    console.log(`• ${doc.title || doc._id} (${doc._id}) → ${pending.length} servicio(s): ${pending.map(s => s.subtitle || s._key).join(', ')}`)

    if (!dryRun) tx.patch(doc._id, p => p.set(patchSet))
}

if (totalItems === 0) {
    console.log('\nNada que migrar: todos los servicios premium ya tienen valor explícito.')
    process.exit(0)
}

if (dryRun) {
    console.log(`\n[DRY RUN] Se marcarían ${totalItems} servicio(s) en ${totalDocs} documento(s). No se ha escrito nada.`)
    process.exit(0)
}

await tx.commit()
console.log(`\nHecho: ${totalItems} servicio(s) marcados como activos en ${totalDocs} documento(s).`)
