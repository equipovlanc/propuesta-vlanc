# CLAUDE.md — Propuestas VLANC

Propuesta de honorarios de arquitectura, navegable como una presentación de
diapositivas a pantalla completa. Cada cliente tiene su propia propuesta,
identificada por un *slug* en la URL. Todo el contenido vive en Sanity.

> Documentación detallada: [Arquitectura](docs/ARQUITECTURA.md) ·
> [Sanity](docs/SANITY.md) · [Decisiones](docs/DECISIONES.md) ·
> [Cambios](CHANGELOG.md)

## Las tres piezas y quién las toca

| Pieza | Dónde | Quién la cambia |
|---|---|---|
| **Web** (React 19 + Vite) | este repo → GitHub `equipovlanc/propuesta-vlanc` → Vercel | **Claude**: edita, commitea y pushea. Vercel despliega solo. |
| **Sanity Studio** | `C:\Users\jgont\VLANC\WEB\propuestasvlanc(SANITYSTUDIO)` | **Jose**: copia el esquema y lanza `npm run deploy`. |
| **Datos** (dataset) | Sanity cloud, proyecto `j14bbmni`, dataset `production` | Jose desde el Studio; Claude solo mediante migraciones que Jose ejecuta. |

**El Studio NO está en este repo.** La carpeta [sanity/](sanity/) de aquí es un
buzón de intercambio:

- [sanity/proposal.schema.ts](sanity/proposal.schema.ts) — **para copiar**. Destino:
  `<studio>/schemaTypes/proposal.schema.ts`. Lo edita Claude, lo copia Jose.
- [sanity/migrations/](sanity/migrations/) — **para copiar** cuando haya que migrar
  contenido. Destino: `<studio>/migrations/`.
- [sanity/client.ts](sanity/client.ts) — **NO copiar**. Es código vivo de la web.

## Rutina de sesión

Hay dos comandos que automatizan esto. Están en `.claude/skills/`, así que su
contenido es la referencia detallada; aquí queda solo el para qué.

- **`/arranque`** — al empezar. Solo lectura: lee las decisiones cerradas, mira el
  estado del repo, comprueba si el esquema de aquí y el del Studio han divergido y
  si quedan migraciones sin copiar. Evita construir sobre suposiciones.
- **`/cierre`** — al acabar, **y también a mitad de sesión** cada vez que se cierra
  un bloque de trabajo: verifica el build, registra en `CHANGELOG.md` (y en
  `docs/DECISIONES.md` si se ha decidido algo), commitea, pushea y entrega la lista
  de pasos manuales para el Studio.

Lo escrito en disco sobrevive a la compactación del contexto; lo que solo está en la
conversación, no. En sesiones largas, `/cierre` temprano y a menudo.

Si se trabaja sin los comandos, el mínimo irrenunciable es el mismo: leer
[docs/DECISIONES.md](docs/DECISIONES.md) antes de proponer cambios de fondo, y dejar
siempre dicho con claridad qué le toca hacer a Jose en el Studio y qué va solo por Vercel.

## Reglas de oro

1. **`isActive !== false` siempre.** Un interruptor sin valor significa VISIBLE.
   Nunca `isActive === true` ni `if (isActive)`: eso ocultaría todo el contenido
   anterior a la creación del campo y obligaría a migrar. Gracias a este convenio,
   **añadir interruptores no requiere migración de datos**.
2. **Los ids de slide no se mueven.** Al filtrar elementos ocultos hay que
   conservar la posición ORIGINAL del array para el `id`, y usar la posición
   visible solo para el número de página. Si no, los enlaces del índice acaban
   abriendo otra página.
3. **Nunca convertir bloques en referencias compartidas** (fases, garantías,
   servicios premium). Ver [docs/DECISIONES.md](docs/DECISIONES.md#d2).
4. **Un cambio de esquema casi nunca basta por sí solo.** Si el campo nuevo tiene
   que afectar a lo que se ve, la web también cambia → commit y push.
5. **Añadir un interruptor es ocultar, no borrar.** El texto se conserva en Sanity
   para poder reactivarlo.
6. Las secciones que aparecen y desaparecen afectan a numeración, navegación,
   hashes `#page-N` e impresión a la vez. Ver
   [docs/ARQUITECTURA.md](docs/ARQUITECTURA.md).

## Comandos

```bash
# en este repo
npm run dev          # http://localhost:3000 (necesita ?slug o irá al fallback)
npm run lint         # tsc --noEmit
npm run build        # verificación previa a push: debe pasar siempre
```

```bash
# en la carpeta del Studio
npm run dev          # Studio en local
npm run deploy       # publica el Studio (tras copiar el esquema)
npx sanity migration run <id>                 # simulacro, no escribe
npx sanity migration run <id> --no-dry-run    # aplica
```

El `sanity.cli.ts` del Studio ya declara `projectId` y `dataset`, así que los
comandos de migración **no** necesitan `--project` ni `--dataset`.

## Acoplamientos frágiles

Cosas que parecen independientes y no lo son. Romper una de estas no da error,
solo hace que la web mienta.

- **`getSpecialOffersSteps` en [App.tsx](App.tsx) duplica la lógica de
  [SpecialOffers.tsx](components/SpecialOffers.tsx)**. Son el contador de pasos y
  lo que se pinta: si divergen, aparece un paso fantasma. Si tocas una, toca la otra.
- **Las garantías se referencian por POSICIÓN**: `guarantees.items[0]` en El Proceso,
  `items[i+1]` como defecto de cada fase, y `selectedGuarantee` es un número, no un
  vínculo. Reordenar las garantías cambia qué popup abre cada botón.
- **El popup de la oferta de lanzamiento usa `premiumServices.services[1]`**, índice
  fijo sobre el array SIN filtrar. Desactivar un servicio no lo mueve; reordenarlos sí.
- **Las fases copiadas de otra propuesta arrastran su `selectedGuarantee`**, que
  apuntará a la garantía que ocupe esa posición en el destino.

## Detalles del entorno

- `GEMINI_API_KEY` en `.env.local` es un resto del scaffold de AI Studio. No se usa
  en ninguna parte; `vite.config.ts` la inyecta pero nadie la lee.
- El repo tiene `sanity` como dependencia solo para que los tipos de
  `proposal.schema.ts` y de las migraciones compilen. La web no monta el Studio.
- Windows + Git Bash. Git normaliza a CRLF: los avisos `LF will be replaced by CRLF`
  al hacer commit son normales, no un problema.
