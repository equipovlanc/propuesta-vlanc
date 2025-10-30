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
    <div className="relative mb-12 ml-8 md:ml-0">
      <h2 className="flex items-baseline text-6xl md:text-8xl font-bold text-gray-800">
        <span>{number}</span>
        <span className="font-light text-4xl md:text-5xl ml-4 tracking-wider">{title}</span>
      </h2>
      <span className="absolute -top-4 -left-4 w-1 h-24 bg-teal-400 transform -rotate-12"></span>
    </div>
  );

const Situation: React.FC<SituationProps> = ({ data }) => {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-slate-50">
        <div className="max-w-7xl mx-auto">
            <AnimatedSection>
                <SectionHeader number={data?.sectionNumber} title={data?.title} />
            </AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                <AnimatedSection className="space-y-6 text-gray-600 leading-relaxed">
                    {(data?.paragraphs ?? []).map((p, i) => (
                      <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                    ))}
                </AnimatedSection>
                <AnimatedSection>
                    {data?.image && <img src={data.image} alt="Street view in Alcoi" className="rounded-lg shadow-2xl object-cover w-full h-full" />}
                </AnimatedSection>
            </div>
        </div>
    </section>
  );
};

export default Situation;
