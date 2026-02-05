
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
            - justify-end: Texto pegado abajo.
            - pb-[120px]: Margen inferior global.
            - pt-32: Espacio superior para cabecera.
            - Margenes laterales 120px.
        */}
        <div className="w-full lg:flex-1 flex flex-col justify-end px-10 lg:pl-[120px] lg:pr-[120px] pt-32 pb-[120px]">
            <AnimatedSection>
                <h2 className="subtitulo1 mb-4 tracking-tighter">
                   {data?.title || "la situación."}
                </h2>
                <div className="w-20 h-[2px] bg-vlanc-primary mb-12"></div>
            </AnimatedSection>
            
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
        
        {/* COLUMNA IMAGEN
            - w-[720px]: Ancho fijo.
            - mr-[120px]: Margen derecho.
            - h-full: A sangre verticalmente.
        */}
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
