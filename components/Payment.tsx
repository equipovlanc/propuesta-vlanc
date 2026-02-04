
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
    }
}

const Payment: React.FC<PaymentProps> = ({ data }) => {
    return (
        <section className="min-h-screen py-32 px-12 md:px-24 bg-vlanc-bg flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full">
                 <AnimatedSection>
                    <h2 className="title-xl text-vlanc-secondary mb-4 font-bold tracking-tighter">
                       {data?.title || "la inversión."}
                    </h2>
                    <div className="w-16 h-[2px] bg-vlanc-primary mb-20"></div>
                </AnimatedSection>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <AnimatedSection>
                        <h3 className="subtitle-md text-vlanc-primary font-bold mb-10 italic">/ {data?.paymentMethods?.title}</h3>
                        <div className="space-y-12">
                           {(data?.paymentMethods?.plans ?? []).map((plan, i) => (
                                <div key={i}>
                                    <h4 className="text-[14px] font-bold text-vlanc-secondary uppercase tracking-widest mb-4 border-b border-vlanc-primary/10 pb-2">{plan.title}</h4>
                                    <div className="space-y-3">
                                        {(plan.payments ?? []).map((p, idx) => (
                                            <div key={idx} className="flex items-start text-vlanc-black/70 text-[12px]">
                                                <span className="font-bold w-12 shrink-0 text-vlanc-primary">{p.percent}</span>
                                                <span className="leading-relaxed">{p.description}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                           ))}
                        </div>
                    </AnimatedSection>
                    
                    <AnimatedSection>
                         <h3 className="subtitle-md text-vlanc-primary font-bold mb-10 italic">/ {data?.finePrint?.title}</h3>
                         <div className="space-y-4 text-[12px] text-vlanc-black/60 text-justify leading-relaxed">
                            {(data?.finePrint?.points ?? []).map((point, i) => (
                                <p key={i} className="flex gap-3">
                                    <span className="text-vlanc-primary">·</span>
                                    {point}
                                </p>
                            ))}
                         </div>
                         {data?.finePrint?.invoiceInfo && (
                             <div className="mt-16 p-8 border border-vlanc-primary/20 bg-vlanc-primary/5">
                                 <p className="text-[10px] font-bold text-vlanc-primary tracking-[0.3em] uppercase mb-2">Cuenta de abono</p>
                                 <p className="text-[14px] font-serif font-bold text-vlanc-secondary">{data?.finePrint?.invoiceInfo}</p>
                             </div>
                         )}
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
};

export default Payment;
