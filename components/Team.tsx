
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
  return (
    <section className="min-h-screen bg-vlanc-bg flex flex-col justify-center py-32 px-12 md:px-24">
        <div className="max-w-7xl mx-auto w-full">
            <AnimatedSection>
                {/* Subtítulo 1 */}
                <h2 className="subtitle-pdf text-vlanc-black mb-4 font-normal tracking-tighter lowercase">
                   {data?.title || "conoce VLANC."}
                </h2>
                <div className="w-20 h-[2px] bg-vlanc-primary mb-20"></div>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24">
                 <AnimatedSection>
                    {/* Subtítulo 2 */}
                    <h3 className="text-[32px] font-serif italic text-vlanc-black mb-6">{data?.purpose?.title}</h3>
                    <div 
                        className="text-vlanc-secondary leading-relaxed text-[12px] text-justify space-y-4"
                        dangerouslySetInnerHTML={{ __html: data?.purpose?.description || '' }}
                    />
                 </AnimatedSection>
                 <AnimatedSection>
                    {/* Subtítulo 2 */}
                    <h3 className="text-[32px] font-serif italic text-vlanc-black mb-6">{data?.history?.title}</h3>
                    <div 
                        className="text-vlanc-secondary leading-relaxed text-[12px] text-justify space-y-4"
                        dangerouslySetInnerHTML={{ __html: data?.history?.description || '' }}
                    />
                 </AnimatedSection>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                {(data?.members ?? []).map((member, index) => (
                    <AnimatedSection key={index} className="text-center group">
                        <div className="overflow-hidden mb-6 aspect-[3/4] rounded-sm grayscale group-hover:grayscale-0 transition-all duration-700">
                            {member.image ? (
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000" />
                            ) : (
                                <div className="w-full h-full bg-vlanc-secondary/10 flex items-center justify-center">
                                    <span className="text-xs text-vlanc-secondary/40">Foto</span>
                                </div>
                            )}
                        </div>
                        {/* Nombre: Montserrat Bold Negro */}
                        <h4 className="text-[14px] font-bold text-vlanc-black tracking-widest uppercase mb-1 font-sans">{member.name}</h4>
                        {/* Cargo: Baskerville Regular Negro */}
                        <p className="text-[14px] text-vlanc-black font-serif italic">{member.role}</p>
                    </AnimatedSection>
                ))}
            </div>
        </div>
    </section>
  );
};

export default Team;
