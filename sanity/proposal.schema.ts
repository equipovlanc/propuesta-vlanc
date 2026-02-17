
import { defineType, defineField } from 'sanity'

const overlayField = defineField({
    name: 'overlayOpacity',
    title: 'Opacidad Filtro (%)',
    type: 'number',
    description: 'Opacidad del filtro color #8f4933. 0 para transparente, 100 para sólido. Por defecto 15.',
    initialValue: 15,
    validation: (Rule) => Rule.min(0).max(100)
});

export default defineType({
    name: 'proposal',
    title: 'Propuesta',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título Interno',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'logos',
            title: 'Logotipos del Estudio',
            type: 'object',
            fields: [
                defineField({ name: 'smallLogo', title: 'Logo Pequeño (Esquina Superior Izq)', type: 'image' }),
                defineField({ name: 'mainLogo', title: 'Logo Portada (Esquina Inferior Der)', type: 'image' }),
                defineField({ name: 'finalLogo', title: 'Logo Cierre (Final de Propuesta)', type: 'image' }),
            ]
        }),
        defineField({
            name: 'header',
            title: 'Cabecera',
            type: 'object',
            fields: [
                defineField({ name: 'projectCode', type: 'string' }),
                defineField({ name: 'title', type: 'string' }),
                defineField({ name: 'clientName', type: 'string' }),
                defineField({ name: 'location', type: 'string' }),
            ]
        }),
        defineField({
            name: 'hero',
            title: 'Portada',
            type: 'object',
            fields: [
                defineField({ name: 'clientName', type: 'string' }),
                defineField({ name: 'line1', type: 'string' }),
                defineField({ name: 'line2', type: 'string' }),
            ]
        }),
        defineField({
            name: 'index',
            title: 'Índice',
            type: 'object',
            fields: [
                defineField({ name: 'title', type: 'string' }),
                defineField({ 
                    name: 'image', 
                    title: 'Imagen Decorativa', 
                    type: 'image',
                    fields: [overlayField]
                }),
                defineField({
                    name: 'items', type: 'array', of: [{
                        type: 'object',
                        fields: [
                            defineField({ name: 'title', type: 'string' }),
                            defineField({ name: 'id', type: 'string' }),
                        ]
                    }]
                })
            ]
        }),
        defineField({
            name: 'situation',
            title: 'La Situación',
            type: 'object',
            fields: [
                defineField({ name: 'title', type: 'string' }),
                defineField({ name: 'paragraphs', type: 'array', of: [{ type: 'text' }] }),
                defineField({ 
                    name: 'image', 
                    type: 'image',
                    fields: [overlayField]
                }),
            ]
        }),
        defineField({
            name: 'mission',
            title: 'Misión y Objetivos',
            type: 'object',
            fields: [
                defineField({ name: 'video', title: 'Video Misión (Opcional)', type: 'file' }),
                defineField({ 
                    name: 'image', 
                    title: 'Imagen Misión (Fallback)', 
                    type: 'image',
                    fields: [overlayField]
                }),
                defineField({
                    name: 'mission', type: 'object', fields: [
                        defineField({ name: 'title', type: 'string' }),
                        defineField({ name: 'subtitle', type: 'string' }),
                        defineField({ name: 'description', type: 'text' }),
                    ]
                }),
                defineField({
                    name: 'achievements', type: 'object', fields: [
                        defineField({ name: 'title', type: 'string' }),
                        defineField({ name: 'listItems', type: 'array', of: [{ type: 'string' }] }),
                    ]
                }),
            ]
        }),
        defineField({
            name: 'process',
            title: 'El Proceso',
            type: 'object',
            fields: [
                defineField({ name: 'title', type: 'string' }),
                defineField({ name: 'badge', title: 'Texto Garantía/Badge (Paso 3)', type: 'string' }),
                defineField({ name: 'steps', type: 'array', of: [{
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', type: 'string' }),
                        defineField({ name: 'description', type: 'text' }),
                    ]
                }]}),
            ]
        }),
        defineField({
            name: 'team',
            title: 'Equipo',
            type: 'object',
            fields: [
                defineField({ name: 'title', type: 'string' }),
                defineField({ name: 'purpose', type: 'object', fields: [{name: 'title', type: 'string'}, {name: 'description', type: 'text'}]}),
                defineField({ name: 'history', type: 'object', fields: [{name: 'title', type: 'string'}, {name: 'description', type: 'text'}]}),
                defineField({ name: 'members', type: 'array', of: [{
                    type: 'object',
                    fields: [
                        defineField({ name: 'name', type: 'string' }),
                        defineField({ name: 'role', type: 'string' }),
                        defineField({ 
                            name: 'image', 
                            type: 'image',
                            fields: [overlayField]
                        })
                    ]
                }]})
            ]
        }),
        defineField({
            name: 'testimonials',
            title: 'Testimonios',
            type: 'object',
            fields: [
                defineField({ name: 'title', type: 'string' }),
                defineField({ name: 'items', type: 'array', of: [{
                    type: 'object',
                    fields: [
                        defineField({ name: 'name', type: 'string' }),
                        defineField({ name: 'quote', type: 'text' }),
                        defineField({ 
                            name: 'img', 
                            title: 'Imagen', 
                            type: 'image',
                            fields: [overlayField]
                        }),
                        defineField({ name: 'url', title: 'URL del Proyecto', type: 'url' })
                    ]
                }]})
            ]
        }),
        defineField({
            name: 'scopeIntro',
            title: 'Ámbito de Intervención',
            type: 'object',
            fields: [
                defineField({ name: 'title', type: 'string' }),
                defineField({ name: 'video', title: 'Video Ámbito (Opcional)', type: 'file' }),
                defineField({ 
                    name: 'image', 
                    title: 'Imagen Ámbito (Fallback)', 
                    type: 'image',
                    fields: [overlayField]
                }),
                defineField({
                    name: 'intervention', type: 'object', fields: [
                        defineField({ name: 'title', type: 'string' }),
                        defineField({ name: 'location', type: 'string' }),
                        defineField({ name: 'projectType', type: 'string' }),
                        defineField({ name: 'scope', type: 'string' }),
                        defineField({ name: 'program', type: 'text' }),
                        defineField({ name: 'breakdown', type: 'array', of: [{ type: 'string' }] }),
                        defineField({ name: 'note', type: 'string' })
                    ]
                })
            ]
        }),
        defineField({
            name: 'scopePhases1',
            title: 'Trabajos Contemplados (Fases 1-2)',
            type: 'object',
            fields: [
                defineField({ name: 'phases', type: 'array', of: [{
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', type: 'string' }),
                        defineField({ 
                            name: 'image', 
                            type: 'image',
                            fields: [overlayField]
                        }),
                        defineField({ name: 'video', title: 'Archivo Video (Si aplica)', type: 'file' }),
                        defineField({ name: 'videoButtonText', title: 'Texto Botón Video', type: 'string' }),
                        defineField({ name: 'guaranteeText', title: 'Texto Botón Garantía (Si aplica)', type: 'string' }),
                        defineField({ name: 'subPhases', type: 'array', of: [{
                            type: 'object',
                            fields: [
                                defineField({ name: 'number', type: 'string' }),
                                defineField({ name: 'title', type: 'string' }),
                                defineField({ name: 'description', type: 'text' })
                            ]
                        }]})
                    ]
                }]})
            ]
        }),
        defineField({
            name: 'scopePhases2',
            title: 'Trabajos Contemplados (Fases 3-5)',
            type: 'object',
            fields: [
                defineField({ name: 'phases', type: 'array', of: [{
                    type: 'object',
                    fields: [
                         defineField({ name: 'title', type: 'string' }),
                         defineField({ 
                            name: 'image', 
                            type: 'image',
                            fields: [overlayField]
                         }),
                         defineField({ name: 'video', title: 'Archivo Video', type: 'file' }),
                         defineField({ name: 'videoButtonText', title: 'Texto Botón Video', type: 'string' }),
                         defineField({ name: 'guaranteeText', title: 'Texto Botón Garantía', type: 'string' }),
                         defineField({ name: 'subPhases', type: 'array', of: [{
                            type: 'object',
                            fields: [
                                defineField({ name: 'number', type: 'string' }),
                                defineField({ name: 'title', type: 'string' }),
                                defineField({ name: 'description', type: 'text' })
                            ]
                        }]})
                    ]
                }]})
            ]
        }),
        defineField({
            name: 'investment',
            title: 'Inversión',
            type: 'object',
            fields: [
                defineField({ name: 'title', type: 'string' }),
                defineField({ name: 'introduction', title: 'Introducción Parte 1', type: 'text' }),
                defineField({ name: 'highlightPhrase', title: 'Frase Destacada (Negrita/Negro)', type: 'text' }),
                defineField({ name: 'introduction2', title: 'Introducción Parte 2', type: 'text' }),
                defineField({ name: 'locationDate', title: 'Lugar y Fecha (Pie de tabla)', type: 'string' }),
                defineField({ name: 'plansDescription', type: 'array', of: [{
                    type: 'object', fields: [ {name: 'name', type: 'string'}, {name: 'desc', type: 'text'} ] 
                }]}),
                defineField({ name: 'tableHeaders', title: 'Nombres de Planes (Cabecera)', type: 'array', of: [{type: 'string'}] }),
                defineField({ name: 'tableRows', title: 'Filas de la Tabla', type: 'array', of: [{
                    type: 'object',
                    fields: [
                         defineField({ name: 'label', type: 'string' }),
                         defineField({ name: 'isPremiumSeparator', title: '¿Es separador Servicios Premium?', type: 'boolean' }),
                         defineField({ name: 'highlightColor', title: 'Color de fondo especial (Opcional)', type: 'string', options: {list: ['none', 'light', 'medium', 'dark']} }),
                         defineField({ name: 'checks', type: 'array', of: [{type: 'boolean'}] })
                    ]
                }]}),
                defineField({ name: 'prices', title: 'Precios (Pie de tabla)', type: 'array', of: [{type: 'string'}] })
            ]
        }),
        defineField({
            name: 'specialOffers',
            title: 'Ofertas Especiales',
            type: 'object',
            fields: [
                defineField({ name: 'title', title: 'Título Sección', type: 'string' }),
                defineField({ name: 'offerFooterText', title: 'Texto Pie de Oferta (Debajo Botón)', type: 'text' }),
                defineField({ name: 'conditionalOffer', type: 'object', fields: [
                    { name: 'title', type: 'string' },
                    { name: 'description', type: 'text' },
                    { name: 'discountedPlans', type: 'array', of: [{type: 'object', fields: [{name: 'name', type: 'string'}, {name: 'originalPrice', type: 'string'}, {name: 'discountedPrice', type: 'string'}]}] }
                ]}),
                defineField({ name: 'launchOffer', type: 'object', fields: [
                    { name: 'title', type: 'string' },
                    { name: 'description', type: 'text' },
                    { name: 'premiumServiceName', type: 'string' },
                    { name: 'premiumServiceValue', type: 'string' }
                ]}),
                defineField({ name: 'callToAction', type: 'object', fields: [
                    {name: 'text', type: 'string'}, 
                    defineField({ 
                        name: 'image', 
                        type: 'image',
                        fields: [overlayField]
                    })
                ]})
            ]
        }),
        defineField({
            name: 'payment',
            title: 'Formas de Pago',
            type: 'object',
            fields: [
                defineField({ name: 'title', type: 'string' }),
                defineField({ name: 'paymentMethods', type: 'object', fields: [
                    { name: 'title', type: 'string' },
                    { name: 'plans', type: 'array', of: [{type: 'object', fields: [{name: 'title', type: 'string'}, {name: 'payments', type: 'array', of: [{type: 'object', fields: [{name: 'percent', type: 'string'}, {name: 'description', type: 'string'}]}]}]}] }
                ]}),
                defineField({ name: 'finePrint', type: 'object', fields: [
                    { name: 'title', type: 'string' },
                    { name: 'points', type: 'array', of: [{ type: 'string' }] },
                    { name: 'invoiceInfo', type: 'string' }
                ]})
            ]
        }),
        defineField({
            name: 'guarantees',
            title: 'Garantías',
            type: 'object',
            fields: [
                defineField({ name: 'title', type: 'string' }),
                defineField({ name: 'items', type: 'array', of: [{
                    type: 'object',
                    fields: [
                        defineField({ name: 'icon', title: 'Icono SVG', type: 'image' }),
                        defineField({ 
                            name: 'badgeContent', 
                            title: 'Contenido Badge (Rectángulo Negro)', 
                            type: 'text',
                            description: 'Texto dentro del recuadro negro. Usa tags HTML como <strong>...</strong> para negritas.'
                        }),
                        defineField({ name: 'title', type: 'string' }),
                        defineField({ name: 'description', type: 'text' }),
                        defineField({ name: 'note', type: 'string' })
                    ]
                }]})
            ]
        }),
        defineField({
            name: 'premiumServices',
            title: 'Servicios Premium',
            type: 'object',
            fields: [
                defineField({ name: 'services', type: 'array', of: [{
                    type: 'object',
                    fields: [
                        defineField({ name: 'subtitle', title: 'Subtítulo 2 (Nombre Servicio)', type: 'string' }),
                        defineField({ name: 'title', title: 'Subtítulo 3 (Bajada)', type: 'string' }),
                        defineField({ 
                            name: 'description', 
                            title: 'Bloques de Descripción',
                            type: 'array', 
                            of: [{
                                type: 'object',
                                title: 'Bloque de Texto',
                                fields: [
                                    defineField({ 
                                        name: 'text', 
                                        title: 'Texto', 
                                        type: 'text', 
                                        rows: 3 
                                    }),
                                    defineField({ 
                                        name: 'style', 
                                        title: 'Estilo de Texto', 
                                        type: 'string',
                                        options: {
                                            list: [
                                                { title: 'Normal (Cuerpo)', value: 'normal' },
                                                { title: 'Título (Estilo Bajada)', value: 'title' }
                                            ],
                                            layout: 'radio'
                                        },
                                        initialValue: 'normal'
                                    }),
                                    defineField({ 
                                        name: 'isNumbered', 
                                        title: '¿Es un punto numerado?', 
                                        type: 'boolean', 
                                        initialValue: false 
                                    }),
                                    defineField({ 
                                        name: 'number', 
                                        title: 'Número (Ej: 01)', 
                                        type: 'string', 
                                        hidden: ({parent}) => !parent?.isNumbered 
                                    }),
                                    defineField({ 
                                        name: 'hasSeparator', 
                                        title: '¿Añadir línea separadora debajo?', 
                                        type: 'boolean', 
                                        initialValue: false 
                                    })
                                ],
                                preview: {
                                    select: {
                                        title: 'text',
                                        style: 'style',
                                        num: 'number',
                                        sep: 'hasSeparator'
                                    },
                                    prepare({title, style, num, sep}) {
                                        const type = style === 'title' ? '[TIT]' : '[TXT]';
                                        const number = num ? `(#${num})` : '';
                                        const line = sep ? '___' : '';
                                        return {
                                            title: title,
                                            subtitle: `${type} ${number} ${line}`
                                        }
                                    }
                                }
                            }] 
                        }),
                        defineField({ name: 'note', title: 'Nota (Texto con saltos de línea)', type: 'text' }),
                        defineField({ name: 'price', type: 'string' }),
                        defineField({ 
                            name: 'image', 
                            type: 'image',
                            fields: [overlayField]
                        })
                    ]
                }]})
            ]
        }),
        defineField({
            name: 'contact',
            title: 'Contacto',
            type: 'object',
            fields: [
                defineField({ 
                    name: 'image', 
                    title: 'Imagen Izquierda (785x691)', 
                    type: 'image',
                    fields: [overlayField]
                }),
                defineField({ name: 'location', type: 'object', fields: [
                    defineField({ name: 'title', type: 'string' }), { name: 'address', type: 'string' }, { name: 'email', type: 'string' }
                ]}),
                defineField({ name: 'phone', type: 'object', fields: [
                    defineField({ name: 'title', type: 'string' }), 
                    defineField({ 
                        name: 'landline', 
                        title: 'Teléfono Fijo', 
                        type: 'object',
                        fields: [
                            defineField({ name: 'number', type: 'string', title: 'Número' }),
                            defineField({ name: 'icon', type: 'image', title: 'Icono Teléfono' })
                        ]
                    }),
                    defineField({ 
                        name: 'mobile', 
                        title: 'Móvil (WhatsApp)', 
                        type: 'object', 
                        fields: [
                            defineField({ name: 'number', type: 'string', title: 'Número' }),
                            defineField({ name: 'icon', type: 'image', title: 'Icono WhatsApp' })
                        ]
                    })
                ]}),
                defineField({ name: 'web', type: 'object', fields: [
                    defineField({ name: 'title', type: 'string' }), { name: 'url', type: 'url' }, { name: 'displayText', type: 'string' }
                ]}),
                defineField({ name: 'rrss', title: 'Redes Sociales', type: 'array', of: [{
                    type: 'object',
                    fields: [
                        { name: 'name', type: 'string' },
                        { name: 'url', type: 'url' },
                        { name: 'icon', title: 'Icono (SVG/PNG)', type: 'image' }
                    ]
                }]})
            ]
        })
    ]
})
