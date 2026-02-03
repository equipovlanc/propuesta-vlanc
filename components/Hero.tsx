
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
    <section id="hero-section" className="h-screen w-full flex flex-col justify-center items-center relative bg-vlanc-bg px-12 md:px-24">
      {/* Top Left Info */}
      <div className="absolute top-12 left-12 md:top-24 md:left-24 text-left space-y-2">
        <div className="space-y-0">
             <p className="text-[10px] font-bold tracking-widest text-vlanc-black uppercase font-sans">{headerData?.projectCode}</p>
             <p className="text-[10px] font-bold tracking-widest text-vlanc-black uppercase font-sans mb-1">{headerData?.title}</p>
             <div className="h-[1px] w-full bg-vlanc-black/20 my-2"></div>
        </div>
        <div>
          <p className="text-[10px] font-bold tracking-widest text-vlanc-black uppercase font-sans">{headerData?.clientName}</p>
          <p className="text-[10px] font-bold tracking-widest text-vlanc-black/60 uppercase font-sans">{headerData?.location}</p>
        </div>
      </div>

      <AnimatedSection className="text-center z-10">
        <div className="space-y-4">
          <p className="subtitle-md text-vlanc-black uppercase tracking-[0.2em] mb-4">
            {headerData?.clientName}
          </p>
          <h1 className="text-[50px] md:text-[80px] font-serif text-vlanc-secondary leading-[0.9] uppercase tracking-tighter">
            {data?.line1}<br/>
            {data?.line2}
          </h1>
          <div className="w-24 h-[3px] bg-vlanc-primary mx-auto mt-16"></div>
        </div>
      </AnimatedSection>

      {/* Bottom Right Logo */}
      <div className="absolute bottom-12 right-12 md:bottom-24 md:right-24 text-right">
        {headerData?.logo ? (
             <img src={headerData.logo} alt="VLANC" className="h-12 md:h-16 object-contain ml-auto" />
        ) : (
            <p className="text-[42px] font-serif font-bold tracking-[0.2em] leading-none text-vlanc-black">VLANC</p>
        )}
        <p className="text-[9px] tracking-[0.4em] font-bold text-vlanc-primary uppercase mt-3">ARQUITECTURA + INTERIORISMO</p>
      </div>
    </section>
  );
};

export default Hero;
