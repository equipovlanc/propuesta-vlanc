
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
    location?: string;
  };
  logo?: string | null;
}

const Hero: React.FC<HeroProps> = ({ data, headerData, logo }) => {
  return (
    <section id="hero-section" className="min-h-screen w-full flex flex-col justify-center items-center relative bg-vlanc-bg px-12 md:px-24 py-32">
      
      {/* Esquina Superior Izquierda: Bloque Técnico Exclusivo Portada (Página 1) */}
      <div className="absolute top-12 left-12 text-left pointer-events-none">
        <div className="text-[11px] font-sans text-vlanc-black leading-tight">
          <p className="font-bold tracking-[0.05em] mb-0.5">{headerData?.projectCode}</p>
          <p className="opacity-80 font-medium">{headerData?.title}</p>
          
          <div className="mt-8 space-y-0.5">
            <p className="font-bold uppercase tracking-[0.1em]">{data?.clientName}</p>
            <p className="text-[10px] opacity-60 font-medium">{headerData?.location}</p>
          </div>
        </div>
      </div>

      {/* Título Central */}
      <AnimatedSection className="text-center">
        <div className="space-y-6">
          <p className="text-[16px] text-vlanc-secondary uppercase tracking-[0.4em] mb-4 font-sans font-medium">
            {data?.clientName}
          </p>
          <h1 className="text-4xl md:text-[68px] text-vlanc-secondary tracking-tight font-bold font-serif leading-[1.1] uppercase">
            {data?.line1}
          </h1>
          <h1 className="text-4xl md:text-[68px] text-vlanc-secondary tracking-tight font-bold font-serif leading-[1.1] uppercase">
            {data?.line2}
          </h1>
          <div className="w-24 h-[1.5px] bg-vlanc-primary/60 mx-auto mt-16"></div>
        </div>
      </AnimatedSection>

      {/* Esquina Inferior Derecha: Logotipo Principal Portada */}
      <div className="absolute bottom-12 right-12 text-right flex flex-col items-end">
        <div className="w-[220px] md:w-[260px] h-[70px] flex items-center justify-end">
            {logo ? (
                <img src={logo} alt="VLANC Architecture" className="max-h-full w-auto object-contain" />
            ) : (
                <div className="w-full h-full border border-vlanc-black/10 bg-vlanc-black/5 flex flex-col items-center justify-center p-4 rounded-sm">
                    <span className="text-[32px] font-serif font-bold tracking-[0.2em] text-vlanc-black/20 leading-none">VLANC</span>
                    <span className="text-[6px] tracking-[0.3em] text-vlanc-primary font-bold uppercase mt-2 opacity-40">Main Logo Portada</span>
                </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
