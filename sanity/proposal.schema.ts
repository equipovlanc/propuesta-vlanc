
import { defineType, defineField } from 'sanity'

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
                defineField({ 
                    name: 'company', type: 'object', fields: [
                        defineField({ name: 'name', type: 'string' }),
                        defineField({ name: 'tagline', type: 'string' }),
                    ]
                }),
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
                defineField({ name: 'image', type: 'image' }),
            ]
        }),
        defineField({
            name: 'mission',
            title: 'Misión y Objetivos',
            type: 'object',
            fields: [
                defineField({ name: 'image', type: 'image' }),
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
                defineField({ name: 'badge', title: 'Texto Garantía/Badge', type: 'string' }),
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
            name: 'scopeIntro',
            title: 'Ámbito de Intervención',
            type: 'object',
            fields: [
                defineField({ name: 'title', type: 'string' }),
                defineField({ name: 'images', type: 'array', of: [{ type: 'image' }] }),
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
            title: 'Trabajos Parte 1',
            type: 'object',
            fields: [
                defineField({ name: 'title', type: 'string' }),
                defineField({ name: 'phases', type: 'array', of: [{
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', type: 'string' }),
                        defineField({ name: 'badge', type: 'string' }),
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
                defineField({ name: 'introduction', type: 'text' }),
                defineField({ name: 'specialConditions', title: 'Condiciones Especiales (Texto)', type: 'text' }),
                defineField({ name: 'plansDescription', type: 'array', of: [{
                    type: 'object', fields: [ {name: 'name', type: 'string'}, {name: 'desc', type: 'text'} ] 
                }]}),
                defineField({ name: 'plans', type: 'array', of: [{
                     type: 'object',
                     fields: [
                         defineField({ name: 'name', type: 'string' }),
                         defineField({ name: 'price', type: 'string' }),
                         defineField({ name: 'features', type: 'array', of: [{ type: 'boolean' }] })
                     ]
                }]}),
                defineField({ name: 'featureLabels', type: 'array', of: [{type: 'string'}] })
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
                        defineField({ name: 'title', type: 'string' }),
                        defineField({ name: 'description', type: 'text' }),
                        defineField({ name: 'note', type: 'string' })
                    ]
                }]})
            ]
        }),
        defineField({
            name: 'contact',
            title: 'Contacto',
            type: 'object',
            fields: [
                defineField({ name: 'image', type: 'image' }),
                defineField({ name: 'callToAction', type: 'string' }),
                defineField({ name: 'location', type: 'object', fields: [
                    defineField({ name: 'title', type: 'string' }), { name: 'address', type: 'string' }, { name: 'email', type: 'string' }
                ]}),
                defineField({ name: 'phone', type: 'object', fields: [
                    defineField({ name: 'title', type: 'string' }), { name: 'numbers', type: 'array', of: [{ type: 'string' }] }
                ]}),
                defineField({ name: 'web', type: 'object', fields: [
                    defineField({ name: 'title', type: 'string' }), { name: 'url', type: 'url' }, { name: 'displayText', type: 'string' }
                ]}),
            ]
        })
    ]
})
