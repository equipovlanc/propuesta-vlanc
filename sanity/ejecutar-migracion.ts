import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function migrate() {
  console.log('\n=============================================')
  console.log('Buscando documentos para migrar...')
  
  // Buscar documentos que tengan el campo listItems
  const documents = await client.fetch(`*[_type == "proposal" && defined(mission.achievements.listItems)]`)
  
  if (documents.length === 0) {
    console.log('No se encontraron documentos con el campo listItems antiguo.')
    console.log('=============================================\n')
    return
  }

  console.log(`Encontrados ${documents.length} documentos. Empezando migración...`)

  for (const doc of documents) {
    const listItems = doc.mission.achievements.listItems
    if (!Array.isArray(listItems)) continue

    console.log(`Procesando documento: ${doc.title || doc._id}...`)

    // Convertir de strings a Portable Text (Rich Text) con formato de lista de puntos
    const newDescription = listItems.map((item, index) => {
      const _key = Math.random().toString(36).substring(2, 10) + index
      const cleanText = typeof item === 'string' ? item.replace(/<[^>]+>/g, '') : ''

      return {
        _type: 'block',
        _key,
        style: 'normal',
        listItem: 'bullet',
        markDefs: [],
        children: [{ _type: 'span', _key: _key + 'span', text: cleanText, marks: [] }]
      }
    })

    try {
      // Subir el cambio a Sanity
      await client.patch(doc._id)
        .set({ 'mission.achievements.description': newDescription })
        .unset(['mission.achievements.listItems'])
        .commit()
        
      console.log(`✅ ¡Éxito! Documento migrado.`)
    } catch (err) {
      console.log(`❌ Error al migrar el documento ${doc._id}:`, err)
    }
  }
  
  console.log('=============================================')
  console.log('Migración completada. Ya puedes comprobarlo en tu Sanity Studio.')
  console.log('=============================================\n')
}

migrate().catch(console.error)
