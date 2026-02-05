
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

const GuaranteeIcon = ({ index }: { index: number }) => {
    // Iconos abstractos que imitan los sellos del PDF
    if (index === 0) { // Somos tu equipo
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-16 h-16 text-vlanc-black mb-6">
                 <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                 <path d="M9 12l2 2 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        )
    }
    if (index === 1) { // Proceso
         return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-16 h-16 text-vlanc-black mb-6">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
            </svg>
        )
    }
    return ( // Soporte
         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-16 h-16 text-vlanc-black mb-6">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <path d="M22 4L12 14.01l-3-3" strokeWidth="2"/>
         </svg>
    )
}

const Guarantees: React.FC<GuaranteesProps> = ({ data }) => {
    return (
        <section className="h-full w-full bg-vlanc-bg flex flex-col justify-center px-12 md:px-24 py-16">
            <div className="w-full flex justify-end mb-16">
                <AnimatedSection>
                    <div className="text-right">
                        <h2 className="subtitle-pdf text-vlanc-black mb-4 font-normal tracking-tighter">
                        {data?.title || "nuestras garantías."}
                        </h2>
                        <div className="w-20 h-[2px] bg-vlanc-primary ml-auto"></div>
                    </div>
                </AnimatedSection>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
                {(data?.items ?? []).map((item, i) => (
                     <AnimatedSection key={i} className="flex flex-col items-start relative pl-6 border-l border-vlanc-black/10">
                        <GuaranteeIcon index={i} />
                        
                        <h3 className="text-[28px] font-serif font-normal text-vlanc-black mb-6 leading-tight">/ {item.title}</h3>
                        
                        <div 
                            className="text-vlanc-secondary text-[12px] leading-relaxed text-justify mb-4 whitespace-pre-line font-sans"
                            dangerouslySetInnerHTML={{ __html: item.description || '' }}
                        />
                        
                        {item.note && (
                            <p className="text-[10px] text-vlanc-secondary/60 italic mt-8 border-t border-vlanc-secondary/10 pt-4 w-full">
                                {item.note}
                            </p>
                        )}
                    </AnimatedSection>
                ))}
            </div>
        </section>
    );
};

export default Guarantees;
