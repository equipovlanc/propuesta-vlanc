
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
    const noteRef = useRef<HTMLDivElement>(null);

    // Estados para el layout dinámico
    const [splitIndex, setSplitIndex] = useState<number>(breakdown.length);
    const [mediaHeight, setMediaHeight] = useState<number>(512);
    const [showMedia, setShowMedia] = useState(true);
    const [topBlockHeight, setTopBlockHeight] = useState<number>(512);

    useLayoutEffect(() => {
        const calculateLayout = () => {
            if (!containerRef.current || !programRef.current) return;

            const windowHeight = window.innerHeight;
            const bottomMargin = 140;
            const maxBottomY = windowHeight - bottomMargin;
            const initialTopHeight = 512;
            const startTopY = initialTopHeight + 50; // Altura fija sup + pt-50

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

            // 3. Medir altura de la Col 2 (Items del breakdown en la derecha)
            let col2BreakdownHeight = 0;
            for (let i = newSplitIndex; i < breakdown.length; i++) {
                const item = itemRefs.current[i];
                if (item) col2BreakdownHeight += item.offsetHeight + 16;
            }
            if (col2BreakdownHeight > 0) col2BreakdownHeight -= 16;

            // 4. Lógica de Media Adaptativa
            // El inicio del texto de la derecha (por arriba) es: Margen inferior - Altura texto derecha
            const col2TopY = maxBottomY - col2BreakdownHeight;

            const mediaMargin = 50;
            const idealMediaBottom = col2TopY - mediaMargin;

            let finalMediaHeight = initialTopHeight;
            let finalTopBlockHeight = initialTopHeight;

            if (newSplitIndex < breakdown.length && idealMediaBottom < initialTopHeight) {
                finalMediaHeight = idealMediaBottom;
                finalTopBlockHeight = idealMediaBottom;
            }

            // Ocultar si la reducción supera el 30% (358.4px)
            if (finalMediaHeight < initialTopHeight * 0.7) {
                setShowMedia(false);
                setTopBlockHeight(initialTopHeight); // Mantenemos altura original del bloque de titulo
                setMediaHeight(0);
            } else {
                setShowMedia(true);
                setMediaHeight(Math.max(0, finalMediaHeight));
                setTopBlockHeight(finalTopBlockHeight);
            }
        };

        calculateLayout();
        const timeout = setTimeout(calculateLayout, 100);
        window.addEventListener('resize', calculateLayout);
        return () => {
            window.removeEventListener('resize', calculateLayout);
            clearTimeout(timeout);
        };
    }, [breakdown, data]);

    const col2Items = breakdown.slice(splitIndex);

    return (
        <section ref={containerRef} className="h-screen w-full relative overflow-hidden flex flex-col bg-white">

            {/* --- BLOQUE SUPERIOR (Padre con altura dinámica para permitir que el texto suba) --- */}
            <div className="w-full relative shrink-0 transition-all duration-300 pointer-events-none" style={{ height: `${topBlockHeight}px` }}>

                {/* TÍTULO SECCIÓN */}
                <div className="absolute top-[150px] left-[120px] z-20 pointer-events-auto">
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
                        className="absolute top-0 right-[120px] w-[735px] z-10 overflow-hidden transition-all duration-300 pointer-events-auto"
                        style={{ height: `${mediaHeight}px` }}
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
                <div className="absolute bottom-0 left-[120px] z-20 pointer-events-auto" style={{ width: '735px' }}>
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
            <div className="w-full px-[120px] pt-[50px] flex justify-between relative flex-grow overflow-visible items-start">

                {/* Columna Izquierda */}
                <div ref={col1Ref} className="w-[735px] flex flex-col shrink-0">
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

                    {/* Elementos invisibles para medición constante */}
                    <div className="absolute opacity-0 pointer-events-none -z-10" aria-hidden="true" style={{ width: '735px' }}>
                        {breakdown.map((item, i) => (
                            <div key={`m-${i}`} ref={el => { if (i >= splitIndex) itemRefs.current[i] = el }}>
                                <p className="cuerpo leading-[1.4]" dangerouslySetInnerHTML={{ __html: item }} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Columna Derecha (Alineada con el borde izquierdo de la imagen superior) */}
                <div className="w-[735px] flex flex-col shrink-0 relative flex-grow min-h-full">
                    <div className="flex flex-col h-full justify-end" style={{ paddingBottom: '140px' }}>
                        <div className="flex flex-col">
                            {col2Items.map((item, i) => (
                                <div key={`c2-${i}`} className="mb-4">
                                    <p className="cuerpo leading-[1.4] text-left" dangerouslySetInnerHTML={{ __html: item }} />
                                </div>
                            ))}

                            {/* Nota Final (Dentro de los 140px inferiores) */}
                            <div ref={noteRef} className="absolute bottom-1 w-full translate-y-[-24px]">
                                {data?.intervention?.note && (
                                    <div className="pt-6 border-t border-vlanc-primary/5">
                                        <p className="text-[10px] text-vlanc-secondary/60 italic uppercase tracking-widest leading-[1.4]">
                                            {data?.intervention?.note}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Scope;
