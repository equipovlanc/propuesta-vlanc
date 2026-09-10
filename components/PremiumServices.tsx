
import React, { useState, useEffect, useRef } from 'react';
import AnimatedSection from './AnimatedSection';
import CustomPortableText from './CustomPortableText';

interface DescriptionBlock {
    text: string;
    style: 'normal' | 'title';
    isNumbered?: boolean;
    number?: string;
    hasSeparator?: boolean;
}

interface Service {
    title?: string;
    subtitle?: string;
    price?: string;
    description?: DescriptionBlock[];
    note?: string;
    extraNote?: string;
    showExtraNote?: boolean;
    isActive?: boolean;
}

interface PremiumServicesProps {
    data?: Service;
    image?: { src: string; opacity?: number };
    index?: number;
}

// Medidas en px CSS de la columna izquierda.
const SPACER_FULL = 150;    // alto del espaciador superior sin comprimir (el antiguo pt-[150px])
const SPACER_PROBE_W = 100; // ancho fijo del espaciador, usado como sonda para deducir el zoom
const MIN_GAP = 40;         // hueco mínimo bajo la barra (el mt-[40px] del bloque de contenido)

// Medida de seguridad respecto al logo de la esquina superior izquierda.
const LOGO_MIN_GAP = 50;      // px libres mínimos entre el logo y la primera línea del título
const SUBTITULO2_SIZE = 24;   // tamaños base de las clases que se reducen
const CUERPO_SIZE = 14;
const MAX_FONT_REDUCTION = 3; // tope: deja cuerpo en 11px, aún por encima de la letra pequeña (10px)

// Borde inferior real del logo, en coordenadas de cliente (con el zoom ya aplicado).
// El logo usa object-contain, así que si la imagen no es cuadrada no llena su caja
// y el borde visible queda por encima del borde del elemento.
const getLogoBottom = (): number | null => {
    const el = document.querySelector('[data-vlanc-logo]');
    if (!el) return null;

    const rect = el.getBoundingClientRect();
    const img = el.querySelector('img');
    if (img && img.naturalWidth > 0 && img.naturalHeight > 0) {
        const scale = Math.min(rect.width / img.naturalWidth, rect.height / img.naturalHeight);
        return rect.top + (rect.height + img.naturalHeight * scale) / 2;
    }
    return rect.bottom;
};

const PremiumServices: React.FC<PremiumServicesProps> = ({ data, image, index = 0 }) => {
    const imageSrc = image?.src;
    const imageOpacity = image?.opacity ?? 15;

    const [isSingleLine, setIsSingleLine] = useState(false); // Por defecto intentamos 2 líneas (como original)
    // Cada instancia muestra siempre el mismo servicio, así que esto sólo crece
    // hasta el primer valor que cumple y ahí se queda: no puede oscilar.
    const [fontReduction, setFontReduction] = useState(0);
    const headerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const spacerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    // Reducción desde la que ya hemos pedido un incremento. El ResizeObserver puede
    // dispararse varias veces antes del re-render y, sin esto, cada disparo mediría
    // el mismo DOM y encogería el texto de más.
    const bumpedFromRef = useRef(-1);

    useEffect(() => {
        const checkSpace = () => {
            const spacer = spacerRef.current;
            const header = headerRef.current;
            const content = contentRef.current;
            const title = titleRef.current;
            if (!spacer || !header || !content || !title) return;

            const spacerRect = spacer.getBoundingClientRect();

            // Todo esto vive dentro de #app-container, que aplica CSS zoom, así que
            // getBoundingClientRect devuelve px ya escalados. El ancho fijo del
            // espaciador es una sonda para recuperar el factor y razonar en px CSS.
            const zoom = spacerRect.width / SPACER_PROBE_W;
            if (!zoom) return;

            const titleRect = title.getBoundingClientRect();
            const spacerHeight = spacerRect.height / zoom;
            const titleHeight = titleRect.height / zoom;
            const gap = (content.getBoundingClientRect().top - header.getBoundingClientRect().bottom) / zoom;

            // Alto de UNA línea del título, medido en vivo en lugar de asumirlo.
            const lineHeight = isSingleLine ? titleHeight : titleHeight / 2;

            // El espaciador sólo cede cuando el contenido ya no cabe. Que mida menos
            // de sus 150px es justo la señal de "estamos bajo mínimos".
            const isCramped = spacerHeight < SPACER_FULL - 2;

            if (!isSingleLine) {
                // Dos líneas sólo se sostienen si no hay nada comprimido.
                if (isCramped) setIsSingleLine(true);
            } else {
                // Volver a dos líneas cuesta una línea de alto: exigimos que sobre
                // ese espacio para no comprimir el espaciador otra vez al hacerlo.
                if (!isCramped && gap >= MIN_GAP + lineHeight + 1) setIsSingleLine(false);
            }

            // --- Medida de seguridad respecto al logo ---
            // Al reducir el cuerpo de texto el contenido encoge, el espaciador se
            // descomprime y la cabecera baja, alejándose del logo. Subimos la
            // reducción de 1 en 1 hasta cumplir los 50px o agotar el tope.
            if (fontReduction >= MAX_FONT_REDUCTION || bumpedFromRef.current === fontReduction) return;

            const logoBottom = getLogoBottom();
            if (logoBottom === null) return;

            // El texto no llena su caja: descontamos el medio interlineado para medir
            // desde la parte superior real del texto. Se usa la proporción y no los
            // px de getComputedStyle porque la proporción es inmune al zoom.
            const cs = getComputedStyle(title);
            const fontSize = parseFloat(cs.fontSize);
            const cssLineHeight = parseFloat(cs.lineHeight);
            const halfLeadingRatio = Number.isFinite(fontSize) && Number.isFinite(cssLineHeight) && cssLineHeight > 0
                ? (cssLineHeight - fontSize) / (2 * cssLineHeight)
                : 0;

            const logoGap = (titleRect.top - logoBottom) / zoom + lineHeight * halfLeadingRatio;
            if (logoGap < LOGO_MIN_GAP) {
                bumpedFromRef.current = fontReduction;
                setFontReduction(fontReduction + 1);
            }
        };

        checkSpace();
        window.addEventListener('resize', checkSpace);
        // También observamos cambios en el contenido (si hay imágenes cargando etc)
        const resizeObserver = new ResizeObserver(checkSpace);
        if (contentRef.current) resizeObserver.observe(contentRef.current);
        if (spacerRef.current) resizeObserver.observe(spacerRef.current);

        return () => {
            window.removeEventListener('resize', checkSpace);
            resizeObserver.disconnect();
        };
    }, [isSingleLine, fontReduction, data]);

    const renderDescriptionBlock = (block: DescriptionBlock, key: number, allBlocks: DescriptionBlock[]) => {
        const isTitle = block.style === 'title';
        const nextBlock = allBlocks[key + 1];

        const isConsecutiveNumbered = block.isNumbered && nextBlock?.isNumbered;
        const marginBottomClass = isConsecutiveNumbered ? "h-[5px]" : "h-5";

        return (
            <div key={key} className="w-full">
                {isTitle ? (
                        <CustomPortableText value={block.text} isInline />
                ) : (
                    <div className="flex flex-row items-start gap-4">
                        {block.isNumbered && block.number && (
                            <div className="shrink-0 w-[35px] h-[20px] bg-[#8f4933] text-white flex items-center justify-center rounded-[1px] mt-0.5">
                                <span className="text-[14px] font-bold tracking-widest leading-none">
                                    {block.number}
                                </span>
                            </div>
                        )}
                        <CustomPortableText 
                            value={block.text} 
                            className="cuerpo" 
                        />
                    </div>
                )}
                {block.hasSeparator && <div className="w-full h-[1px] bg-[#8f4933] mt-3 mb-3 opacity-30"></div>}
                {!block.hasSeparator && <div className={marginBottomClass}></div>}
            </div>
        );
    };

    return (
        <section
            className="h-full w-full flex flex-row"
            // Sólo afecta a esta página: subtitulo2 y cuerpo leen estas variables.
            // Quedan fuera subtitulo1 (el título principal) y la letra pequeña,
            // que llevan su tamaño fijo.
            style={{
                '--subtitulo2-size': `${SUBTITULO2_SIZE - fontReduction}px`,
                '--cuerpo-size': `${CUERPO_SIZE - fontReduction}px`,
            } as React.CSSProperties}
        >
            {/* Left Column (J1 & J2) */}
            <div className="w-[888px] h-full flex flex-col justify-between pl-[120px] pr-10 pb-[140px] shrink-0 overflow-y-auto no-scrollbar relative z-10">

                {/* 1. Cabecera Principal (J1) */}
                {/* El pt-[150px] de la columna se ha convertido en un espaciador comprimible:
                    cuando el contenido crece y el hueco bajo la barra caería por debajo de
                    40px, este espaciador cede y el bloque título+barra sube en conjunto
                    (mantienen intacta su relación de 27px). Mientras haya sitio de sobra
                    mide 150px exactos, así que la composición habitual no cambia. */}
                <div className="flex flex-col shrink min-h-0">
                    <div className="h-[150px] w-[100px] shrink min-h-0" aria-hidden="true" ref={spacerRef} />
                    <div className="shrink-0" ref={headerRef}>
                        <AnimatedSection hierarchy={1}>
                            <h2 className="subtitulo1" ref={titleRef}>
                                {!isSingleLine ? (
                                    <>servicios<br />premium.</>
                                ) : (
                                    "servicios premium."
                                )}
                            </h2>
                        </AnimatedSection>
                        <AnimatedSection mode="bar" className="w-[112px] h-[5px] bg-[#8f4933] mt-[27px]" />
                    </div>
                </div>

                {/* 2. Contenido del Servicio (J2) */}
                {/* mt-[40px]: separación mínima garantizada respecto a la barra de la cabecera.
                    Con justify-between sólo consume espacio libre, así que no altera la
                    composición cuando ya hay hueco de sobra; sólo actúa cuando el contenido
                    crece tanto que el hueco caería por debajo de 40px. */}
                {/* Los bloques de descripción de estilo "título" no llevan clase propia
                    y heredan el tamaño: con calc(1em - Npx) les llega la misma reducción
                    sin necesidad de saber de cuánto heredan (con N=0 quedan intactos). */}
                <div
                    className="flex flex-col justify-end max-w-xl mt-[40px]"
                    ref={contentRef}
                    style={{ fontSize: `calc(1em - ${fontReduction}px)` }}
                >
                    <AnimatedSection hierarchy={2}>
                        {/* El h4 en mayúsculas es subtítulo de este h3, así que van más
                            juntos: la mitad del hueco que hay del h4 al texto que le sigue.
                            Ese hueco óptico es 25,6px, luego el objetivo son 12,8px; menos
                            los medios interlineados (2,4px de subtitulo2 + 2,8px de cuerpo)
                            quedan 7,6px de margen. */}
                        <h3 className="subtitulo2 not-italic font-bold mb-[7.6px]">
                            / <CustomPortableText value={data?.subtitle} isInline />
                        </h3>

                        <h4 className="cuerpo uppercase mb-5 text-vlanc-black">
                            <CustomPortableText value={data?.title} isInline />
                        </h4>

                        <div className="w-full">
                            {(data?.description ?? []).map((block, i, arr) => renderDescriptionBlock(block, i, arr))}
                        </div>

                        {data?.note && (
                            <div className="mt-4">
                                <CustomPortableText 
                                    value={data.note} 
                                    className="text-[10px] text-vlanc-secondary/60 italic tracking-wider w-full whitespace-pre-line [&>strong]:font-bold [&>strong]:text-vlanc-secondary" 
                                />
                            </div>
                        )}

                        {data?.price && (
                            <div className="relative h-0 w-full">
                                <div className="absolute top-8 left-0 bg-[#8f4933] text-white px-8 py-3 rounded-[1px] shadow-sm flex items-center justify-center cursor-default whitespace-nowrap">
                                    <span className="boton1 text-white tracking-[0.1em]">{data.price}</span>
                                </div>
                            </div>
                        )}
                    </AnimatedSection>
                </div>
            </div>

            {/* Right Column: Imagen (J0) */}
            {/* CAMBIO: Se centra verticalmente (justify-center) y se mantiene a la derecha (items-end pr-[120px]). Se elimina pt-[150px]. */}
            <div className="flex-grow h-full bg-white flex flex-col justify-center items-end pr-[120px] relative overflow-hidden z-0">
                <div className="relative">
                    <AnimatedSection hierarchy={0}>
                        <div className="w-[827px] h-[709px] relative shrink-0">
                            {imageSrc ? (
                                <div className="w-full h-full relative">
                                    <img src={imageSrc} alt={data?.title} className="w-full h-full object-cover" />
                                    <div
                                        className="absolute inset-0 pointer-events-none transition-colors duration-1000"
                                        style={{ backgroundColor: `rgba(143, 73, 51, ${imageOpacity / 100})` }}
                                    />
                                </div>
                            ) : (
                                <div className="w-full h-full bg-vlanc-black/5 flex items-center justify-center">
                                    <span className="text-[10px] uppercase tracking-widest text-vlanc-black/20">Imagen 827x709</span>
                                </div>
                            )}
                        </div>
                    </AnimatedSection>

                    {/* Nota Bajo Imagen (Extra Note) - Posición Absoluta para no mover la imagen */}
                    {data?.showExtraNote && data?.extraNote && (
                        <div className="absolute top-full right-0 w-full mt-[50px] pointer-events-none">
                            <AnimatedSection hierarchy={2}>
                                <CustomPortableText 
                                    value={data.extraNote} 
                                    className="text-[10px] text-vlanc-secondary/60 italic tracking-wider w-full text-right whitespace-pre-line [&>strong]:font-bold [&>strong]:text-vlanc-secondary" 
                                />
                            </AnimatedSection>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PremiumServices;
