import React from 'react';
import AnimatedSection from './AnimatedSection';

interface TeamMember {
    name?: string;
    role?: string;
    img?: string;
}

interface TeamProps {
    data?: {
        sectionNumber?: string;
        title?: string;
        purpose?: {
            title?: string;
            description?: string;
        };
        history?: {
            title?: string;
            description?: string;
        };
        members?: TeamMember[];
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

const TeamMemberCard: React.FC<{ name?: string, role?: string, img?: string }> = ({ name, role, img }) => (
    <div className="group">
        <div className="overflow-hidden mb-4">
            {img && <img src={img} alt={name} className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105" />}
        </div>
        <h4 className="text-lg font-semibold">{name}</h4>
        <p className="text-gray-500">&gt; {role}</p>
    </div>
);


const Team: React.FC<TeamProps> = ({ data }) => {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
            <AnimatedSection>
                <SectionHeader number={data?.sectionNumber} title={data?.title} />
            </AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
                 <AnimatedSection>
                    <h3 className="text-xl font-semibold text-teal-600 mb-4">&gt; {data?.purpose?.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{data?.purpose?.description}</p>
                 </AnimatedSection>
                 <AnimatedSection>
                    <h3 className="text-xl font-semibold text-teal-600 mb-4">&gt; {data?.history?.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{data?.history?.description}</p>
                 </AnimatedSection>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {(data?.members ?? []).map((member, index) => (
                    <AnimatedSection key={index}>
                        <TeamMemberCard {...member} />
                    </AnimatedSection>
                ))}
            </div>
        </div>
    </section>
  );
};

export default Team;
