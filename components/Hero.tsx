
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface HeroProps {
  data?: {
    clientName?: string;
    line1?: string;
    line2?: string;
  };
  headerData?: {
    projectCode?: string;
    title?: string;
    clientName?: string;
    location?: string;
  };
  logo?: string | null;
}

const Hero: React.FC<HeroProps> = ({ data, headerData, logo }) => {
  return (
    <section id="hero-section" className="min-h-screen w-full flex flex-col justify-center items-center relative bg-vlanc-bg px-12 md:px-24 py-32">
      
      {/* Esquina Superior Izquierda: Info Técnica (Página 1 PDF) */}
      <div className="absolute top-16 left-16 text-left pointer-events-none space-y-0.5">
        <div className="text-[12px] font-serif text-vlanc-black leading-tight">
          <p className="font-normal">{headerData?.projectCode}</p>
          <p className="font-normal">{headerData?.title}</p>
        </div>
        
        <div className="pt-6 text-[12px] font-sans text-vlanc-secondary leading-tight uppercase tracking-wider">
          <p className="font-medium">{data?.clientName || headerData?.clientName}</p>
          <p className="opacity-60 font-normal normal-case">{headerData?.location}</p>
        </div>
      </div>

      {/* Centro: Títulos */}
      <AnimatedSection className="text-center">
        <div className="space-y-6">
          <p className="text-[21px] text-vlanc-secondary uppercase tracking-[0.4em] mb-8 font-sans font-medium">
            {data?.clientName || headerData?.clientName}
          </p>
          <h1 className="title-pdf text-vlanc-secondary font-bold uppercase">
            {data?.line1}
          </h1>
          <h1 className="title-pdf text-vlanc-secondary font-bold uppercase">
            {data?.line2}
          </h1>
          <div className="w-28 h-[1.5px] bg-vlanc-primary/80 mx-auto mt-20"></div>
        </div>
      </AnimatedSection>

      {/* Esquina Inferior Derecha: Logo Portada (Tamaño aumentado) */}
      <div className="absolute bottom-16 right-16 text-right flex flex-col items-end">
        <div className="w-[280px] md:w-[350px] h-[100px] flex items-center justify-end">
            {logo ? (
                <img src={logo} alt="Studio Logo" className="max-h-full w-auto object-contain" />
            ) : (
                <div className="w-full h-full border border-vlanc-black/10 bg-vlanc-black/5 flex flex-col items-center justify-center p-4">
                    <span className="text-[36px] font-serif font-bold tracking-[0.2em] text-vlanc-black/10 leading-none">VLANC</span>
                    <span className="text-[7px] tracking-[0.3em] text-vlanc-primary/40 font-bold uppercase mt-2">ARQUITECTURA + INTERIORISMO</span>
                </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
