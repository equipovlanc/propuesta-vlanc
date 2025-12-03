
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface ScopeProps {
    data?: {
        sectionNumber?: string;
        title?: string;
        intervention?: {
            title?: string;
            location?: string;
            projectType?: string;
            scope?: string;
            program?: string;
            breakdown?: string[];
            note?: string;
        };
        images?: string[];
    }
}

// Estilo unificado de cabecera
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
    <section className="h-full py-12 px-4 md:px-8 lg:px-16 bg-white flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <AnimatedSection>
            <SectionHeader number={data?.sectionNumber} title={data?.title} />
        </AnimatedSection>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-3 space-y-6">
                <AnimatedSection>
                    <h3 className="text-xl font-semibold text-teal-600 mb-4">&gt; {data?.intervention?.title}</h3>
                    <div className="space-y-3 text-gray-700 text-base">
                        <p><strong>LOCALIZACIÓN:</strong> {data?.intervention?.location}</p>
                        <p><strong>TIPO DE PROYECTO:</strong> {data?.intervention?.projectType}</p>
                        <p><strong>ÁMBITO DE INTERVENCIÓN:</strong> {data?.intervention?.scope}</p>
                        <p className="pt-2 font-medium whitespace-pre-line">{data?.intervention?.program}</p>
                    </div>
                    <div className="mt-6 space-y-1 text-gray-600 text-sm md:text-base pl-2">
                        {(data?.intervention?.breakdown ?? []).map((item, i) => (
                            <p key={i} className="whitespace-pre-line">&gt; {item}</p>
                        ))}
                    </div>
                    {data?.intervention?.note && (
                        <p className="mt-8 text-xs text-gray-400 italic">{data?.intervention?.note}</p>
                    )}
                </AnimatedSection>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 gap-6">
                <AnimatedSection>
                    {data?.images?.[0] && <img src={data.images[0]} alt="Interior state" className="rounded-lg shadow-xl w-full h-48 lg:h-64 object-cover" />}
                </AnimatedSection>
                 <AnimatedSection>
                    {data?.images?.[1] && <img src={data.images[1]} alt="Interior detail" className="rounded-lg shadow-xl w-full h-48 lg:h-64 object-cover" />}
                </AnimatedSection>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Scope;
