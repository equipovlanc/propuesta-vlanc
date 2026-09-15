import { defineMigration, at, set } from 'sanity/migrate'

/**
 * Marca como ACTIVOS todos los interruptores de botones recién añadidos al esquema.
 *
 * OPCIONAL: la web ya funciona sin ejecutar esto, porque el código trata "sin valor"
 * como visible (`isActive !== false`). Esto es solo para que en el Studio los
 * interruptores aparezcan encendidos en lugar de apagados, que si no despista.
 *
 * Toca únicamente los campos que no tienen valor todavía. Nunca apaga nada ni
 * reactiva un botón que hayas desactivado a mano. Es idempotente.
 *
 * ── Cómo ejecutarla (desde la carpeta del STUDIO) ──
 *
 *   1) Copia este archivo a:  <studio>/migrations/activar-botones.ts
 *   2) npx sanity migration run activar-botones                  (simulacro)
 *   3) npx sanity migration run activar-botones --no-dry-run     (aplica)
 */

const faltaValor = (v: unknown) => v !== true && v !== false

export default defineMigration({
    title: 'Activar los interruptores de botones ya existentes',
    documentTypes: ['proposal'],

    migrate: {
        document(doc) {
            const d = doc as any
            const patches: any[] = []

            // Botón de garantía bajo el paso 3 de "El Proceso"
            if (d.process && faltaValor(d.process.badgeButtonIsActive)) {
                patches.push(at('process.badgeButtonIsActive', set(true)))
            }

            // Botones de cada fase de "Trabajos contemplados"
            for (const fase of (d.scopePhases?.phases ?? [])) {
                if (!fase?._key) continue
                const base = `scopePhases.phases[_key=="${fase._key}"]`

                if (faltaValor(fase.videoButtonIsActive)) {
                    patches.push(at(`${base}.videoButtonIsActive`, set(true)))
                }
                if (faltaValor(fase.guaranteeButtonIsActive)) {
                    patches.push(at(`${base}.guaranteeButtonIsActive`, set(true)))
                }
                for (const extra of (fase.additionalGuarantees ?? [])) {
                    if (extra?._key && faltaValor(extra.isActive)) {
                        patches.push(at(`${base}.additionalGuarantees[_key=="${extra._key}"].isActive`, set(true)))
                    }
                }
            }

            // Botón del servicio premium en la oferta de lanzamiento
            if (d.specialOffers?.launchOffer && faltaValor(d.specialOffers.launchOffer.premiumButtonIsActive)) {
                patches.push(at('specialOffers.launchOffer.premiumButtonIsActive', set(true)))
            }

            // Contacto: enlace web, iconos de redes y botón de imprimir
            if (d.contact?.web && faltaValor(d.contact.web.isActive)) {
                patches.push(at('contact.web.isActive', set(true)))
            }
            for (const red of (d.contact?.rrss ?? [])) {
                if (red?._key && faltaValor(red.isActive)) {
                    patches.push(at(`contact.rrss[_key=="${red._key}"].isActive`, set(true)))
                }
            }
            if (d.contact && faltaValor(d.contact.printButtonIsActive)) {
                patches.push(at('contact.printButtonIsActive', set(true)))
            }

            return patches.length > 0 ? patches : undefined
        },
    },
})
