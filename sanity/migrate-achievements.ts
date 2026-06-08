import { defineMigration, at, setIfMissing, unset } from 'sanity/migrate'

export default defineMigration({
  title: 'Migrate achievements listItems to description (Portable Text)',
  documentTypes: ['proposal'],

  migrate: {
    document(doc) {
      // Comprobamos si el documento tiene el campo antiguo
      const mission = doc.mission as any;
      if (!mission || !mission.achievements || !Array.isArray(mission.achievements.listItems)) {
        return; // No hay nada que migrar en este documento
      }

      const listItems = mission.achievements.listItems;

      // Convertir el array de strings a un array de bloques Portable Text (Rich Text)
      const newDescription = listItems.map((item: string, index: number) => {
        // Sanity requiere una clave única (_key) para cada elemento de un array
        const _key = Math.random().toString(36).substring(2, 10) + index;
        
        // Limpiamos etiquetas HTML por si acaso había texto enriquecido manual viejo
        const cleanText = typeof item === 'string' ? item.replace(/<[^>]+>/g, '') : '';

        return {
          _type: 'block',
          _key,
          style: 'normal',
          listItem: 'bullet', // Lo configuramos como punto de lista para mantener el aspecto
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: _key + 'span',
              text: cleanText,
              marks: []
            }
          ]
        };
      });

      // Retornamos las operaciones de mutación
      return [
        // 1. Asignamos el nuevo formato de rich text al campo description
        at('mission.achievements.description', setIfMissing(newDescription)),
        // 2. Eliminamos el campo viejo listItems
        at('mission.achievements.listItems', unset())
      ]
    }
  }
})
