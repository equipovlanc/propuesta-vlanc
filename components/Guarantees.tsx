
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
    <div className="w-16 h-16 mb-8 text-vlanc-black border-[1.5px] border-vlanc-black rounded-full flex items-center justify-center relative shrink-0">
         <div className="absolute -right-2 -bottom-1 bg-vlanc-bg p-1">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                 <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
         </div>
         <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
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
                         <AnimatedSection key={i} className="flex flex-col items-start border-l border-vlanc-primary/20 pl-8">
                            <SealIcon />
                            {/* Subtítulo 2 (Nombre garantía) */}
                            <h3 className="text-[32px] font-serif italic text-vlanc-black mb-6 leading-tight">/ {item.title}</h3>
                            {/* Cuerpo Marrón */}
                            <div 
                                className="text-vlanc-secondary text-[12px] leading-relaxed text-justify mb-4 whitespace-pre-line font-sans"
                                dangerouslySetInnerHTML={{ __html: item.description || '' }}
                            />
                            {item.note && <p className="text-[10px] text-vlanc-secondary/60 italic mt-6 border-t border-vlanc-secondary/10 pt-4 w-full">{item.note}</p>}
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Guarantees;
