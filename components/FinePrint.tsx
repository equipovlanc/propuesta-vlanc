
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
                    className="flex-grow flex flex-col print-force-visible"
                    initial={getRevealStyle(isPrintMode)}
                    animate={getRevealStyle(effectiveStep >= 2)}
                    transition={{ duration: 0.9, ease: 'easeInOut' }}
                >
                    <h3 className="subtitulo2 mb-10" dangerouslySetInnerHTML={{ __html: data?.title || 'Letra pequeña' }} />
                    
                    <div className="flex-grow columns-2 gap-20 space-y-0 pb-[100px]">
                        <div className="cuerpo text-vlanc-secondary/80 !leading-[1.6] break-inside-avoid">
                            {data?.content ? (
                                <PortableText 
                                    value={data.content} 
                                    components={{
                                        block: {
                                            normal: ({children}) => <p className="mb-4">{children}</p>
                                        }
                                    }}
                                />
                            ) : (
                                (data?.points ?? []).map((point, i) => (
                                    <p key={i} className="mb-4" dangerouslySetInnerHTML={{ __html: point }} />
                                ))
                            )}
                        </div>
                    </div>

                    {/* FIRMA Y FECHA - Ahora en esta página legal */}
                    <div className="mt-auto w-full">
                        <div className="w-full flex flex-col border-t border-[#8f4933] pt-1 mb-8 print:border-t-2 print:!border-[#8f4933]">
                            <div className="flex justify-between items-start">
                                <span className="tabla1">VIVE VLANC SL</span>
                                <span className="tabla1 text-right">ACEPTA PRESUPUESTO_FIRMA</span>
                            </div>
                        </div>
                        <p className="cuerpo font-bold text-right">
                            {locationDate || "En Alcoi a XX de mes de 2025"}
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FinePrint;
