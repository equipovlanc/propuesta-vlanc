
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

const GuaranteeBadge = ({ index }: { index: number }) => {
    return (
        <div className="relative w-20 h-20 mb-8">
            <svg viewBox="0 0 100 100" className="w-full h-full text-vlanc-black stroke-current fill-none absolute top-0 left-0 animate-[spin_20s_linear_infinite]">
                 <circle cx="50" cy="50" r="48" strokeWidth="1" />
                 <path d="M50,2 A48,48 0 0,1 50,98 A48,48 0 0,1 50,2" strokeDasharray="4 4" strokeWidth="0.5" />
            </svg>
            
            <div className="absolute inset-0 flex items-center justify-center">
                 {index === 0 && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8 text-vlanc-black">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                 )}
                 {index === 1 && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8 text-vlanc-black">
                         <circle cx="12" cy="12" r="10"></circle>
                         <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                 )}
                 {index === 2 && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8 text-vlanc-black">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                 )}
            </div>
             
             <div className="absolute -bottom-1 -right-1 bg-vlanc-bg rounded-full p-1 border border-vlanc-black">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-vlanc-black">
                    <polyline points="20 6 9 17 4 12"></polyline>
                 </svg>
             </div>
        </div>
    )
}

const Guarantees: React.FC<GuaranteesProps> = ({ data }) => {
    return (
        <section className="h-full w-full bg-vlanc-bg flex flex-col justify-start px-[120px] pt-[150px] pb-[140px]">
            <div className="w-full flex justify-end mb-24">
                <AnimatedSection>
                    <div className="text-right flex flex-col items-end">
                        <h2 className="subtitulo1 tracking-tighter">
                            {data?.title || "nuestras garantías."}
                        </h2>
                        {/* Barra decorativa actualizada. CAMBIO: mt-[50px] -> mt-[40px] */}
                        <div className="w-[112px] h-[5px] bg-[#703622] mt-[40px]"></div>
                    </div>
                </AnimatedSection>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
                {(data?.items ?? []).map((item, i) => (
                     <AnimatedSection key={i} className="flex flex-col items-start">
                        <GuaranteeBadge index={i} />
                        
                        {/* Subtitulo 2 */}
                        <h3 className="subtitulo2 mb-6 leading-tight">
                            / {item.title}
                        </h3>
                        
                        <div 
                            className="cuerpo mb-4"
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
