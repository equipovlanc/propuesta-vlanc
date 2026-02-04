
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface Service {
    title?: string;
    subtitle?: string;
    price?: string;
    description?: string[];
    note?: string;
}

interface PremiumServicesProps {
    data?: {
        title?: string;
        services?: Service[];
        notes?: string[];
    }
}

const PremiumServices: React.FC<PremiumServicesProps> = ({ data }) => {
    return (
        <section className="min-h-screen bg-vlanc-bg flex flex-col justify-center py-32 px-12 md:px-24">
            <div className="max-w-7xl mx-auto w-full">
                 <AnimatedSection>
                    <h2 className="title-xl text-vlanc-secondary mb-4 font-bold tracking-tighter">
                       {data?.title || "servicios premium."}
                    </h2>
                    <div className="w-16 h-[2px] bg-vlanc-primary mb-20"></div>
                </AnimatedSection>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {(data?.services ?? []).map((service, i) => (
                        <AnimatedSection key={i} className="bg-white/40 p-10 border border-vlanc-primary/10 rounded-sm hover:bg-white/60 transition-all duration-500">
                             <div className="flex justify-between items-start mb-6">
                                <h3 className="text-[18px] font-serif font-bold text-vlanc-secondary leading-tight uppercase tracking-tighter">{service.title}</h3>
                                <span className="text-[14px] font-bold text-vlanc-primary font-sans">{service.price}</span>
                             </div>
                             <h4 className="text-[10px] font-bold text-vlanc-primary uppercase tracking-[0.2em] mb-6 italic">{service.subtitle}</h4>
                             <div className="text-vlanc-black/70 text-[12px] space-y-4 leading-relaxed text-justify">
                                {(service.description ?? []).map((p, idx) => (
                                    <p key={idx} dangerouslySetInnerHTML={{ __html: p }} />
                                ))}
                             </div>
                             {service.note && <p className="text-[10px] text-vlanc-black/40 italic mt-8 border-t border-vlanc-primary/10 pt-4 uppercase tracking-widest">{service.note}</p>}
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PremiumServices;
