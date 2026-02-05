
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
        <section className="min-h-screen flex flex-col md:flex-row bg-vlanc-bg">
            {/* Izquierda: Media a sangre (Full height) */}
            <div className="w-full md:w-5/12 h-[400px] md:h-auto relative overflow-hidden">
                <AnimatedSection className="h-full w-full">
                    {data?.video ? (
                        <video src={data.video} autoPlay loop muted playsInline className="w-full h-full object-cover grayscale" />
                    ) : data?.image ? (
                        <img src={data.image} alt="Mission" className="w-full h-full object-cover grayscale" />
                    ) : (
                        <div className="w-full h-full bg-vlanc-primary/10 flex items-center justify-center">
                             <span className="text-vlanc-primary/30 font-bold uppercase tracking-widest text-xs">Video/Imagen Misión</span>
                        </div>
                    )}
                </AnimatedSection>
            </div>

            {/* Derecha: Texto */}
            <div className="w-full md:w-7/12 flex flex-col justify-center px-12 md:px-20 py-24 space-y-20">
                {/* La Misión */}
                <AnimatedSection>
                    {/* Subtítulo 1 */}
                    <h2 className="subtitle-pdf text-vlanc-black mb-4 tracking-tighter font-normal lowercase">{data?.mission?.title}</h2>
                    <div className="w-20 h-[2px] bg-vlanc-primary mb-8"></div>
                    
                    {/* Subtítulo 2: Reducido de 32px a 24px/26px según PDF */}
                    <h3 className="text-[24px] font-serif italic text-vlanc-black mb-6 leading-tight font-normal">{data?.mission?.subtitle}</h3>
                    
                    {/* Cuerpo Marrón */}
                    <p className="text-[12px] text-vlanc-secondary leading-relaxed font-sans max-w-md text-justify">
                        {data?.mission?.description}
                    </p>
                </AnimatedSection>

                {/* Qué vas a conseguir */}
                <AnimatedSection>
                    {/* Subtítulo 1 */}
                    <h2 className="subtitle-pdf text-vlanc-black mb-4 tracking-tighter font-normal lowercase">{data?.achievements?.title}</h2>
                    <div className="w-20 h-[2px] bg-vlanc-primary mb-8"></div>
                    
                    {/* Lista sin bullets visibles */}
                    <ul className="space-y-4">
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
