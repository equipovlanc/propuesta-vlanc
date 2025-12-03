
export const proposalData = {
    header: {
        projectCode: "[CÓDIGO PROYECTO]",
        title: "PROPUESTA DE HONORARIOS",
        clientName: "[NOMBRE CLIENTE]",
        location: "[DIRECCIÓN DEL PROYECTO]",
        company: {
            name: "VLANC",
            tagline: "ARQUITECTURA + INTERIORISMO"
        }
    },
    hero: {
        line1: "TU NUEVO",
        line2: "HOGAR",
        line3: "EMPIEZA HOY"
    },
    index: {
        title: "ÍNDICE",
        items: [
            { number: '01', title: 'LA SITUACIÓN', id: 'situation' },
            { number: '02', title: 'LA MISIÓN', id: 'mission' },
            { number: '03', title: 'QUÉ VAS A CONSEGUIR', id: 'mission' },
            { number: '04', title: 'EL PROCESO VLANC', id: 'process' },
            { number: '05', title: 'CONOCE VLANC', id: 'team' },
            { number: '06', title: 'QUÉ DICEN DE NOSOTROS', id: 'testimonials' },
            { number: '07', title: 'QUÉ VAMOS A HACER POR TI', id: 'scope' },
            { number: '08', title: 'LA INVERSIÓN', id: 'investment' },
            { number: null, title: 'NUESTRAS GARANTÍAS', id: 'guarantees' },
            { number: null, title: 'SERVICIOS PREMIUM', id: 'premium-services' },
        ]
    },
    situation: {
        sectionNumber: "01",
        title: "LA SITUACIÓN",
        paragraphs: [
            "[Descripción de la situación actual del cliente...]",
            "[Detalles sobre la vivienda y necesidades...]",
            "[Motivaciones y expectativas...]",
            "[Razón para elegir el estudio...]"
        ],
        image: "https://picsum.photos/800/1000?grayscale"
    },
    mission: {
        videoUrl: "", 
        videoFile: "", 
        printImage: "https://picsum.photos/1920/1080?grayscale",
        image: "https://picsum.photos/800/1000?grayscale",
        mission: {
            sectionNumber: "02",
            title: "LA MISIÓN",
            subtitle: "[SUBTÍTULO MISIÓN]",
            description: "[Descripción de la misión del proyecto...]"
        },
        achievements: {
            sectionNumber: "03",
            title: "QUÉ VAS A CONSEGUIR",
            subtitle: "",
            description: "",
            listItems: [
                "[Beneficio 1]",
                "[Beneficio 2]",
                "[Beneficio 3]",
                "[Beneficio 4]",
                "[Beneficio 5]"
            ]
        },
    },
    process: {
        sectionNumber: "04",
        title: "EL PROCESO VLANC",
        steps: [
            { title: "FASE 1", description: "[Descripción fase 1...]" },
            { title: "FASE 2", description: "[Descripción fase 2...]" },
            { title: "FASE 3", description: "[Descripción fase 3...]" },
            { title: "FASE 4", description: "[Descripción fase 4...]" },
            { title: "FASE 5", description: "[Descripción fase 5...]" },
            { title: "FASE 6", description: "[Descripción fase 6...]" },
            { title: "FASE 7", description: "[Descripción fase 7...]" },
            { title: "FASE 8", description: "[Descripción fase 8...]" },
        ]
    },
    team: {
        sectionNumber: "05",
        title: "CONOCE VLANC",
        purpose: {
            title: "NUESTRO PROPÓSITO",
            description: "[Descripción del propósito del estudio...]"
        },
        history: {
            title: "NUESTRA HISTORIA",
            description: "[Breve historia del estudio...]"
        },
        members: [
            { name: '[NOMBRE 1]', role: '[CARGO]', img: 'https://picsum.photos/400/500?grayscale' },
            { name: '[NOMBRE 2]', role: '[CARGO]', img: 'https://picsum.photos/400/500?grayscale' },
            { name: '[NOMBRE 3]', role: '[CARGO]', img: 'https://picsum.photos/400/500?grayscale' },
            { name: '[NOMBRE 4]', role: '[CARGO]', img: 'https://picsum.photos/400/500?grayscale' },
        ]
    },
    testimonials: {
        sectionNumber: "06",
        title: "QUÉ DICEN DE NOSOTROS",
        items: [
            { name: "[CLIENTE 1]", quote: "[Testimonio cliente 1...]", img: "https://picsum.photos/600/400?grayscale", link: "#" },
            { name: "[CLIENTE 2]", quote: "[Testimonio cliente 2...]", img: "https://picsum.photos/600/400?grayscale", link: "#" },
            { name: "[CLIENTE 3]", quote: "[Testimonio cliente 3...]", img: "https://picsum.photos/600/400?grayscale", link: "#" },
        ]
    },
    scopeIntro: {
        sectionNumber: "07",
        title: "QUÉ VAMOS A HACER POR TI",
        intervention: {
            title: "ÁMBITO DE INTERVENCIÓN",
            location: "[DIRECCIÓN]",
            projectType: "[TIPO PROYECTO]",
            scope: "[Descripción del ámbito...]",
            program: "[Descripción del programa...]",
            breakdown: [
                "[Estancia 1]",
                "[Estancia 2]",
                "[Estancia 3]",
                "[Estancia 4]",
                "[Estancia 5]"
            ],
            note: "NOTA: [Nota sobre estancias...]"
        },
        images: [
            "https://picsum.photos/600/400?grayscale",
            "https://picsum.photos/600/400?grayscale"
        ]
    },
    scopePhases1: {
        title: "TRABAJOS CONTEMPLADOS",
        videoUrl: "",
        videoFile: "",
        phases: [
            {
                title: "1. FASE EJEMPLO",
                subPhases: [
                    { number: "1.1.", title: "SUBFASE A", description: "[Descripción subfase...]" },
                    { number: "1.2.", title: "SUBFASE B", description: "[Descripción subfase...]" },
                ]
            },
            {
                title: "2. FASE EJEMPLO",
                subPhases: [
                    { number: "2.1.", title: "SUBFASE A", description: "[Descripción subfase...]" },
                ]
            }
        ]
    },
    scopePhases2: {
        sectionNumber: "07",
        title: "QUÉ VAMOS A HACER POR TI",
        phases: [
            {
                title: "3. FASE EJEMPLO",
                subPhases: [
                    { number: "3.1.", title: "SUBFASE A", description: "[Descripción subfase...]" },
                ]
            },
            {
                title: "4. FASE EJEMPLO",
                subPhases: [
                    { number: "4.1.", title: "SUBFASE A", description: "[Descripción subfase...]", note: "Nota opcional" },
                ]
            }
        ]
    },
    investment: {
        sectionNumber: "08",
        title: "LA INVERSIÓN",
        introduction: "[Introducción a la inversión...]",
        subHeader: "> [Subtítulo inversión]",
        plansDescription: [
            { name: "PLAN A_", desc: "[Descripción Plan A]" },
            { name: "PLAN B_", desc: "[Descripción Plan B]" },
            { name: "PLAN C_", desc: "[Descripción Plan C]" },
            { name: "PLAN D_", desc: "[Descripción Plan D]" }
        ],
        plans: [
            { name: 'PLAN A', price: '0.000 €', features: [true, true, false, false, false, false, false, false] },
            { name: 'PLAN B', price: '0.000 €', features: [true, true, true, true, false, false, false, false] },
            { name: 'PLAN C', price: '0.000 €', features: [true, true, true, true, true, false, false, false] },
            { name: 'PLAN D', price: '0.000 €', features: [true, true, true, true, true, true, true, true] },
        ],
        featureLabels: [
            'CARACTERÍSTICA 1',
            'CARACTERÍSTICA 2',
            'CARACTERÍSTICA 3',
            'CARACTERÍSTICA 4',
            'CARACTERÍSTICA 5',
            'CARACTERÍSTICA 6',
            'CARACTERÍSTICA 7',
            'CARACTERÍSTICA 8',
        ]
    },
    specialOffers: {
        conditionalOffer: {
            title: "CONDICIONES ESPECIALES",
            description: "[Descripción oferta condicional...]",
            discountedPlans: [
                { name: "PLAN A", originalPrice: "0.000 € + IVA", discountedPrice: "0.000 € + IVA" }, 
                { name: "PLAN B", originalPrice: "0.000 € + IVA", discountedPrice: "0.000 € + IVA" },
            ]
        },
        launchOffer: {
            title: "OFERTA ESPECIAL LANZAMIENTO",
            description: "[Descripción oferta lanzamiento...]",
            premiumServiceName: "[SERVICIO PREMIUM]",
            premiumServiceValue: "0.000€"
        },
        callToAction: {
            text: "¿QUIERES VIVIR LA<br/>EXPERIENCIA VLANC?",
            image: "https://picsum.photos/800/600?grayscale"
        }
    },
    payment: {
        sectionNumber: "08",
        title: "LA INVERSIÓN",
        paymentMethods: {
            title: "FORMAS DE PAGO",
            plans: [
                { 
                    title: "PLAN A", 
                    payments: [
                        {percent: "50%", description: "[Hito de pago 1]"},
                        {percent: "50%", description: "[Hito de pago 2]"},
                    ]
                },
                { 
                    title: "PLAN B", 
                    payments: [
                        {percent: "30%", description: "[Hito de pago 1]"},
                        {percent: "30%", description: "[Hito de pago 2]"},
                        {percent: "40%", description: "[Hito de pago 3]"},
                    ]
                }
            ]
        },
        finePrint: {
            title: "LA LETRA PEQUEÑA",
            points: [
                "_ [Punto legal 1]",
                "_ [Punto legal 2]",
                "_ [Punto legal 3]"
            ],
            invoiceInfo: "[Información de facturación]"
        }
    },
    dividerSlide: {
        text: "¿NOS DEJAS ACOMPAÑARTE?",
        image: "https://picsum.photos/800/400?grayscale"
    },
    guarantees: {
        title: "NUESTRAS GARANTÍAS",
        items: [
            { 
                title: "GARANTÍA 1", 
                description: "[Descripción garantía 1...]",
                note: "Nota: [Nota garantía 1]"
            },
            {
                title: "GARANTÍA 2",
                description: "[Descripción garantía 2...]",
                note: "Nota: [Nota garantía 2]"
            },
            {
                title: "GARANTÍA 3",
                description: "[Descripción garantía 3...]",
                note: "Nota: [Nota garantía 3]"
            }
        ]
    },
    premiumServices: {
        title: "SERVICIOS PREMIUM",
        services: [
            {
                title: "SERVICIO 1",
                subtitle: "SUBTÍTULO",
                price: "000€",
                description: [
                    "[Descripción servicio 1...]",
                    "&gt; [Punto clave]",
                ],
                note: "Nota: [Nota servicio 1]"
            },
            {
                title: "SERVICIO 2",
                subtitle: "SUBTÍTULO",
                price: "000 €",
                description: [
                    "[Descripción servicio 2...]",
                ],
                note: "Nota: [Nota servicio 2]"
            }
        ],
        notes: [
            "__Precios IVA NO incluido",
        ]
    },
    contact: {
        image: "https://picsum.photos/800/400?grayscale",
        callToAction: "¿QUIERES VIVIR LA EXPERIENCIA VLANC?",
        location: {
            title: "DONDE ESTAMOS",
            address: "[DIRECCIÓN]",
            email: "email@ejemplo.com"
        },
        phone: {
            title: "CONTÁCTANOS",
            numbers: [
                "(+34) 000 00 00 00",
            ]
        },
        web: {
            title: "NUESTRA WEB",
            url: "https://ejemplo.com",
            displayText: "ejemplo.com"
        }
    }
};
