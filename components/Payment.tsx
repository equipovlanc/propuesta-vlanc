
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
        <section className="h-full w-full pt-[150px] pb-[140px] px-[120px] flex flex-col justify-start relative">
            <div className="w-full h-full flex flex-col">
                 <div className="shrink-0 mb-20">
                    <AnimatedSection hierarchy={1}>
                        <h2 className="subtitulo1">
                           {investmentTitle || "la inversión."}
                        </h2>
                    </AnimatedSection>
                    {/* Barra decorativa animada */}
                    <AnimatedSection mode="bar" className="w-[112px] h-[5px] bg-[#8f4933] mt-[27px]" />
                </div>
                
                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 -mt-[50px] flex-grow">
                    
                    {/* COLUMNA IZQUIERDA (J2) */}
                    <AnimatedSection hierarchy={2}>
                        {/* CAMBIO: Se elimina text-[32px] para usar el tamaño por defecto de subtitulo2 */}
                        <h3 className="subtitulo2 mb-10">{data?.paymentMethods?.title}</h3>
                        <div className="space-y-8">
                           {(data?.paymentMethods?.plans ?? []).map((plan, i) => (
                                <div key={i}>
                                    {/* CAMBIO: Se fuerza text-[16px] para reducir los 2px solicitados (antes era 18px por fase-titulo) */}
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
                    </AnimatedSection>
                    
                    {/* COLUMNA DERECHA (J2) */}
                    <AnimatedSection className="flex flex-col relative" hierarchy={2}>
                         {/* CAMBIO: Se elimina text-[32px] para usar el tamaño por defecto de subtitulo2 */}
                         <h3 className="subtitulo2 mb-10">{data?.finePrint?.title}</h3>
                         
                         <div className="flex flex-col gap-[2px]">
                            {(data?.finePrint?.points ?? []).map((point, i) => (
                                <p key={i} className="cuerpo text-vlanc-secondary/80">
                                    {point}
                                </p>
                            ))}
                         </div>

                         <div className="w-full flex flex-col border-t border-[#8f4933] pt-1 mt-[50px]">
                            <div className="flex justify-between items-start">
                                <span className="tabla1">VIVE VLANC SL</span>
                                <span className="tabla1 text-right">ACEPTA PRESUPUESTO_FIRMA</span>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>

            {/* FECHA (J2) - AHORA ANIMADA */}
            <AnimatedSection className="absolute bottom-[70px] right-[120px] z-20" hierarchy={2}>
                <p className="cuerpo font-bold text-right">
                    {locationDate || "En Alcoi a XX de mes de 2025"}
                </p>
            </AnimatedSection>
        </section>
    );
};

export default Payment;
