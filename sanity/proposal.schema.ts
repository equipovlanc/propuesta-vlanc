// This file defines the structure of your data in Sanity.
// It's like creating a template for your proposal form.

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
            description: 'La parte final de la URL. Ej: "celia-blanes". Debe ser único. Haz clic en "Generate" para crearlo a partir del título.',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
        },

        // --- SECTIONS ---
        {
            name: 'header',
            title: 'Cabecera del Documento',
            type: 'object',
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
            title: 'Título Principal (Hero)',
            type: 'object',
            fields: [
                { name: 'line1', title: 'Línea 1', type: 'string' },
                { name: 'line2', title: 'Línea 2 (en negrita)', type: 'string' },
                { name: 'line3', title: 'Línea 3', type: 'string' },
            ]
        },
        {
            name: 'index',
            title: 'Índice',
            type: 'object',
            fields: [
                { name: 'title', title: 'Título de la Sección', type: 'string', initialValue: 'ÍNDICE' },
                {
                    name: 'items', title: 'Puntos del Índice', type: 'array', of: [{
                        type: 'object',
                        fields: [
                            { name: 'number', title: 'Número (01, 02...) o dejar vacío', type: 'string' },
                            { name: 'title', title: 'Título del Punto', type: 'string' },
                            { name: 'id', title: 'ID de la Sección (para el enlace)', description: 'Debe coincidir con los IDs de las secciones: situation, mission, process, team, etc.', type: 'string' },
                        ]
                    }]
                }
            ]
        },
        {
            name: 'situation',
            title: 'Sección 01: La Situación',
            type: 'object',
            fields: [
                { name: 'sectionNumber', title: 'Número de Sección', type: 'string', initialValue: '01' },
                { name: 'title', title: 'Título', type: 'string', initialValue: 'LA SITUACIÓN' },
                { name: 'paragraphs', title: 'Párrafos (puedes usar <strong>texto</strong> para negritas)', type: 'array', of: [{ type: 'text', title: 'Párrafo' }] },
                { name: 'image', title: 'Imagen', type: 'image', options: { hotspot: true } },
            ]
        },
        {
            name: 'mission',
            title: 'Sección 02 y 03: Misión y Logros',
            type: 'object',
            fields: [
                { name: 'image', title: 'Imagen Principal', type: 'image', options: { hotspot: true } },
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
            title: 'Sección 04: El Proceso',
            type: 'object',
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
            title: 'Sección 05: El Equipo',
            type: 'object',
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
            title: 'Sección 06: Testimonios',
            type: 'object',
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
                            { name: 'link', title: 'Enlace (URL)', description: 'URL a la que llevará la tarjeta (ej: https://vivevlanc.com/proyectos/...)', type: 'url' },
                        ]
                    }]
                }
            ]
        },
        {
            name: 'scope',
            title: 'Sección 07: Qué vamos a hacer',
            type: 'object',
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
                        { name: 'breakdown', title: 'Desglose', type: 'array', of: [{ type: 'string' }] }
                    ]
                },
                {
                    name: 'contemplatedWork', title: 'Trabajos Contemplados', type: 'object', fields: [
                        { name: 'title', title: 'Título', type: 'string' },
                        { name: 'phases', title: 'Fases', type: 'array', of: [{
                            type: 'object',
                            fields: [
                                { name: 'title', title: 'Título de la Fase', type: 'string' },
                                { name: 'description', title: 'Descripción de la Fase', type: 'text' }
                            ]
                        }]}
                    ]
                }
            ]
        },
        {
            name: 'investment',
            title: 'Sección 08: La Inversión',
            type: 'object',
            fields: [
                { name: 'sectionNumber', title: 'Número de Sección', type: 'string', initialValue: '08' },
                { name: 'title', title: 'Título', type: 'string', initialValue: 'LA INVERSIÓN' },
                { name: 'introduction', title: 'Introducción', type: 'text' },
                { name: 'featureLabels', title: 'Etiquetas de Características (para la tabla)', type: 'array', of: [{ type: 'string' }] },
                {
                    name: 'plans', title: 'Planes de Precios', type: 'array', of: [{
                        type: 'object',
                        fields: [
                            { name: 'name', title: 'Nombre del Plan', type: 'string' },
                            { name: 'price', title: 'Precio (ej: 6.700 €)', type: 'string' },
                            { name: 'features', title: 'Características Incluidas', description: 'Marca las casillas que correspondan a este plan, en el mismo orden que las etiquetas de arriba.', type: 'array', of: [{ type: 'boolean' }] }
                        ]
                    }]
                }
            ]
        },
        {
            name: 'specialOffers',
            title: 'Ofertas Especiales',
            type: 'object',
            fields: [
                { name: 'callToAction', title: 'Llamada a la Acción (Imagen)', type: 'object', fields: [{ name: 'text', title: 'Texto sobre la imagen', type: 'string' }, { name: 'image', title: 'Imagen', type: 'image', options: { hotspot: true } }] },
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
                }

            ]
        },
        {
            name: 'payment',
            title: 'Formas de Pago',
            type: 'object',
            fields: [
                { name: 'sectionNumber', title: 'Número de Sección (coincide con inversión)', type: 'string', initialValue: '08' },
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
                        { name: 'points', title: 'Puntos', type: 'array', of: [{ type: 'string' }] }
                    ]
                }
            ]
        },
        {
            name: 'guarantees',
            title: 'Garantías',
            type: 'object',
            fields: [
                { name: 'title', title: 'Título de la Sección', type: 'string' },
                { name: 'items', title: 'Lista de Garantías', type: 'array', of: [{
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Título de la Garantía', type: 'string' },
                        { name: 'description', title: 'Descripción', type: 'text' }
                    ]
                }]}
            ]
        },
        {
            name: 'premiumServices',
            title: 'Servicios Premium',
            type: 'object',
            fields: [
                { name: 'title', title: 'Título de la Sección', type: 'string' },
                { name: 'services', title: 'Lista de Servicios', type: 'array', of: [{
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Título del Servicio', type: 'string' },
                        { name: 'subtitle', title: 'Subtítulo', type: 'string' },
                        { name: 'price', title: 'Precio', type: 'string' },
                        { name: 'description', title: 'Descripción (puedes usar <strong>texto</strong> para negritas)', type: 'array', of: [{ type: 'text' }] },
                    ]
                }]}
            ]
        },
        {
            name: 'contact',
            title: 'Contacto (Footer)',
            type: 'object',
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
