
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface SituationProps {
  data?: {
    sectionNumber?: string;
    title?: string;
    paragraphs?: string[];
    image?: string;
  }
}

const SectionHeader: React.FC<{ number?: string, title?: string }> = ({ number, title }) => (
    <div className="relative mb-8 md:mb-12 ml-8 md:ml-0">
      <h2 className="flex items-baseline text-6xl md:text-8xl font-bold text-gray-800">
        <span>{number}</span>
        <span className="font-light text-4xl md:text-5xl ml-4 tracking-wider">{title}</span>
      </h2>
      <span className="absolute -top-4 -left-4 w-1 h-24 bg-teal-400 transform -rotate-12"></span>
    </div>
  );

const Situation: React.FC<SituationProps> = ({ data }) => {
  return (
    <section className="h-full py-12 px-4 md:px-8 lg:px-16 bg-slate-50 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
            <AnimatedSection>
                <SectionHeader number={data?.sectionNumber} title={data?.title} />
            </AnimatedSection>
            <div className="flex gap-12 lg:gap-24 items-start">
                 {/* Columna Izquierda: Imagen */}
                 <div className="hidden lg:block w-1/3">
                    <AnimatedSection>
                        {data?.image && <img src={data.image} alt="Street view" className="rounded-lg shadow-2xl object-cover w-full h-[600px] grayscale" />}
                    </AnimatedSection>
                 </div>
                 
                 {/* Columna Derecha: Texto a 2 columnas internas */}
                 <div className="w-full lg:w-2/3">
                    <AnimatedSection>
                         <div className="columns-1 md:columns-2 gap-8 space-y-4 text-gray-600 leading-relaxed text-justify text-sm md:text-base">
                            {(data?.paragraphs ?? []).map((p, i) => (
                                <p key={i} className="break-inside-avoid-column mb-4" dangerouslySetInnerHTML={{ __html: p }} />
                            ))}
                         </div>
                    </AnimatedSection>
                 </div>
            </div>
        </div>
    </section>
  );
};

export default Situation;
