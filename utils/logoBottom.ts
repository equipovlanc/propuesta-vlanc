// Ancho del lienzo de diseño. Tanto #app-container (en pantalla) como el contenedor
// de cada página (al imprimir) miden exactamente esto en px CSS, así que sirve de
// sonda para deducir a qué escala se está pintando.
export const CANVAS_WIDTH = 1920;

/**
 * Localiza el logo de la esquina superior izquierda y el contenedor de su página.
 *
 * El logo no vive dentro de la diapositiva: en pantalla es hermano suyo dentro de
 * #app-container, y al imprimir hay un logo por página. Subiendo por los ancestros
 * del elemento que pregunta nos quedamos con el de SU página y, de paso, con el
 * contenedor de 1920px que sirve de referencia.
 */
const findLogo = (from?: Element | null): { el: Element; container: Element } | null => {
    for (let node = from?.parentElement ?? null; node; node = node.parentElement) {
        const el = node.querySelector('[data-vlanc-logo]');
        if (el) return { el, container: node };
    }
    const el = document.querySelector('[data-vlanc-logo]');
    return el && el.parentElement ? { el, container: document.documentElement } : null;
};

/**
 * Distancia en px CSS desde el borde superior del lienzo hasta el borde inferior
 * **visible** del logo.
 *
 * Devuelve un desplazamiento dentro del lienzo, no una coordenada de pantalla, y esa
 * es la clave: las diapositivas entran con una animación de escala (de 3x o de 0.4x
 * hasta 1), así que comparar coordenadas de pantalla entre el logo y algo de dentro
 * de la diapositiva da medidas falsas mientras dura la animación. Trabajando con
 * desplazamientos dentro de cada lienzo, la escala se cancela y la medida vale en
 * cualquier instante.
 *
 * El borde se recalcula porque el logo usa object-contain: si la imagen no es
 * cuadrada no llena su caja y el borde visible queda por encima del del elemento.
 */
export const getLogoBottomOffset = (from?: Element | null): number | null => {
    const found = findLogo(from);
    if (!found) return null;

    const containerRect = found.container.getBoundingClientRect();
    const scale = containerRect.width / CANVAS_WIDTH;
    if (!scale) return null;

    const rect = found.el.getBoundingClientRect();
    let bottom = rect.bottom;

    const img = found.el.querySelector('img');
    if (img && img.naturalWidth > 0 && img.naturalHeight > 0) {
        const fit = Math.min(rect.width / img.naturalWidth, rect.height / img.naturalHeight);
        bottom = rect.top + (rect.height + img.naturalHeight * fit) / 2;
    }

    return (bottom - containerRect.top) / scale;
};
