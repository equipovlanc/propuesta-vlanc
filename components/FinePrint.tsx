
import React, { useState, useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PortableText } from '@portabletext/react';

interface FinePrintProps {
    data?: {
        title?: string;
        points?: string[];
        content?: any[];
        invoiceInfo?: string;
    };
    investmentTitle?: string;
    locationDate?: string;
    step?: number;
    isPrintMode?: boolean;
}

const getRevealStyle = (visible: boolean) => ({
    opacity: visible ? 1 : 0.08,
    filter: visible ? 'blur(0px)' : 'blur(5px)',
});

const FinePrint: React.FC<FinePrintProps> = ({ data, investmentTitle, locationDate, step = 2, isPrintMode = false }) => {
    const effectiveStep = isPrintMode ? 2 : step;
    const [fontSize, setFontSize] = useState(16);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMeasured, setIsMeasured] = useState(false);

    // Medición dinámica del tamaño de letra
    useLayoutEffect(() => {
        if (!containerRef.current || !data) return;

        const checkOverflow = () => {
            const container = containerRef.current;
            if (!container) return false;

            // En un sistema de 2 columnas con altura fija (aprox 630px efectivos tras títulos), 
            // el contenido desborda si su scrollHeight es mayor que el offsetHeight.
            // Pero columns-2 es especial. Usaremos un div invisible como "tester" 
            // que simula una sola columna de 800px de ancho.
            const tester = document.createElement('div');
            tester.style.width = '800px';
            tester.style.fontSize = `${fontSize}px`;
            tester.style.lineHeight = '1.4';
            tester.style.fontFamily = 'Montserrat, sans-serif';
            tester.style.position = 'absolute';
            tester.style.visibility = 'hidden';
            tester.style.whiteSpace = 'pre-line';
            tester.style.textAlign = 'justify';
            
            // Replicamos el contenido
            if (data.content) {
                // Simplificación para el tester: extraemos texto plano
                const text = data.content
                    .map((block: any) => (block.children || [])
                        .map((child: any) => child.text || "").join("")
                    ).join("\n\n");
                tester.innerText = text;
            } else {
                tester.innerText = (data.points ?? []).join("\n\n");
            }

            document.body.appendChild(tester);
            const totalHeight = tester.scrollHeight;
            document.body.removeChild(tester);

            // Altura disponible en 2 columnas (1080 - 150 - 140 - ~120 de títulos) ~= 670px
            const maxColumnHeight = 670; 
            return totalHeight > (maxColumnHeight * 2);
        };

        if (checkOverflow() && fontSize > 10) {
            setFontSize(prev => prev - 0.5);
        } else {
            setIsMeasured(true);
        }
    }, [data, fontSize]);

    return (
        <section className="h-full w-full pt-[150px] pb-[140px] px-[120px] flex flex-col justify-start relative overflow-hidden font-sans">
            <div className="w-full h-full flex flex-col">
                <div className="shrink-0 mb-20">
                    <h2 className="subtitulo1">
                        {investmentTitle || "la inversión."}
                    </h2>
                    <div className="w-[112px] h-[5px] bg-[#8f4933] mt-[27px]" />
                </div>

                <motion.div 
                    className={`flex-grow flex flex-col print-force-visible min-h-0 transition-opacity duration-300 ${isMeasured ? 'opacity-100' : 'opacity-0'}`}
                    initial={getRevealStyle(isPrintMode)}
                    animate={getRevealStyle(effectiveStep >= 2)}
                    transition={{ duration: 0.9, ease: 'easeInOut' }}
                >
                    <h3 className="subtitulo2 mb-10" dangerouslySetInnerHTML={{ __html: data?.title || 'Letra pequeña' }} />
                    
                    <div className="flex-grow flex flex-col min-h-0 w-full" ref={containerRef}>
                        <div 
                            className="flex-grow columns-2 gap-20 space-y-0 pb-10 h-full w-full"
                            style={{ fontSize: `${fontSize}px`, lineHeight: '1.4' }}
                        >
                            <div className="cuerpo text-vlanc-secondary/80 break-inside-avoid text-justify w-full" style={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                                {data?.content ? (
                                    <PortableText 
                                        value={data.content} 
                                        components={{
                                            block: {
                                                normal: ({children}) => <p className="mb-0">{children}</p>
                                            }
                                        }}
                                    />
                                ) : (
                                    (data?.points ?? []).map((point, i) => (
                                        <p key={i} className="mb-0" dangerouslySetInnerHTML={{ __html: point }} />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* FIRMA - Directamente bajo el margen inferior (140px)
                 Alineada exactamente a la columna derecha (Ancho 800px) */}
            <motion.div
                className="absolute right-[120px] bottom-[140px] w-[800px] pointer-events-none z-20 print-force-visible"
                initial={getRevealStyle(isPrintMode)}
                animate={getRevealStyle(effectiveStep >= 2)}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
            >
                <div className="flex flex-col border-t border-[#8f4933] pt-1 print:border-t-2 print:!border-[#8f4933] pointer-events-auto">
                    <div className="flex justify-between items-start">
                        <span className="tabla1">VIVE VLANC SL</span>
                        <span className="tabla1 text-right">ACEPTA PRESUPUESTO_FIRMA</span>
                    </div>
                </div>
            </motion.div>

            {/* FECHA — Posición estándar absoluta */}
            <motion.div
                className="absolute bottom-[70px] right-[120px] z-20 print-force-visible"
                initial={getRevealStyle(isPrintMode)}
                animate={getRevealStyle(effectiveStep >= 2)}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
            >
                <p className="cuerpo font-bold text-right">
                    {locationDate || "En Alcoi a XX de mes de 2025"}
                </p>
            </motion.div>
        </section>
    );
};

export default FinePrint;
