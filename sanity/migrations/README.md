# Migraciones de Sanity

## `activar-servicios-premium.ts` — recomendado (sin tokens)

Migración oficial del CLI de Sanity. Se ejecuta **desde la carpeta del Studio**
(la que está fuera de este repo, la que tiene `sanity.cli.ts`), usando la sesión
de `sanity login`. No hace falta crear ningún token.

La carpeta `migrations` NO existe por defecto en el Studio: la creas tú, a mano,
en la raíz del proyecto (al lado de `sanity.cli.ts` y `sanity.config.ts`).

```
<studio>/
  sanity.cli.ts
  sanity.config.ts
  migrations/                          <-- la creas tú
    activar-servicios-premium.ts       <-- copias este archivo aquí
```

```bash
# desde la carpeta del studio:
npx sanity login                                                    # solo la 1a vez
npx sanity migration run activar-servicios-premium                  # simulacro, no escribe
npx sanity migration run activar-servicios-premium --no-dry-run     # aplica
```

El id de la migración es el nombre del archivo sin extensión. El CLI también
admite la forma `migrations/activar-servicios-premium/index.ts`; con un archivo
suelto es equivalente y más cómodo. No hay que compilar nada: el TypeScript se
carga al vuelo.

El dry-run es el modo por defecto. Al aplicar, el CLI pide confirmación del
dataset sobre el que va a escribir.

Si tu `sanity.cli.ts` no declara projectId/dataset, añade:
`--project j14bbmni --dataset production`

## `set-premium-isactive.mjs` — alternativa

Hace exactamente lo mismo, pero se ejecuta desde **este** repo (que ya tiene
`@sanity/client` instalado) y necesita un token de escritura en la variable
`SANITY_WRITE_TOKEN`. Útil solo si no quieres tocar la carpeta del Studio.
Ver las instrucciones en la cabecera del propio archivo.

Ambos scripts son idempotentes: se pueden ejecutar varias veces sin efectos
secundarios, y nunca reactivan un servicio que hayas desactivado a mano.
