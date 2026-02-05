
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
    data?: Service;
    image?: string;
}

const PremiumServices: React.FC<PremiumServicesProps> = ({ data, image }) => {
    return (
        <section className="min-h-screen flex flex-col lg:flex-row bg-vlanc-bg">
            {/* Lado Contenido */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-12 md:px-24 py-24">
                <AnimatedSection>
                    <h2 className="subtitle-pdf text-vlanc-black font-normal lowercase mb-4">servicios premium.</h2>
                    <div className="w-20 h-[2px] bg-vlanc-primary mb-16"></div>
                </AnimatedSection>
                
                <AnimatedSection className="space-y-12">
                    <div className="space-y-4">
                         {/* Subtítulo 2 (Nombre Servicio - NO Italic según PDF P19) */}
                        <h3 className="text-[24px] font-serif font-normal text-vlanc-black">/ {data?.subtitle}</h3>
                         {/* Subtítulo 3 (Bajada - Negrita) */}
                        <h4 className="text-[14px] font-bold text-vlanc-black uppercase tracking-widest font-sans">{data?.title}</h4>
                    </div>
                    
                    {/* Cuerpo Marrón */}
                    <div className="text-[12px] text-vlanc-secondary space-y-6 leading-relaxed text-justify max-w-lg font-sans">
                        {(data?.description ?? []).map((p, i) => (
                            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                        ))}
                    </div>
                    
                    {data?.note && <p className="text-[10px] text-vlanc-black/40 italic uppercase tracking-widest border-t border-vlanc-primary/10 pt-6">{data.note}</p>}
                    
                    {data?.price && (
                        <div className="inline-block bg-[#8f4933] px-8 py-4 text-white font-bold text-[14px] tracking-[0.2em] rounded-[1px] shadow-lg">
                            {data.price}
                        </div>
                    )}
                </AnimatedSection>
            </div>

            {/* Lado Imagen */}
            <div className="w-full lg:w-1/2 min-h-[500px] lg:h-auto overflow-hidden">
                <AnimatedSection className="h-full">
                    {image ? (
                        <img src={image} alt={data?.title} className="w-full h-full object-cover grayscale brightness-95 opacity-90 transition-all duration-1000 hover:grayscale-0" />
                    ) : (
                        <div className="w-full h-full bg-vlanc-black/5 flex items-center justify-center">
                            <span className="text-[10px] uppercase tracking-widest text-vlanc-black/20">Imagen Servicio Premium</span>
                        </div>
                    )}
                </AnimatedSection>
            </div>
        </section>
    );
};

export default PremiumServices;
