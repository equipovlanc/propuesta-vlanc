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
                defineField({ name: 'finalLogo', title: 'Logo Cierre (Estático)', type: 'image' }),
                defineField({ name: 'finalLogoVideo', title: 'Logo Cierre Animado (Opcional)', type: 'file', options: { accept: 'video/*' } }),
            ]
        }),
        defineField({
            name: 'header',
            title: 'Cabecera',
            type: 'object',
            fields: [
                defineField({ name: 'projectCode', type: 'string' }),
                defineField({ name: 'title', type: 'string' }),
                defineField({ name: 'clientName', title: 'Client Name (esquina superior izquierda)', type: 'string' }),
                defineField({ name: 'location', type: 'string' }),
            ]
        }),
        defineField({
            name: 'hero',
            title: 'Portada',
            type: 'object',
            fields: [
                defineField({ name: 'clientName', title: 'Client Name (Título)', type: 'string' }),
                defineField({ name: 'line1', type: 'string' }),
                defineField({ name: 'line2', type: 'string' }),
                defineField({
                    name: 'bgVideo',
                    title: 'Video de Fondo (Loop)',
                    type: 'file',
                    options: { accept: 'video/*' },
                    description: 'Video sutil para el fondo de la portada. Se reproducirá en bucle y silenciado.'
                }),
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
                defineField({
                    name: 'isActive',
                    title: '¿Está Activa?',
                    type: 'boolean',
                    initialValue: true,
                    description: 'Si se desactiva, esta sección no aparecerá en la web.'
                }),
                defineField({ name: 'title', type: 'string' }),
                defineField({ name: 'paragraphs', type: 'array', of: [{ type: 'block' }] }),
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
                defineField({
                    name: 'isActive',
                    title: '¿Está Activa?',
                    type: 'boolean',
                    initialValue: true,
                    description: 'Si se desactiva, esta sección no aparecerá en la web.'
                }),
                defineField({ name: 'video', title: '1. Video Misión (Mitad Izquierda)', type: 'file' }),
                defineField({
                    name: 'image',
                    title: '2. Imagen Misión (Fallback Mitad Izquierda)',
                    type: 'image',
                    fields: [overlayField]
                }),
                defineField({
                    name: 'mission', title: '3. Bloque Misión (Mitad Derecha - Arriba)', type: 'object', fields: [
                        defineField({ name: 'title', type: 'string' }),
                        defineField({ name: 'subtitle', type: 'string' }),
                        defineField({ name: 'description', type: 'array', of: [{ type: 'block' }] }),
                    ]
                }),
                defineField({
                    name: 'achievements', title: '4. Bloque Logros (Mitad Derecha - Abajo)', type: 'object', fields: [
                        defineField({ name: 'title', type: 'string' }),
                        defineField({ name: 'description', title: 'Descripción', type: 'array', of: [{ type: 'block' }] }),
                    ]
                }),
            ]
        }),
        defineField({
            name: 'process',
            title: 'El Proceso',
            type: 'object',
            fields: [
                defineField({
                    name: 'isActive',
                    title: '¿Está Activo?',
                    type: 'boolean',
                    initialValue: true,
                    description: 'Si se desactiva, la sección del proceso no aparecerá en la web y las páginas se ajustarán.'
                }),
                defineField({ name: 'title', title: '1. Título General', type: 'string' }),
                defineField({
                    name: 'steps', title: '2. Pasos del Proceso (1 al 8)', type: 'array', of: [{
                        type: 'object',
                        fields: [
                            defineField({ name: 'title', type: 'string' }),
                            defineField({ name: 'description', type: 'array', of: [{ type: 'block' }] }),
                        ]
                    }]
                }),
                defineField({ name: 'badge', title: '3. Texto Garantía/Badge (Aparece bajo Paso 3)', type: 'string' }),
                defineField({
                    name: 'step5Phrase',
                    title: '4. Frase Destacada Paso 5',
                    type: 'string',
                    initialValue: 'Tu interés es el nuestro',
                    description: 'Frase que aparece resaltada en el quinto paso del proceso.'
                }),
            ]
        }),
        defineField({
            name: 'team',
            title: 'Equipo',
            type: 'object',
            fields: [
                defineField({
                    name: 'isActive',
                    title: '¿Está Activa?',
                    type: 'boolean',
                    initialValue: true,
                    description: 'Si se desactiva, esta sección no aparecerá en la web.'
                }),
                defineField({ name: 'title', title: '1. Título General', type: 'string' }),
                defineField({ name: 'purpose', title: '2. Propósito (Mitad Izquierda)', type: 'object', fields: [{ name: 'title', type: 'string' }, { name: 'description', type: 'array', of: [{ type: 'block' }] }] }),
                defineField({ name: 'history', title: '3. Historia (Mitad Derecha)', type: 'object', fields: [{ name: 'title', type: 'string' }, { name: 'description', type: 'array', of: [{ type: 'block' }] }] }),
                defineField({
                    name: 'members', title: '4. Miembros (Carrusel Inferior)', type: 'array', of: [{
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
                    }]
                })
            ]
        }),
        defineField({
            name: 'testimonials',
            title: 'Testimonios',
            type: 'object',
            fields: [
                defineField({
                    name: 'isActive',
                    title: '¿Está Activa?',
                    type: 'boolean',
                    initialValue: true,
                    description: 'Si se desactiva, esta sección no aparecerá en la web.'
                }),
                defineField({ name: 'title', type: 'string' }),
                defineField({
                    name: 'items', type: 'array', of: [{
                        type: 'object',
                        fields: [
                            defineField({ name: 'name', type: 'string' }),
                            defineField({ name: 'quote', type: 'array', of: [{ type: 'block' }] }),
                            defineField({
                                name: 'img',
                                title: 'Imagen',
                                type: 'image',
                                fields: [overlayField]
                            }),
                            defineField({ name: 'url', title: 'URL del Proyecto', type: 'url' })
                        ]
                    }]
                })
            ]
        }),
        defineField({
            name: 'scopeIntro',
            title: 'Ámbito de Intervención',
            type: 'object',
            fields: [
                defineField({
                    name: 'isActive',
                    title: '¿Está Activa?',
                    type: 'boolean',
                    initialValue: true,
                    description: 'Si se desactiva, esta sección no aparecerá en la web.'
                }),
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
                        defineField({ name: 'scope', type: 'array', of: [{ type: 'block' }] }),
                        defineField({ name: 'program', type: 'array', of: [{ type: 'block' }] }),
                        defineField({ name: 'breakdown', type: 'array', of: [{ type: 'string' }] }),
                        defineField({ name: 'note', type: 'array', of: [{ type: 'block' }] })
                    ]
                })
            ]
        }),
        defineField({
            name: 'scopePhases',
            title: 'Trabajos Contemplados',
            type: 'object',
            fields: [
                defineField({
                    name: 'isActive',
                    title: '¿Está Activa?',
                    type: 'boolean',
                    initialValue: true,
                    description: 'Si se desactiva, esta sección no aparecerá en la web.'
                }),
                defineField({
                    name: 'phases', type: 'array', of: [{
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
                            defineField({ 
                                name: 'selectedGuarantee', 
                                title: 'Garantía a mostrar (Número)', 
                                type: 'number',
                                description: 'Opcional. Escribe el número de la garantía que quieres que se abra en el popup (1 para la primera, 2 para la segunda, etc.). Si lo dejas vacío, usará la predeterminada.'
                            }),
                            defineField({
                                name: 'additionalGuarantees',
                                title: 'Garantías Adicionales',
                                type: 'array',
                                description: 'Añade más botones de garantía si esta fase tiene más de una.',
                                of: [{
                                    type: 'object',
                                    fields: [
                                        defineField({ name: 'guaranteeText', title: 'Texto Botón Garantía', type: 'string' }),
                                        defineField({ 
                                            name: 'selectedGuarantee', 
                                            title: 'Garantía a mostrar (Número)', 
                                            type: 'number',
                                            description: 'Número de la garantía que quieres que se abra (1 para la primera, etc.).'
                                        })
                                    ],
                                    preview: {
                                        select: {
                                            title: 'guaranteeText',
                                            subtitle: 'selectedGuarantee'
                                        },
                                        prepare(selection) {
                                            const { title, subtitle } = selection;
                                            return {
                                                title: title || 'Sin texto',
                                                subtitle: subtitle ? `Abre la garantía #${subtitle}` : 'Abre garantía por defecto'
                                            }
                                        }
                                    }
                                }]
                            }),
                            defineField({
                                name: 'subPhases', type: 'array', of: [{
                                    type: 'object',
                                    fields: [
                                        defineField({ name: 'number', type: 'string' }),
                                        defineField({ name: 'title', type: 'string' }),
                                        defineField({ name: 'description', type: 'array', of: [{ type: 'block' }] })
                                    ]
                                }]
                            })
                        ]
                    }]
                })
            ]
        }),
        defineField({
            name: 'investment',
            title: 'Inversión',
            type: 'object',
            fields: [
                defineField({
                    name: 'isActive',
                    title: '¿Está Activa?',
                    type: 'boolean',
                    initialValue: true,
                    description: 'Si se desactiva, esta sección no aparecerá en la web.'
                }),
                defineField({ name: 'title', title: '1. Título General', type: 'string' }),
                defineField({ name: 'introduction', title: '2. Introducción Parte 1', type: 'array', of: [{ type: 'block' }] }),
                defineField({ name: 'highlightPhrase', title: '3. Frase Destacada (Centro, Negrita)', type: 'array', of: [{ type: 'block' }] }),
                defineField({ name: 'introduction2', title: '4. Introducción Parte 2', type: 'array', of: [{ type: 'block' }] }),
                defineField({
                    name: 'plansDescription', title: '5. Tarjetas Descriptivas de Planes (Aparecen sobre la tabla)', type: 'array', of: [{
                        type: 'object', fields: [{ name: 'name', type: 'string' }, { name: 'desc', type: 'array', of: [{ type: 'block' }] }]
                    }]
                }),
                defineField({ name: 'tableHeaders', title: '6. Nombres de Planes (Cabecera de Tabla)', type: 'array', of: [{ type: 'string' }] }),
                defineField({
                    name: 'tableRows', title: '7. Filas de Características (Cuerpo de Tabla)', type: 'array', of: [{
                        type: 'object',
                        fields: [
                            defineField({ name: 'label', type: 'string' }),
                            defineField({ name: 'isPremiumSeparator', title: '¿Es separador Servicios Premium?', type: 'boolean' }),
                            defineField({ name: 'highlightColor', title: 'Color de fondo especial (Opcional)', type: 'string', options: { list: ['none', 'light', 'medium', 'dark'] } }),
                            defineField({ name: 'checks', type: 'array', of: [{ type: 'boolean' }] })
                        ]
                    }]
                }),
                defineField({ name: 'prices', title: '8. Precios (Pie de tabla)', type: 'array', of: [{ type: 'string' }] }),
                defineField({ name: 'locationDate', title: '9. Lugar y Fecha (Pie de tabla y Ofertas Especiales)', type: 'string' })
            ]
        }),
        defineField({
            name: 'specialOffers',
            title: 'Ofertas Especiales',
            type: 'object',
            fields: [
                defineField({
                    name: 'isActive',
                    title: '¿Está Activa?',
                    type: 'boolean',
                    initialValue: true,
                    description: 'Si se desactiva, esta sección no aparecerá en la web.'
                }),
                defineField({ name: 'title', title: 'Título Sección', type: 'string' }),
                
                // --- LADO IZQUIERDO ---
                defineField({
                    name: 'conditionalOffer', title: '1. Condiciones Especiales', type: 'object', fields: [
                        defineField({
                            name: 'isActive',
                            title: '¿Mostrar Condición Especial?',
                            type: 'boolean',
                            initialValue: true
                        }),
                        { name: 'title', type: 'string' },
                        { name: 'description', type: 'array', of: [{ type: 'block' }] },
                        { name: 'discountedPlans', type: 'array', of: [{ type: 'object', fields: [{ name: 'name', type: 'string' }, { name: 'originalPrice', type: 'string' }, { name: 'discountedPrice', type: 'string' }] }] }
                    ]
                }),
                defineField({
                    name: 'launchOffer', title: '2. Oferta de Lanzamiento', type: 'object', fields: [
                        defineField({
                            name: 'isActive',
                            title: '¿Mostrar Oferta Lanzamiento?',
                            type: 'boolean',
                            initialValue: true
                        }),
                        { name: 'title', type: 'string' },
                        { name: 'description', type: 'array', of: [{ type: 'block' }] },
                        { name: 'premiumServiceName', type: 'string' },
                        { name: 'premiumServiceValue', type: 'string' }
                    ]
                }),
                defineField({ name: 'offerFooterText', title: 'Texto Pie de Oferta (Debajo Botón de Lanzamiento)', type: 'array', of: [{ type: 'block' }] }),
                
                // --- LADO DERECHO ---
                defineField({
                    name: 'callToAction', title: '3. Llamada a la Acción (Imagen y Texto)', type: 'object', fields: [
                        { name: 'text', type: 'string' },
                        defineField({
                            name: 'image',
                            type: 'image',
                            fields: [overlayField]
                        })
                    ]
                }),
                defineField({ name: 'overlayLogo', title: '4. Logo Gigante sobre Imagen (Paso Final)', type: 'image' }),
                defineField({ name: 'popupVideo', title: 'Video Pop-up (Paso Opcional)', type: 'file' })
            ]
        }),
        defineField({
            name: 'payment',
            title: 'Formas de Pago',
            type: 'object',
            fields: [
                defineField({
                    name: 'isActive',
                    title: '¿Está Activa?',
                    type: 'boolean',
                    initialValue: true,
                    description: 'Si se desactiva, esta sección no aparecerá en la web.'
                }),
                defineField({ name: 'title', title: '1. Título General', type: 'string' }),
                defineField({
                    name: 'paymentMethods', title: '2. Bloques de Métodos de Pago', type: 'object', fields: [
                        { name: 'title', type: 'string' },
                        { name: 'plans', type: 'array', of: [{ type: 'object', fields: [{ name: 'title', type: 'string' }, { name: 'payments', type: 'array', of: [{ type: 'object', fields: [{ name: 'percent', type: 'string' }, { name: 'description', type: 'string' }] }] }] }] }
                    ]
                }),
                defineField({
                    name: 'finePrint', title: '3. Letra Pequeña', type: 'object', fields: [
                        defineField({
                            name: 'isActive',
                            title: '¿Mostrar Letra Pequeña?',
                            type: 'boolean',
                            initialValue: true,
                            description: 'Si se desactiva, no se generarán las páginas de letra pequeña.'
                        }),
                        defineField({ name: 'title', type: 'string' }),
                        defineField({
                            name: 'content',
                            title: 'Contenido (Rich Text)',
                            type: 'array',
                            of: [{ type: 'block' }],
                            description: 'Bloque de texto para la letra pequeña. Permite negritas y saltos de línea.'
                        }),
                        defineField({ name: 'invoiceInfo', type: 'string' }),
                    ]
                }),
                defineField({
                    name: 'image',
                    title: '4. Imagen Lateral (Ocupará hueco Letra Pequeña si hay espacio)',
                    type: 'image',
                    fields: [
                        defineField({
                            name: 'overlayOpacity',
                            title: 'Opacidad Filtro (%)',
                            type: 'number',
                            initialValue: 15,
                            validation: (Rule) => Rule.min(0).max(100)
                        })
                    ]
                })
            ]
        }),
        defineField({
            name: 'dividerSlide',
            title: 'Diapositiva Divisoria (Equipo)',
            type: 'object',
            fields: [
                defineField({
                    name: 'isActive',
                    title: '¿Está Activa?',
                    type: 'boolean',
                    initialValue: true,
                    description: 'Si se desactiva, esta sección no aparecerá en la web.'
                }),
                defineField({
                    name: 'text',
                    title: 'Texto Principal',
                    type: 'string',
                    initialValue: '¿Nos dejas acompañarte?'
                }),
                defineField({
                    name: 'video',
                    title: 'Video Personalizado Expediente',
                    type: 'file',
                    options: { accept: 'video/*' }
                }),
                defineField({
                    name: 'image',
                    title: 'Imagen (Fallback y estado final)',
                    type: 'image',
                    fields: [overlayField]
                }),
            ]
        }),
        defineField({
            name: 'guarantees',
            title: 'Garantías',
            type: 'object',
            fields: [
                defineField({
                    name: 'isActive',
                    title: '¿Está Activa?',
                    type: 'boolean',
                    initialValue: true,
                    description: 'Si se desactiva, esta sección no aparecerá en la web.'
                }),
                defineField({ name: 'title', type: 'string' }),
                defineField({
                    name: 'items', type: 'array', of: [{
                        type: 'object',
                        fields: [
                            defineField({ name: 'icon', title: 'Icono SVG', type: 'image' }),
                            defineField({
                                name: 'badgeContent',
                                title: 'Contenido Badge (Rectángulo Negro)',
                                type: 'array',
                                of: [{ type: 'block' }],
                                description: 'Texto dentro del recuadro negro. Permite resaltar palabras y saltos de línea.'
                            }),
                            defineField({ name: 'title', type: 'string' }),
                            defineField({ name: 'description', type: 'array', of: [{ type: 'block' }] }),
                            defineField({ name: 'note', type: 'string' }),
                            defineField({
                                name: 'isActive',
                                title: '¿Está Activa?',
                                type: 'boolean',
                                initialValue: true,
                                description: 'Si se desactiva, la garantía no aparecerá en la web y los botones asociados se ocultarán automáticamente.'
                            })
                        ]
                    }]
                })
            ]
        }),
        defineField({
            name: 'premiumServices',
            title: 'Servicios Premium',
            type: 'object',
            fields: [
                defineField({
                    name: 'isActive',
                    title: '¿Está Activa?',
                    type: 'boolean',
                    initialValue: true,
                    description: 'Si se desactiva, esta sección no aparecerá en la web.'
                }),
                defineField({
                    name: 'services', type: 'array', of: [{
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
                                            type: 'array',
                                            of: [{ type: 'block' }]
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
                                            hidden: ({ parent }) => !parent?.isNumbered
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
                                            titleBlocks: 'text',
                                            style: 'style',
                                            num: 'number',
                                            sep: 'hasSeparator'
                                        },
                                        prepare({ titleBlocks, style, num, sep }) {
                                            const block = (titleBlocks || []).find((b: any) => b._type === 'block');
                                            const titleText = block 
                                                ? block.children?.filter((child: any) => child._type === 'span').map((span: any) => span.text).join('') 
                                                : 'Sin texto';
                                                
                                            const type = style === 'title' ? '[TIT]' : '[TXT]';
                                            const number = num ? `(#${num})` : '';
                                            const line = sep ? '___' : '';
                                            return {
                                                title: titleText || 'Sin texto',
                                                subtitle: `${type} ${number} ${line}`
                                            }
                                        }
                                    }
                                }]
                            }),
                            defineField({ name: 'note', title: 'Nota (Texto con saltos de línea)', type: 'array', of: [{ type: 'block' }] }),
                            defineField({ name: 'price', type: 'string' }),
                            defineField({
                                name: 'image',
                                type: 'image',
                                fields: [overlayField]
                            }),
                            defineField({
                                name: 'extraNote',
                                title: 'Nota Bajo Imagen',
                                type: 'array',
                                of: [{ type: 'block' }],
                                description: 'Nota que aparecerá bajo la imagen de la derecha.'
                            }),
                            defineField({
                                name: 'showExtraNote',
                                title: '¿Mostrar Nota Bajo Imagen?',
                                type: 'boolean',
                                initialValue: false
                            })
                        ]
                    }]
                })
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
                defineField({
                    name: 'location', type: 'object', fields: [
                        defineField({ name: 'title', type: 'string' }), { name: 'address', type: 'string' }, { name: 'email', type: 'string' }
                    ]
                }),
                defineField({
                    name: 'phone', type: 'object', fields: [
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
                    ]
                }),
                defineField({
                    name: 'web', type: 'object', fields: [
                        defineField({ name: 'title', type: 'string' }), { name: 'url', type: 'url' }, { name: 'displayText', type: 'string' }
                    ]
                }),
                defineField({
                    name: 'rrss', title: 'Redes Sociales', type: 'array', of: [{
                        type: 'object',
                        fields: [
                            { name: 'name', type: 'string' },
                            { name: 'url', type: 'url' },
                            { name: 'icon', title: 'Icono (SVG/PNG)', type: 'image' }
                        ]
                    }]
                })
            ]
        })
    ]
})