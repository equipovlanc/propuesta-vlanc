
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
    const titleRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const infoBlockRef = useRef<HTMLDivElement>(null);
    const programRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Estados para el layout
    const [splitIndex, setSplitIndex] = useState<number>(breakdown.length);
    const [mediaHeight, setMediaHeight] = useState<number>(512);
    const [showMedia, setShowMedia] = useState(true);
    const [topBlockHeight, setTopBlockHeight] = useState<number>(512);
    const [interventionTop, setInterventionTop] = useState<number>(300);

    useLayoutEffect(() => {
        const calculateLayout = () => {
            if (!containerRef.current || !titleRef.current || !barRef.current) return;

            const windowHeight = window.innerHeight;
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
            // Necesitamos saber dónde termina la info técnica + program para empezar el breakdown
            // Pero el "Program" va un salto de línea bajo el bloque de info (que acaba en Scope)
            let currentLeftY = finalInterventionTop;

            // Medimos el bloque de info (Title, Location, ProjectType, Scope)
            if (infoBlockRef.current) {
                currentLeftY += infoBlockRef.current.offsetHeight + 24; // Espacio para el salto de línea al Program
            }

            // Medimos el Program
            if (programRef.current) {
                currentLeftY += programRef.current.offsetHeight + 16; // Espacio bajo el Program para empezar breakdown
            }

            let newSplitIndex = breakdown.length;
            for (let i = 0; i < breakdown.length; i++) {
                const item = itemRefs.current[i];
                if (item) {
                    const itemHeight = item.offsetHeight;
                    if (currentLeftY + itemHeight > bottomAxisY && newSplitIndex === breakdown.length) {
                        newSplitIndex = i;
                    }
                    if (i < newSplitIndex) {
                        currentLeftY += itemHeight + 16;
                    }
                }
            }
            setSplitIndex(newSplitIndex);

            // 3. Medir altura de la Columna Derecha
            let col2BreakdownHeight = 0;
            for (let i = newSplitIndex; i < breakdown.length; i++) {
                const item = itemRefs.current[i];
                if (item) col2BreakdownHeight += item.offsetHeight + 16;
            }
            if (col2BreakdownHeight > 0) col2BreakdownHeight -= 16;

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
                    <AnimatedSection hierarchy={1}>
                        <h3 className="subtitulo2 mb-6">{data?.intervention?.title}</h3>
                        <div className="space-y-4 cuerpo text-left">
                            <p><strong className="font-bold uppercase">LOCALIZACIÓN:</strong> {data?.intervention?.location}</p>
                            <p><strong className="font-bold uppercase">TIPO DE PROYECTO:</strong> {data?.intervention?.projectType}</p>
                            <p><strong className="font-bold uppercase">ÁMBITO DE INTERVENCIÓN:</strong> {data?.intervention?.scope}</p>
                        </div>
                    </AnimatedSection>
                </div>

                {/* Program - 1 línea de espacio debajo de Scope */}
                <div ref={programRef} className="mt-6"> {/* mt-6 ~ un salto de linea amplio */}
                    <AnimatedSection hierarchy={1}>
                        <p className="cuerpo text-left">
                            <strong className="font-bold uppercase">PROGRAMA:</strong> <span dangerouslySetInnerHTML={{ __html: data?.intervention?.program || '' }} />
                        </p>
                    </AnimatedSection>
                </div>

                {/* Breakdown (Columna Izquierda) */}
                <div className="mt-4 flex flex-col">
                    <AnimatedSection hierarchy={1}>
                        {breakdown.map((item, i) => (
                            <div
                                key={i}
                                ref={el => itemRefs.current[i] = el}
                                className={`mb-4 ${i >= splitIndex ? 'hidden' : 'block'}`}
                            >
                                <p className="cuerpo leading-[1.4] text-left" dangerouslySetInnerHTML={{ __html: item }} />
                            </div>
                        ))}
                    </AnimatedSection>
                </div>
            </div>

            {/* Medidor invisible para Columna Derecha */}
            <div className="absolute opacity-0 pointer-events-none -z-10" aria-hidden="true" style={{ width: '735px', left: '-2000px' }}>
                {breakdown.map((item, i) => (
                    <div key={`m-${i}`} ref={el => { if (i >= splitIndex) itemRefs.current[i] = el }}>
                        <p className="cuerpo leading-[1.4]" dangerouslySetInnerHTML={{ __html: item }} />
                    </div>
                ))}
            </div>

            {/* --- COLUMNA DERECHA (ACCIÓN INVERTIDA) --- */}
            <div className="fixed right-[120px] w-[735px] pointer-events-none" style={{ top: 0, bottom: 0 }}>
                {/* Breakdown Items: Naciendo desde abajo hacia arriba hasta los 140px */}
                <div className="absolute bottom-[140px] w-full flex flex-col justify-end pointer-events-auto">
                    <AnimatedSection hierarchy={1}>
                        {col2Items.map((item, i) => (
                            <div key={`c2-${i}`} className="mb-4">
                                <p className="cuerpo leading-[1.4] text-left" dangerouslySetInnerHTML={{ __html: item }} />
                            </div>
                        ))}
                    </AnimatedSection>
                </div>

                {/* Nota: Naciendo de arriba hacia abajo desde los 140px */}
                {data?.intervention?.note && (
                    <div className="absolute top-[calc(100vh-140px)] w-full pt-1 pointer-events-auto">
                        <AnimatedSection hierarchy={1}>
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
