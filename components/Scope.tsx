
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
    const col2ContentRef = useRef<HTMLDivElement>(null);

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

            // 3. Medir altura real de la Columna 2
            let col2Height = 0;
            if (col2ContentRef.current) {
                col2Height = col2ContentRef.current.offsetHeight;
            }

            // 4. Lógica de Media Adaptativa
            // La columna derecha está fija en bottom: 140px. Su 'top' visual es:
            const col2VisualTop = windowHeight - bottomMargin - col2Height;

            // La media tiene un gap de 50px con el inicio del texto de la derecha
            const mediaMargin = 50;
            const idealMediaBottom = col2VisualTop - mediaMargin;

            let finalMediaHeight = initialTopHeight;
            let finalTopBlockHeight = initialTopHeight;

            // Si el texto de la derecha sube por encima del nivel 512, encogemos
            if (newSplitIndex < breakdown.length && idealMediaBottom < initialTopHeight) {
                finalMediaHeight = idealMediaBottom;
                finalTopBlockHeight = idealMediaBottom;
            }

            // Ocultar si la reducción supera el 30% (358.4px)
            if (finalMediaHeight < initialTopHeight * 0.7) {
                setShowMedia(false);
                setTopBlockHeight(initialTopHeight);
                setMediaHeight(0);
            } else {
                setShowMedia(true);
                setMediaHeight(Math.max(0, finalMediaHeight));
                setTopBlockHeight(finalTopBlockHeight);
            }
        };

        calculateLayout();
        const timeout = setTimeout(calculateLayout, 150); // Un poco más de tiempo para asegurar que el DOM esté listo
        window.addEventListener('resize', calculateLayout);
        return () => {
            window.removeEventListener('resize', calculateLayout);
            clearTimeout(timeout);
        };
    }, [breakdown, data]);

    const col2Items = breakdown.slice(splitIndex);

    return (
        <section ref={containerRef} className="h-screen w-full relative overflow-hidden flex flex-col bg-white">

            {/* --- BLOQUE SUPERIOR (Padre con altura dinámica) --- */}
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

            {/* --- BLOQUE DE TEXTO --- */}
            <div className="w-full h-full px-[120px] pt-[50px] relative overflow-visible">

                {/* Columna Izquierda (Flujo normal) */}
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

                {/* Columna Derecha (Posicionamiento absoluto para independencia total) 
                    Se asume que la nota va fuera del cálculo del margen de 140px del breakdown
                */}
                <div
                    className="absolute right-[120px] w-[735px] flex flex-col justify-end"
                    style={{ bottom: '140px' }}
                >
                    <div ref={col2ContentRef} className="flex flex-col">
                        {col2Items.map((item, i) => (
                            <div key={`c2-${i}`} className="mb-4">
                                <p className="cuerpo leading-[1.4] text-left" dangerouslySetInnerHTML={{ __html: item }} />
                            </div>
                        ))}

                        {/* Nota Final (Sin linea, margen de 1 linea) */}
                        {data?.intervention?.note && (
                            <div className="mt-4">
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
