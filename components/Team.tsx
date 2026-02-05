
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
    <section className="h-full w-full bg-vlanc-bg flex flex-col justify-center px-12 md:px-24 py-16">
        <div className="max-w-screen-2xl mx-auto w-full h-full flex flex-col justify-center">
            
            {/* Parte Superior: Título (Izq) y Textos (Der) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12 items-start">
                <div className="lg:col-span-4">
                     <AnimatedSection>
                        <h2 className="subtitle-pdf text-vlanc-black mb-4 font-normal tracking-tighter">
                        {data?.title || "conoce VLANC."}
                        </h2>
                        <div className="w-20 h-[2px] bg-vlanc-primary"></div>
                    </AnimatedSection>
                </div>
                
                <div className="lg:col-span-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
                     <AnimatedSection>
                        <h3 className="text-[24px] font-serif italic text-vlanc-black mb-4 font-normal">{data?.purpose?.title}</h3>
                        <div 
                            className="text-vlanc-secondary leading-relaxed text-[12px] text-justify space-y-4 font-sans"
                            dangerouslySetInnerHTML={{ __html: data?.purpose?.description || '' }}
                        />
                     </AnimatedSection>
                     <AnimatedSection>
                        <h3 className="text-[24px] font-serif italic text-vlanc-black mb-4 font-normal">{data?.history?.title}</h3>
                        <div 
                            className="text-vlanc-secondary leading-relaxed text-[12px] text-justify space-y-4 font-sans"
                            dangerouslySetInnerHTML={{ __html: data?.history?.description || '' }}
                        />
                     </AnimatedSection>
                </div>
            </div>

            {/* Parte Inferior: Fotos (Fila de 4) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-auto">
                {(data?.members ?? []).map((member, index) => (
                    <AnimatedSection key={index} className="flex flex-col">
                         {/* Foto Aspecto 3:2 o similar según PDF */}
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
        </div>
    </section>
  );
};

export default Team;
