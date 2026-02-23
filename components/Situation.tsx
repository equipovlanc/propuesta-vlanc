
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface SituationProps {
  data?: {
    title?: string;
    paragraphs?: string[];
    image?: { src: string; opacity?: number };
  }
}

const Situation: React.FC<SituationProps> = ({ data }) => {
  const imageSrc = data?.image?.src;
  const imageOpacity = data?.image?.opacity ?? 15;

  return (
    <section className="h-full w-full flex flex-col lg:flex-row overflow-hidden items-stretch">
        
        {/* COLUMNA TEXTO */}
        <div className="w-full lg:flex-1 flex flex-col h-full px-10 lg:pl-[120px] lg:pr-[120px] pt-0 pb-[140px]">
            
            {/* ESPACIO SUPERIOR / TÍTULO (J1) */}
            <div className="flex-grow flex flex-col justify-center">
                <AnimatedSection hierarchy={1}>
                    <h2 className="subtitulo1">
                        {data?.title || "la situación."}
                    </h2>
                </AnimatedSection>
                <AnimatedSection mode="bar" className="w-[112px] h-[5px] bg-[#8f4933] mt-[27px]" />
            </div>
            
            {/* CUERPO DE TEXTO (J2) */}
            <div className="shrink-0">
                <AnimatedSection hierarchy={2}>
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
        
        {/* COLUMNA IMAGEN (J0) */}
        <div className="hidden lg:block w-[720px] h-full mr-[120px] shrink-0 relative">
            <AnimatedSection className="h-full w-full" hierarchy={0}>
                {imageSrc ? (
                  <div className="relative w-full h-full">
                    <img 
                        src={imageSrc} 
                        alt="Atmosphere" 
                        className="w-full h-full object-cover" 
                    />
                    <div 
                        className="absolute inset-0 pointer-events-none" 
                        style={{ backgroundColor: `rgba(143, 73, 51, ${imageOpacity / 100})` }}
                    />
                  </div>
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
