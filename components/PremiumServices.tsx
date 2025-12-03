
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

const ServiceCard: React.FC<{ title?: string, subtitle?: string, price?: string, description?: string[], note?: string }> = ({ title, subtitle, price, description, note }) => (
    <div className="bg-white p-4 md:p-5 h-full transition-all duration-300 hover:shadow-xl border-l-4 border-transparent hover:border-teal-400 flex flex-col">
        <div className="flex justify-between items-start mb-1 gap-2">
            <h3 className="text-sm md:text-base font-bold text-teal-600 uppercase leading-tight tracking-tight flex-1">{title}</h3>
            <span className="bg-gray-100 px-2 py-1 font-bold text-gray-800 text-xs whitespace-nowrap">{price}</span>
        </div>
        <h4 className="font-semibold text-gray-700 mb-2 text-xs uppercase tracking-wide">{subtitle}</h4>
        <div className="text-gray-600 space-y-1 text-xs flex-grow leading-tight">
            {(description ?? []).map((p, i) => (
                <div 
                    key={i} 
                    className="whitespace-pre-line" 
                    dangerouslySetInnerHTML={{ __html: p }} 
                />
            ))}
        </div>
        {note && <p className="text-[10px] text-gray-400 italic mt-2 border-t pt-1 leading-tight">{note}</p>}
    </div>
);

const PremiumServices: React.FC<PremiumServicesProps> = ({ data }) => {
    return (
        <section className="h-full bg-slate-100 flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full">
                 <AnimatedSection className="mb-6 lg:mb-8 ml-8 md:ml-0">
                    <div className="relative inline-block">
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-800">{data?.title}</h2>
                        <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-24 bg-teal-400 transform -rotate-12"></span>
                    </div>
                </AnimatedSection>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
                    {(data?.services ?? []).map((service, i) => (
                        <AnimatedSection key={i}>
                            <ServiceCard 
                                title={service.title}
                                subtitle={service.subtitle}
                                price={service.price}
                                description={service.description}
                                note={service.note}
                            />
                        </AnimatedSection>
                    ))}
                </div>
                <div className="mt-4 text-right space-y-1">
                    {(data?.notes ?? []).map((note, i) => (
                        <p key={i} className="text-[10px] text-gray-500 font-medium">{note}</p>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PremiumServices;
