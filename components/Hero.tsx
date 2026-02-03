
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface HeroProps {
  data?: {
    line1?: string;
    line2?: string;
    line3?: string;
  };
  headerData?: any;
}

const Hero: React.FC<HeroProps> = ({ data, headerData }) => {
  return (
    <section id="hero-section" className="min-h-screen w-full flex flex-col justify-center items-center relative bg-vlanc-bg px-12 md:px-24 py-32">
      {/* Top Left Info */}
      <div className="absolute top-16 left-16 text-left space-y-1">
        <p className="text-[10px] font-bold tracking-widest text-vlanc-black/40 uppercase font-sans">{headerData?.projectCode}</p>
        <p className="text-[10px] font-bold tracking-widest text-vlanc-black/40 uppercase font-sans">{headerData?.title}</p>
        <div className="pt-4">
          <p className="text-[10px] font-bold tracking-widest text-vlanc-black uppercase font-sans">{headerData?.clientName}</p>
          <p className="text-[10px] font-bold tracking-widest text-vlanc-black/60 uppercase font-sans">{headerData?.location}</p>
        </div>
      </div>

      <AnimatedSection className="text-center">
        <div className="space-y-4">
          <p className="subtitle-md text-vlanc-black uppercase tracking-[0.2em] mb-4">
            {headerData?.clientName}
          </p>
          <h1 className="title-xl text-vlanc-secondary tracking-tight uppercase">
            {data?.line1}
          </h1>
          <h1 className="title-xl text-vlanc-secondary tracking-tight uppercase">
            {data?.line2}
          </h1>
          <div className="w-16 h-[2px] bg-vlanc-primary mx-auto mt-12"></div>
        </div>
      </AnimatedSection>

      {/* Bottom Right Logo */}
      <div className="absolute bottom-16 right-16 text-right">
        <p className="text-[32px] font-serif font-bold tracking-[0.2em] leading-none text-vlanc-black">VLANC</p>
        <p className="text-[8px] tracking-[0.4em] font-bold text-vlanc-primary uppercase mt-2">ARQUITECTURA + INTERIORISMO</p>
      </div>
    </section>
  );
};

export default Hero;
