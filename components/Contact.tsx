
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface SocialMedia {
    name?: string;
    url?: string;
    icon?: string;
}

interface ContactProps {
    data?: {
        location?: { title?: string; address?: string; email?: string };
        phone?: { title?: string; numbers?: string[] };
        web?: { title?: string; url?: string; displayText?: string };
        rrss?: SocialMedia[];
    };
    finalLogo?: string | null;
}

const Contact: React.FC<ContactProps> = ({ data, finalLogo }) => {
    return (
        /* Ajuste de márgenes globales: pt-[150px], pb-[140px] */
        <footer className="h-screen pt-[150px] pb-[140px] px-[120px] bg-vlanc-bg flex items-center justify-center">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center w-full">
                
                {/* Lado Izquierdo: Logo de Cierre */}
                <AnimatedSection className="flex justify-center">
                    <div className="w-[450px] h-[450px] flex items-center justify-center">
                        {finalLogo ? (
                            <img src={finalLogo} alt="Final Logo" className="w-full h-auto object-contain" />
                        ) : (
                             // Fallback visual
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
                <div className="space-y-12 text-left">
                    <AnimatedSection>
                        <h4 className="text-[14px] font-bold text-vlanc-black tracking-[0.2em] mb-4">/ {data?.location?.title}</h4>
                        <div className="text-[13px] text-vlanc-secondary space-y-1 leading-relaxed font-sans">
                            <p>{data?.location?.address}</p>
                            <p className="text-vlanc-primary font-bold">{data?.location?.email}</p>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection>
                        <h4 className="text-[14px] font-bold text-vlanc-black tracking-[0.2em] mb-4">/ {data?.phone?.title}</h4>
                        <div className="text-[13px] text-vlanc-secondary space-y-1 font-sans">
                            {(data?.phone?.numbers ?? []).map((n, i) => (
                                <p key={i} className="font-medium tracking-widest">{n}</p>
                            ))}
                        </div>
                    </AnimatedSection>

                    <AnimatedSection>
                        <h4 className="text-[14px] font-bold text-vlanc-black tracking-[0.2em] mb-4">/ {data?.web?.title}</h4>
                        <a href={data?.web?.url} target="_blank" className="text-[14px] font-bold border-b border-vlanc-primary text-vlanc-secondary hover:text-vlanc-primary transition-colors tracking-widest">
                            {data?.web?.displayText}
                        </a>
                    </AnimatedSection>

                    {/* Nueva sección RRSS */}
                    <AnimatedSection>
                         <h4 className="text-[14px] font-bold text-vlanc-black tracking-[0.2em] mb-4">/ RRSS</h4>
                         <div className="flex gap-6">
                            {(data?.rrss ?? []).map((social, i) => (
                                <a key={i} href={social.url} target="_blank" className="hover:opacity-60 transition-opacity">
                                    {social.icon ? (
                                        <img src={social.icon} alt={social.name} className="w-6 h-6 object-contain" />
                                    ) : (
                                        <span className="text-[10px] font-bold text-vlanc-secondary">{social.name}</span>
                                    )}
                                </a>
                            ))}
                         </div>
                    </AnimatedSection>
                    
                    {/* Barra decorativa actualizada: 112x5px, color #703622, mt-50px */}
                    <div className="w-[112px] h-[5px] bg-[#703622] mt-[50px]"></div>
                </div>
            </div>
        </footer>
    );
};

export default Contact;
