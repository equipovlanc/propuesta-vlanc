
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
    <section id="hero-section" className="min-h-screen w-full flex flex-col justify-center items-center relative bg-vlanc-bg px-[120px] py-32 overflow-hidden">
      
      {/* Esquina Superior Izquierda: Info Técnica (J2) */}
      <AnimatedSection direction="right" hierarchy={2} className="absolute top-20 left-20 text-left pointer-events-none">
        <div className="flex flex-col gap-6">
            <div className="text-[14px] font-serif text-vlanc-black leading-tight">
                <p className="font-normal">{headerData?.projectCode}</p>
                <p className="font-normal">{headerData?.title}</p>
            </div>
            
            <div className="w-[52px] h-[2.4px] bg-[#8f4933]"></div>

            <div className="text-[14px] font-sans text-vlanc-secondary leading-tight tracking-wider">
                <p className="font-medium">{data?.clientName || headerData?.clientName}</p>
                <p className="opacity-80 font-normal">{headerData?.location}</p>
            </div>
        </div>
      </AnimatedSection>

      {/* Centro: Títulos (J1) */}
      <div className="text-center relative z-10">
        <AnimatedSection direction="up" hierarchy={1} className="flex flex-col items-center">
          <p className="text-[40px] text-vlanc-secondary mb-2 font-sans font-normal leading-tight">
            {data?.clientName || headerData?.clientName}
          </p>
          
          <h1 className="titulo leading-[1.05]">
            {data?.line1}
          </h1>
          <h1 className="titulo leading-[1.05]">
            {data?.line2}
          </h1>
          
          <div className="w-[112px] h-[5px] bg-[#8f4933] mt-[54px]"></div>
        </AnimatedSection>
      </div>

      {/* Esquina Inferior Derecha: Logo (J3) */}
      <AnimatedSection direction="left" hierarchy={3} className="absolute bottom-16 right-16 text-right flex flex-col items-end">
        <div className="w-[500px] md:w-[600px] h-[200px] flex items-center justify-end">
            {logo ? (
                <img src={logo} alt="Studio Logo" className="max-h-full w-auto object-contain" />
            ) : (
                <div className="w-full h-full border border-vlanc-black/10 bg-vlanc-black/5 flex flex-col items-center justify-center p-4">
                    <span className="text-[52px] font-serif font-normal tracking-[0.2em] text-vlanc-black/10 leading-none">VLANC</span>
                </div>
            )}
        </div>
      </AnimatedSection>
    </section>
  );
};

export default Hero;
