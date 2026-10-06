/**
 * Borde inferior real del logo de la esquina superior izquierda, en coordenadas
 * de cliente (con el zoom de #app-container ya aplicado).
 *
 * El logo usa object-contain, así que si la imagen no es cuadrada no llena su
 * caja y el borde visible queda por encima del borde del elemento. Por eso se
 * recalcula en lugar de usar `rect.bottom` a secas.
 *
 * `from` debe ser un elemento de la diapositiva que pregunta. El logo no vive
 * dentro de la diapositiva: en pantalla es hermano suyo dentro de #app-container,
 * y en modo impresión hay un logo por página. Subiendo desde quien pregunta nos
 * quedamos con el de SU página y no con el de la primera, que es lo que pasaba
 * al buscarlo directamente en todo el documento.
 */
export const getLogoBottom = (from?: Element | null): number | null => {
    let el: Element | null = null;
    for (let node = from?.parentElement ?? null; node && !el; node = node.parentElement) {
        el = node.querySelector('[data-vlanc-logo]');
    }
    if (!el) el = document.querySelector('[data-vlanc-logo]');
    if (!el) return null;

    const rect = el.getBoundingClientRect();
    const img = el.querySelector('img');
    if (img && img.naturalWidth > 0 && img.naturalHeight > 0) {
        const scale = Math.min(rect.width / img.naturalWidth, rect.height / img.naturalHeight);
        return rect.top + (rect.height + img.naturalHeight * scale) / 2;
    }
    return rect.bottom;
};
