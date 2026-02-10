
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface SituationProps {
  data?: {
    title?: string;
    paragraphs?: string[];
    image?: string;
  }
}

const Situation: React.FC<SituationProps> = ({ data }) => {
  return (
    <section className="h-full w-full flex flex-col lg:flex-row bg-vlanc-bg overflow-hidden items-stretch">
        
        {/* COLUMNA TEXTO 
            - Ajuste márgenes: pb-[140px]
        */}
        <div className="w-full lg:flex-1 flex flex-col h-full px-10 lg:pl-[120px] lg:pr-[120px] pt-0 pb-[140px]">
            
            {/* ESPACIO SUPERIOR / TÍTULO */}
            <div className="flex-grow flex flex-col justify-center">
                <AnimatedSection>
                    <h2 className="subtitulo1 tracking-tighter">
                        {data?.title || "la situación."}
                    </h2>
                    {/* Barra decorativa actualizada */}
                    <div className="w-[112px] h-[5px] bg-[#703622] mt-[50px]"></div>
                </AnimatedSection>
            </div>
            
            {/* CUERPO DE TEXTO */}
            <div className="shrink-0">
                <AnimatedSection>
                    <div className="space-y-4">
                        {data?.paragraphs && data.paragraphs.length > 0 ? (
                        data.paragraphs.map((p, i) => (
                            <p 
                                key={i} 
                                className="cuerpo" 
                                dangerouslySetInnerHTML={{ __html: p }} 
                            />
                        ))
                        ) : (
                        <p className="italic text-vlanc-black/30">Rellena los párrafos de situación en Sanity...</p>
                        )}
                    </div>
                </AnimatedSection>
            </div>
        </div>
        
        {/* COLUMNA IMAGEN */}
        <div className="hidden lg:block w-[720px] h-full mr-[120px] shrink-0 relative">
            <AnimatedSection className="h-full w-full">
                {data?.image ? (
                  <img 
                    src={data.image} 
                    alt="Atmosphere" 
                    className="w-full h-full object-cover grayscale brightness-90" 
                  />
                ) : (
                  <div className="w-full h-full bg-vlanc-black/5 flex items-center justify-center">
                      <span className="text-[10px] uppercase tracking-widest text-vlanc-black/20">Imagen Situación (720px)</span>
                  </div>
                )}
            </AnimatedSection>
        </div>
    </section>
  );
};

export default Situation;
