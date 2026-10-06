---
name: arranque
description: Arranque de sesión del proyecto Propuestas VLANC. Comprueba en qué estado están el repo, el esquema de Sanity y el Studio antes de tocar nada, y resume los pendientes. Solo lectura.
allowed-tools:
  - Bash
  - Read
  - Grep
  - Glob
---

# Arranque de sesión

Objetivo: no empezar a trabajar sobre suposiciones. **No modifiques nada** en este
comando; solo mira y reporta.

## 1. Contexto escrito

Lee, si no están ya en el contexto de esta sesión:

- `CLAUDE.md` — reglas de oro y acoplamientos frágiles.
- `docs/DECISIONES.md` — decisiones cerradas que no se reabren.
- Las dos últimas entradas de `CHANGELOG.md` — qué se hizo la última vez y si dejó
  algo a medias.

## 2. Estado del repo

```bash
git status --short && git log --oneline -3 && git fetch --dry-run 2>&1 | head -3
```

Avisa si: hay cambios sin commitear, la rama no es `main`, o hay commits en remoto
sin traer.

## 3. ¿Esquema sincronizado con el Studio?

```bash
diff <(tr -d '\r' < sanity/proposal.schema.ts) \
     <(tr -d '\r' < "C:/Users/jgont/VLANC/WEB/propuestasvlanc(SANITYSTUDIO)/schemaTypes/proposal.schema.ts") \
  && echo "ESQUEMA SINCRONIZADO" || echo "ESQUEMA DIVERGENTE (ver diff arriba)"
```

Si divergen hay dos posibilidades, y hay que distinguirlas antes de seguir:

- Un cambio mío que Jose todavía no ha copiado → recuérdaselo.
- Alguien editó el Studio a mano → **ese** es ahora el bueno. No lo pises: pregunta.

## 4. ¿Migraciones pendientes?

```bash
ls sanity/migrations/*.ts sanity/migrations/*.mjs 2>/dev/null
ls "C:/Users/jgont/VLANC/WEB/propuestasvlanc(SANITYSTUDIO)/migrations/" 2>/dev/null
```

Las que estén aquí y no allí están sin copiar. Las de este proyecto son opcionales
y cosméticas (ver `docs/SANITY.md`), así que no alarmes: solo menciónalas.

## 5. Si el trabajo depende del contenido real

Consulta el dataset en lectura antes de proponer nada. Receta en
`docs/SANITY.md`, sección "Consultar el dataset en lectura". No supongas cuántas
propuestas hay, ni qué campos están rellenos.

## 6. Reporta

Un bloque corto, sin paja:

- **Estás aquí**: último commit y qué hacía.
- **Pendiente de Jose**: copiar esquema, desplegar Studio, ejecutar migración… o nada.
- **Avisos**: divergencias, trabajo a medias, cambios sin commitear.

Y después pregunta en qué trabajamos, salvo que Jose ya lo haya dicho.
