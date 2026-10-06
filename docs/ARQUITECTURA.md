# Arquitectura de la web

React 19 + Vite + Framer Motion. SPA pura: [vercel.json](../vercel.json) reescribe
cualquier ruta a `/index.html`. No hay servidor ni API propia; el contenido se lee
directamente de Sanity desde el navegador.

## Carga de datos

[App.tsx](../App.tsx) lee el *slug* de la URL y trae el documento `proposal`
completo con una sola consulta GROQ. La consulta empieza por `...`, que arrastra
todos los campos tal cual, y luego sobreescribe solo los que necesitan resolverse:
imágenes y vídeos a URL (`asset->url`) y la opacidad del filtro de color.

**Consecuencia práctica:** un campo nuevo en el esquema **no suele requerir tocar
la consulta**, porque el `...` ya lo trae. Solo hay que tocarla si el campo nuevo
está dentro de un objeto que se proyecta campo a campo (los `logos`, por ejemplo).

Si no hay slug o no existe la propuesta, [StudioLanding.tsx](../components/StudioLanding.tsx)
cae sobre la última propuesta creada.

## Modelo de diapositivas

No hay scroll real. `App.tsx` construye un array `sections` y muestra **una sola**
cada vez; la rueda, las flechas y el índice solo cambian el índice de ese array.
El índice se refleja en la URL como `#page-N`.

Cada entrada del array tiene:

- `id` — identificador estable (`mission`, `phase-3`, `premium-2`…). Es el destino
  de los enlaces del índice, así que **no debe cambiar** cuando se oculta otro elemento.
- `comp` — el componente ya construido.
- `headerPage` — el número que pinta la cabecera. Es opcional: portada, índice,
  la diapositiva separadora y contacto no llevan número.

### Orden y numeración

La portada y el índice no se numeran. El contador de páginas arranca en **3** y va
incrementándose solo por las secciones que de verdad se pintan:

```
hero · index                        (sin número)
situación · misión · proceso · equipo · testimonios · ámbito
fases (una diapositiva por fase)
inversión (una diapositiva por fase activa) · ofertas especiales · forma de pago
letra pequeña (1..N páginas, calculadas en tiempo de ejecución)
[diapositiva separadora: consume un número pero no lo muestra]
garantías
servicios premium (una diapositiva por servicio activo)
contacto                            (sin número)
```

Cualquier sección con su interruptor en `false` no entra en el array, así que no
deja hueco: las siguientes se renumeran solas.

> Cuidado con la diapositiva separadora: la línea
> `const dividerHeaderPage = currentHeaderPage++;` se ejecuta **siempre**, incluso
> si la separadora está desactivada, así que ese número se salta a propósito.
> Es intencionado (viene del diseño original en papel), no un error.

### Número de páginas de la letra pequeña

Es dinámico: [utils/finePrintSplitter.ts](../utils/finePrintSplitter.ts) mide el
texto y decide cuántas páginas y con qué tamaño de letra. Hasta que termina el
cálculo se pinta una página provisional. Por eso el total de diapositivas puede
variar entre propuestas con el mismo esquema.

## Pasos internos

Algunas diapositivas se revelan por partes antes de pasar a la siguiente. El estado
`internalStep` lo controla, y cada sección declara cuántos pasos tiene:

| Sección | Pasos |
|---|---|
| Misión | 2 |
| Proceso | uno por paso del proceso |
| Inversión | nº de planes × 2, **por fase** |
| Ofertas especiales | dinámico: condición especial + oferta de lanzamiento + logo |
| Forma de pago | 1 |
| Separadora | 1 |

`completedSections` recuerda las que ya se han visto enteras, para que al volver
atrás aparezcan completas en lugar de reiniciar la animación.

Las páginas de inversión son un caso aparte: como puede haber varias y cada una
tener distinto número de planes, **cada entrada del array lleva su propio
`maxSteps`**, y los manejadores de rueda, teclado y swipe lo leen de ahí en vez de
recalcularlo. Sus ids son `investment`, `investment-2`, `investment-3`… y se
reconocen con el ayudante `esInversion()`.

Todas las páginas de inversión se comportan igual: las tarjetas de planes de la
izquierda se revelan paso a paso junto con las columnas de la tabla, en cada fase.
Hubo brevemente una excepción para la segunda fase en adelante, y se retiró por
coherencia.

**El contador de pasos de Ofertas Especiales está duplicado**: `getSpecialOffersSteps`
en `App.tsx` decide cuántos pasos hay, y `SpecialOffers.tsx` decide qué se pinta.
Si las dos condiciones no son idénticas, queda un paso en el que no ocurre nada.
Hay comentarios de aviso en ambos sitios.

## Cuando el contenido no cabe

Dos secciones se defienden solas cuando el contenido crece demasiado, cada una a su
manera.

### Trabajos Contemplados: encoge y, si no basta, reparte

`utils/scopePhasesSplitter.ts` mide el contenido **antes** de construir las
diapositivas, en un contenedor oculto que replica los estilos de la columna, e
intenta por este orden:

1. Que la fase quepa tal cual.
2. Encoger el texto de 1 en 1 px, hasta un máximo de 2.
3. Si con −2px sigue sin caber, **volver al tamaño original** y repartir la fase en
   varias diapositivas idénticas.

Lo que se reparte es el apartado completo: su número, su título y su cuerpo viajan
siempre juntos, así que nunca queda un texto cortado por la mitad ni un título
huérfano al final de una página. El título de la fase se repite en cada página y los
botones se pintan **sólo en la última**.

El cálculo vive en `App.tsx`, como el de la letra pequeña, porque el número de
diapositivas tiene que conocerse antes de armar la lista. Espera a
`document.fonts.ready`: medir antes de que carguen las tipografías da alturas falsas.
Los ids son `phase-N` para la primera página y `phase-N-2`, `phase-N-3`… para las
siguientes, así que los enlaces del índice siguen funcionando.

Como el reparto se decide de una vez y se pasa por props, el componente no mide nada
en vivo: no depende de las animaciones ni del momento en que se monta.

### Servicios Premium: encoge sobre la marcha

Mide en vivo contra el borde inferior del logo y encoge hasta 3px. Detalles del
mecanismo:

La referencia es el **borde inferior del logo** de la esquina superior izquierda.
Cuando el texto se acerca a esa altura, se resta 1px a los tamaños base de esa
sección, se vuelve a medir, y se repite hasta cumplir o hasta agotar el tope.

Piezas del mecanismo:

- `utils/logoBottom.ts` calcula el borde inferior **real** del logo. El logo usa
  `object-contain`, así que si la imagen no es cuadrada no llena su caja y el borde
  visible queda por encima del del elemento. La función sube por los ancestros del
  elemento que pregunta para quedarse con el logo de **su** página: al imprimir hay
  uno por página y buscarlo en todo el documento devolvía siempre el de la primera.
- Los tamaños se aplican por **variables CSS** (`--cuerpo-size`,
  `--fase-titulo-size`, `--fase-subtitulo-size`, `--subtitulo2-size`), declaradas en
  `index.html` con su valor por defecto. Cuidado: una clase de Tailwind como
  `text-[14px]` fija el tamaño y **anula la variable**.
- Las variables se ponen en el bloque concreto que debe encoger, no en la sección
  entera, para que no alcancen a los popups, que son hermanos suyos.
- **Nunca comparar coordenadas de pantalla entre el logo y algo de dentro de la
  diapositiva.** Las diapositivas entran con una animación de escala (3x o 0.4x
  hasta 1), y el logo vive fuera de ellas: durante esa animación la distancia medida
  así es falsa. Peor aún, la medición se dispara al montar, o sea en el peor momento
  posible. Todo se mide como **desplazamiento dentro del lienzo de 1920px**: la
  escala se cancela y la medida vale en cualquier instante.
- Todo vive además dentro de `#app-container`, que aplica `zoom`, así que
  `getBoundingClientRect` devuelve px ya escalados. Se deduce el factor midiendo un
  elemento de ancho conocido y se razona en px CSS.
- Un `ref` recuerda desde qué reducción se pidió el último incremento: el
  `ResizeObserver` se dispara varias veces antes del re-render y sin eso cada
  disparo mediría el mismo DOM y encogería el texto de más.

La reducción solo crece, nunca vuelve atrás dentro de la misma diapositiva, así que
no puede oscilar. Cada diapositiva monta su propia instancia y empieza de cero.

Los números a tocar para afinar están al principio de `utils/scopePhasesSplitter.ts`
(`TOP_GAP`, `MAX_FONT_REDUCTION`, y la geometría de la columna) y de
`components/PremiumServices.tsx` (`LOGO_MIN_GAP`, `MAX_FONT_REDUCTION`).

## Modo impresión

`isPrintMode` cambia el render por completo: en vez de una diapositiva, pinta
**todas** una debajo de otra, cada una en una página de 420×297 mm (A3 horizontal),
escalando el lienzo de 1920×1080 con `zoom: 0.82677165`. A cada componente se le
pasa `step: 99` para que se muestre completo, sin animaciones a medias.

Como recorre **el mismo array `sections`**, todo lo que se oculta en pantalla
desaparece también del PDF, sin páginas en blanco. Esto es automático: no hay que
mantener dos listas.

Se dispara con el botón de la última página, con `Ctrl+P` (evento `beforeprint`) y
con un *fallback* por `matchMedia('print')` para Safari.

## Qué revisar cuando algo aparece o desaparece

Al añadir un interruptor que puede quitar una diapositiva entera:

1. ¿Se construye el array saltándose el elemento? (no basta con ocultarlo por CSS)
2. ¿Los `id` siguen siendo los originales, para no desviar los enlaces del índice?
3. ¿La numeración es consecutiva sobre los elementos visibles?
4. ¿El contador de pasos internos, si la sección los tiene, cuenta lo mismo que se pinta?
5. ¿Queda algún índice fijo (`items[0]`, `services[1]`) apuntando al array sin filtrar?

El modo impresión y los puntitos de navegación no hay que tocarlos: salen del
mismo array.
