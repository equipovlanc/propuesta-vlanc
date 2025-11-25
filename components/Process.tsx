import React from 'react';
import AnimatedSection from './AnimatedSection';

interface ProcessStep {
    title?: string;
    description?: string;
}

interface ProcessProps {
    data?: {
        sectionNumber?: string;
        title?: string;
        steps?: ProcessStep[];
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

const ProcessCard: React.FC<{ number: string, title?: string, description?: string }> = ({ number, title, description }) => (
    <div className="bg-gray-100 p-6 h-full transition-all duration-300 hover:bg-white hover:shadow-2xl hover:-translate-y-2">
        <h3 className="text-xl font-semibold text-teal-600 mb-2">{number} &gt; {title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
    </div>
);

const Process: React.FC<ProcessProps> = ({ data }) => {
    return (
        <section className="py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <AnimatedSection>
                    <SectionHeader number={data?.sectionNumber} title={data?.title} />
                </AnimatedSection>
                {/* En impresión, el CSS global forzará un grid limpio de 2 columnas sin fondos grises */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
                    {(data?.steps ?? []).map((step, index) => (
                        <AnimatedSection key={index}>
                            <ProcessCard number={`0${index + 1}`} title={step.title} description={step.description} />
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;