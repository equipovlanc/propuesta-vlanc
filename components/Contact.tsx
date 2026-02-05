
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface ContactProps {
    data?: {
        location?: { title?: string; address?: string; email?: string };
        phone?: { title?: string; numbers?: string[] };
        web?: { title?: string; url?: string; displayText?: string };
    };
    finalLogo?: string | null;
}

const Contact: React.FC<ContactProps> = ({ data, finalLogo }) => {
    return (
        <footer className="h-screen py-32 px-12 md:px-24 bg-vlanc-bg flex items-center justify-center">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center w-full">
                
                {/* Lado Izquierdo: Logo de Cierre Real desde Sanity */}
                <AnimatedSection className="flex justify-center">
                    <div className="w-[400px] h-[400px] flex items-center justify-center">
                        {finalLogo ? (
                            <img src={finalLogo} alt="Final Logo" className="w-full h-auto object-contain" />
                        ) : (
                             // Fallback visual estilo diagrama solo si no hay logo
                             <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                                <div className="w-56 h-56 bg-vlanc-primary rounded-full flex items-center justify-center text-white shadow-2xl z-10">
                                    <span className="text-4xl font-serif font-bold tracking-[0.3em]">VLANC</span>
                                </div>
                                <div className="absolute inset-0 border-[1.5px] border-vlanc-primary/10 rounded-full"></div>
                            </div>
                        )}
                    </div>
                </AnimatedSection>

                {/* Lado Derecho: Bloques de Información */}
                <div className="space-y-16 text-left">
                    <AnimatedSection>
                        <h4 className="text-[14px] font-bold text-vlanc-black uppercase tracking-[0.2em] mb-4">/ {data?.location?.title}</h4>
                        <div className="text-[13px] text-vlanc-black/70 space-y-1 leading-relaxed">
                            <p>{data?.location?.address}</p>
                            <p className="text-vlanc-primary font-bold">{data?.location?.email}</p>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection>
                        <h4 className="text-[14px] font-bold text-vlanc-black uppercase tracking-[0.2em] mb-4">/ {data?.phone?.title}</h4>
                        <div className="text-[13px] text-vlanc-black/70 space-y-1">
                            {(data?.phone?.numbers ?? []).map((n, i) => (
                                <p key={i} className="font-medium tracking-widest">{n}</p>
                            ))}
                        </div>
                    </AnimatedSection>

                    <AnimatedSection>
                        <h4 className="text-[14px] font-bold text-vlanc-black uppercase tracking-[0.2em] mb-4">/ {data?.web?.title}</h4>
                        <a href={data?.web?.url} target="_blank" className="text-[14px] font-bold border-b border-vlanc-primary text-vlanc-black hover:text-vlanc-primary transition-colors tracking-widest uppercase">
                            {data?.web?.displayText}
                        </a>
                    </AnimatedSection>

                    <div className="w-24 h-[1.5px] bg-vlanc-primary mt-12"></div>
                </div>
            </div>
        </footer>
    );
};

export default Contact;
