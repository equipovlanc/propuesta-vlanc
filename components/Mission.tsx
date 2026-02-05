
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
        printImage?: string; 
        mission?: SectionData;
        achievements?: SectionData;
    }
}

const Mission: React.FC<MissionProps> = ({ data }) => {
    return (
        <section className="min-h-screen flex flex-col md:flex-row bg-vlanc-bg">
            <div className="w-full md:w-1/2 h-[400px] md:h-auto">
                 <AnimatedSection className="h-full">
                    <div className="w-full h-full relative">
                         <div className="w-full h-full block">
                            {data?.image ? (
                                <img src={data.image} alt="Mission" className="w-full h-full object-cover grayscale" />
                            ) : (
                                <div className="w-full h-full bg-vlanc-primary/10 flex items-center justify-center">
                                    <span className="text-vlanc-primary/30 font-bold uppercase tracking-widest text-xs">Imagen Misión</span>
                                </div>
                            )}
                         </div>
                    </div>
                </AnimatedSection>
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center px-12 md:px-24 py-24 space-y-24">
                {/* La Misión */}
                <AnimatedSection>
                    {/* Subtítulo 1 */}
                    <h2 className="subtitle-pdf text-vlanc-black mb-4 tracking-tighter font-normal lowercase">{data?.mission?.title}</h2>
                    <div className="w-20 h-[2px] bg-vlanc-primary mb-8"></div>
                    
                    {/* Subtítulo 2 */}
                    <h3 className="text-[32px] font-serif italic text-vlanc-black mb-6 leading-tight">{data?.mission?.subtitle}</h3>
                    
                    {/* Cuerpo Marrón */}
                    <p className="text-[12px] text-vlanc-secondary leading-relaxed font-sans max-w-md text-justify">
                        {data?.mission?.description}
                    </p>
                </AnimatedSection>

                {/* Qué vas a conseguir */}
                <AnimatedSection>
                    {/* Subtítulo 1 */}
                    <h2 className="subtitle-pdf text-vlanc-black mb-4 tracking-tighter font-normal lowercase">{data?.achievements?.title}</h2>
                    <div className="w-20 h-[2px] bg-vlanc-primary mb-12"></div>
                    <ul className="space-y-4">
                        {(data?.achievements?.listItems ?? []).map((item, i) => (
                            <li key={i} className="text-[12px] text-vlanc-secondary font-sans leading-relaxed flex items-start text-justify">
                                <span className="text-vlanc-secondary mr-3 font-bold">·</span> {item}
                            </li>
                        ))}
                    </ul>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default Mission;
