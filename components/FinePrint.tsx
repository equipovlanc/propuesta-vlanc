
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
                        // Cálculo de longitud para determinar tamaño (mismos umbrales que antes pero adaptados a 2 columnas)
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
                        // Ajustamos umbrales: Prioridad legibilidad. 
                        // En 2 columnas, aprovechamos el ancho completo (1920 - 240 = 1680px).
                        if (charCount > 2800) textSizeClass = "!text-[11.5px]";
                        else if (charCount > 2000) textSizeClass = "!text-[12.5px]";
                        else if (charCount > 1300) textSizeClass = "!text-[13.5px]";
                        else if (charCount > 800) textSizeClass = "!text-[14.5px]";
                        else textSizeClass = "!text-[15.5px]";

                        return (
                            <div className="flex-grow flex flex-col min-h-0 w-full">
                                {/* Contenedor con altura restringida para forzar el salto de columna */}
                                <div className={`flex-grow columns-2 gap-20 space-y-0 pb-10 h-full w-full ${textSizeClass}`}>
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
                            </div>
                        );
                    })()}
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
