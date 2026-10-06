import { defineMigration, at, set } from 'sanity/migrate'

/**
 * Convierte el contenido actual de "la inversión" en la FASE 1 del nuevo array
 * de fases, para poder duplicarla desde el Studio y tener una segunda página.
 *
 * Es ADITIVA: crea `investment.phases[0]` copiando los campos que ya existen y
 * **no borra nada**. Los campos antiguos se quedan donde están (el esquema los
 * oculta automáticamente en cuanto hay fases), así que si algo sale mal basta
 * con borrar el array `phases` y todo vuelve a funcionar como antes.
 *
 * La web funciona con migración y sin ella: mientras no haya fases, el objeto
 * `investment` hace de fase 1. Esta migración solo hace falta para poder crear
 * la segunda fase desde el Studio.
 *
 * ── Cómo ejecutarla (desde la carpeta del STUDIO) ──
 *
 *   1) Copia este archivo a:  <studio>/migrations/inversion-a-fases.ts
 *   2) npx sanity migration run inversion-a-fases                  (simulacro)
 *   3) npx sanity migration run inversion-a-fases --no-dry-run     (aplica)
 */

// Nombre que se le pone a la fase 1. Aparecerá a la izquierda de la fila de
// planes y de la fila de precios. Se puede cambiar después en el Studio.
const NOMBRE_FASE_1 = 'FASE 1'

const CAMPOS_DE_FASE = [
    'introduction',
    'highlightPhrase',
    'introduction2',
    'plansDescription',
    'tableHeaders',
    'tableRows',
    'prices',
] as const

const generarKey = () => Math.random().toString(36).slice(2, 14)

export default defineMigration({
    title: 'Pasar la inversión actual a la fase 1',
    documentTypes: ['proposal'],

    migrate: {
        document(doc) {
            const inversion = (doc as any).investment
            if (!inversion) return

            // Ya migrada: no tocar nada.
            if (Array.isArray(inversion.phases) && inversion.phases.length > 0) return

            const fase: Record<string, unknown> = {
                _type: 'investmentPhase',
                _key: generarKey(),
                phaseLabel: NOMBRE_FASE_1,
                isActive: true,
            }

            let tieneContenido = false
            for (const campo of CAMPOS_DE_FASE) {
                const valor = inversion[campo]
                if (valor !== undefined && valor !== null) {
                    fase[campo] = valor
                    tieneContenido = true
                }
            }

            // Una sección de inversión vacía no merece una fase vacía.
            if (!tieneContenido) return

            return [at('investment.phases', set([fase]))]
        },
    },
})
