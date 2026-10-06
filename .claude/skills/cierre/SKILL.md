---
name: cierre
description: Cierre de sesión del proyecto Propuestas VLANC. Verifica el build, registra lo hecho en CHANGELOG y DECISIONES, commitea, pushea y entrega la lista de pasos manuales para el Studio de Sanity. Úsalo también a mitad de sesión para no perder el registro si se compacta el contexto.
allowed-tools:
  - Bash
  - Read
  - Edit
  - Write
  - Grep
  - Glob
---

# Cierre de sesión

Lo que está escrito en disco sobrevive a la compactación del contexto; lo que solo
está en la conversación, no. Por eso este comando también sirve **a mitad de
sesión**, cada vez que se termina un bloque de trabajo.

Si no hay nada que registrar (sesión de solo consultas, sin cambios), dilo y para
aquí. No inventes una entrada de changelog para justificar el comando.

## 1. Verificar antes de escribir nada

```bash
npm run lint && npm run build
```

Si algo falla, **no commitees**: arréglalo o informa y para. Nunca dejes `main` sin
compilar, porque Vercel despliega de ahí automáticamente.

## 2. Repasar lo que se ha tocado

```bash
git status --short && git --no-pager diff --stat
```

Repasa el diff completo de lo que no sea trivial. Busca concretamente:

- Índices posicionales nuevos (`items[0]`, `services[1]`) que deberían ser estables.
- Lógica duplicada que haya quedado divergente, sobre todo `getSpecialOffersSteps`
  en `App.tsx` frente a `SpecialOffers.tsx`.
- Interruptores leídos como `=== true` o `if (x)` en vez de `!== false`.

## 3. Registrar

**`CHANGELOG.md`** — entrada nueva arriba, con la fecha de hoy y las etiquetas que
correspondan: `[esquema]` si hay que copiar el esquema y desplegar el Studio,
`[migración]` si hay que ejecutar una, `[web]` si va solo por Vercel. Di también si
la migración se ejecutó o quedó pendiente.

**`docs/DECISIONES.md`** — solo si se ha decidido algo que condicione el futuro:
un criterio, un descarte, una convención. Formato de las que ya están: id `D<n>`,
fecha, decisión, **Por qué** y **Consecuencias**. Añade el ancla
`<a id="dN"></a>` antes del título para que los enlaces funcionen. Un arreglo
puntual no es una decisión: ese va al changelog.

**`docs/ARQUITECTURA.md`** o **`docs/SANITY.md`** — si el cambio altera cómo
funciona la navegación, la numeración, la impresión, o si añade o quita
interruptores (hay un inventario que mantener al día en `docs/SANITY.md`).

**`CLAUDE.md`** — solo si aparece una regla de oro o un acoplamiento frágil nuevo.
Es el archivo que se carga en cada sesión: cuanto más corto, más útil.

## 4. Commitear y pushear

Mensaje en español, sin tildes en el asunto, explicando el **por qué** y no solo el
qué. Termina con la línea `Co-Authored-By` habitual.

Cuidado con el shell: en la herramienta Bash **no** funcionan los here-strings de
PowerShell (`@'...'@`); usa `git commit -F -` con un heredoc, o se cuela un `@`
suelto en el mensaje.

```bash
git add -A && git commit -q -F - <<'EOF'
...
EOF
git push -q origin main && git log --oneline -1
```

## 5. Entregar los pasos manuales

Cierra con una lista explícita y corta de lo que le toca a Jose, o con un "no tienes
que hacer nada" si todo iba por la web. Cuando haya cambio de esquema:

1. Copiar `sanity/proposal.schema.ts` a
   `C:\Users\jgont\VLANC\WEB\propuestasvlanc(SANITYSTUDIO)\schemaTypes\proposal.schema.ts`
2. `npm run deploy` en la carpeta del Studio
3. Si hay migración: copiarla a `<studio>/migrations/` y
   `npx sanity migration run <id>` (simulacro) y luego `--no-dry-run`

Recuerda que el `sanity.cli.ts` del Studio ya trae `projectId` y `dataset`: los
comandos de migración no necesitan `--project` ni `--dataset`.
