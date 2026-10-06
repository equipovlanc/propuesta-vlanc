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
