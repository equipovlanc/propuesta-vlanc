
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface Guarantee {
    title?: string;
    description?: string;
    note?: string;
}

interface GuaranteesProps {
    data?: {
        title?: string;
        items?: Guarantee[];
    };
}

const SealIcon = () => (
    <div className="relative w-16 h-16 flex items-center justify-center mb-8">
        <div className="absolute inset-0 bg-vlanc-primary rounded-sm rotate-45 opacity-20"></div>
        <div className="absolute inset-0 bg-vlanc-primary rounded-sm rotate-0 opacity-10"></div>
        <div className="absolute inset-2 border border-vlanc-primary/40 rounded-full z-10 flex items-center justify-center">
            <span className="text-vlanc-primary font-serif text-2xl font-bold">V</span>
        </div>
    </div>
);

const Guarantees: React.FC<GuaranteesProps> = ({ data }) => {
    return (
        <section className="min-h-screen bg-vlanc-bg flex flex-col justify-center py-32 px-12 md:px-24">
            <div className="max-w-7xl mx-auto w-full">
                <AnimatedSection>
                    <h2 className="title-xl text-vlanc-secondary mb-4 font-bold tracking-tighter">
                       {data?.title || "nuestras garantías."}
                    </h2>
                    <div className="w-16 h-[2px] bg-vlanc-primary mb-20"></div>
                </AnimatedSection>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {(data?.items ?? []).map((item, i) => (
                         <AnimatedSection key={i} className="flex flex-col">
                            <SealIcon />
                            <h3 className="subtitle-md text-vlanc-primary font-bold mb-4 uppercase tracking-tighter">/ {item.title}</h3>
                            <div 
                                className="text-vlanc-black/70 text-[12px] leading-relaxed text-justify mb-4 whitespace-pre-line"
                                dangerouslySetInnerHTML={{ __html: item.description || '' }}
                            />
                            {item.note && <p className="text-[10px] text-vlanc-black/40 italic uppercase mt-4">{item.note}</p>}
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Guarantees;
