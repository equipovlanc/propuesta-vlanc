
import React from 'react';
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
    step?: number; // Prop para controlar revelación si fuera necesario, por defecto 2 (todo visto)
    isPrintMode?: boolean;
}

// Helper: aplica blur y opacidad según si el bloque está revelado
const getRevealStyle = (visible: boolean) => ({
    opacity: visible ? 1 : 0.08,
    filter: visible ? 'blur(0px)' : 'blur(5px)',
});

const FinePrint: React.FC<FinePrintProps> = ({ data, investmentTitle, locationDate, step = 2, isPrintMode = false }) => {
    const effectiveStep = isPrintMode ? 2 : step;

    return (
        <section className="h-full w-full pt-[150px] pb-[140px] px-[120px] flex flex-col justify-start relative overflow-hidden">
            <div className="w-full h-full flex flex-col">
                <div className="shrink-0 mb-20">
                    <h2 className="subtitulo1">
                        {investmentTitle || "la inversión."}
                    </h2>
                    <div className="w-[112px] h-[5px] bg-[#8f4933] mt-[27px]" />
                </div>

                <motion.div 
                    className="flex-grow flex flex-col print-force-visible min-h-0"
                    initial={getRevealStyle(isPrintMode)}
                    animate={getRevealStyle(effectiveStep >= 2)}
                    transition={{ duration: 0.9, ease: 'easeInOut' }}
                >
                    <h3 className="subtitulo2 mb-10" dangerouslySetInnerHTML={{ __html: data?.title || 'Letra pequeña' }} />
                    
                    {(() => {
                        // Cálculo de longitud para determinar tamaño
                        let charCount = 0;
                        if (data?.content) {
                            charCount = data.content
                                .map((block: any) => (block.children || [])
                                    .map((child: any) => child.text || "").join("")
                                ).join("\n").length;
                        } else {
                            const pointsCount = data?.points?.length || 0;
                            charCount = pointsCount > 11 ? 1100 : pointsCount > 8 ? 800 : pointsCount > 6 ? 500 : 0;
                        }

                        let textSizeClass = "";
                        // Umbrales para forzar que todo quepa en el espacio absoluto
                        if (charCount > 3000) textSizeClass = "!text-[10px]";
                        else if (charCount > 2400) textSizeClass = "!text-[11px]";
                        else if (charCount > 1800) textSizeClass = "!text-[12px]";
                        else if (charCount > 1200) textSizeClass = "!text-[13px]";
                        else if (charCount > 600) textSizeClass = "!text-[14px]";
                        else textSizeClass = "!text-[15px]";

                        return (
                            <>
                                {/* Contenedor ABSOLUTO para las columnas: 
                                     Va desde justo debajo del título hasta el margen inferior (140px) */}
                                <div 
                                    className={`absolute left-[120px] right-[120px] top-[400px] bottom-[140px] columns-2 gap-20 overflow-hidden ${textSizeClass}`}
                                >
                                    <div className={`cuerpo text-vlanc-secondary/80 !leading-[1.5] break-inside-avoid text-justify w-full ${textSizeClass}`}>
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

                                {/* FIRMA - FIJADA al margen inferior (140px) y ancho de columna (800px) */}
                                <motion.div
                                    className="absolute right-[120px] bottom-[140px] w-[800px] pointer-events-none z-20"
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
                            </>
                        );
                    })()}
                </motion.div>
            </div>

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
