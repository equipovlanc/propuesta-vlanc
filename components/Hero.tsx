
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
    <section id="hero-section" className="min-h-screen w-full flex flex-col justify-center items-center relative px-[120px] py-32 overflow-hidden">

      {/* Centro: Títulos (J1) */}
      <div className="text-center relative z-10 flex flex-col items-center">
        {/* Título Principal (J1) */}
        <AnimatedSection direction="up" hierarchy={1} className="flex flex-col items-center">
          <h1 className="titulo leading-[1.05]">
            {data?.line1}
          </h1>
          <h1 className="titulo leading-[1.05]">
            {data?.line2}
          </h1>
        </AnimatedSection>

        {/* Barra Viajera (J1) */}
        <AnimatedSection mode="bar" hierarchy={1} className="w-[112px] h-[5px] bg-[#8f4933] mt-[54px]" />
      </div>

      {/* Esquina Superior Izquierda: Info Técnica (J2) */}
      <AnimatedSection direction="right" hierarchy={2} className="absolute top-20 left-20 text-left pointer-events-none">
        <div className="flex flex-col gap-6">
          {/* Código y Título: Tracking normal explícito, sin negrita */}
          <div className="text-[14px] font-serif text-vlanc-black leading-tight tracking-normal">
            <p className="font-normal" dangerouslySetInnerHTML={{ __html: headerData?.projectCode || '' }} />
            <p className="font-normal" dangerouslySetInnerHTML={{ __html: headerData?.title || '' }} />
          </div>

          <div className="w-[52px] h-[2.4px] bg-[#8f4933]"></div>

          {/* Nombre y Ubicación: Sin negrita (font-normal) */}
          <div className="text-[14px] font-sans text-vlanc-secondary leading-tight tracking-wider">
            <p className="font-normal" dangerouslySetInnerHTML={{ __html: headerData?.clientName || '' }} />
            <p className="opacity-80 font-normal" dangerouslySetInnerHTML={{ __html: headerData?.location || '' }} />
          </div>
        </div>
      </AnimatedSection>

      {/* Esquina Inferior Derecha: Logo (J3) */}
      <AnimatedSection direction="left" hierarchy={3} className="absolute bottom-[11px] right-[108px] text-right flex flex-col items-end">
        <div className="w-[260px] h-[260px] flex items-center justify-center">
          {logo && (
            <img src={logo} alt="Studio Logo" className="max-w-full max-h-full w-auto h-auto object-contain" />
          )}
        </div>
      </AnimatedSection>
    </section>
  );
};

export default Hero;
