import React, { useState, useRef, useLayoutEffect } from 'react';
import AnimatedSection from './AnimatedSection';
import { PortableText } from '@portabletext/react';

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
            program?: any[] | string;
            breakdown?: string[];
            note?: string;
        };
    }
}

const Scope: React.FC<ScopeProps> = ({ data }) => {
    const programBlocks = Array.isArray(data?.intervention?.program) ? data.intervention.program : [];
    const programBlocksCount = programBlocks.length;
    const breakdown = data?.intervention?.breakdown ?? [];
    const breakdownCount = breakdown.length;
    const totalFlowItems = programBlocksCount + breakdownCount;
    const imageSrc = data?.image?.src;
    const imageOpacity = data?.image?.opacity ?? 15;

    // Refs para medición
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const infoBlockRef = useRef<HTMLDivElement>(null);
    const programTitleRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Estados para el layout
    const [splitIndex, setSplitIndex] = useState<number>(totalFlowItems);
    const [mediaHeight, setMediaHeight] = useState<number>(512);
    const [showMedia, setShowMedia] = useState(true);
    const [topBlockHeight, setTopBlockHeight] = useState<number>(512);
    const [interventionTop, setInterventionTop] = useState<number>(300);
    const [col2Top, setCol2Top] = useState<number>(562);

    useLayoutEffect(() => {
        const calculateLayout = () => {
            if (!containerRef.current || !titleRef.current || !barRef.current) return;

            const windowHeight = 1080; // diseño fijo 1920×1080
            const bottomAxisY = windowHeight - 140; // Eje de los 140px
            const initialMediaHeight = 512;

            // 1. Posicionamiento del bloque de Intervención (75px bajo la barra)
            const titleRect = titleRef.current.getBoundingClientRect();
            const barRect = barRef.current.getBoundingClientRect();
            // La barra está en absolute respecto al contenedor del título, pero queremos la posición absoluta en la página
            // Como el título está en top-150px, podemos calcularlo:
            const barBottomY = 150 + barRef.current.offsetTop + barRef.current.offsetHeight;
            const finalInterventionTop = barBottomY + 75;
            setInterventionTop(finalInterventionTop);

            // 2. Determinar Split para Breakdown (Col 1)
            let currentLeftY = finalInterventionTop;

            // Medimos el bloque de info (Title, Location, ProjectType, Scope)
            if (infoBlockRef.current) {
                currentLeftY += infoBlockRef.current.offsetHeight + 24; // Espacio para el salto de línea al Program
            }

            // Medimos el Título del Program
            if (programTitleRef.current) {
                currentLeftY += programTitleRef.current.offsetHeight + 4; // mb-1 is ~4px
            }

            let newSplitIndex = totalFlowItems;
            for (let i = 0; i < totalFlowItems; i++) {
                const item = itemRefs.current[i];
                if (item) {
                    const itemHeight = item.offsetHeight;
                    if (currentLeftY + itemHeight > bottomAxisY && newSplitIndex === totalFlowItems) {
                        newSplitIndex = i;
                    }
                    if (i < newSplitIndex) {
                        // Program blocks don't have bottom margin naturally when rendered individually
                        // Breakdown strings have mb-4 (16px)
                        currentLeftY += itemHeight + (i < programBlocksCount ? 0 : 16);
                    }
                }
            }
            setSplitIndex(newSplitIndex);

            // 3. Medir altura de la Columna Derecha
            let col2BreakdownHeight = 0;
            for (let i = newSplitIndex; i < totalFlowItems; i++) {
                const item = itemRefs.current[i];
                if (item) {
                    col2BreakdownHeight += item.offsetHeight + (i < programBlocksCount ? 0 : 16);
                }
            }
            // Si la columna 2 empieza con un programBlock, no había margen, si empieza con breakdown restamos el último 16.
            if (col2BreakdownHeight > 0 && newSplitIndex >= programBlocksCount) {
                col2BreakdownHeight -= 16;
            }

            // 4. Lógica de Reducción de Media
            const col2TopY = bottomAxisY - col2BreakdownHeight;
            const mediaMargin = 50;
            const idealMediaBottom = col2TopY - mediaMargin;

            let finalMediaHeight = initialMediaHeight;
            let finalTopBlockHeight = initialMediaHeight;

            if (newSplitIndex < breakdown.length && idealMediaBottom < initialMediaHeight) {
                finalMediaHeight = idealMediaBottom;
                finalTopBlockHeight = idealMediaBottom;
            }

            // Ocultar si la reducción es > 30%
            if (finalMediaHeight < initialMediaHeight * 0.7) {
                setShowMedia(false);
                setTopBlockHeight(initialMediaHeight);
                setMediaHeight(0);
                setCol2Top(finalInterventionTop);
            } else {
                setShowMedia(true);
                setMediaHeight(Math.max(0, finalMediaHeight));
                setTopBlockHeight(finalTopBlockHeight);
                setCol2Top(finalTopBlockHeight + mediaMargin);
            }
        };

        calculateLayout();
        const timeout = setTimeout(calculateLayout, 100);
        // No necesitamos escuchar resize real: el layout siempre es 1920×1080
        return () => {
            clearTimeout(timeout);
        };
    }, [totalFlowItems, data]);

    const portableTextComponents = {
        block: {
            normal: ({children}: any) => <p className="mb-0 min-h-[1.4em]">{children}</p>
        },
        list: {
            bullet: ({children}: any) => <ul className="list-disc pl-5 mb-0">{children}</ul>,
            number: ({children}: any) => <ol className="list-decimal pl-5 mb-0">{children}</ol>,
        },
        listItem: {
            bullet: ({children}: any) => <li className="mb-0 min-h-[1.4em]">{children}</li>,
            number: ({children}: any) => <li className="mb-0 min-h-[1.4em]">{children}</li>,
        }
    };

    return (
        <section ref={containerRef} className="h-screen w-full relative overflow-hidden flex flex-col bg-white">

            {/* --- CABECERA Y MEDIA --- */}
            <div className="w-full relative shrink-0 transition-all duration-300 pointer-events-none" style={{ height: `${topBlockHeight}px` }}>

                {/* TÍTULO SECCIÓN */}
                <div className="absolute top-[150px] left-[120px] z-20 pointer-events-auto" ref={titleRef}>
                    <AnimatedSection hierarchy={1}>
                        <h2 className="subtitulo1 text-vlanc-black">
                            {data?.title || "qué vamos a hacer por ti."}
                        </h2>
                    </AnimatedSection>
                    <div ref={barRef}>
                        <AnimatedSection mode="bar" className="w-[112px] h-[5px] bg-[#8f4933] mt-[27px]" />
                    </div>
                </div>

                {/* MEDIA */}
                {showMedia && (
                    <div
                        className="absolute top-0 right-[120px] w-[735px] z-10 overflow-hidden transition-all duration-300 pointer-events-auto"
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
            </div>

            {/* --- BLOQUE DE INTERVENCIÓN (POSICIONAMIENTO ABSOLUTO) --- */}
            <div
                className="absolute left-[120px] w-[735px] z-20 transition-all duration-300"
                style={{ top: `${interventionTop}px` }}
            >
                {/* Datos Técnicos */}
                <div ref={infoBlockRef}>
                    <AnimatedSection hierarchy={2}>
                        <h3 className="subtitulo2 mb-6" dangerouslySetInnerHTML={{ __html: data?.intervention?.title || '' }} />
                        <div className="space-y-4 cuerpo text-left">
                            <p><strong className="font-bold uppercase">LOCALIZACIÓN:</strong> <span dangerouslySetInnerHTML={{ __html: data?.intervention?.location || '' }} /></p>
                            <p><strong className="font-bold uppercase">TIPO DE PROYECTO:</strong> <span dangerouslySetInnerHTML={{ __html: data?.intervention?.projectType || '' }} /></p>
                            <p><strong className="font-bold uppercase">ÁMBITO DE INTERVENCIÓN:</strong> <span dangerouslySetInnerHTML={{ __html: data?.intervention?.scope || '' }} /></p>
                        </div>
                    </AnimatedSection>
                </div>

                {/* Program - 1 línea de espacio debajo de Scope */}
                <div className="mt-6"> {/* mt-6 ~ un salto de linea amplio */}
                    <AnimatedSection hierarchy={2}>
                        <div className="cuerpo text-left">
                            <strong ref={programTitleRef} className="font-bold uppercase block mb-1">PROGRAMA:</strong> 
                            {programBlocksCount > 0 ? (
                                <PortableText 
                                    value={programBlocks.slice(0, Math.min(splitIndex, programBlocksCount))} 
                                    components={portableTextComponents}
                                />
                            ) : (
                                <span dangerouslySetInnerHTML={{ __html: data?.intervention?.program || '' }} />
                            )}
                        </div>
                    </AnimatedSection>
                </div>

                {/* Left Breakdown */}
                {splitIndex > programBlocksCount && (
                    <div className="mt-4 flex flex-col">
                        <AnimatedSection hierarchy={2}>
                            {breakdown.slice(0, splitIndex - programBlocksCount).map((item, i) => (
                                <div key={i} className="mb-4 block">
                                    <p className="cuerpo leading-[1.4] text-left" dangerouslySetInnerHTML={{ __html: item }} />
                                </div>
                            ))}
                        </AnimatedSection>
                    </div>
                )}
            </div>

            {/* Medidor invisible para Columna Derecha (Blocks + Breakdown) */}
            <div className="absolute opacity-0 pointer-events-none -z-10 w-[735px] left-[-2000px] flex flex-col items-start" aria-hidden="true">
                {programBlocks.map((block, i) => (
                    <div key={`mp-${i}`} ref={(el) => { itemRefs.current[i] = el; }} className="w-full">
                        <div className="cuerpo text-left">
                            <PortableText value={[block]} components={portableTextComponents} />
                        </div>
                    </div>
                ))}
                {breakdown.map((item, i) => (
                    <div key={`mb-${i}`} ref={(el) => { itemRefs.current[programBlocksCount + i] = el; }} className="mb-4 w-full">
                        <div className="cuerpo leading-[1.4]" dangerouslySetInnerHTML={{ __html: item }} />
                    </div>
                ))}
            </div>

            {/* --- COLUMNA DERECHA (ACCIÓN INVERTIDA) --- */}
            <div className="absolute right-[120px] w-[735px] pointer-events-none" style={{ top: 0, bottom: 0 }}>
                {/* Items: Alineados arriba justo debajo de la imagen */}
                <div 
                    className="absolute w-full pointer-events-auto transition-all duration-300"
                    style={{ top: `${col2Top}px` }}
                >
                    <AnimatedSection hierarchy={2}>
                        <div className="cuerpo text-left flex flex-col">
                            {splitIndex < programBlocksCount && (
                                <PortableText 
                                    value={programBlocks.slice(splitIndex)} 
                                    components={portableTextComponents} 
                                />
                            )}
                            
                            {(breakdownCount > 0 && splitIndex < totalFlowItems) && (
                                <div className={splitIndex < programBlocksCount ? "mt-4" : ""}>
                                    {breakdown.slice(Math.max(0, splitIndex - programBlocksCount)).map((item, i) => (
                                        <div key={`c2-${i}`} className="mb-4">
                                            <p className="cuerpo leading-[1.4] text-left" dangerouslySetInnerHTML={{ __html: item }} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </AnimatedSection>
                </div>

                {/* Nota: Naciendo de arriba hacia abajo desde los 140px */}
                {data?.intervention?.note && (
                    <div className="absolute top-[940px] w-full pt-1 pointer-events-auto print-force-visible">
                        <AnimatedSection hierarchy={2}>
                            <p className="text-[10px] text-vlanc-secondary/60 italic uppercase tracking-widest leading-[1.4]">
                                {data?.intervention?.note}
                            </p>
                        </AnimatedSection>
                    </div>
                )}
            </div>

        </section>
    );
};

export default Scope;
