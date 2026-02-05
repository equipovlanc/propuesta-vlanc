
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface SectionData {
    title?: string;
    subtitle?: string;
    description?: string;
    listItems?: string[];
}

interface MissionProps {
    data?: {
        image?: string;
        video?: string;
        mission?: SectionData;
        achievements?: SectionData;
    }
}

const Mission: React.FC<MissionProps> = ({ data }) => {
    return (
        <section className="h-full w-full flex flex-col lg:flex-row bg-vlanc-bg">
            
            <div className="w-full lg:w-[45%] h-1/2 lg:h-full relative overflow-hidden">
                <AnimatedSection className="h-full w-full">
                    {data?.video ? (
                        <div className="relative w-full h-full">
                            <video src={data.video} autoPlay loop muted playsInline className="w-full h-full object-cover grayscale" />
                        </div>
                    ) : data?.image ? (
                        <img src={data.image} alt="Mission" className="w-full h-full object-cover grayscale" />
                    ) : (
                        <div className="w-full h-full bg-vlanc-primary/10 flex items-center justify-center">
                             <span className="text-vlanc-primary/30 font-bold uppercase tracking-widest text-xs">Video/Imagen</span>
                        </div>
                    )}
                </AnimatedSection>
            </div>

            <div className="w-full lg:w-[55%] h-1/2 lg:h-full flex flex-col justify-center px-10 py-12 space-y-16 overflow-y-auto no-scrollbar">
                
                {/* Bloque 1: La Misión */}
                <AnimatedSection>
                    <h2 className="subtitulo1 mb-4 tracking-tighter">{data?.mission?.title}</h2>
                    <div className="w-20 h-[2px] bg-vlanc-primary mb-6"></div>
                    
                    {/* Subtitulo 2 (Italic) */}
                    <h3 className="subtitulo2 mb-4 leading-tight">{data?.mission?.subtitle}</h3>
                    
                    <p className="cuerpo max-w-lg">
                        {data?.mission?.description}
                    </p>
                </AnimatedSection>

                {/* Bloque 2: Qué vas a conseguir */}
                <AnimatedSection>
                    <h2 className="subtitulo1 mb-4 tracking-tighter">{data?.achievements?.title}</h2>
                    <div className="w-20 h-[2px] bg-vlanc-primary mb-6"></div>
                    
                    <ul className="space-y-4 max-w-lg">
                        {(data?.achievements?.listItems ?? []).map((item, i) => (
                            <li key={i} className="cuerpo">
                                {item}
                            </li>
                        ))}
                    </ul>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default Mission;
