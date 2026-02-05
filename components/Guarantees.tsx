
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
    <div className="w-12 h-12 mb-6 text-vlanc-black border-[1.5px] border-vlanc-black rounded-full flex items-center justify-center relative">
         <div className="absolute -right-1 -bottom-1">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                 <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
         </div>
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
             <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
         </svg>
    </div>
);

const Guarantees: React.FC<GuaranteesProps> = ({ data }) => {
    return (
        <section className="min-h-screen bg-vlanc-bg flex flex-col justify-center py-32 px-12 md:px-24">
            <div className="max-w-7xl mx-auto w-full">
                <AnimatedSection>
                    {/* Subtítulo 1 */}
                    <h2 className="subtitle-pdf text-vlanc-black mb-4 font-normal tracking-tighter lowercase">
                       {data?.title || "nuestras garantías."}
                    </h2>
                    <div className="w-20 h-[2px] bg-vlanc-primary mb-20"></div>
                </AnimatedSection>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {(data?.items ?? []).map((item, i) => (
                         <AnimatedSection key={i} className="flex flex-col items-start">
                            <SealIcon />
                            {/* Subtítulo 2 (Nombre garantía) */}
                            <h3 className="text-[32px] font-serif italic text-vlanc-black mb-6">/ {item.title}</h3>
                            {/* Cuerpo Marrón */}
                            <div 
                                className="text-vlanc-secondary text-[12px] leading-relaxed text-justify mb-4 whitespace-pre-line"
                                dangerouslySetInnerHTML={{ __html: item.description || '' }}
                            />
                            {item.note && <p className="text-[10px] text-vlanc-secondary/60 italic mt-4 border-t border-vlanc-secondary/10 pt-2 w-full">{item.note}</p>}
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Guarantees;
