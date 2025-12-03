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
    <div className="relative mb-8 ml-8 md:ml-0">
      <h2 className="flex items-baseline text-6xl md:text-8xl font-bold text-gray-800">
        <span>{number}</span>
        <span className="font-light text-4xl md:text-5xl ml-4 tracking-wider">{title}</span>
      </h2>
      <span className="absolute -top-4 -left-4 w-1 h-24 bg-teal-400 transform -rotate-12"></span>
    </div>
);

const TeamMemberCard: React.FC<{ name?: string, role?: string, img?: string }> = ({ name, role, img }) => (
    <div className="group">
        <div className="overflow-hidden mb-3 rounded-lg shadow-md">
            {/* Aspect square for perfect portraits */}
            {img && <img src={img} alt={name} className="w-full aspect-square object-cover transform transition-transform duration-500 group-hover:scale-105" />}
        </div>
        <h4 className="text-base font-bold text-gray-800">{name}</h4>
        <p className="text-sm text-gray-500">&gt; {role}</p>
    </div>
);


const Team: React.FC<TeamProps> = ({ data }) => {
  return (
    <section className="h-full bg-white flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
            <AnimatedSection>
                <SectionHeader number={data?.sectionNumber} title={data?.title} />
            </AnimatedSection>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-6 lg:mb-8">
                 <AnimatedSection>
                    <h3 className="text-lg font-bold text-teal-600 mb-2">&gt; {data?.purpose?.title}</h3>
                    <div 
                        className="text-gray-600 leading-relaxed text-sm text-justify whitespace-pre-line"
                        dangerouslySetInnerHTML={{ __html: data?.purpose?.description || '' }}
                    />
                 </AnimatedSection>
                 <AnimatedSection>
                    <h3 className="text-lg font-bold text-teal-600 mb-2">&gt; {data?.history?.title}</h3>
                    <div 
                        className="text-gray-600 leading-relaxed text-sm text-justify whitespace-pre-line"
                        dangerouslySetInnerHTML={{ __html: data?.history?.description || '' }}
                    />
                 </AnimatedSection>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
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