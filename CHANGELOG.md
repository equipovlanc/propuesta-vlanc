# Cambios

Qué se cambió, cuándo, y qué hubo que hacer en el Studio. Lo más reciente arriba.

Cada entrada indica si requirió acción manual de Jose:
**[esquema]** copiar `proposal.schema.ts` + `npm run deploy` ·
**[migración]** ejecutar una migración · **[web]** solo push, Vercel despliega solo.

---

## 2026-10-06 · Documentación del proyecto

Añadidos [CLAUDE.md](CLAUDE.md), [docs/ARQUITECTURA.md](docs/ARQUITECTURA.md),
[docs/SANITY.md](docs/SANITY.md), [docs/DECISIONES.md](docs/DECISIONES.md) y este
registro, para que cada sesión arranque con el contexto puesto y las decisiones
queden escritas.

Sin efecto sobre la web ni sobre Sanity.

---

## 2026-09-15 · Interruptores para los botones · `74e21c1`
**[esquema]** **[web]** **[migración opcional]**

Interruptor propio para cada botón de contenido: vídeo y garantías de cada fase
(principal y adicionales), garantía del paso 3 del proceso, botón del servicio
premium, enlace web, iconos de redes y botón de imprimir. Decisión [D6](docs/DECISIONES.md#d6).

Corregido un fallo anterior: el contador de pasos de Ofertas Especiales ignoraba los
interruptores de las ofertas, así que al desactivar una quedaba un paso fantasma en
la navegación. Las dos copias de esa condición se verificaron idénticas.

Migración opcional `activar-botones.ts` (322 valores sobre 17 propuestas), solo para
que los interruptores se vean encendidos en el Studio.

---

## 2026-09-10 · Ajustes de maquetación de Servicios Premium
**[web]**

Serie de retoques en el bloque de servicios premium: separación mínima bajo la barra,
título a dos líneas solo si hay sitio, y el hueco del logo protegido.

---

## 2026-08-28 · Activar y desactivar servicios premium · `f149460`
**[esquema]** **[web]** **[migración]**

Interruptor `isActive` por servicio premium. Al desactivar uno desaparece su
diapositiva, y la numeración, la navegación y el PDF se ajustan solos. Los
identificadores de diapositiva se anclaron a la posición original para no desviar
los enlaces del índice: decisión [D3](docs/DECISIONES.md#d3).

Migración `activar-servicios-premium.ts` **ejecutada**: 63 servicios de 17 propuestas
marcados explícitamente como activos. Comprobado después: 0 sin valor.

También en esta fecha se decidió ejecutar las migraciones con el CLI sin tokens:
decisión [D4](docs/DECISIONES.md#d4).

---

## 2026-06-10 y anteriores · Activar y desactivar secciones
**[esquema]** **[web]**

Serie de cambios que introdujo el interruptor de sección (`situation`, `mission`,
`process`, `team`, `testimonials`, `scopeIntro`, `scopePhases`, `investment`,
`specialOffers`, `payment`, letra pequeña, separadora, `guarantees`,
`premiumServices`) y el convenio de lectura `isActive !== false`:
decisión [D1](docs/DECISIONES.md#d1).
