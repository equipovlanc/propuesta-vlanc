import React from 'react';
import { motion } from 'framer-motion';
import { PortableText } from '@portabletext/react';

interface PaymentStep {
    percent?: string;
    description?: string;
}

interface PlanPayments {
    title?: string;
    payments?: PaymentStep[];
}

interface PaymentProps {
    data?: {
        title?: string;
        paymentMethods?: {
            title?: string;
            plans?: PlanPayments[];
        };
        finePrint?: {
            title?: string;
            points?: string[];
            content?: any[];
            invoiceInfo?: string;
        };
        image?: {
            src: string;
            opacity?: number;
        };
    };
    investmentTitle?: string;
    locationDate?: string;
    step?: number; // 0 = nada, 1 = todo visible
    isPrintMode?: boolean;
}

// Helper: aplica blur y opacidad según si el bloque está revelado (mismo estilo que p5 y p14)
const getRevealStyle = (visible: boolean) => ({
    opacity: visible ? 1 : 0.08,
    filter: visible ? 'blur(0px)' : 'blur(5px)',
});

const Payment: React.FC<PaymentProps> = ({ data, investmentTitle, locationDate, step = 2, isPrintMode = false }) => {
    const effectiveStep = isPrintMode ? 1 : step;

    return (
        <section className="h-full w-full pt-[150px] pb-[140px] px-[120px] flex flex-col justify-start relative">
            <div className="w-full h-full flex flex-col">
                <div className="shrink-0 mb-20">
                    {/* El título y la barra se muestran siempre (no forman parte del sistema de pasos) */}
                    <h2 className="subtitulo1">
                        {investmentTitle || "la inversión."}
                    </h2>
                    <div className="w-[112px] h-[5px] bg-[#8f4933] mt-[27px]" />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 -mt-[50px] flex-grow">

                    {/* COLUMNA IZQUIERDA — Paso 1 */}
                    <motion.div
                        className="h-full flex flex-col print-force-visible"
                        initial={getRevealStyle(isPrintMode)}
                        animate={getRevealStyle(effectiveStep >= 1)}
                        transition={{ duration: 0.9, ease: 'easeInOut' }}
                    >
                        <h3 className="subtitulo2 mb-10">{data?.paymentMethods?.title}</h3>
                        <div className="space-y-8">
                            {(data?.paymentMethods?.plans ?? []).map((plan, i) => (
                                <div key={i}>
                                    <h4 className="fase-titulo text-[#703622] mb-4 !text-[16px] flex items-center gap-2">
                                        <div className="w-[14px] h-[14px] border border-[#703622] bg-transparent shrink-0 rounded-[1px] print:bg-white" />
                                        {plan.title}
                                    </h4>
                                    <div className="flex flex-col gap-[5px]">
                                        {(plan.payments ?? []).map((p, idx) => (
                                            <div key={idx} className="flex items-center text-vlanc-secondary">
                                                <div className="w-[50px] h-[20px] bg-vlanc-primary text-white text-[14px] font-bold flex items-center justify-center mr-4 rounded-[1px] shrink-0">
                                                    {p.percent}
                                                </div>
                                                <span className="cuerpo" dangerouslySetInnerHTML={{ __html: p.description || '' }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {data?.finePrint?.invoiceInfo && (
                                <div className="mt-8">
                                    <p className="cuerpo font-bold text-[10px] whitespace-pre-line text-vlanc-secondary" dangerouslySetInnerHTML={{ __html: data.finePrint.invoiceInfo }} />
                                </div>
                            )}
                        </div>
                    </motion.div>

                    <motion.div
                        className="h-full flex flex-col relative print-force-visible"
                        initial={getRevealStyle(isPrintMode)}
                        animate={getRevealStyle(effectiveStep >= 1)}
                        transition={{ duration: 0.9, ease: 'easeInOut' }}
                    >
                        {data?.image?.src && (
                            <div className="absolute inset-0 z-0">
                                <div className="relative w-full h-full">
                                    <img 
                                        src={data.image.src} 
                                        alt="Payment Detail" 
                                        className="w-full h-full object-cover rounded-[1px]"
                                    />
                                    {/* Overlay filter */}
                                    <div 
                                        className="absolute inset-0 bg-[#8f4933]" 
                                        style={{ opacity: (data.image.opacity ?? 15) / 100 }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Firma y Fecha se mantienen por ahora en esta vista si es necesario, 
                            o se pueden mover a la dedicada. El usuario dijo "en el hueco... añadir imagen".
                            Dejaré la firma por si acaso, pero el usuario no especificó borrarla. 
                            Sin embargo, la imagen ahora ocupa todo el espacio. 
                            Si la firma debe estar, la pondré sobre la imagen o debajo.
                            Revisando petición: "hueco que quedaria en su anterior lugar".
                            Moveré la firma a la nueva página de letra pequeña. */}
                    </motion.div>
                </div>
            </div>

        </section>
    );
};

export default Payment;
