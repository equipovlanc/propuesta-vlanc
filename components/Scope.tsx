
import React, { useState, useRef, useLayoutEffect } from 'react';
import AnimatedSection from './AnimatedSection';

interface ScopeProps {
    data?: {
        title?: string;
        image?: { src: string; opacity?: number };
        video?: string;
        intervention?: {
            title?: string;
            location?: string;
            projectType?: string;
            scope?: string;
            program?: string;
            breakdown?: string[];
            note?: string;
        };
    }
}

const Scope: React.FC<ScopeProps> = ({ data }) => {
    const breakdown = data?.intervention?.breakdown ?? [];
    const imageSrc = data?.image?.src;
    const imageOpacity = data?.image?.opacity ?? 15;

    // Refs para medición
    const containerRef = useRef<HTMLDivElement>(null);
    const col1Ref = useRef<HTMLDivElement>(null);
    const programRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Estados para el layout dinámico
    const [splitIndex, setSplitIndex] = useState<number>(breakdown.length);
    const [mediaHeight, setMediaHeight] = useState<number>(512);
    const [showMedia, setShowMedia] = useState(true);

    useLayoutEffect(() => {
        const calculateLayout = () => {
            if (!containerRef.current || !programRef.current) return;

            const windowHeight = window.innerHeight;
            const bottomMargin = 140;
            const maxBottomY = windowHeight - bottomMargin;
            const startTopY = 512 + 50; // Altura fija sup + pt-50

            let currentY = startTopY;

            // 1. Calcular altura del Programa
            const programHeight = programRef.current.offsetHeight;
            currentY += programHeight + 16; // mb-4

            // 2. Determinar punto de corte (Split) para Col 1
            let newSplitIndex = breakdown.length;
            let lastItemBottomY = currentY;

            for (let i = 0; i < breakdown.length; i++) {
                const item = itemRefs.current[i];
                if (item) {
                    const itemHeight = item.offsetHeight;
                    if (currentY + itemHeight > maxBottomY && newSplitIndex === breakdown.length) {
                        newSplitIndex = i;
                    }
                    if (i < newSplitIndex) {
                        currentY += itemHeight + 16;
                        lastItemBottomY = currentY - 16;
                    }
                }
            }

            setSplitIndex(newSplitIndex);

            // 3. Medir altura de los items que van a Col 2
            let col2Height = 0;
            for (let i = newSplitIndex; i < breakdown.length; i++) {
                const item = itemRefs.current[i];
                if (item) col2Height += item.offsetHeight + 16;
            }
            if (data?.intervention?.note) col2Height += 60; // Estimación rápida de la nota final
            if (col2Height > 0) col2Height -= 16;

            // 4. Lógica de Media Adaptativa
            // Col 2 está alineada por abajo con el final de Col 1
            const col1BottomY = lastItemBottomY;
            const col2TopY = col1BottomY - col2Height;

            // La media tiene un gap de 50px con el texto de la derecha
            const mediaMargin = 50;
            const idealMediaBottom = col2TopY - mediaMargin;

            // La altura original de la media es 512
            let finalMediaHeight = 512;
            if (newSplitIndex < breakdown.length && idealMediaBottom < 512) {
                finalMediaHeight = idealMediaBottom;
            }

            // Ocultar si la reducción supera el 30% (358.4px)
            if (finalMediaHeight < 512 * 0.7) {
                setShowMedia(false);
            } else {
                setShowMedia(true);
                setMediaHeight(Math.max(0, finalMediaHeight));
            }
        };

        // Ejecutar inmediatamente y tras resize
        calculateLayout();
        const timeout = setTimeout(calculateLayout, 50); // Delay extra para asegurar renderizado de fuentes
        window.addEventListener('resize', calculateLayout);

        return () => {
            window.removeEventListener('resize', calculateLayout);
            clearTimeout(timeout);
        };
    }, [breakdown, data]);

    const col2Items = breakdown.slice(splitIndex);

    return (
        <section ref={containerRef} className="h-screen w-full relative overflow-hidden flex flex-col bg-white">

            {/* --- BLOQUE SUPERIOR (Altura base 512px) --- */}
            <div className="w-full relative shrink-0" style={{ height: '512px' }}>

                {/* TÍTULO SECCIÓN */}
                <div className="absolute top-[150px] left-[120px] z-20">
                    <AnimatedSection hierarchy={1}>
                        <h2 className="subtitulo1 text-vlanc-black">
                            {data?.title || "qué vamos a hacer por ti."}
                        </h2>
                    </AnimatedSection>
                    <AnimatedSection mode="bar" className="w-[112px] h-[5px] bg-[#8f4933] mt-[27px]" />
                </div>

                {/* MEDIA ADAPTATIVA */}
                {showMedia && (
                    <div
                        className="absolute top-0 right-[120px] w-[735px] z-10 overflow-hidden transition-all duration-300"
                        style={{ height: `${mediaHeight}px` }}
                        data-cursor-ignore
                    >
                        <AnimatedSection className="h-full w-full relative" hierarchy={0}>
                            {data?.video && (
                                <video
                                    src={data.video}
                                    autoPlay loop muted playsInline
                                    className="w-full h-full object-cover relative z-10 print:hidden"
                                    data-cursor-ignore
                                />
                            )}
                            {imageSrc && (
                                <div className={`absolute inset-0 w-full h-full z-0 ${data?.video ? 'hidden print:block' : 'block'}`}>
                                    <img src={imageSrc} alt="Scope" className="w-full h-full object-cover" data-cursor-ignore />
                                    <div
                                        className="absolute inset-0 pointer-events-none"
                                        style={{ backgroundColor: `rgba(143, 73, 51, ${imageOpacity / 100})` }}
                                    />
                                </div>
                            )}
                        </AnimatedSection>
                    </div>
                )}

                {/* DATOS TÉCNICOS */}
                <div className="absolute bottom-0 left-[120px] z-20" style={{ width: '735px' }}>
                    <AnimatedSection hierarchy={2}>
                        <h3 className="subtitulo2 mb-6">{data?.intervention?.title}</h3>
                        <div className="space-y-4 cuerpo text-left">
                            <p><strong className="font-bold uppercase">LOCALIZACIÓN:</strong> {data?.intervention?.location}</p>
                            <p><strong className="font-bold uppercase">TIPO DE PROYECTO:</strong> {data?.intervention?.projectType}</p>
                            <p><strong className="font-bold uppercase">ÁMBITO DE INTERVENCIÓN:</strong> {data?.intervention?.scope}</p>
                        </div>
                    </AnimatedSection>
                </div>
            </div>

            {/* --- BLOQUE INFERIOR (TEXTO DINÁMICO) --- */}
            <div className="w-full px-[120px] pt-[50px] flex gap-[120px] items-end relative flex-grow overflow-visible">

                {/* Columna Izquierda (Flujo normal hacia abajo) */}
                <div ref={col1Ref} className="w-[735px] flex flex-col self-start">
                    <div ref={programRef} className="mb-4">
                        <p className="cuerpo text-left">
                            <strong className="font-bold uppercase">PROGRAMA:</strong> <span dangerouslySetInnerHTML={{ __html: data?.intervention?.program || '' }} />
                        </p>
                    </div>

                    {breakdown.map((item, i) => (
                        <div
                            key={i}
                            ref={el => itemRefs.current[i] = el}
                            className={`mb-4 break-inside-avoid ${i >= splitIndex ? 'hidden' : 'block'}`}
                        >
                            <p className="cuerpo leading-[1.4] text-left" dangerouslySetInnerHTML={{ __html: item }} />
                        </div>
                    ))}

                    {/* Elementos invisibles para medición constante de altura */}
                    <div className="absolute opacity-0 pointer-events-none -z-10" aria-hidden="true">
                        {breakdown.map((item, i) => (
                            <div key={`m-${i}`} ref={el => { if (i >= splitIndex) itemRefs.current[i] = el }}>
                                <p className="cuerpo leading-[1.4]" dangerouslySetInnerHTML={{ __html: item }} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Columna Derecha (Creciendo hacia arriba, alineada por abajo) */}
                <div className="w-[735px] flex flex-col justify-end self-end mb-[140px]">
                    <div className="flex flex-col">
                        {col2Items.map((item, i) => (
                            <div key={`c2-${i}`} className="mb-4">
                                <p className="cuerpo leading-[1.4] text-left" dangerouslySetInnerHTML={{ __html: item }} />
                            </div>
                        ))}

                        {/* Nota Final */}
                        {data?.intervention?.note && (
                            <div className="pt-6 mt-4 border-t border-vlanc-primary/5">
                                <p className="text-[10px] text-vlanc-secondary/60 italic uppercase tracking-widest leading-[1.4]">
                                    {data?.intervention?.note}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Scope;
