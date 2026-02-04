
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface TeamMember {
    name?: string;
    role?: string;
    img?: string;
}

interface TeamProps {
    data?: {
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

const Team: React.FC<TeamProps> = ({ data }) => {
  return (
    <section className="min-h-screen bg-vlanc-bg flex flex-col justify-center py-32 px-12 md:px-24">
        <div className="max-w-7xl mx-auto w-full">
            <AnimatedSection>
                <h2 className="title-xl text-vlanc-secondary mb-4 font-bold tracking-tighter">
                   {data?.title || "conoce VLANC."}
                </h2>
                <div className="w-16 h-[2px] bg-vlanc-primary mb-20"></div>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24">
                 <AnimatedSection>
                    <h3 className="subtitle-md text-vlanc-primary font-bold mb-6">/ {data?.purpose?.title}</h3>
                    <div 
                        className="text-vlanc-black/70 leading-relaxed text-[12px] text-justify space-y-4"
                        dangerouslySetInnerHTML={{ __html: data?.purpose?.description || '' }}
                    />
                 </AnimatedSection>
                 <AnimatedSection>
                    <h3 className="subtitle-md text-vlanc-primary font-bold mb-6">/ {data?.history?.title}</h3>
                    <div 
                        className="text-vlanc-black/70 leading-relaxed text-[12px] text-justify space-y-4"
                        dangerouslySetInnerHTML={{ __html: data?.history?.description || '' }}
                    />
                 </AnimatedSection>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                {(data?.members ?? []).map((member, index) => (
                    <AnimatedSection key={index} className="text-center group">
                        <div className="overflow-hidden mb-6 aspect-[3/4] rounded-sm grayscale group-hover:grayscale-0 transition-all duration-700">
                            {member.img && <img src={member.img} alt={member.name} className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000" />}
                        </div>
                        <h4 className="text-[14px] font-bold text-vlanc-secondary tracking-widest uppercase mb-1">{member.name}</h4>
                        <p className="text-[10px] text-vlanc-primary font-bold uppercase tracking-[0.2em]">{member.role}</p>
                    </AnimatedSection>
                ))}
            </div>
        </div>
    </section>
  );
};

export default Team;
