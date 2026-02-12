
import React from 'react';
import AnimatedSection from './AnimatedSection';

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
}

const Payment: React.FC<PaymentProps> = ({ data, investmentTitle, locationDate }) => {
    return (
        <section className="h-full w-full pt-[150px] pb-[140px] px-[120px] bg-vlanc-bg flex flex-col justify-start relative">
            <div className="w-full h-full flex flex-col">
                 <AnimatedSection className="shrink-0">
                    <h2 className="subtitulo1">
                       {investmentTitle || "la inversión."}
                    </h2>
                    {/* Barra decorativa actualizada (#8f4933) */}
                    <div className="w-[112px] h-[5px] bg-[#8f4933] mt-[40px] mb-20"></div>
                </AnimatedSection>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* COLUMNA IZQUIERDA: PLANES */}
                    <AnimatedSection>
                        <h3 className="subtitulo2 text-[32px] mb-10">{data?.paymentMethods?.title}</h3>
                        <div className="space-y-12">
                           {(data?.paymentMethods?.plans ?? []).map((plan, i) => (
                                <div key={i}>
                                    {/* Nombre del plan con estilo .fase-titulo en #702622, sin bordes */}
                                    <h4 className="fase-titulo text-[#702622] mb-4">
                                        {plan.title}
                                    </h4>
                                    
                                    <div className="space-y-3">
                                        {(plan.payments ?? []).map((p, idx) => (
                                            <div key={idx} className="flex items-center text-vlanc-secondary text-[12px]">
                                                {/* Rectángulo de porcentaje 50x20px fijo */}
                                                <div className="w-[50px] h-[20px] bg-vlanc-primary text-white text-[10px] font-bold flex items-center justify-center mr-4 rounded-[1px] shrink-0">
                                                    {p.percent}
                                                </div>
                                                <span className="leading-[1.4] font-sans">{p.description}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                           ))}
                        </div>
                    </AnimatedSection>
                    
                    {/* COLUMNA DERECHA: LETRA PEQUEÑA Y FACTURACIÓN */}
                    <AnimatedSection>
                         <h3 className="subtitulo2 text-[32px] mb-10">{data?.finePrint?.title}</h3>
                         
                         {/* Lista limpia: sin símbolos, sin espacios verticales extra */}
                         <div className="flex flex-col gap-[2px] text-[11px] text-vlanc-secondary/80 text-left leading-[1.4] font-sans">
                            {(data?.finePrint?.points ?? []).map((point, i) => (
                                <p key={i}>
                                    {point}
                                </p>
                            ))}
                         </div>

                         {data?.finePrint?.invoiceInfo && (
                             <div className="mt-16 p-8 border border-vlanc-primary/20 bg-vlanc-primary/5">
                                 <p className="text-[10px] font-bold text-vlanc-primary tracking-[0.3em] uppercase mb-2">Datos de Facturación</p>
                                 <p className="text-[12px] font-sans text-vlanc-secondary whitespace-pre-line">{data?.finePrint?.invoiceInfo}</p>
                             </div>
                         )}
                    </AnimatedSection>
                </div>
            </div>

            {/* FECHA Y FIRMA */}
            {/* Posicionado absoluto en la esquina inferior derecha */}
            <div className="absolute bottom-[70px] right-[120px] z-20 flex flex-col items-end gap-[105px]">
                
                {/* FIRMA (Arriba) */}
                <div className="w-[450px] flex flex-col border-t border-[#8f4933] pt-1">
                    <div className="flex justify-between items-start">
                        <span className="tabla1">VIVE VLANC SL</span>
                        <span className="tabla1 text-right">ACEPTA PRESUPUESTO_FIRMA</span>
                    </div>
                </div>

                {/* FECHA (Abajo, alineada con el margen inferior) */}
                <p className="cuerpo font-bold text-right">
                    {locationDate || "En Alcoi a XX de mes de 2025"}
                </p>
            </div>
        </section>
    );
};

export default Payment;
