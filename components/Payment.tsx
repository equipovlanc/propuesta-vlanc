
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
                
                {/* Grid con margen negativo para subir 50px */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 -mt-[50px] flex-grow">
                    
                    {/* COLUMNA IZQUIERDA: PLANES + FACTURACIÓN */}
                    <AnimatedSection>
                        <h3 className="subtitulo2 text-[32px] mb-10">{data?.paymentMethods?.title}</h3>
                        {/* Reducido espacio entre planes (space-y-12 -> space-y-8) */}
                        <div className="space-y-8">
                           {(data?.paymentMethods?.plans ?? []).map((plan, i) => (
                                <div key={i}>
                                    {/* Nombre del plan */}
                                    <h4 className="fase-titulo text-[#702622] mb-4">
                                        {plan.title}
                                    </h4>
                                    
                                    {/* Lista de pagos */}
                                    <div className="flex flex-col gap-[5px]">
                                        {(plan.payments ?? []).map((p, idx) => (
                                            <div key={idx} className="flex items-center text-vlanc-secondary">
                                                {/* Rectángulo de porcentaje 50x20px */}
                                                <div className="w-[50px] h-[20px] bg-vlanc-primary text-white text-[10px] font-bold flex items-center justify-center mr-4 rounded-[1px] shrink-0">
                                                    {p.percent}
                                                </div>
                                                {/* Descripción: Usa .cuerpo estándar (14px) */}
                                                <span className="cuerpo">{p.description}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                           ))}

                           {/* DATOS DE FACTURACIÓN: Respetar casing original (sin uppercase) */}
                           {data?.finePrint?.invoiceInfo && (
                                <div className="mt-8">
                                    <p className="cuerpo font-bold text-[10px] whitespace-pre-line text-vlanc-secondary">
                                        {data?.finePrint?.invoiceInfo}
                                    </p>
                                </div>
                            )}
                        </div>
                    </AnimatedSection>
                    
                    {/* COLUMNA DERECHA: LETRA PEQUEÑA + FIRMA (Ancho completo, posición absoluta) */}
                    <AnimatedSection className="flex flex-col h-full relative">
                         <h3 className="subtitulo2 text-[32px] mb-10">{data?.finePrint?.title}</h3>
                         
                         {/* Letra pequeña: Usa .cuerpo estándar (14px) */}
                         <div className="flex flex-col gap-[2px]">
                            {(data?.finePrint?.points ?? []).map((point, i) => (
                                <p key={i} className="cuerpo text-vlanc-secondary/80">
                                    {point}
                                </p>
                            ))}
                         </div>

                         {/* FIRMA: Posicionada a 55px del bottom del contenedor (que es pb-140 de pantalla).
                             Total desde bottom screen = 140 + 55 = 195px.
                             Fecha está a 70px + ~20px texto = 90px top.
                             Gap = 195 - 90 = 105px. */}
                         <div className="absolute bottom-[55px] w-full flex flex-col border-t border-[#8f4933] pt-1">
                            <div className="flex justify-between items-start">
                                <span className="tabla1">VIVE VLANC SL</span>
                                <span className="tabla1 text-right">ACEPTA PRESUPUESTO_FIRMA</span>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>

            {/* FECHA: Posición absoluta original */}
            <div className="absolute bottom-[70px] right-[120px] z-20">
                <p className="cuerpo font-bold text-right">
                    {locationDate || "En Alcoi a XX de mes de 2025"}
                </p>
            </div>
        </section>
    );
};

export default Payment;
