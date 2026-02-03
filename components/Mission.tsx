
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface SectionData {
    sectionNumber?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    listItems?: string[];
}

interface MissionProps {
    data?: {
        videoFile?: string;
        videoUrl?: string;
        video?: string;
        image?: string;
        printImage?: string; 
        mission?: SectionData;
        achievements?: SectionData;
    }
}

const Mission: React.FC<MissionProps> = ({ data }) => {
    const videoSrc = data?.videoFile || data?.videoUrl || data?.video;

    return (
        <section className="min-h-screen flex flex-col md:flex-row bg-vlanc-bg">
            <div className="w-full md:w-1/2 h-[400px] md:h-auto">
                 <AnimatedSection className="h-full">
                    <div className="w-full h-full relative">
                         <div className="w-full h-full block no-print">
                             {videoSrc ? (
                                 <video src={videoSrc} autoPlay loop muted playsInline className="w-full h-full object-cover grayscale" />
                             ) : (
                                <img src={data?.image} alt="Mission" className="w-full h-full object-cover grayscale" />
                             )}
                         </div>
                         <div className="w-full h-full hidden print-only">
                            <img src={data?.printImage || data?.image} alt="Mission" className="w-full h-full object-cover grayscale" />
                         </div>
                    </div>
                </AnimatedSection>
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center px-12 md:px-24 py-24 space-y-20">
                <AnimatedSection>
                    <h2 className="title-xl text-vlanc-black mb-4 tracking-tighter">{data?.mission?.title}</h2>
                    <div className="w-12 h-[2px] bg-vlanc-primary mb-8"></div>
                    <h3 className="subtitle-md italic text-vlanc-primary mb-6">{data?.mission?.subtitle}</h3>
                    <p className="text-[12px] text-vlanc-black/70 leading-relaxed font-sans max-w-md">
                        {data?.mission?.description}
                    </p>
                </AnimatedSection>

                <AnimatedSection>
                    <h2 className="title-xl text-vlanc-black mb-4 tracking-tighter">{data?.achievements?.title}</h2>
                    <div className="w-12 h-[2px] bg-vlanc-primary mb-12"></div>
                    <ul className="space-y-4">
                        {(data?.achievements?.listItems ?? []).map((item, i) => (
                            <li key={i} className="text-[12px] text-vlanc-black/70 font-sans leading-relaxed flex items-start">
                                <span className="text-vlanc-primary mr-3">/</span> {item}
                            </li>
                        ))}
                    </ul>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default Mission;
