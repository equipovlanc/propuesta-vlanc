
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
}

const Payment: React.FC<PaymentProps> = ({ data, investmentTitle }) => {
    return (
        <section className="min-h-screen pt-[150px] pb-[140px] px-[120px] bg-vlanc-bg flex flex-col justify-start">
            <div className="max-w-7xl mx-auto w-full">
                 <AnimatedSection>
                    <h2 className="subtitulo1 tracking-tighter">
                       {investmentTitle || "la inversión."}
                    </h2>
                    {/* Barra decorativa actualizada */}
                    <div className="w-[112px] h-[5px] bg-[#703622] mt-[50px] mb-20"></div>
                </AnimatedSection>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <AnimatedSection>
                        {/* Subtitulo 2 (Italic, grande en este caso) */}
                        <h3 className="subtitulo2 text-[32px] mb-10">{data?.paymentMethods?.title}</h3>
                        <div className="space-y-12">
                           {(data?.paymentMethods?.plans ?? []).map((plan, i) => (
                                <div key={i}>
                                    <h4 className="text-[14px] font-bold text-vlanc-primary tracking-widest mb-4 border-b border-vlanc-primary/20 pb-2">{plan.title}</h4>
                                    <div className="space-y-3">
                                        {(plan.payments ?? []).map((p, idx) => (
                                            <div key={idx} className="flex items-start text-vlanc-secondary text-[12px]">
                                                <div className="bg-vlanc-primary text-white text-[10px] font-bold px-2 py-1 mr-4 rounded-[1px] w-12 text-center shrink-0">{p.percent}</div>
                                                {/* CAMBIO: leading-relaxed -> leading-[1.4] */}
                                                <span className="leading-[1.4] font-sans">{p.description}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                           ))}
                        </div>
                    </AnimatedSection>
                    
                    <AnimatedSection>
                         <h3 className="subtitulo2 text-[32px] mb-10">{data?.finePrint?.title}</h3>
                         {/* CAMBIO: leading-relaxed -> leading-[1.4] */}
                         <div className="space-y-4 text-[11px] text-vlanc-secondary/80 text-left leading-[1.4] font-sans">
                            {(data?.finePrint?.points ?? []).map((point, i) => (
                                <p key={i} className="flex gap-3">
                                    <span className="text-vlanc-black font-bold">_</span>
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
        </section>
    );
};

export default Payment;
