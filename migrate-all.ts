import { getCliClient } from 'sanity/cli'

const client = getCliClient()

// Función auxiliar para convertir un string simple a formato Portable Text (Rich Text de Sanity)
const stringToPortableText = (text: any) => {
  if (!text) return undefined
  // Si ya es un array, significa que ya es Portable Text o ya fue migrado
  if (Array.isArray(text)) return text

  return [
    {
      _key: Math.random().toString(36).substring(2, 10),
      _type: 'block',
      children: [
        {
          _key: Math.random().toString(36).substring(2, 10),
          _type: 'span',
          marks: [],
          text: String(text)
        }
      ],
      markDefs: [],
      style: 'normal'
    }
  ]
}

const migrateData = async () => {
  // Buscamos todas las propuestas
  const query = `*[_type == "proposal"]`
  const documents = await client.fetch(query)

  if (documents.length === 0) {
    console.log('No se encontraron documentos de tipo "proposal".')
    return
  }

  console.log(`Encontrados ${documents.length} documentos para revisar y migrar.`)

  const transaction = client.transaction()
  let updatesCount = 0;

  documents.forEach((doc: any) => {
    let needsUpdate = false
    const patchObj: any = {}

    // --- 1. MIGRACIÓN DE FASES ---
    if (doc.scopePhases1 || doc.scopePhases2) {
      const phases1 = doc.scopePhases1?.phases || []
      const phases2 = doc.scopePhases2?.phases || []
      const combinedPhases = [...phases1, ...phases2]
      
      // Si la nueva fase no existe o queremos forzar la sobreescritura con las antiguas
      patchObj['scopePhases'] = { phases: combinedPhases }
      needsUpdate = true
      console.log(`- Documento ${doc._id}: Migrando fases (Total unificadas: ${combinedPhases.length})`)
    }

    // --- 2. MIGRACIÓN DE TEXTOS A RICH TEXT (SCOPE Y NOTE) ---
    if (doc.scopeIntro?.intervention) {
      const scopeVal = doc.scopeIntro.intervention.scope
      const noteVal = doc.scopeIntro.intervention.note

      // Comprobamos si 'scope' es un string y lo convertimos
      if (typeof scopeVal === 'string') {
        patchObj['scopeIntro.intervention.scope'] = stringToPortableText(scopeVal)
        needsUpdate = true
        console.log(`- Documento ${doc._id}: Migrando 'scope' de texto simple a Rich Text.`)
      }

      // Comprobamos si 'note' es un string y lo convertimos
      if (typeof noteVal === 'string') {
        patchObj['scopeIntro.intervention.note'] = stringToPortableText(noteVal)
        needsUpdate = true
        console.log(`- Documento ${doc._id}: Migrando 'note' de texto simple a Rich Text.`)
      }
    }

    if (needsUpdate) {
      transaction.patch(doc._id, (p) => {
        p.set(patchObj)
        // Si quisieras borrar los campos viejos para limpiar (opcional):
        // p.unset(['scopePhases1', 'scopePhases2'])
        return p
      })
      updatesCount++;
    }
  })

  if (updatesCount === 0) {
    console.log('Todos los documentos ya estaban actualizados. No hay nada que migrar.')
    return
  }

  // Ejecutamos la transacción
  try {
    console.log(`\nEjecutando migración en ${updatesCount} documentos...`)
    await transaction.commit()
    console.log('¡Migración completada con éxito! Revisa tu Sanity Studio.')
  } catch (error) {
    console.error('Error al intentar ejecutar la migración:', error)
  }
}

migrateData()
