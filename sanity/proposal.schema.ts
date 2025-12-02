
// This file defines the structure of your data in Sanity.
// It reflects exactly the 1920x1080 Slide structure of the new web.

export default {
    name: 'proposal',
    title: 'Propuesta',
    type: 'document',
    fields: [
        // --- METADATA ---
        {
            name: 'title',
            title: 'Título Interno de la Propuesta',
            description: 'Ej: "Propuesta para Celia Blanes". Solo para uso interno en el CMS.',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Identificador para la URL',
            description: 'La parte final de la URL. Ej: "celia-blanes".',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
        },

        // --- SECTIONS (MAPPED TO PDF PAGES) ---
        {
            name: 'header',
            title: 'Cabecera del Documento',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                { name: 'projectCode', title: 'Código de Proyecto', type: 'string' },
                { name: 'title', title: 'Título del Documento', type: 'string', initialValue: 'PROPUESTA DE HONORARIOS' },
                { name: 'clientName', title: 'Nombre del Cliente', type: 'string' },
                { name: 'location', title: 'Localización', type: 'string' },
                { 
                    name: 'company', title: 'Datos de la Empresa', type: 'object', fields: [
                        { name: 'name', title: 'Nombre Empresa', type: 'string', initialValue: 'VLANC' },
                        { name: 'tagline', title: 'Slogan Empresa', type: 'string', initialValue: 'ARQUITECTURA + INTERIORISMO' },
                    ]
                },
            ]
        },
        {
            name: 'hero',
            title: 'Pág 1: Portada',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                { name: 'line1', title: 'Línea 1', type: 'string' },
                { name: 'line2', title: 'Línea 2 (en negrita)', type: 'string' },
                { name: 'line3', title: 'Línea 3', type: 'string' },
            ]
        },
        {
            name: 'index',
            title: 'Pág 2: Índice',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                { name: 'title', title: 'Título de la Sección', type: 'string', initialValue: 'ÍNDICE' },
                {
                    name: 'items', title: 'Puntos del Índice', type: 'array', of: [{
                        type: 'object',
                        fields: [
                            { name: 'number', title: 'Número (01, 02...) o dejar vacío', type: 'string' },
                            { name: 'title', title: 'Título del Punto', type: 'string' },
                            { name: 'id', title: 'ID de la Sección (para el enlace)', description: 'Debe coincidir con los IDs del frontend', type: 'string' },
                        ]
                    }]
                }
            ]
        },
        {
            name: 'situation',
            title: 'Pág 3: La Situación (01)',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                { name: 'sectionNumber', title: 'Número de Sección', type: 'string', initialValue: '01' },
                { name: 'title', title: 'Título', type: 'string', initialValue: 'LA SITUACIÓN' },
                { name: 'paragraphs', title: 'Párrafos (texto completo)', type: 'array', of: [{ type: 'text' }] },
                { name: 'image', title: 'Imagen', type: 'image', options: { hotspot: true } },
            ]
        },
        {
            name: 'mission',
            title: 'Pág 4: Misión y Logros (02/03)',
            type: 'object',
            options: { collapsible: true },
            fields: [
                { 
                    name: 'videoFile', 
                    title: 'Video Loop (Archivo)', 
                    description: 'Sube el archivo de video mp4 directamente desde tu PC.', 
                    type: 'file', 
                    options: { accept: 'video/*' } 
                },
                { 
                    name: 'videoUrl', 
                    title: 'Video Loop (URL Alternativa)', 
                    description: 'Opcional: Enlace externo si no subes archivo.', 
                    type: 'url' 
                },
                { name: 'printImage', title: 'Imagen Estática para Impresión', description: 'Esta imagen sustituye al video cuando se imprime el PDF', type: 'image', options: { hotspot: true } },
                { name: 'image', title: 'Imagen Principal (Fallback)', description: 'Si no hay video ni imagen de impresión', type: 'image', options: { hotspot: true } },
                {
                    name: 'mission', title: 'Sub-sección: La Misión', type: 'object', fields: [
                        { name: 'sectionNumber', title: 'Número', type: 'string', initialValue: '02' },
                        { name: 'title', title: 'Título', type: 'string', initialValue: 'LA MISIÓN' },
                        { name: 'subtitle', title: 'Subtítulo', type: 'string' },
                        { name: 'description', title: 'Descripción', type: 'text' },
                    ]
                },
                {
                    name: 'achievements', title: 'Sub-sección: Qué vas a conseguir', type: 'object', fields: [
                        { name: 'sectionNumber', title: 'Número', type: 'string', initialValue: '03' },
                        { name: 'title', title: 'Título', type: 'string', initialValue: 'QUÉ VAS A CONSEGUIR' },
                        { name: 'listItems', title: 'Lista de Puntos', type: 'array', of: [{ type: 'string' }] },
                    ]
                },
            ]
        },
        {
            name: 'process',
            title: 'Pág 5: El Proceso (04)',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                { name: 'sectionNumber', title: 'Número de Sección', type: 'string', initialValue: '04' },
                { name: 'title', title: 'Título', type: 'string', initialValue: 'EL PROCESO VLANC' },
                { name: 'steps', title: 'Pasos del Proceso', type: 'array', of: [{
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Título del Paso', type: 'string' },
                        { name: 'description', title: 'Descripción del Paso', type: 'text' },
                    ]
                }]},
            ]
        },
        {
            name: 'team',
            title: 'Pág 6: El Equipo (05)',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                { name: 'sectionNumber', title: 'Número de Sección', type: 'string', initialValue: '05' },
                { name: 'title', title: 'Título', type: 'string', initialValue: 'CONOCE VLANC' },
                { name: 'purpose', title: 'Propósito', type: 'object', fields: [{ name: 'title', title: 'Título', type: 'string' }, { name: 'description', title: 'Descripción', type: 'text' }] },
                { name: 'history', title: 'Historia', type: 'object', fields: [{ name: 'title', title: 'Título', type: 'string' }, { name: 'description', title: 'Descripción', type: 'text' }] },
                {
                    name: 'members', title: 'Miembros del Equipo', type: 'array', of: [{
                        type: 'object',
                        fields: [
                            { name: 'name', title: 'Nombre', type: 'string' },
                            { name: 'role', title: 'Cargo', type: 'string' },
                            { name: 'img', title: 'Foto', type: 'image', options: { hotspot: true } },
                        ]
                    }]
                }
            ]
        },
        {
            name: 'testimonials',
            title: 'Pág 7: Testimonios (06)',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                { name: 'sectionNumber', title: 'Número de Sección', type: 'string', initialValue: '06' },
                { name: 'title', title: 'Título', type: 'string', initialValue: 'QUÉ DICEN DE NOSOTROS' },
                {
                    name: 'items', title: 'Testimonios', type: 'array', of: [{
                        type: 'object',
                        fields: [
                            { name: 'name', title: 'Nombre del Cliente', type: 'string' },
                            { name: 'quote', title: 'Cita', type: 'text' },
                            { name: 'img', title: 'Imagen del Proyecto', type: 'image', options: { hotspot: true } },
                            { name: 'link', title: 'Enlace (URL)', type: 'url' },
                        ]
                    }]
                }
            ]
        },
        // --- SCOPE SPLIT INTO 3 SLIDES ---
        {
            name: 'scopeIntro',
            title: 'Pág 8: Qué vamos a hacer (07 - Ámbito)',
            type: 'object',
            options: { collapsible: true },
            fields: [
                { name: 'sectionNumber', title: 'Número de Sección', type: 'string', initialValue: '07' },
                { name: 'title', title: 'Título', type: 'string', initialValue: 'QUÉ VAMOS A HACER POR TI' },
                { name: 'images', title: 'Imágenes (2)', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] },
                {
                    name: 'intervention', title: 'Ámbito de Intervención', type: 'object', fields: [
                        { name: 'title', title: 'Título', type: 'string' },
                        { name: 'location', title: 'Localización', type: 'string' },
                        { name: 'projectType', title: 'Tipo de Proyecto', type: 'string' },
                        { name: 'scope', title: 'Ámbito de Intervención', type: 'string' },
                        { name: 'program', title: 'Programa (Texto completo)', type: 'text' },
                        { name: 'breakdown', title: 'Desglose Puntos', type: 'array', of: [{ type: 'string' }] },
                        { name: 'note', title: 'Nota al pie', type: 'string' }
                    ]
                }
            ]
        },
        {
            name: 'scopePhases1',
            title: 'Pág 9: Trabajos Contemplados (07 - Parte 1)',
            type: 'object',
            options: { collapsible: true },
            fields: [
                { name: 'title', title: 'Título (Trabajos Contemplados)', type: 'string' },
                { 
                    name: 'videoFile', 
                    title: 'Video Explicativo (Archivo)', 
                    description: 'Sube el archivo de video para el popup.', 
                    type: 'file', 
                    options: { accept: 'video/*' } 
                },
                { 
                    name: 'videoUrl', 
                    title: 'Video Explicativo (URL Alternativa)', 
                    description: 'Opcional: Enlace externo.', 
                    type: 'url' 
                },
                { name: 'phases', title: 'Fases (Anteproyecto / Interiorismo)', type: 'array', of: [{
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Título Principal', type: 'string' },
                        { name: 'subPhases', title: 'Sub-fases', type: 'array', of: [{
                            type: 'object',
                            fields: [
                                { name: 'number', title: 'Número (1.1)', type: 'string' },
                                { name: 'title', title: 'Título', type: 'string' },
                                { name: 'description', title: 'Descripción', type: 'text' }
                            ]
                        }]}
                    ]
                }]}
            ]
        },
        {
            name: 'scopePhases2',
            title: 'Pág 10: Trabajos Contemplados (07 - Parte 2)',
            type: 'object',
            options: { collapsible: true },
            fields: [
                { name: 'phases', title: 'Fases (Contratación / Doc / Obra)', type: 'array', of: [{
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Título Principal', type: 'string' },
                        { name: 'subPhases', title: 'Sub-fases', type: 'array', of: [{
                            type: 'object',
                            fields: [
                                { name: 'number', title: 'Número (3.1)', type: 'string' },
                                { name: 'title', title: 'Título', type: 'string' },
                                { name: 'description', title: 'Descripción', type: 'text' },
                                { name: 'note', title: 'Nota (opcional)', type: 'string' }
                            ]
                        }]}
                    ]
                }]}
            ]
        },
        // --- INVESTMENT & PAYMENT SPLIT ---
        {
            name: 'investment',
            title: 'Pág 11: La Inversión (08 - Tabla)',
            type: 'object',
            options: { collapsible: true },
            fields: [
                { name: 'sectionNumber', title: 'Número de Sección', type: 'string', initialValue: '08' },
                { name: 'title', title: 'Título', type: 'string', initialValue: 'LA INVERSIÓN' },
                { name: 'introduction', title: 'Introducción', type: 'text' },
                { name: 'subHeader', title: 'Subtítulo (Tú decides...)', type: 'string' },
                { name: 'plansDescription', title: 'Descripción de Planes (Texto Izq)', type: 'array', of: [{
                    type: 'object', 
                    fields: [
                        {name: 'name', type: 'string'}, 
                        {name: 'desc', type: 'text'} 
                    ] 
                }]},
                { name: 'plans', title: 'Planes (Columnas de la tabla)', type: 'array', of: [{
                     type: 'object',
                     fields: [
                         { name: 'name', title: 'Nombre', type: 'string' },
                         { name: 'price', title: 'Precio', type: 'string' },
                         { name: 'features', title: 'Checks (Debe haber 8 true/false)', type: 'array', of: [{ type: 'boolean' }] }
                     ]
                }]},
                { name: 'featureLabels', title: 'Etiquetas de filas (Características)', type: 'array', of: [{type: 'string'}] }
            ]
        },
        {
            name: 'specialOffers',
            title: 'Pág 12: Ofertas Especiales',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                {
                    name: 'conditionalOffer', title: 'Oferta Condicional', type: 'object', fields: [
                        { name: 'title', title: 'Título', type: 'string' },
                        { name: 'description', title: 'Descripción', type: 'text' },
                        {
                            name: 'discountedPlans', title: 'Planes con Descuento', type: 'array', of: [{
                                type: 'object',
                                fields: [
                                    { name: 'name', title: 'Nombre del Plan', type: 'string' },
                                    { name: 'originalPrice', title: 'Precio Original', type: 'string' },
                                    { name: 'discountedPrice', title: 'Precio con Descuento', type: 'string' },
                                ]
                            }]
                        }
                    ]
                },
                {
                    name: 'launchOffer', title: 'Oferta de Lanzamiento', type: 'object', fields: [
                        { name: 'title', title: 'Título', type: 'string' },
                        { name: 'description', title: 'Descripción', type: 'text' },
                        { name: 'premiumServiceName', title: 'Nombre del Servicio Premium', type: 'string' },
                        { name: 'premiumServiceValue', title: 'Valor del Servicio', type: 'string' },
                    ]
                },
                { name: 'callToAction', title: 'Llamada a la Acción (Imagen)', type: 'object', fields: [{ name: 'text', title: 'Texto sobre la imagen', type: 'string' }, { name: 'image', title: 'Imagen', type: 'image', options: { hotspot: true } }] },
            ]
        },
        {
            name: 'payment',
            title: 'Pág 13: Formas de Pago (08 - Cont.)',
            type: 'object',
            options: { collapsible: true },
            fields: [
                { name: 'sectionNumber', title: 'Número de Sección', type: 'string', initialValue: '08' },
                { name: 'title', title: 'Título', type: 'string', initialValue: 'LA INVERSIÓN' },
                {
                    name: 'paymentMethods', title: 'Métodos de Pago', type: 'object', fields: [
                        { name: 'title', title: 'Título', type: 'string' },
                        { name: 'plans', title: 'Planes', type: 'array', of: [{
                            type: 'object',
                            fields: [
                                { name: 'title', title: 'Título del Plan', type: 'string' },
                                { name: 'payments', title: 'Pasos del Pago', type: 'array', of: [{
                                    type: 'object',
                                    fields: [
                                        { name: 'percent', title: 'Porcentaje', type: 'string' },
                                        { name: 'description', title: 'Descripción', type: 'string' },
                                    ]
                                }]}
                            ]
                        }]}
                    ]
                },
                {
                    name: 'finePrint', title: 'Letra Pequeña', type: 'object', fields: [
                        { name: 'title', title: 'Título', type: 'string' },
                        { name: 'points', title: 'Puntos', type: 'array', of: [{ type: 'string' }] },
                        { name: 'invoiceInfo', title: 'Info Facturas', type: 'string' }
                    ]
                }
            ]
        },
        {
            name: 'divider',
            title: 'Pág 14: Separador (¿Quieres vivir...?)',
             type: 'object',
             options: { collapsible: true, collapsed: true },
             fields: [
                 { name: 'image', title: 'Imagen', type: 'image', options: { hotspot: true } },
                 { name: 'text', title: 'Texto', type: 'string' }
             ]
        },
        {
            name: 'guarantees',
            title: 'Pág 15: Garantías',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                { name: 'title', title: 'Título de la Sección', type: 'string' },
                { name: 'items', title: 'Lista de Garantías', type: 'array', of: [{
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Título de la Garantía', type: 'string' },
                        { name: 'description', title: 'Descripción', type: 'text' },
                        { name: 'note', title: 'Nota al pie (opcional)', type: 'string' }
                    ]
                }]}
            ]
        },
        {
            name: 'premiumServices',
            title: 'Pág 16: Servicios Premium',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                { name: 'title', title: 'Título de la Sección', type: 'string' },
                { name: 'services', title: 'Lista de Servicios', type: 'array', of: [{
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Título del Servicio', type: 'string' },
                        { name: 'subtitle', title: 'Subtítulo', type: 'string' },
                        { name: 'price', title: 'Precio', type: 'string' },
                        { name: 'description', title: 'Descripción (Párrafos)', type: 'array', of: [{ type: 'text' }] },
                        { name: 'note', title: 'Nota (opcional)', type: 'string' }
                    ]
                }]},
                { name: 'notes', title: 'Notas al pie globales', type: 'array', of: [{ type: 'string' }] }
            ]
        },
        {
            name: 'contact',
            title: 'Pág 17: Contacto',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                { name: 'image', title: 'Imagen Final', type: 'image', options: { hotspot: true } },
                { name: 'callToAction', title: 'Llamada a la Acción', type: 'string' },
                { name: 'location', title: 'Localización', type: 'object', fields: [{ name: 'title', title: 'Título', type: 'string' }, { name: 'address', title: 'Dirección', type: 'string' }, { name: 'email', title: 'Email', type: 'string' }] },
                { name: 'phone', title: 'Teléfono', type: 'object', fields: [{ name: 'title', title: 'Título', type: 'string' }, { name: 'numbers', title: 'Números', type: 'array', of: [{ type: 'string' }] }] },
                { name: 'web', title: 'Página Web', type: 'object', fields: [{ name: 'title', title: 'Título', type: 'string' }, { name: 'url', title: 'URL', type: 'url' }, { name: 'displayText', title: 'Texto a mostrar', type: 'string' }] },
            ]
        }
    ]
}
