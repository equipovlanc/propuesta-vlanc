import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const migrateData = async () => {
  // 1. Buscamos todas las propuestas que tengan los campos antiguos
  const query = `*[_type == "proposal" && (defined(scopePhases1) || defined(scopePhases2))]`
  const documents = await client.fetch(query)

  if (documents.length === 0) {
    console.log('No se encontraron documentos con los datos antiguos. O ya han sido migrados, o la consulta no coincide.')
    return
  }

  console.log(`Encontrados ${documents.length} documentos para migrar.`)

  // 2. Creamos una transacción para modificar los documentos de forma segura
  const transaction = client.transaction()

  documents.forEach((doc) => {
    // Extraemos las fases antiguas (asegurándonos de que sean arrays)
    const phases1 = doc.scopePhases1?.phases || []
    const phases2 = doc.scopePhases2?.phases || []
    
    // Las juntamos todas en un solo array
    const combinedPhases = [...phases1, ...phases2]

    console.log(`Migrando documento ${doc._id}: ${phases1.length} fases (1-2) + ${phases2.length} fases (3-5) = ${combinedPhases.length} totales.`)

    // Preparamos los cambios en la transacción
    transaction.patch(doc._id, (p) => {
      // Seteamos el nuevo campo
      p.set({
        scopePhases: {
          phases: combinedPhases
        }
      })
      // Opcional: Borramos los campos viejos para limpiar la base de datos
      // p.unset(['scopePhases1', 'scopePhases2'])
      return p
    })
  })

  // 3. Ejecutamos la transacción
  try {
    console.log('Ejecutando migración...')
    await transaction.commit()
    console.log('¡Migración completada con éxito! Revisa tu Sanity Studio.')
  } catch (error) {
    console.error('Error al intentar ejecutar la migración:', error)
  }
}

migrateData()
