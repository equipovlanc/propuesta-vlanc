
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface Service {
    title?: string;
    subtitle?: string;
    price?: string;
    description?: string[];
}

interface PremiumServicesProps {
    data?: {
        title?: string;
        services?: Service[];
    }
}

const ServiceCard: React.FC<{ title?: string, subtitle?: string, price?: string, description?: string[] }> = ({ title, subtitle, price, description }) => (
    <div className="bg-slate-50 p-8 h-full transition-all duration-300 hover:bg-white hover:shadow-2xl">
        <div className="flex justify-between items-baseline mb-4">
            <h3 className="text-xl font-semibold text-teal-600">&gt; {title}</h3>
            <span className="font-bold text-lg">{price}</span>
        </div>
        <h4 className="font-semibold text-gray-700 mb-4">{subtitle}</h4>
        <div className="text-gray-600 space-y-3">
            {(description ?? []).map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
        </div>
    </div>
);

const PremiumServices: React.FC<PremiumServicesProps> = ({ data }) => {
    return (
        <section className="py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-slate-100">
            <div className="max-w-7xl mx-auto">
                 <AnimatedSection className="text-center mb-16">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">{data?.title}</h2>
                    <span className="block mx-auto mt-4 w-1 h-24 bg-teal-400 transform -rotate-12"></span>
                </AnimatedSection>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    {(data?.services ?? []).map((service, i) => (
                        <AnimatedSection key={i}>
                            <ServiceCard 
                                title={service.title}
                                subtitle={service.subtitle}
                                price={service.price}
                                description={service.description}
                            />
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PremiumServices;
