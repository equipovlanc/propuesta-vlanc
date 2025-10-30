import React from 'react';
import AnimatedSection from './AnimatedSection';

interface WorkPhase {
    title?: string;
    description?: string;
}

interface ScopeProps {
    data?: {
        sectionNumber?: string;
        title?: string;
        intervention?: {
            title?: string;
            location?: string;
            projectType?: string;
            scope?: string;
            breakdown?: string[];
        };
        contemplatedWork?: {
            title?: string;
            phases?: WorkPhase[];
        };
        images?: string[];
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

const Scope: React.FC<ScopeProps> = ({ data }) => {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
            <SectionHeader number={data?.sectionNumber} title={data?.title} />
        </AnimatedSection>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            <div className="lg:col-span-3 space-y-8">
                <AnimatedSection>
                    <h3 className="text-xl font-semibold text-teal-600 mb-4">&gt; {data?.intervention?.title}</h3>
                    <p><strong>LOCALIZACIÓN:</strong> {data?.intervention?.location}</p>
                    <p><strong>TIPO DE PROYECTO:</strong> {data?.intervention?.projectType}</p>
                    <p><strong>ÁMBITO DE INTERVENCIÓN:</strong> {data?.intervention?.scope}</p>
                    <div className="mt-4 space-y-2 text-gray-600">
                        {(data?.intervention?.breakdown ?? []).map((item, i) => (
                            <p key={i}>&gt; {item}</p>
                        ))}
                    </div>
                </AnimatedSection>
                <AnimatedSection>
                    <h3 className="text-xl font-semibold text-teal-600 mb-4 mt-12">&gt; {data?.contemplatedWork?.title}</h3>
                     <div className="space-y-6">
                        {(data?.contemplatedWork?.phases ?? []).map((phase, i) => (
                            <div key={i}>
                                <h4 className="font-bold">{i+1}. {phase.title}</h4>
                                <p className="text-sm text-gray-600">{phase.description}</p>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>
            </div>
            <div className="lg:col-span-2 space-y-8">
                <AnimatedSection>
                    {data?.images?.[0] && <img src={data.images[0]} alt="Interior before renovation" className="rounded-lg shadow-xl mb-8" />}
                </AnimatedSection>
                 <AnimatedSection>
                    {data?.images?.[1] && <img src={data.images[1]} alt="Interior detail before renovation" className="rounded-lg shadow-xl" />}
                </AnimatedSection>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Scope;
