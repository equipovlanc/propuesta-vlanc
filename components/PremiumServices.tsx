
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
const MIN_GAP = 50;         // hueco mínimo bajo la barra (el mt-[50px] del bloque de contenido)

const PremiumServices: React.FC<PremiumServicesProps> = ({ data, image, index = 0 }) => {
    const imageSrc = image?.src;
    const imageOpacity = image?.opacity ?? 15;

    const [isSingleLine, setIsSingleLine] = useState(false); // Por defecto intentamos 2 líneas (como original)
    const headerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const spacerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

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

            const spacerHeight = spacerRect.height / zoom;
            const titleHeight = title.getBoundingClientRect().height / zoom;
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
    }, [isSingleLine, data]);

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
        <section className="h-full w-full flex flex-row">
            {/* Left Column (J1 & J2) */}
            <div className="w-[888px] h-full flex flex-col justify-between pl-[120px] pr-10 pb-[140px] shrink-0 overflow-y-auto no-scrollbar relative z-10">

                {/* 1. Cabecera Principal (J1) */}
                {/* El pt-[150px] de la columna se ha convertido en un espaciador comprimible:
                    cuando el contenido crece y el hueco bajo la barra caería por debajo de
                    50px, este espaciador cede y el bloque título+barra sube en conjunto
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
                {/* mt-[50px]: separación mínima garantizada respecto a la barra de la cabecera.
                    Con justify-between sólo consume espacio libre, así que no altera la
                    composición cuando ya hay hueco de sobra; sólo actúa cuando el contenido
                    crece tanto que el hueco caería por debajo de 50px. */}
                <div className="flex flex-col justify-end max-w-xl mt-[50px]" ref={contentRef}>
                    <AnimatedSection hierarchy={2}>
                        <h3 className="subtitulo2 not-italic font-bold mb-8">
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
