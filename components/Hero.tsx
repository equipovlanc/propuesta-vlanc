
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
      
      {/* Portada Superior Izquierda: Info Técnica (Página 1 PDF) */}
      <div className="absolute top-12 left-12 text-left pointer-events-none">
        <div className="text-[11px] font-sans text-vlanc-black leading-[1.4] uppercase tracking-wider">
          <p className="font-bold mb-0.5">{headerData?.projectCode}</p>
          <p className="opacity-70">{headerData?.title}</p>
          
          <div className="mt-12 space-y-1">
            <p className="font-bold tracking-[0.15em]">{data?.clientName || headerData?.clientName}</p>
            <p className="text-[10px] opacity-50 font-medium normal-case">{headerData?.location}</p>
          </div>
        </div>
      </div>

      {/* Centro: Títulos */}
      <AnimatedSection className="text-center">
        <div className="space-y-4">
          <p className="text-[18px] md:text-[24px] text-vlanc-secondary uppercase tracking-[0.4em] mb-6 font-sans font-medium">
            {data?.clientName || headerData?.clientName}
          </p>
          <h1 className="text-4xl md:text-[72px] text-vlanc-secondary tracking-tighter font-bold font-serif leading-[1.05] uppercase">
            {data?.line1}
          </h1>
          <h1 className="text-4xl md:text-[72px] text-vlanc-secondary tracking-tighter font-bold font-serif leading-[1.05] uppercase">
            {data?.line2}
          </h1>
          <div className="w-24 h-[1.5px] bg-vlanc-primary/60 mx-auto mt-20"></div>
        </div>
      </AnimatedSection>

      {/* Esquina Inferior Derecha: Logo Portada */}
      <div className="absolute bottom-12 right-12 text-right flex flex-col items-end">
        <div className="w-[240px] md:w-[320px] h-[90px] flex items-center justify-end">
            {logo ? (
                <img src={logo} alt="Studio Logo" className="max-h-full w-auto object-contain" />
            ) : (
                <div className="w-full h-full border border-vlanc-black/10 bg-vlanc-black/5 flex flex-col items-center justify-center p-4">
                    <span className="text-[32px] font-serif font-bold tracking-[0.2em] text-vlanc-black/10 leading-none">VLANC</span>
                    <span className="text-[7px] tracking-[0.2em] text-vlanc-primary/30 font-bold uppercase mt-2">Logo Principal Portada</span>
                </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
