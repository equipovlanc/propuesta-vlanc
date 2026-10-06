# Sanity: contenido, esquema y migraciones

| | |
|---|---|
| Proyecto | `j14bbmni` |
| Dataset | `production` |
| Tipo de documento | `proposal` (uno por cliente, identificado por `slug`) |
| Studio | `C:\Users\jgont\VLANC\WEB\propuestasvlanc(SANITYSTUDIO)` — Sanity 5, CLI 6 |
| Studio publicado | **propuestasvlanc.sanity.studio** |
| Esquema en el Studio | `schemaTypes/proposal.schema.ts`, registrado en `schemaTypes/index.ts` |

## Ciclo de un cambio de esquema

1. **Claude** edita [../sanity/proposal.schema.ts](../sanity/proposal.schema.ts) en este repo.
2. **Claude** adapta la web si el campo nuevo cambia lo que se ve, y hace commit y push.
   Vercel despliega solo.
3. **Jose** copia el archivo a `<studio>/schemaTypes/proposal.schema.ts`.
4. **Jose** ejecuta `npm run deploy` en la carpeta del Studio.
5. Solo si hace falta: **Jose** ejecuta la migración (ver más abajo).

El paso 2 y los pasos 3-4 son independientes: la web nunca se rompe por ir por
delante del Studio, porque un campo que todavía no existe se lee como `undefined`,
y el convenio `isActive !== false` lo interpreta como visible.

Para comprobar si las dos copias del esquema están sincronizadas:

```bash
diff <(tr -d '\r' < sanity/proposal.schema.ts) \
     <(tr -d '\r' < "C:/Users/jgont/VLANC/WEB/propuestasvlanc(SANITYSTUDIO)/schemaTypes/proposal.schema.ts")
```

## Interruptores de visibilidad

Son 26, todos booleanos con `initialValue: true` y todos leídos con
`isActive !== false`. Se agrupan en tres niveles:

### Secciones enteras (quitan una o más diapositivas)

`situation`, `mission`, `process`, `team`, `testimonials`, `scopeIntro`,
`scopePhases`, `investment`, `specialOffers`, `payment`, `payment.finePrint`,
`dividerSlide`, `guarantees`, `premiumServices`.

### Elementos de una lista (quitan una diapositiva o una fila)

- `guarantees.items[].isActive` — además oculta los botones que abrirían esa garantía.
- `premiumServices.services[].isActive` — quita la diapositiva de ese servicio.
- `specialOffers.conditionalOffer.isActive` y `specialOffers.launchOffer.isActive`
  — quitan un paso interno de la sección de ofertas.
- `contact.rrss[].isActive` — quita un icono.
- `investment.phases[].isActive` — quita esa página de inversión entera.

### Botones

| Campo | Botón |
|---|---|
| `process.badgeButtonIsActive` | Garantía bajo el paso 3 del proceso |
| `scopePhases.phases[].videoButtonIsActive` | "Ver vídeo" de la fase |
| `scopePhases.phases[].guaranteeButtonIsActive` | Garantía principal de la fase |
| `scopePhases.phases[].additionalGuarantees[].isActive` | Cada garantía adicional |
| `specialOffers.launchOffer.premiumButtonIsActive` | Abre el popup del servicio premium |
| `contact.web.isActive` | Enlace a la web |
| `contact.printButtonIsActive` | "[ IMPRIMIR PROPUESTA / PDF ]" |

**Sin interruptor, a propósito:** los controles del reproductor de vídeo, las × de
cerrar popups, los enlaces del índice y la navegación de la cabecera. Son mecanismos
de la interfaz: esconderlos dejaría páginas en las que no se puede hacer nada. Los
teléfonos de contacto tampoco, porque no son enlaces: si se borra el número desaparecen.

## Las fases de la sección de inversión

`investment` puede tener varias páginas, una por cada elemento de `investment.phases`.
Cada fase lleva su propio texto de la columna izquierda y su propia tabla completa;
lo único común a todas es el título (`investment.title`) y el lugar y fecha
(`investment.locationDate`), que además usan Ofertas Especiales, Forma de Pago y la
letra pequeña.

`phaseLabel` es el nombre de la fase ("FASE 1", o lo que se quiera). Se pinta en la
celda izquierda de la fila de planes y en la de la fila de precios, y es visible
desde que se llega a la página, sin pasos. Si se deja vacío no aparece nada.

**Para añadir una fase**: menú ⋮ de una fase existente → **Duplicate**. La copia nace
con todo el contenido relleno y solo hay que retocar lo que cambie.

**Compatibilidad**: mientras `phases` esté vacío, el propio objeto `investment` hace
de fase 1 con sus campos de siempre, y el esquema los muestra. En cuanto existe una
fase, esos campos heredados se **ocultan solos** en el Studio (ya no se leen) para que
nadie edite donde no toca. Ver [D7](DECISIONES.md#d7).

## Precios de los servicios premium

Cada servicio puede tener **varios botones de precio**: `premiumServices.services[].prices`
es un array y se pinta un botón por entrada, en fila y en el orden del array. Aparecen
tanto en la página del servicio como en el popup de la oferta de lanzamiento.

El campo antiguo `price` (un solo texto) sigue existiendo y actúa de reserva mientras
`prices` esté vacío; en cuanto hay precios en el array, el Studio lo oculta. Mismo
patrón que las fases de inversión: ver [D8](DECISIONES.md#d8).

## Migraciones

### ¿Hace falta migrar?

**Para que la web funcione, casi nunca.** El convenio `isActive !== false` hace que
el contenido antiguo, sin el campo nuevo, se siga mostrando.

Donde sí ayuda es en la **coherencia visual del Studio**: un booleano sin valor se
dibuja apagado, así que Jose vería interruptores en "off" en contenido que sí se
muestra. Las migraciones de este proyecto son de ese tipo: cosméticas, opcionales
e idempotentes.

### Cómo se ejecuta (sin tokens)

El CLI usa la sesión de `sanity login`, no hace falta crear ningún token.
Desde la carpeta del **Studio**:

```bash
npx sanity migration run <id>                              # simulacro: solo imprime
npx sanity migration run <id> --no-dry-run                 # aplica, preguntando
npx sanity migration run <id> --no-dry-run --no-confirm    # aplica sin preguntar
```

`--no-confirm` es lo que permite que la ejecute Claude: sin esa bandera el CLI
espera un sí por teclado y el comando se queda colgado.

El simulacro imprime el contenido completo de cada parche, o sea decenas de miles
de caracteres. Para ver solo el alcance:
`npx sanity migration run <id> 2>&1 | grep -c "^\[patch\] \[proposal\]"`.
Ese número incluye **borradores**, así que suele ser mayor que el de propuestas
publicadas.

El `<id>` es el nombre del archivo sin extensión. El CLI acepta
`migrations/<id>.ts` o `migrations/<id>/index.ts`, carga el TypeScript al vuelo
(no hay que compilar) y alcanza también los borradores.

### Cómo se escribe una

Ver [../sanity/migrations/activar-botones.ts](../sanity/migrations/activar-botones.ts)
como plantilla. Las reglas que seguimos:

- Solo tocar lo que no tiene valor (`v !== true && v !== false`). Nunca reactivar
  algo que Jose haya apagado a mano.
- Direccionar los elementos de un array por `_key`, nunca por posición:
  `at('ruta.array[_key=="abc"].campo', set(true))`.
- No escribir dentro de un objeto que no existe: comprobar el padre antes.
- Idempotente: ejecutarla dos veces no debe generar ningún cambio la segunda vez.

Antes de entregarla, simularla contra los datos reales sin escribir: compilar el
archivo con esbuild, pasar `migrate.document()` sobre los documentos traídos en
lectura y contar los parches. Así se sabe el volumen exacto antes de tocar nada.

Migraciones ya aplicadas: ver [CHANGELOG.md](../CHANGELOG.md).

## Consultar el dataset en lectura

El dataset es de lectura pública, así que se puede consultar desde este repo sin
credenciales (solo documentos publicados, no borradores). Script de usar y tirar:

```bash
cat > _probe.mjs <<'JS'
import {createClient} from '@sanity/client';
const c = createClient({projectId:'j14bbmni',dataset:'production',apiVersion:'2024-06-24',useCdn:false});
console.log(JSON.stringify(await c.fetch(`*[_type=="proposal"]{"slug":slug.current, title}`), null, 2));
JS
node _probe.mjs; rm -f _probe.mjs
```

Tiene que vivir dentro del repo para que resuelva `@sanity/client` de
`node_modules`. Úsalo para comprobar hipótesis sobre el contenido antes de
proponer cambios, y bórralo después.

## Reutilizar bloques entre propuestas

Se hace con el **Copy/Paste nativo** del Studio, sin tocar el esquema:

1. En la propuesta origen, menú **⋮** del elemento → **Copy**.
2. En la propuesta destino, menú **⋮** del **campo** (el array) → **Paste field**.

- Copiar un **elemento** y pegarlo en un array lo **añade al final**.
- Copiar el **campo array completo** y pegarlo **reemplaza** toda la lista del destino.
- El `_key` se regenera al pegar, así que no hay colisiones.
- Los *assets* no se duplican: se reutiliza la referencia a la imagen.

Tras pegar una **fase**, revisar su campo "Garantía a mostrar (Número)": es una
posición, no un vínculo, y en el destino puede apuntar a otra garantía.

Por qué esto y no bloques compartidos por referencia:
[DECISIONES.md](DECISIONES.md#d2).
