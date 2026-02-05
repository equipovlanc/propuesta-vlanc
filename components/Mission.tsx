
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
            
            {/* Izquierda: Imagen/Video a sangre (aprox 45% ancho) */}
            <div className="w-full lg:w-[45%] h-1/2 lg:h-full relative overflow-hidden">
                <AnimatedSection className="h-full w-full">
                    {data?.video ? (
                        <div className="relative w-full h-full">
                            <video src={data.video} autoPlay loop muted playsInline className="w-full h-full object-cover grayscale" />
                            {/* Texto "video" decorativo si se desea simular el PDF, aunque el PDF lo tiene impreso */}
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

            {/* Derecha: Textos divididos en 2 bloques (Misión arriba, Conseguir abajo) */}
            <div className="w-full lg:w-[55%] h-1/2 lg:h-full flex flex-col justify-center px-12 md:px-20 py-12 space-y-16 overflow-y-auto no-scrollbar">
                
                {/* Bloque 1: La Misión */}
                <AnimatedSection>
                    <h2 className="subtitle-pdf text-vlanc-black mb-4 font-normal tracking-tighter">{data?.mission?.title}</h2>
                    <div className="w-20 h-[2px] bg-vlanc-primary mb-6"></div>
                    
                    <h3 className="text-[24px] font-serif italic text-vlanc-black mb-4 leading-tight font-normal">{data?.mission?.subtitle}</h3>
                    
                    <p className="text-[12px] text-vlanc-secondary leading-relaxed font-sans max-w-lg text-justify">
                        {data?.mission?.description}
                    </p>
                </AnimatedSection>

                {/* Bloque 2: Qué vas a conseguir */}
                <AnimatedSection>
                    <h2 className="subtitle-pdf text-vlanc-black mb-4 font-normal tracking-tighter">{data?.achievements?.title}</h2>
                    <div className="w-20 h-[2px] bg-vlanc-primary mb-6"></div>
                    
                    <ul className="space-y-4 max-w-lg">
                        {(data?.achievements?.listItems ?? []).map((item, i) => (
                            <li key={i} className="text-[12px] text-vlanc-secondary font-sans leading-relaxed text-justify">
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
