# Cambios

Qué se cambió, cuándo, y qué hubo que hacer en el Studio. Lo más reciente arriba.

Cada entrada indica si requirió acción manual de Jose:
**[esquema]** copiar `proposal.schema.ts` + `npm run deploy` ·
**[migración]** ejecutar una migración · **[web]** solo push, Vercel despliega solo.

---

## 2026-10-06 · Varios precios por servicio premium
**[esquema]** **[web]** **[migración recomendada]**

`premiumServices.services[].prices` es ahora un array: un botón de precio por
entrada, en fila. Aplica tanto a la página del servicio como al popup de la oferta
de lanzamiento.

El campo `price` antiguo se conserva de reserva y se oculta en el Studio en cuanto
hay precios en el array, siguiendo [D8](docs/DECISIONES.md#d8).

Migración `precios-premium-a-lista.ts`: aditiva e idempotente, simulada sobre las
18 propuestas publicadas (67 precios). Sin ejecutarla la web se ve igual, pero
habría que reescribir cada precio a mano al pasar al array.

---

## 2026-10-06 · La inversión admite varias fases
**[esquema]** **[web]** **[migración necesaria]**

La sección de inversión pasa a ser un array de fases: cada una es una página
completa con su texto y su tabla, y se añade duplicando una existente desde el
Studio. Decisión [D7](docs/DECISIONES.md#d7).

- `phaseLabel` por fase, visible sin pasos en la celda izquierda de la fila de
  planes y de la fila de precios.
- En la segunda fase en adelante, el texto de la columna izquierda aparece entero
  al llegar y solo la tabla avanza por pasos.
- Cada página lleva su propio `maxSteps`, porque las fases pueden tener distinto
  número de planes.
- Los campos antiguos se conservan como fase 1 de reserva y se ocultan en el Studio
  en cuanto hay fases.

Migración `inversion-a-fases.ts`: aditiva e idempotente, simulada sobre las 18
propuestas publicadas. Hace falta ejecutarla para poder crear la segunda fase; sin
ella la web sigue mostrando la inversión de siempre.

Antes de todo esto se guardó el primer commit real del Studio
(`7ac20c1` en `propuestasvlanc(SANITYSTUDIO)`), que hasta ahora tenía el esquema y
las migraciones sin versionar.

---

## 2026-10-06 · Comandos de arranque y cierre de sesión

Añadidos dos comandos de proyecto en `.claude/skills/`:

- **`/arranque`**: comprobaciones de solo lectura antes de empezar (decisiones
  cerradas, estado del repo, divergencia del esquema frente al Studio, migraciones
  sin copiar).
- **`/cierre`**: verificación del build, registro en `CHANGELOG.md` y
  `docs/DECISIONES.md`, commit, push y lista de pasos manuales para el Studio.
  Pensado también para usarlo a mitad de sesión, porque lo escrito en disco
  sobrevive a la compactación del contexto.

Sin efecto sobre la web ni sobre Sanity.

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
