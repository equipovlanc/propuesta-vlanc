# Decisiones

Registro de las decisiones que condicionan el trabajo futuro: qué se decidió, por
qué, y qué implica. **Leer antes de proponer un cambio de fondo.** Las marcadas
como *cerrada* no se reabren salvo que Jose lo pida explícitamente.

Las decisiones de aquí no se repiten en otros documentos: el resto de la
documentación enlaza a esta página.

---

<a id="d1"></a>
## D1 · Un interruptor sin valor significa VISIBLE
**2026-06-10 · cerrada**

Todos los interruptores de visibilidad se leen con `isActive !== false`, nunca con
`isActive === true` ni `if (isActive)`.

**Por qué.** Los campos booleanos nuevos no existen en el contenido que ya estaba
guardado, y Sanity los devuelve como `undefined`. Si el código exigiera `true`, el
día que se añade un interruptor desaparecería de golpe todo el contenido anterior,
y haría falta una migración obligatoria antes de desplegar.

**Consecuencias.**
- Añadir interruptores nunca requiere migrar datos. Las migraciones del proyecto son
  cosméticas y opcionales.
- `initialValue: true` en el esquema solo afecta a los elementos creados a partir de
  entonces, no al contenido existente. Es esperado, no un fallo.
- Efecto secundario: en el Studio un interruptor sin valor se dibuja **apagado**
  aunque el contenido se muestre. De ahí las migraciones de relleno.

---

<a id="d2"></a>
## D2 · Los bloques se copian; nunca se comparten por referencia
**2026-09-09 · cerrada**

Las fases, las garantías y los servicios premium siguen viviendo **dentro** de cada
documento `proposal`. Para reutilizarlos entre propuestas se usa el Copy/Paste
nativo del Studio, y a partir de ahí cada copia es independiente. No se convierten
en documentos propios referenciados.

**Por qué.** Los datos reales demuestran que esos bloques ya son clones que han
divergido: el mismo `_key` aparece en 17 propuestas con textos distintos — "Tu
**hogar** / **sede** / **negocio** como nunca lo imaginaste", "Proceso de creación
de **hogares** / **negocios**", "**5.** FASE OBRA" frente a "**6.** FASE OBRA".
Compartirlos de verdad obligaría a que todas las propuestas dijeran lo mismo y
**alteraría retroactivamente propuestas ya enviadas a clientes**.

**Consecuencias.**
- No proponer tipos de documento compartidos ni `type: 'reference'` para estos bloques.
- Si hiciera falta reutilizar más, la respuesta es Copy/Paste o un documento plantilla
  del que se copia, nunca un vínculo vivo.
- Cada propuesta enviada queda congelada en el tiempo por sí sola, que es lo que
  interesa en un documento contractual.

---

<a id="d3"></a>
## D3 · Los identificadores de diapositiva no se mueven al ocultar elementos
**2026-08-28 · cerrada**

Cuando se filtran elementos ocultos de una lista, el `id` de la diapositiva se
construye con la posición **original** en Sanity, y solo el número de página usa la
posición visible.

**Por qué.** Los enlaces del índice guardan el `id` como texto libre. Si los `id` se
recalcularan sobre la lista filtrada, desactivar un servicio haría que un enlace a
`premium-3` abriese otro servicio distinto, sin dar ningún error.

**Consecuencias.** Un enlace del índice que apunte a un elemento desactivado
simplemente no hace nada, que es el fallo seguro. Mejor eso que llevar al cliente a
la página equivocada.

---

<a id="d4"></a>
## D4 · Las migraciones se ejecutan con el CLI de Sanity, sin tokens
**2026-08-28 · cerrada**

Se entregan como archivo en `sanity/migrations/` para copiar a `<studio>/migrations/`
y se ejecutan con `npx sanity migration run <id>`, que usa la sesión de
`sanity login`.

**Por qué.** No obliga a Jose a crear ni custodiar tokens de escritura, el simulacro
es el modo por defecto, el CLI pide confirmación del dataset antes de escribir y
alcanza también los borradores.

**Consecuencias.** Se mantiene `sanity/migrations/set-premium-isactive.mjs` como
alternativa con token, ejecutable desde este repo sin tocar el Studio, para casos en
los que no se quiera pasar por la carpeta del Studio.

---

<a id="d5"></a>
## D5 · El esquema se copia a mano entre dos repos separados
**Condición de partida del proyecto**

El Studio vive en `C:\Users\jgont\VLANC\WEB\propuestasvlanc(SANITYSTUDIO)`, fuera de
este repo. La carpeta `sanity/` de aquí es un buzón de intercambio, no el esquema en
producción.

**Consecuencias.**
- El esquema puede divergir entre las dos copias. Conviene comprobarlo al empezar
  cada sesión (ver [CLAUDE.md](../CLAUDE.md#rutina-de-sesión)).
- Los tipos de documento nuevos habría que registrarlos en el `sanity.config.ts` del
  Studio, que no está en este repo. Hasta ahora no ha hecho falta: todo cuelga del
  único tipo `proposal`.

---

<a id="d6"></a>
<a id="d8"></a>
## D8 · Cambiar el tipo de un campo se hace con un campo nuevo, nunca in situ
**2026-10-06 · cerrada**

Cuando un campo necesita cambiar de forma (de texto suelto a lista, de objeto a
array de objetos), **no se cambia el `type` del campo existente**. Se añade uno
nuevo, el antiguo se queda de reserva mientras el nuevo esté vacío, y el esquema
oculta el antiguo en cuanto el nuevo tiene contenido.

Casos aplicados: `investment.phases` frente a los campos sueltos de inversión (D7),
y `premiumServices.services[].prices` frente a `price`.

**Por qué.** Cambiar el `type` de un campo que ya tiene datos hace que el Studio
marque el contenido existente como inválido y ofrezca borrarlo, y rompe la web en
el hueco entre desplegar y migrar. Con un campo nuevo, la web funciona igual antes
y después de migrar, el despliegue y la migración dejan de depender el uno del
otro, y deshacer es tan fácil como vaciar el campo nuevo.

**Consecuencias.**
- Las migraciones de este proyecto son **aditivas**: copian, no mueven ni borran.
- Queda contenido duplicado en el documento (el viejo y el nuevo). Es el precio a
  pagar, y no estorba porque el antiguo está oculto.
- No limpiar nunca los campos de reserva sin comprobar antes que **todas** las
  propuestas, borradores incluidos, usan ya el campo nuevo.

---

<a id="d7"></a>
## D7 · La inversión es un array de fases, con los campos antiguos de reserva
**2026-10-06 · cerrada**

`investment.phases[]` contiene una página completa por fase. Los campos antiguos
(`introduction`, `tableRows`, `prices`…) **no se han borrado**: mientras `phases`
esté vacío hacen de fase 1, y en cuanto hay fases se ocultan solos en el Studio.

**Por qué.** Permite desplegar la web antes de migrar el contenido sin que nada se
caiga, y deja la migración como un paso reversible: si algo sale mal, se borra el
array `phases` y todo vuelve al comportamiento anterior. Los campos de una fase se
definen **una sola vez** en el esquema (`camposDeFaseInversion`) y se reutilizan en
los dos sitios, así que no pueden divergir.

**Consecuencias.**
- La migración `inversion-a-fases.ts` es aditiva: copia, no mueve.
- No borrar los campos heredados del esquema sin comprobar antes que todas las
  propuestas, borradores incluidos, tienen ya su array `phases`.
- `title` y `locationDate` siguen siendo únicos para toda la sección, porque los
  leen también Ofertas Especiales, Forma de Pago y la letra pequeña.

---

<a id="d6"></a>
## D6 · Interruptor para los botones de contenido, no para los de interfaz
**2026-09-15 · cerrada**

Llevan interruptor los botones que forman parte del discurso de la propuesta: vídeo
y garantías de cada fase, garantía del paso 3, servicio premium, enlace web, iconos
de redes y botón de imprimir.

**No lo llevan** los controles del reproductor de vídeo, las × de cerrar popups, los
enlaces del índice y la navegación de la cabecera.

**Por qué.** Son mecanismos de la interfaz: ocultarlos dejaría al cliente en páginas
sin salida. Los teléfonos de contacto tampoco lo llevan porque no son enlaces
clicables; basta con borrar el número.

**Consecuencias.** Al desactivar un botón, su texto se conserva en Sanity para poder
reactivarlo sin reescribirlo. Si se ocultan todos los botones de una fase, la fila
entera desaparece y no deja hueco.
