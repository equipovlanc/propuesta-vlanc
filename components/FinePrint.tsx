
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
    pageContent?: any[]; // Bloques específicos de esta página
    pagePoints?: string[]; // Puntos específicos de esta página
    pageIndex?: number;  // 0-indexed
    totalPages?: number;
    fontSize?: number;   // Tamaño calculado dinámicamente
}

const getRevealStyle = (visible: boolean) => ({
    opacity: visible ? 1 : 0.08,
    filter: visible ? 'blur(0px)' : 'blur(5px)',
});

const FinePrint: React.FC<FinePrintProps> = ({ 
    data, 
    investmentTitle, 
    locationDate, 
    step = 2, 
    isPrintMode = false,
    pageContent,
    pagePoints,
    pageIndex = 0,
    totalPages = 1,
    fontSize = 16
}) => {
    const effectiveStep = isPrintMode ? 2 : step;
    const containerRef = useRef<HTMLDivElement>(null);

    // Priorizamos el contenido fragmentado de la página si existe
    const activeContent = pageContent || data?.content;
    const activePoints = pagePoints || (!pageContent ? (data?.points ?? []) : []);


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
                    className="flex-grow flex flex-col print-force-visible min-h-0 transition-opacity duration-300"
                    initial={getRevealStyle(isPrintMode)}
                    animate={getRevealStyle(effectiveStep >= 2)}
                    transition={{ duration: 0.9, ease: 'easeInOut' }}
                >
                    <h3 className="subtitulo2 mb-10 flex items-center gap-4">
                        <span dangerouslySetInnerHTML={{ __html: data?.title || 'Letra pequeña' }} />
                        {totalPages > 1 && (
                            <span className="font-normal opacity-80">
                                {pageIndex + 1}/{totalPages}
                            </span>
                        )}
                    </h3>
                    
                    <div className="flex-grow w-full relative overflow-hidden mb-[50px]">
                        <div 
                            className="absolute top-0 bottom-0 left-0 transition-transform duration-0 ease-in-out"
                            style={{ 
                                width: '100%',
                                columnCount: 2,
                                columnGap: '80px',
                                columnFill: 'auto',
                                transform: `translateX(calc(-${pageIndex} * (100% + 80px)))`,
                                fontSize: `${fontSize}px`, 
                                lineHeight: '1.4' 
                            }}
                        >
                            <div className="cuerpo text-vlanc-secondary/80 text-justify w-full h-auto" style={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                                {activeContent && activeContent.length > 0 ? (
                                    typeof activeContent[0] === 'string' ? (
                                        activeContent.map((point, i) => (
                                            <p key={i} className="mb-0" dangerouslySetInnerHTML={{ __html: point as unknown as string }} />
                                        ))
                                    ) : (
                                        <PortableText 
                                            value={activeContent} 
                                            components={{
                                                block: {
                                                    normal: ({children}) => <p className="mb-0 min-h-[1.4em]">{children}</p>
                                                },
                                                list: {
                                                    bullet: ({children}) => <ul className="list-disc pl-5 mb-0">{children}</ul>,
                                                    number: ({children}) => <ol className="list-decimal pl-5 mb-0">{children}</ol>,
                                                },
                                                listItem: {
                                                    bullet: ({children}) => <li className="mb-0 min-h-[1.4em]">{children}</li>,
                                                    number: ({children}) => <li className="mb-0 min-h-[1.4em]">{children}</li>,
                                                }
                                            }}
                                        />
                                    )
                                ) : (
                                    activePoints.map((point, i) => (
                                        <p key={i} className="mb-0" dangerouslySetInnerHTML={{ __html: point }} />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* FIRMA - Repetida en todas las páginas según requerimiento */}
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

            {/* FECHA — Repetida en todas las páginas según requerimiento */}
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
