import { defineMigration, at, set } from 'sanity/migrate'

/**
 * Pasa el precio único de cada servicio premium al nuevo array de precios, para
 * poder añadir más botones sin tener que reescribir el que ya había.
 *
 * Es ADITIVA: crea `prices: [price]` y **no borra** el campo `price` antiguo. El
 * esquema oculta `price` en cuanto `prices` tiene contenido, así que no se puede
 * editar el que ya no se lee. Para deshacerla basta con borrar el array `prices`.
 *
 * La web funciona con migración y sin ella: mientras `prices` esté vacío se usa
 * `price`. Esto solo sirve para no tener que teclear de nuevo los 60 y pico
 * precios que ya están escritos.
 *
 * ── Cómo ejecutarla (desde la carpeta del STUDIO) ──
 *
 *   1) Copia este archivo a:  <studio>/migrations/precios-premium-a-lista.ts
 *   2) npx sanity migration run precios-premium-a-lista                  (simulacro)
 *   3) npx sanity migration run precios-premium-a-lista --no-dry-run     (aplica)
 */

export default defineMigration({
    title: 'Pasar el precio de cada servicio premium a lista de precios',
    documentTypes: ['proposal'],

    migrate: {
        document(doc) {
            const servicios = (doc as any).premiumServices?.services
            if (!Array.isArray(servicios)) return

            const patches = servicios
                .filter((servicio: any) => {
                    if (!servicio?._key) return false
                    // Ya migrado: no tocar.
                    if (Array.isArray(servicio.prices) && servicio.prices.length > 0) return false
                    return typeof servicio.price === 'string' && servicio.price.trim() !== ''
                })
                .map((servicio: any) =>
                    at(`premiumServices.services[_key=="${servicio._key}"].prices`, set([servicio.price]))
                )

            return patches.length > 0 ? patches : undefined
        },
    },
})
