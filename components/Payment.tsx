
import React from 'react';
import { motion } from 'framer-motion';

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
            invoiceInfo?: string;
        }
    };
    investmentTitle?: string;
    locationDate?: string;
    step?: number; // 0 = nada, 1 = columna izquierda, 2 = columna derecha + firma + fecha
    isPrintMode?: boolean;
}

// Helper: aplica blur y opacidad según si el bloque está revelado (mismo estilo que p5 y p14)
const getRevealStyle = (visible: boolean) => ({
    opacity: visible ? 1 : 0.08,
    filter: visible ? 'blur(0px)' : 'blur(5px)',
});

const Payment: React.FC<PaymentProps> = ({ data, investmentTitle, locationDate, step = 2, isPrintMode = false }) => {
    const effectiveStep = isPrintMode ? 2 : step;

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
                                    <h4 className="fase-titulo text-[#703622] mb-4 !text-[16px]">
                                        {plan.title}
                                    </h4>
                                    <div className="flex flex-col gap-[5px]">
                                        {(plan.payments ?? []).map((p, idx) => (
                                            <div key={idx} className="flex items-center text-vlanc-secondary">
                                                <div className="w-[50px] h-[20px] bg-vlanc-primary text-white text-[14px] font-bold flex items-center justify-center mr-4 rounded-[1px] shrink-0">
                                                    {p.percent}
                                                </div>
                                                <span className="cuerpo">{p.description}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {data?.finePrint?.invoiceInfo && (
                                <div className="mt-8">
                                    <p className="cuerpo font-bold text-[10px] whitespace-pre-line text-vlanc-secondary">
                                        {data?.finePrint?.invoiceInfo}
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* COLUMNA DERECHA + FIRMA — Paso 2 */}
                    <motion.div
                        className="h-full flex flex-col relative print-force-visible"
                        initial={getRevealStyle(isPrintMode)}
                        animate={getRevealStyle(effectiveStep >= 2)}
                        transition={{ duration: 0.9, ease: 'easeInOut' }}
                    >
                        <h3 className="subtitulo2 mb-10">{data?.finePrint?.title}</h3>

                        {/* Contenedor de puntos con tamaño dinámico y margen de seguridad de 50px */}
                        <div className="flex-grow mb-[50px]">
                            <div className="flex flex-col gap-[2px]">
                                {(data?.finePrint?.points ?? []).map((point, i) => {
                                    const pointsCount = data?.finePrint?.points?.length || 0;
                                    // Ajuste granular para respetar el hueco de 50px
                                    let textSizeClass = "";
                                    if (pointsCount > 11) textSizeClass = "!text-[11.5px]";
                                    else if (pointsCount > 8) textSizeClass = "!text-[12.5px]";
                                    else if (pointsCount > 6) textSizeClass = "!text-[13.5px]";

                                    return (
                                        <p key={i} className={`cuerpo text-vlanc-secondary/80 ${textSizeClass} !leading-[1.4]`}>
                                            {point}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>

                        {/* FIRMA - Empujada al final con mt-auto y mb-[70px] para estar a 3/2m (210px) */}
                        <div className="w-full flex flex-col border-t border-[#8f4933] pt-1 mt-auto mb-[70px] print-force-visible print:border-t-2 print:!border-[#8f4933]">
                            <div className="flex justify-between items-start">
                                <span className="tabla1">VIVE VLANC SL</span>
                                <span className="tabla1 text-right">ACEPTA PRESUPUESTO_FIRMA</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* FECHA — Paso 2 */}
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

export default Payment;
