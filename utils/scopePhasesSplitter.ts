/**
 * Reparte el contenido de una fase de "Trabajos Contemplados" en una o varias
 * diapositivas, y decide de paso cuánto hay que encoger el texto.
 *
 * El orden de preferencia es el que pidió Jose:
 *   1. Que quepa tal cual.
 *   2. Si no cabe, encoger el texto de 1 en 1 px, hasta 2px.
 *   3. Si con -2px sigue sin caber, **volver al tamaño original** y repartir el
 *      contenido en varias páginas.
 *
 * La unidad que se reparte es el apartado completo (su número, su título y su
 * cuerpo). Nunca se parte un cuerpo de texto por la mitad, y como el título va
 * dentro de la misma unidad, siempre viaja con su texto.
 *
 * Se mide sobre el DOM real, en un contenedor oculto que replica los estilos de
 * la columna, porque la altura depende de la tipografía y de los saltos de línea.
 */

export interface ScopePhaseLayout {
    /** Píxeles a restar a los tamaños base de esa fase (0, 1 o 2). */
    fontReduction: number;
    /** Una entrada por página, con los índices de los apartados que le tocan. */
    pages: number[][];
}

// Geometría de la columna de fases, en px del lienzo de diseño.
const COLUMN_WIDTH = 1800 - 1034;   // left-[1034px] right-[120px] sobre 1920
const CANVAS_HEIGHT = 1080;
const BOTTOM_WITH_BUTTONS = 180;    // el bottom del bloque cuando hay botones
const BOTTOM_WITHOUT_BUTTONS = 140;
// Caja del logo: top 20px + alto 78px. Se usa la caja completa y no el borde
// visible de la imagen porque es el caso más restrictivo, y así el reparto no
// depende de qué logo haya subido el cliente.
const LOGO_BOTTOM = 98;
const TOP_GAP = 2;                  // el mismo LOGO_MIN_GAP del componente

// Tamaños base y separaciones, copiados de index.html y de ScopePhases.
const FASE_TITULO_SIZE = 18;
const FASE_SUBTITULO_SIZE = 15;
const CUERPO_SIZE = 14;
const HEADER_MARGIN = 32;    // mb-8 bajo el título de la fase
const ITEM_GAP = 24;         // space-y-6 entre apartados
const SUBTITLE_MARGIN = 4;   // mb-1 entre el subtítulo y su cuerpo

const MAX_FONT_REDUCTION = 2;
// Red de seguridad: si algo se midiera mal, mejor una fase apretada que cien
// diapositivas vacías.
const MAX_PAGES = 8;

const escapeHtml = (text: string): string =>
    text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Reconstruye el HTML que CustomPortableText pintaría para un cuerpo de texto. */
const bodyToHtml = (value: any): string => {
    if (!value) return '';
    if (typeof value === 'string') return `<p style="margin:0">${escapeHtml(value).replace(/\n/g, '<br />')}</p>`;
    if (!Array.isArray(value)) return '';

    return value.map((block: any) => {
        if (typeof block === 'string') return `<p style="margin:0;min-height:1.4em">${escapeHtml(block)}</p>`;

        const children = block?.children ?? [];
        const text = children.map((child: any) => {
            const content = escapeHtml(child?.text ?? '');
            // La negrita es más ancha y cambia dónde parten las líneas.
            return (child?.marks ?? []).includes('strong') ? `<strong>${content}</strong>` : content;
        }).join('');

        // Los bloques vacíos se pintan como un <br>, no como un párrafo.
        if (text.trim() === '') return '<br />';
        return `<p style="margin:0;min-height:1.4em">${text}</p>`;
    }).join('');
};

export const calculateScopePhaseLayout = (phase: any, hasButtons: boolean): ScopePhaseLayout => {
    const subPhases: any[] = phase?.subPhases ?? [];
    const todas = subPhases.map((_, i) => i);

    if (typeof document === 'undefined' || subPhases.length === 0) {
        return { fontReduction: 0, pages: [todas] };
    }

    const bottom = hasButtons ? BOTTOM_WITH_BUTTONS : BOTTOM_WITHOUT_BUTTONS;
    // Si la fase tiene botones, se reserva su hueco en TODAS las páginas aunque
    // sólo se pinten en la última. Sobra sitio en las demás, nunca falta.
    const available = (CANVAS_HEIGHT - bottom) - (LOGO_BOTTOM + TOP_GAP);

    const tester = document.createElement('div');
    tester.style.cssText = [
        `width:${COLUMN_WIDTH}px`,
        'position:absolute',
        'left:-99999px',
        'top:0',
        'visibility:hidden',
        'pointer-events:none',
        "font-family:'Montserrat', sans-serif",
        'text-align:start',
    ].join(';');
    document.body.appendChild(tester);

    /** Alto del título de la fase y de cada apartado, para una reducción dada. */
    const medir = (reduction: number): { header: number; items: number[] } => {
        const tituloSize = FASE_TITULO_SIZE - reduction;
        const subtituloSize = FASE_SUBTITULO_SIZE - reduction;
        const cuerpoSize = CUERPO_SIZE - reduction;

        tester.innerHTML = `
            <div data-m="header" style="font-size:${tituloSize}px;line-height:1.2;font-weight:700">${escapeHtml(phase?.title ?? '')}</div>
            ${subPhases.map((sub: any) => `
                <div data-m="item">
                    <p style="margin:0 0 ${SUBTITLE_MARGIN}px 0;font-size:${subtituloSize}px;line-height:1.4;font-weight:500">${escapeHtml(`${sub?.number ?? ''} ${sub?.title ?? ''}`.trim())}</p>
                    <div style="font-size:${cuerpoSize}px;line-height:1.5;white-space:pre-line">${bodyToHtml(sub?.description)}</div>
                </div>
            `).join('')}
        `;

        const alto = (el: Element | null) => (el ? el.getBoundingClientRect().height : 0);
        return {
            header: alto(tester.querySelector('[data-m="header"]')) + HEADER_MARGIN,
            items: Array.from(tester.querySelectorAll('[data-m="item"]')).map(alto),
        };
    };

    try {
        // 1 y 2: ¿cabe entero, encogiendo lo justo?
        for (let reduction = 0; reduction <= MAX_FONT_REDUCTION; reduction++) {
            const { header, items } = medir(reduction);
            const total = header + items.reduce((a, b) => a + b, 0) + ITEM_GAP * Math.max(0, items.length - 1);
            if (total <= available) return { fontReduction: reduction, pages: [todas] };
        }

        // 3: no cabe ni encogido. Se vuelve al tamaño original y se reparte.
        const { header, items } = medir(0);
        const pages: number[][] = [];
        let actual: number[] = [];
        let alto = header;

        items.forEach((altoItem, i) => {
            const conGap = actual.length === 0 ? altoItem : altoItem + ITEM_GAP;
            // Un apartado solo en su página se queda aunque se pase: partir su
            // cuerpo está descartado, y una página vacía sería peor.
            if (actual.length > 0 && alto + conGap > available) {
                pages.push(actual);
                actual = [i];
                alto = header + altoItem;
            } else {
                actual.push(i);
                alto += conGap;
            }
        });
        if (actual.length > 0) pages.push(actual);

        return { fontReduction: 0, pages: pages.slice(0, MAX_PAGES) };
    } finally {
        document.body.removeChild(tester);
    }
};
