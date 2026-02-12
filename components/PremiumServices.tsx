
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
    index?: number;
}

const PremiumServices: React.FC<PremiumServicesProps> = ({ data, image, index = 0 }) => {
    return (
        <section className="h-full w-full flex flex-row">
            {/* Left Column: Fixed 888px width, vlanc-bg (#efe8e1) */}
            <div className="w-[888px] h-full bg-vlanc-bg flex flex-col justify-start pl-[120px] pr-10 pt-[150px] pb-[140px] shrink-0 overflow-y-auto no-scrollbar relative z-10">
                
                {/* Cabecera Principal */}
                <AnimatedSection className="mb-12 shrink-0">
                    <h2 className="subtitulo1">
                        {index === 0 ? (
                            <>servicios<br />premium.</>
                        ) : (
                            "servicios premium."
                        )}
                    </h2>
                    {/* Barra decorativa (#8f4933) */}
                    <div className="w-[112px] h-[5px] bg-[#8f4933] mt-[40px]"></div>
                </AnimatedSection>
                
                <AnimatedSection className="flex-grow flex flex-col justify-center max-w-xl">
                    
                    {/* 1. Nombre Servicio (Subtítulo 2) */}
                    <h3 className="subtitulo2 not-italic mb-4">
                        / {data?.subtitle}
                    </h3>
                    
                    {/* 2. Línea separadora (Entre títulos) */}
                    <div className="w-full h-[1px] bg-[#8f4933] mb-8"></div>

                    {/* 3. Bajada (Subtítulo 4) */}
                    {/* mb-5 para igualar visualmente el space-y-5 del cuerpo */}
                    <h4 className="subtitulo4 mb-5">
                        {data?.title}
                    </h4>

                    {/* 4. Descripción Cuerpo Normal */}
                    {/* space-y-5 (20px) para los saltos de línea del texto */}
                    <div className="cuerpo space-y-5">
                        {(data?.description ?? []).map((p, i) => (
                            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                        ))}
                    </div>
                    
                    {/* Notas */}
                    {data?.note && (
                        <div className="mt-8">
                             <p className="text-[10px] text-vlanc-secondary/60 italic w-full uppercase tracking-wider">
                                {data.note}
                            </p>
                        </div>
                    )}
                    
                    {/* Botón Precio */}
                    {data?.price && (
                        <div className="mt-8 self-start bg-[#8f4933] text-white px-8 py-3 rounded-[1px] shadow-sm flex items-center justify-center cursor-default">
                            <span className="boton1 text-white tracking-[0.1em]">{data.price}</span>
                        </div>
                    )}
                </AnimatedSection>
            </div>

            {/* Right Column: Rest of width, white bg, centered image 827x709 */}
            <div className="flex-grow h-full bg-white flex items-center justify-center relative overflow-hidden z-0">
                <AnimatedSection>
                    <div className="w-[827px] h-[709px] relative shrink-0">
                        {image ? (
                            <img src={image} alt={data?.title} className="w-full h-full object-cover grayscale brightness-95 opacity-90 hover:grayscale-0 transition-all duration-1000" />
                        ) : (
                            <div className="w-full h-full bg-vlanc-black/5 flex items-center justify-center">
                                <span className="text-[10px] uppercase tracking-widest text-vlanc-black/20">Imagen 827x709</span>
                            </div>
                        )}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default PremiumServices;
