import React from 'react';
import AnimatedSection from './AnimatedSection';

interface SectionData {
    sectionNumber?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    listItems?: string[];
}

interface MissionProps {
    data?: {
        mission?: SectionData;
        achievements?: SectionData;
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

const CheckListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-start mb-2">
        <span className="text-teal-500 font-bold mr-3 mt-1">&gt;</span>
        <p className="text-gray-600 flex-1">{children}</p>
    </div>
);

const Mission: React.FC<MissionProps> = ({ data }) => {
    return (
        <section className="py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                <div className="space-y-20">
                    <AnimatedSection>
                        <SectionHeader number={data?.mission?.sectionNumber} title={data?.mission?.title} />
                        <h3 className="text-xl font-semibold text-teal-600 mb-4">&gt; {data?.mission?.subtitle}</h3>
                        <p className="text-gray-600 leading-relaxed text-justify">{data?.mission?.description}</p>
                    </AnimatedSection>
                    <AnimatedSection>
                        <SectionHeader number={data?.achievements?.sectionNumber} title={data?.achievements?.title} />
                        <div className="space-y-4">
                            {(data?.achievements?.listItems ?? []).map((item, i) => (
                                <CheckListItem key={i}>{item}</CheckListItem>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
                <AnimatedSection>
                    {data?.image && <img src={data.image} alt="Architect working on blueprints" className="rounded-lg shadow-2xl object-cover w-full h-full" />}
                </AnimatedSection>
            </div>
        </section>
    );
};

export default Mission;