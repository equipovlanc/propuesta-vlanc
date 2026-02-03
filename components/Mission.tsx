
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
        <section className="h-screen flex flex-col lg:flex-row bg-vlanc-bg overflow-hidden">
            {/* Left Image/Video - 50% */}
            <div className="hidden lg:block lg:w-1/2 h-full relative">
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
                 
                 {/* Optional "video" text overlay from PDF */}
                 <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                    <span className="font-serif text-[80px] text-white mix-blend-overlay opacity-50 tracking-tighter">video</span>
                 </div>
            </div>

            {/* Right Content - 50% */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-12 md:px-24 h-full space-y-24">
                <AnimatedSection>
                    <h2 className="title-xl text-vlanc-black mb-6 tracking-tighter">{data?.mission?.title}</h2>
                    <div className="w-24 h-[3px] bg-vlanc-primary mb-12"></div>
                    <h3 className="text-[24px] font-serif italic text-vlanc-black/90 mb-6">{data?.mission?.subtitle}</h3>
                    <p className="text-[13px] text-vlanc-black/70 leading-[1.8] font-sans max-w-md text-justify">
                        {data?.mission?.description}
                    </p>
                </AnimatedSection>

                <AnimatedSection>
                    <h2 className="title-xl text-vlanc-black mb-6 tracking-tighter">{data?.achievements?.title}</h2>
                    <div className="w-24 h-[3px] bg-vlanc-primary mb-12"></div>
                    <ul className="space-y-4">
                        {(data?.achievements?.listItems ?? []).map((item, i) => (
                            <li key={i} className="text-[13px] text-vlanc-black/70 font-sans leading-relaxed text-justify">
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
