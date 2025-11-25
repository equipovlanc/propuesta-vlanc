import React from 'react';
import AnimatedSection from './AnimatedSection';

interface HeroProps {
  data?: {
    line1?: string;
    line2?: string;
    line3?: string;
  }
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <section id="hero-section" className="min-h-[50vh] flex items-center justify-center text-center py-20 px-4">
      <AnimatedSection>
        <div className="relative bg-gray-100/70 p-12 md:p-20">
            <span className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-1 h-24 md:h-32 bg-teal-400 transform -rotate-12"></span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-gray-800 tracking-wider">
              {data?.line1}
            </h1>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-gray-800 tracking-wider mt-2">
              {data?.line2}
            </h1>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-gray-800 tracking-wider mt-2">
              {data?.line3}
            </h1>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default Hero;