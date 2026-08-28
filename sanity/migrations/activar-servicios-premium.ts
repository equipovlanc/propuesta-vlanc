import { defineMigration, at, set } from 'sanity/migrate'

/**
 * Marca como ACTIVOS todos los servicios premium que ya existen.
 *
 * Por qué hace falta: `initialValue: true` en el schema solo se aplica a los items
 * NUEVOS. Los servicios que ya existen no tienen el campo `isActive`, así que en el
 * Studio verías el interruptor apagado aunque la web sí los muestra (el código usa
 * `isActive !== false`). Esto pone `true` explícito para que Studio y web coincidan.
 *
 * NO se pierde ni se modifica ningún otro contenido: solo añade el campo `isActive`
 * donde falta. Es idempotente y nunca reactiva un servicio que hayas apagado a mano.
 *
 * ── Cómo ejecutarla (desde la carpeta del STUDIO, no desde el repo de la web) ──
 *
 *   1) Crea la carpeta `migrations` en la raíz del Studio (al lado de sanity.cli.ts)
 *      y copia este archivo dentro:  <studio>/migrations/activar-servicios-premium.ts
 *   2) Asegúrate de tener sesión:    npx sanity login       (solo la primera vez)
 *   3) Simulacro (no escribe nada):  npx sanity migration run activar-servicios-premium
 *   4) Aplicar de verdad:            npx sanity migration run activar-servicios-premium --no-dry-run
 *
 * El id de la migración es el nombre del archivo sin extensión. El simulacro es el
 * comportamiento por defecto: sin `--no-dry-run` solo te imprime las mutaciones que
 * haría. Al aplicar, el CLI te pide confirmación del dataset.
 *
 * No necesitas compilar nada: el CLI carga el TypeScript al vuelo.
 */
export default defineMigration({
    title: 'Activar los servicios premium ya existentes',
    documentTypes: ['proposal'],

    migrate: {
        document(doc) {
            const services = (doc as any).premiumServices?.services
            if (!Array.isArray(services)) return

            return services
                // Solo los que no tienen valor todavía: si ya vale true o false, no se toca.
                .filter((service: any) => service?._key && service.isActive !== true && service.isActive !== false)
                .map((service: any) =>
                    at(`premiumServices.services[_key=="${service._key}"].isActive`, set(true))
                )
        },
    },
})
