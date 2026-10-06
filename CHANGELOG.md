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

Migración `precios-premium-a-lista.ts`: aditiva e idempotente. **Ejecutada**
contra `production`: 86 parches (67 servicios publicados más los de borradores).
Comprobado después: 67 servicios con array `prices`, ninguno sin él, y ningún
valor distinto del `price` original, que se conserva.

---

## 2026-10-06 · Trabajos Contemplados se reparte en varias páginas si no cabe
**[web]**

Si una fase no cabe, primero se encoge el texto hasta 2px. Si aun así no entra, se
vuelve al tamaño original y la fase se reparte en varias diapositivas idénticas.

- La unidad que se mueve es el apartado completo: número, título y cuerpo viajan
  juntos, nunca se corta un texto por la mitad.
- El título de la fase se repite en cada página; los botones van sólo en la última.
- Ids `phase-N`, `phase-N-2`…, así que los enlaces del índice no se mueven.

El reparto lo calcula `utils/scopePhasesSplitter.ts` midiendo el contenido real en
un contenedor oculto, esperando a que carguen las tipografías. Al decidirse antes de
construir las diapositivas, el componente ya no mide nada en vivo y deja de depender
de las animaciones de entrada.

Verificado con un DOM simulado sobre diez repartos: no se pierden ni se repiten
apartados, no hay páginas vacías ni a medio llenar, nunca encoge más de lo
necesario y al partir siempre vuelve al tamaño original.

---

## 2026-10-06 · Corrige el ajuste automático, que encogía siempre al máximo
**[web]**

La medición comparaba coordenadas de pantalla entre el logo y el contenido de la
diapositiva, y se dispara al montar, justo cuando la diapositiva está entrando
con una animación de escala de 3x. El hueco salía muy negativo y el texto se
reducía hasta el tope en todas las fases, hubiera desbordamiento o no.

Ahora todo se mide como desplazamiento dentro del lienzo de 1920px, así que la
escala se cancela y la medida es correcta en cualquier instante de la animación.
Afecta también a Servicios Premium, que tenía el mismo defecto.

---

## 2026-10-06 · Trabajos Contemplados encoge el texto si invade el logo
**[web]**

Cuando el contenido de una fase crece hasta acercarse al borde inferior del logo,
el texto de esa columna se reduce de 1 en 1 px hasta dejar el hueco libre, con un
tope de 4px. Mismo patrón que ya usaba Servicios Premium.

El cálculo del borde del logo se extrae a `utils/logoBottom.ts` y ahora sube por
los ancestros para quedarse con el logo de su página. Esto corrige de paso que, al
imprimir, Servicios Premium medía siempre contra el logo de la primera página y por
eso nunca aplicaba la reducción en el PDF.

---

## 2026-10-06 · Mismo revelado por pasos en todas las fases de inversión
**[web]**

Se retira la excepción que mostraba entero el texto de la columna izquierda a
partir de la segunda fase. Ahora todas las fases revelan ese texto paso a paso,
junto con las columnas de la tabla, igual que la primera.

---

## 2026-10-06 · La inversión admite varias fases
**[esquema]** **[web]** **[migración necesaria]**

La sección de inversión pasa a ser un array de fases: cada una es una página
completa con su texto y su tabla, y se añade duplicando una existente desde el
Studio. Decisión [D7](docs/DECISIONES.md#d7).

- `phaseLabel` por fase, visible sin pasos en la celda izquierda de la fila de
  planes y de la fila de precios.
- Cada página lleva su propio `maxSteps`, porque las fases pueden tener distinto
  número de planes.
- Los campos antiguos se conservan como fase 1 de reserva y se ocultan en el Studio
  en cuanto hay fases.

Migración `inversion-a-fases.ts`: aditiva e idempotente. **Ejecutada** contra
`production`: 23 documentos (18 propuestas publicadas y 5 borradores). Comprobado
después: las 18 tienen su FASE 1 con sus planes y precios.

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
que los interruptores se vean encendidos en el Studio. **Descartada**: no se va a
ejecutar, ver [D9](docs/DECISIONES.md#d9).

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
