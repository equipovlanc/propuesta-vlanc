
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
    <section id="hero-section" className="min-h-screen w-full flex flex-col justify-center items-center relative bg-vlanc-bg px-10 py-32">
      
      {/* Esquina Superior Izquierda: Info Técnica (Mantiene Montserrat) */}
      <div className="absolute top-20 left-20 text-left pointer-events-none">
        <div className="flex flex-col gap-6">
            <div className="text-[14px] font-serif text-vlanc-black leading-tight">
                <p className="font-normal">{headerData?.projectCode}</p>
                <p className="font-normal">{headerData?.title}</p>
            </div>
            
            <div className="w-12 h-[1px] bg-vlanc-black"></div>

            <div className="text-[14px] font-sans text-vlanc-secondary leading-tight tracking-wider">
                <p className="font-medium">{data?.clientName || headerData?.clientName}</p>
                <p className="opacity-80 font-normal">{headerData?.location}</p>
            </div>
        </div>
      </div>

      {/* Centro: Títulos */}
      <AnimatedSection className="text-center">
        <div className="space-y-6">
          <p className="text-[21px] text-vlanc-secondary tracking-[0.4em] mb-10 font-sans font-medium">
            {data?.clientName || headerData?.clientName}
          </p>
          
          {/* Uso de la clase .titulo */}
          <h1 className="titulo">
            {data?.line1}
          </h1>
          <h1 className="titulo">
            {data?.line2}
          </h1>
          
          <div className="w-32 h-[2px] bg-vlanc-primary/80 mx-auto mt-24"></div>
        </div>
      </AnimatedSection>

      {/* Esquina Inferior Derecha: Logo */}
      <div className="absolute bottom-16 right-16 text-right flex flex-col items-end">
        <div className="w-[500px] md:w-[600px] h-[200px] flex items-center justify-end">
            {logo ? (
                <img src={logo} alt="Studio Logo" className="max-h-full w-auto object-contain" />
            ) : (
                <div className="w-full h-full border border-vlanc-black/10 bg-vlanc-black/5 flex flex-col items-center justify-center p-4">
                    <span className="text-[52px] font-serif font-normal tracking-[0.2em] text-vlanc-black/10 leading-none">VLANC</span>
                </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
