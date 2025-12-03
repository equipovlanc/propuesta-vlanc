import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'proposal',
    title: 'Propuesta',
    type: 'document',
    fields: [
        // --- METADATA ---
        defineField({
            name: 'title',
            title: 'Título Interno de la Propuesta',
            description: 'Ej: "Propuesta para Celia Blanes". Solo para uso interno en el CMS.',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Identificador para la URL',
            description: 'La parte final de la URL. Ej: "celia-blanes".',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),

        // --- SECTIONS ---
        defineField({
            name: 'header',
            title: 'Cabecera del Documento',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                defineField({ name: 'projectCode', title: 'Código de Proyecto', type: 'string' }),
                defineField({ name: 'title', title: 'Título del Documento', type: 'string', initialValue: 'PROPUESTA DE HONORARIOS' }),
                defineField({ name: 'clientName', title: 'Nombre del Cliente', type: 'string' }),
                defineField({ name: 'location', title: 'Localización', type: 'string' }),
                defineField({ 
                    name: 'company', title: 'Datos de la Empresa', type: 'object', fields: [
                        defineField({ name: 'name', title: 'Nombre Empresa', type: 'string', initialValue: 'VLANC' }),
                        defineField({ name: 'tagline', title: 'Slogan Empresa', type: 'string', initialValue: 'ARQUITECTURA + INTERIORISMO' }),
                    ]
                }),
            ]
        }),
        defineField({
            name: 'hero',
            title: 'Pág 1: Portada',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                defineField({ name: 'line1', title: 'Línea 1', type: 'string' }),
                defineField({ name: 'line2', title: 'Línea 2 (en negrita)', type: 'string' }),
                defineField({ name: 'line3', title: 'Línea 3', type: 'string' }),
            ]
        }),
        defineField({
            name: 'index',
            title: 'Pág 2: Índice',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                defineField({ name: 'title', title: 'Título de la Sección', type: 'string', initialValue: 'ÍNDICE' }),
                defineField({
                    name: 'items', title: 'Puntos del Índice', type: 'array', of: [{
                        type: 'object',
                        fields: [
                            defineField({ name: 'number', title: 'Número (01, 02...) o dejar vacío', type: 'string' }),
                            defineField({ name: 'title', title: 'Título del Punto', type: 'string' }),
                            defineField({ name: 'id', title: 'ID de la Sección (para el enlace)', description: 'Debe coincidir con los IDs del frontend', type: 'string' }),
                        ]
                    }]
                }
            ]
        }),
        defineField({
            name: 'situation',
            title: 'Pág 3: La Situación (01)',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                defineField({ name: 'sectionNumber', title: 'Número de Sección', type: 'string', initialValue: '01' }),
                defineField({ name: 'title', title: 'Título', type: 'string', initialValue: 'LA SITUACIÓN' }),
                defineField({ name: 'paragraphs', title: 'Párrafos (texto completo)', type: 'array', of: [{ type: 'text' }] }),
                defineField({ name: 'image', title: 'Imagen', type: 'image', options: { hotspot: true } }),
            ]
        }),
        defineField({
            name: 'mission',
            title: 'Pág 4: Misión y Logros (02/03)',
            type: 'object',
            options: { collapsible: true },
            fields: [
                defineField({ 
                    name: 'videoFile', 
                    title: 'Video Loop (Archivo)', 
                    description: 'Sube el archivo de video mp4 directamente desde tu PC.', 
                    type: 'file', 
                    options: { accept: 'video/*' } 
                }),
                defineField({ 
                    name: 'videoUrl', 
                    title: 'Video Loop (URL Alternativa)', 
                    description: 'Opcional: Enlace externo si no subes archivo.', 
                    type: 'url' 
                }),
                defineField({ name: 'printImage', title: 'Imagen Estática para Impresión', description: 'Esta imagen sustituye al video cuando se imprime el PDF', type: 'image', options: { hotspot: true } }),
                defineField({ name: 'image', title: 'Imagen Principal (Fallback)', description: 'Si no hay video ni imagen de impresión', type: 'image', options: { hotspot: true } }),
                defineField({
                    name: 'mission', title: 'Sub-sección: La Misión', type: 'object', fields: [
                        defineField({ name: 'sectionNumber', title: 'Número', type: 'string', initialValue: '02' }),
                        defineField({ name: 'title', title: 'Título', type: 'string', initialValue: 'LA MISIÓN' }),
                        defineField({ name: 'subtitle', title: 'Subtítulo', type: 'string' }),
                        defineField({ name: 'description', title: 'Descripción', type: 'text' }),
                    ]
                }),
                defineField({
                    name: 'achievements', title: 'Sub-sección: Qué vas a conseguir', type: 'object', fields: [
                        defineField({ name: 'sectionNumber', title: 'Número', type: 'string', initialValue: '03' }),
                        defineField({ name: 'title', title: 'Título', type: 'string', initialValue: 'QUÉ VAS A CONSEGUIR' }),
                        defineField({ name: 'listItems', title: 'Lista de Puntos', type: 'array', of: [{ type: 'string' }] }),
                    ]
                }),
            ]
        }),
        defineField({
            name: 'process',
            title: 'Pág 5: El Proceso (04)',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                defineField({ name: 'sectionNumber', title: 'Número de Sección', type: 'string', initialValue: '04' }),
                defineField({ name: 'title', title: 'Título', type: 'string', initialValue: 'EL PROCESO VLANC' }),
                defineField({ name: 'steps', title: 'Pasos del Proceso', type: 'array', of: [{
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', title: 'Título del Paso', type: 'string' }),
                        defineField({ name: 'description', title: 'Descripción del Paso', type: 'text' }),
                    ]
                }]},
            ]
        }),
        defineField({
            name: 'team',
            title: 'Pág 6: El Equipo (05)',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                defineField({ name: 'sectionNumber', title: 'Número de Sección', type: 'string', initialValue: '05' }),
                defineField({ name: 'title', title: 'Título', type: 'string', initialValue: 'CONOCE VLANC' }),
                defineField({ name: 'purpose', title: 'Propósito', type: 'object', fields: [{ name: 'title', title: 'Título', type: 'string' }, { name: 'description', title: 'Descripción', type: 'text' }] }),
                defineField({ name: 'history', title: 'Historia', type: 'object', fields: [{ name: 'title', title: 'Título', type: 'string' }, { name: 'description', title: 'Descripción', type: 'text' }] }),
                defineField({
                    name: 'members', title: 'Miembros del Equipo', type: 'array', of: [{
                        type: 'object',
                        fields: [
                            defineField({ name: 'name', title: 'Nombre', type: 'string' }),
                            defineField({ name: 'role', title: 'Cargo', type: 'string' }),
                            defineField({ name: 'img', title: 'Foto', type: 'image', options: { hotspot: true } }),
                        ]
                    }]
                }
            ]
        }),
        defineField({
            name: 'testimonials',
            title: 'Pág 7: Testimonios (06)',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                defineField({ name: 'sectionNumber', title: 'Número de Sección', type: 'string', initialValue: '06' }),
                defineField({ name: 'title', title: 'Título', type: 'string', initialValue: 'QUÉ DICEN DE NOSOTROS' }),
                defineField({
                    name: 'items', title: 'Testimonios', type: 'array', of: [{
                        type: 'object',
                        fields: [
                            defineField({ name: 'name', title: 'Nombre del Cliente', type: 'string' }),
                            defineField({ name: 'quote', title: 'Cita', type: 'text' }),
                            defineField({ name: 'img', title: 'Imagen del Proyecto', type: 'image', options: { hotspot: true } }),
                            defineField({ name: 'link', title: 'Enlace (URL)', type: 'url' }),
                        ]
                    }]
                }
            ]
        }),
        defineField({
            name: 'scopeIntro',
            title: 'Pág 8: Qué vamos a hacer (07 - Ámbito)',
            type: 'object',
            options: { collapsible: true },
            fields: [
                defineField({ name: 'sectionNumber', title: 'Número de Sección', type: 'string', initialValue: '07' }),
                defineField({ name: 'title', title: 'Título', type: 'string', initialValue: 'QUÉ VAMOS A HACER POR TI' }),
                defineField({ name: 'images', title: 'Imágenes (2)', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
                defineField({
                    name: 'intervention', title: 'Ámbito de Intervención', type: 'object', fields: [
                        defineField({ name: 'title', title: 'Título', type: 'string' }),
                        defineField({ name: 'location', title: 'Localización', type: 'string' }),
                        defineField({ name: 'projectType', title: 'Tipo de Proyecto', type: 'string' }),
                        defineField({ name: 'scope', title: 'Ámbito de Intervención', type: 'string' }),
                        defineField({ name: 'program', title: 'Programa (Texto completo)', type: 'text' }),
                        defineField({ name: 'breakdown', title: 'Desglose Puntos', type: 'array', of: [{ type: 'string' }] }),
                        defineField({ name: 'note', title: 'Nota al pie', type: 'string' })
                    ]
                })
            ]
        }),
        defineField({
            name: 'scopePhases1',
            title: 'Pág 9: Trabajos Contemplados (07 - Parte 1)',
            type: 'object',
            options: { collapsible: true },
            fields: [
                defineField({ name: 'title', title: 'Título (Trabajos Contemplados)', type: 'string' }),
                defineField({ 
                    name: 'videoFile', 
                    title: 'Video Explicativo (Archivo)', 
                    description: 'Sube el archivo de video para el popup.', 
                    type: 'file', 
                    options: { accept: 'video/*' } 
                }),
                defineField({ 
                    name: 'videoUrl', 
                    title: 'Video Explicativo (URL Alternativa)', 
                    description: 'Opcional: Enlace externo.', 
                    type: 'url' 
                }),
                defineField({ name: 'phases', title: 'Fases (Anteproyecto / Interiorismo)', type: 'array', of: [{
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', title: 'Título Principal', type: 'string' }),
                        defineField({ name: 'subPhases', title: 'Sub-fases', type: 'array', of: [{
                            type: 'object',
                            fields: [
                                defineField({ name: 'number', title: 'Número (1.1)', type: 'string' }),
                                defineField({ name: 'title', title: 'Título', type: 'string' }),
                                defineField({ name: 'description', title: 'Descripción', type: 'text' })
                            ]
                        }]}
                    ]
                }]})
            ]
        }),
        defineField({
            name: 'scopePhases2',
            title: 'Pág 10: Trabajos Contemplados (07 - Parte 2)',
            type: 'object',
            options: { collapsible: true },
            fields: [
                defineField({ name: 'sectionNumber', title: 'Número de Sección', type: 'string', initialValue: '07' }),
                defineField({ name: 'title', title: 'Título de la Sección', type: 'string', initialValue: 'QUÉ VAMOS A HACER POR TI' }),
                defineField({ name: 'phases', title: 'Fases (Contratación / Doc / Obra)', type: 'array', of: [{
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', title: 'Título Principal', type: 'string' }),
                        defineField({ name: 'subPhases', title: 'Sub-fases', type: 'array', of: [{
                            type: 'object',
                            fields: [
                                defineField({ name: 'number', title: 'Número (3.1)', type: 'string' }),
                                defineField({ name: 'title', title: 'Título', type: 'string' }),
                                defineField({ name: 'description', title: 'Descripción', type: 'text' }),
                                defineField({ name: 'note', title: 'Nota (opcional)', type: 'string' })
                            ]
                        }]}
                    ]
                }]})
            ]
        }),
        defineField({
            name: 'investment',
            title: 'Pág 11: La Inversión (08 - Tabla)',
            type: 'object',
            options: { collapsible: true },
            fields: [
                defineField({ name: 'sectionNumber', title: 'Número de Sección', type: 'string', initialValue: '08' }),
                defineField({ name: 'title', title: 'Título', type: 'string', initialValue: 'LA INVERSIÓN' }),
                defineField({ name: 'introduction', title: 'Introducción', type: 'text' }),
                defineField({ name: 'subHeader', title: 'Subtítulo (Tú decides...)', type: 'string' }),
                defineField({ name: 'plansDescription', title: 'Descripción de Planes (Texto Izq)', type: 'array', of: [{
                    type: 'object', 
                    fields: [
                        defineField({name: 'name', type: 'string'}), 
                        defineField({name: 'desc', type: 'text'}) 
                    ] 
                }]}),
                defineField({ name: 'plans', title: 'Planes (Columnas de la tabla)', type: 'array', of: [{
                     type: 'object',
                     fields: [
                         defineField({ name: 'name', title: 'Nombre', type: 'string' }),
                         defineField({ name: 'price', title: 'Precio', type: 'string' }),
                         defineField({ name: 'features', title: 'Checks (Debe haber 8 true/false)', type: 'array', of: [{ type: 'boolean' }] })
                     ]
                }]}),
                defineField({ name: 'featureLabels', title: 'Etiquetas de filas (Características)', type: 'array', of: [{type: 'string'}] })
            ]
        }),
        defineField({
            name: 'specialOffers',
            title: 'Pág 12: Ofertas Especiales',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                defineField({
                    name: 'conditionalOffer', title: 'Oferta Condicional', type: 'object', fields: [
                        defineField({ name: 'title', title: 'Título', type: 'string' }),
                        defineField({ name: 'description', title: 'Descripción', type: 'text' }),
                        defineField({
                            name: 'discountedPlans', title: 'Planes con Descuento', type: 'array', of: [{
                                type: 'object',
                                fields: [
                                    defineField({ name: 'name', title: 'Nombre del Plan', type: 'string' }),
                                    defineField({ name: 'originalPrice', title: 'Precio Original', type: 'string' }),
                                    defineField({ name: 'discountedPrice', title: 'Precio con Descuento', type: 'string' }),
                                ]
                            }]
                        }
                    ]
                }),
                defineField({
                    name: 'launchOffer', title: 'Oferta de Lanzamiento', type: 'object', fields: [
                        defineField({ name: 'title', title: 'Título', type: 'string' }),
                        defineField({ name: 'description', title: 'Descripción', type: 'text' }),
                        defineField({ name: 'premiumServiceName', title: 'Nombre del Servicio Premium', type: 'string' }),
                        defineField({ name: 'premiumServiceValue', title: 'Valor del Servicio', type: 'string' })
                    ]
                }),
                defineField({ name: 'callToAction', title: 'Llamada a la Acción (Imagen)', type: 'object', fields: [{ name: 'text', title: 'Texto sobre la imagen', type: 'string' }, { name: 'image', title: 'Imagen', type: 'image', options: { hotspot: true } }] }),
            ]
        }),
        defineField({
            name: 'payment',
            title: 'Pág 13: Formas de Pago (08 - Cont.)',
            type: 'object',
            options: { collapsible: true },
            fields: [
                defineField({ name: 'sectionNumber', title: 'Número de Sección', type: 'string', initialValue: '08' }),
                defineField({ name: 'title', title: 'Título', type: 'string', initialValue: 'LA INVERSIÓN' }),
                defineField({
                    name: 'paymentMethods', title: 'Métodos de Pago', type: 'object', fields: [
                        defineField({ name: 'title', title: 'Título', type: 'string' }),
                        defineField({ name: 'plans', title: 'Planes', type: 'array', of: [{
                            type: 'object',
                            fields: [
                                defineField({ name: 'title', title: 'Título del Plan', type: 'string' }),
                                defineField({ name: 'payments', title: 'Pasos del Pago', type: 'array', of: [{
                                    type: 'object',
                                    fields: [
                                        defineField({ name: 'percent', title: 'Porcentaje', type: 'string' }),
                                        defineField({ name: 'description', title: 'Descripción', type: 'string' }),
                                    ]
                                }]})
                            ]
                        }]})
                    ]
                }),
                defineField({
                    name: 'finePrint', title: 'Letra Pequeña', type: 'object', fields: [
                        defineField({ name: 'title', title: 'Título', type: 'string' }),
                        defineField({ name: 'points', title: 'Puntos', type: 'array', of: [{ type: 'string' }] }),
                        defineField({ name: 'invoiceInfo', title: 'Info Facturas', type: 'string' })
                    ]
                })
            ]
        }),
        defineField({
            name: 'divider',
            title: 'Pág 14: Separador (¿Quieres vivir...?)',
             type: 'object',
             options: { collapsible: true, collapsed: true },
             fields: [
                 defineField({ name: 'image', title: 'Imagen', type: 'image', options: { hotspot: true } }),
                 defineField({ name: 'text', title: 'Texto', type: 'string' })
             ]
        }),
        defineField({
            name: 'guarantees',
            title: 'Pág 15: Garantías',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                defineField({ name: 'title', title: 'Título de la Sección', type: 'string' }),
                defineField({ name: 'items', title: 'Lista de Garantías', type: 'array', of: [{
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', title: 'Título de la Garantía', type: 'string' }),
                        defineField({ name: 'description', title: 'Descripción', type: 'text' }),
                        defineField({ name: 'note', title: 'Nota al pie (opcional)', type: 'string' })
                    ]
                }]})
            ]
        }),
        defineField({
            name: 'premiumServices',
            title: 'Pág 16: Servicios Premium',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                defineField({ name: 'title', title: 'Título de la Sección', type: 'string' }),
                defineField({ name: 'services', title: 'Lista de Servicios', type: 'array', of: [{
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', title: 'Título del Servicio', type: 'string' }),
                        defineField({ name: 'subtitle', title: 'Subtítulo', type: 'string' }),
                        defineField({ name: 'price', title: 'Precio', type: 'string' }),
                        defineField({ name: 'description', title: 'Descripción (Párrafos)', type: 'array', of: [{ type: 'text' }] }),
                        defineField({ name: 'note', title: 'Nota (opcional)', type: 'string' })
                    ]
                }]}),
                defineField({ name: 'notes', title: 'Notas al pie globales', type: 'array', of: [{ type: 'string' }] })
            ]
        }),
        defineField({
            name: 'contact',
            title: 'Pág 17: Contacto',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                defineField({ name: 'image', title: 'Imagen Final', type: 'image', options: { hotspot: true } }),
                defineField({ name: 'callToAction', title: 'Llamada a la Acción', type: 'string' }),
                defineField({ name: 'location', title: 'Localización', type: 'object', fields: [{ name: 'title', title: 'Título', type: 'string' }, { name: 'address', title: 'Dirección', type: 'string' }, { name: 'email', title: 'Email', type: 'string' }] }),
                defineField({ name: 'phone', title: 'Teléfono', type: 'object', fields: [{ name: 'title', title: 'Título', type: 'string' }, { name: 'numbers', title: 'Números', type: 'array', of: [{ type: 'string' }] }] }),
                defineField({ name: 'web', title: 'Página Web', type: 'object', fields: [{ name: 'title', title: 'Título', type: 'string' }, { name: 'url', title: 'URL', type: 'url' }, { name: 'displayText', title: 'Texto a mostrar', type: 'string' }] }),
            ]
        })
    ]
})