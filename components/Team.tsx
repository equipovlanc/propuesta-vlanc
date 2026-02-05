
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface TeamMember {
    name?: string;
    role?: string;
    image?: string;
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
  const members = data?.members || [];

  return (
    <section className="h-full w-full bg-vlanc-bg flex flex-col justify-center px-12 md:px-24 py-16">
        
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="h-full max-h-[80vh] grid grid-cols-2 gap-6 items-center content-center">
                 {members.map((member, index) => (
                    <AnimatedSection key={index} className="flex flex-col">
                        <div className="w-full aspect-[4/3] overflow-hidden mb-3 rounded-sm grayscale hover:grayscale-0 transition-all duration-700">
                            {member.image ? (
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-vlanc-secondary/10 flex items-center justify-center">
                                    <span className="text-xs text-vlanc-secondary/40">Foto</span>
                                </div>
                            )}
                        </div>
                        <div className="text-left">
                            <h4 className="text-[11px] font-bold text-vlanc-black tracking-widest uppercase font-sans">{member.name}</h4>
                            <p className="text-[11px] text-vlanc-black font-serif italic">{member.role}</p>
                        </div>
                    </AnimatedSection>
                 ))}
            </div>

            <div className="h-full flex flex-col justify-center space-y-12 overflow-y-auto no-scrollbar pr-4">
                 <AnimatedSection>
                    <h2 className="subtitulo1 mb-4 tracking-tighter">
                        {data?.title || "conoce VLANC."}
                    </h2>
                    <div className="w-20 h-[2px] bg-vlanc-primary"></div>
                </AnimatedSection>

                <AnimatedSection>
                    {/* Subtitulo 2 (Italic) */}
                    <h3 className="subtitulo2 mb-6">
                        {data?.purpose?.title}
                    </h3>
                    <div 
                        className="cuerpo space-y-4"
                        dangerouslySetInnerHTML={{ __html: data?.purpose?.description || '' }}
                    />
                </AnimatedSection>

                <AnimatedSection>
                    <h3 className="subtitulo2 mb-6">
                        {data?.history?.title}
                    </h3>
                    <div 
                        className="cuerpo space-y-4"
                        dangerouslySetInnerHTML={{ __html: data?.history?.description || '' }}
                    />
                </AnimatedSection>
            </div>

        </div>
    </section>
  );
};

export default Team;
