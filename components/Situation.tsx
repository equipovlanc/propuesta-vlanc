
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
    <section className="min-h-screen flex flex-col lg:flex-row bg-vlanc-bg overflow-hidden">
        <div className="w-full lg:w-3/5 flex flex-col justify-center px-10 py-24">
            <AnimatedSection>
                <h2 className="subtitulo1 mb-4 tracking-tighter">
                   {data?.title || "la situación."}
                </h2>
                <div className="w-20 h-[2px] bg-vlanc-primary mb-12"></div>
            </AnimatedSection>
            
            <AnimatedSection>
                <div className="space-y-4 max-w-2xl">
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
        
        <div className="w-full lg:w-2/5 min-h-[500px] lg:h-auto">
            <AnimatedSection className="h-full">
                {data?.image ? (
                  <img 
                    src={data.image} 
                    alt="Atmosphere" 
                    className="w-full h-full object-cover grayscale brightness-90" 
                  />
                ) : (
                  <div className="w-full h-full bg-vlanc-black/5 flex items-center justify-center">
                      <span className="text-[10px] uppercase tracking-widest text-vlanc-black/20">Imagen Situación</span>
                  </div>
                )}
            </AnimatedSection>
        </div>
    </section>
  );
};

export default Situation;
