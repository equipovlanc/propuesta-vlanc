
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
        <section className="h-full w-full flex flex-col lg:flex-row bg-vlanc-bg">
            {/* Lado Contenido (Izquierda) */}
            <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-12 md:px-24 py-12 overflow-y-auto no-scrollbar">
                <AnimatedSection className="mb-12">
                    <h2 className="subtitle-pdf text-vlanc-black font-normal mb-4 tracking-tighter">servicios premium.</h2>
                    <div className="w-20 h-[2px] bg-vlanc-primary"></div>
                </AnimatedSection>
                
                <AnimatedSection className="space-y-12 flex-grow flex flex-col justify-center">
                    <div className="space-y-2">
                         {/* Subtítulo 2 (Nombre Servicio) - Baskerville Regular (font-normal) */}
                        <h3 className="text-[28px] font-serif font-normal text-vlanc-black">/ {data?.subtitle}</h3>
                         {/* Subtítulo 3 (Bajada) - Sans Bold Uppercase */}
                        <h4 className="text-[12px] font-bold text-vlanc-black tracking-widest font-sans uppercase">{data?.title}</h4>
                    </div>
                    
                    {/* Cuerpo Marrón */}
                    <div className="text-[12px] text-vlanc-secondary space-y-6 leading-relaxed text-justify max-w-lg font-sans">
                        {(data?.description ?? []).map((p, i) => (
                            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                        ))}
                    </div>
                    
                    {/* Nota Italic */}
                    {data?.note && <p className="text-[10px] text-vlanc-black/40 italic uppercase tracking-widest border-t border-vlanc-primary/10 pt-6">{data.note}</p>}
                    
                    {/* Caja Precio Sólida */}
                    {data?.price && (
                        <div className="mt-8 self-start bg-[#8f4933] text-white px-10 py-4 text-[14px] font-bold tracking-[0.2em] rounded-[1px] shadow-sm uppercase">
                            {data.price}
                        </div>
                    )}
                </AnimatedSection>
            </div>

            {/* Lado Imagen (Derecha) */}
            <div className="w-full lg:w-1/2 h-full relative overflow-hidden">
                <AnimatedSection className="h-full w-full">
                    {image ? (
                        <img src={image} alt={data?.title} className="w-full h-full object-cover grayscale brightness-95 opacity-90 hover:grayscale-0 transition-all duration-1000" />
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
