
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
        videoFile?: string; // New: uploaded file URL
        videoUrl?: string;  // Old: external URL
        video?: string;     // Fallback for legacy data
        image?: string;
        printImage?: string; 
        mission?: SectionData;
        achievements?: SectionData;
    }
}

const SectionHeader: React.FC<{ number?: string, title?: string }> = ({ number, title }) => (
    <div className="relative mb-8 ml-8 md:ml-0">
      <h2 className="flex items-baseline text-6xl md:text-8xl font-bold text-gray-800">
        <span>{number}</span>
        <span className="font-light text-3xl md:text-4xl ml-4 tracking-wider">{title}</span>
      </h2>
      <span className="absolute -top-4 -left-4 w-1 h-24 bg-teal-400 transform -rotate-12"></span>
    </div>
);

const CheckListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-start mb-2">
        <span className="text-teal-500 font-bold mr-3 mt-1">&gt;</span>
        <p className="text-gray-600 flex-1 text-sm md:text-base">{children}</p>
    </div>
);

const Mission: React.FC<MissionProps> = ({ data }) => {
    // Determine the video source: uploaded file > specific url field > legacy video field
    const videoSrc = data?.videoFile || data?.videoUrl || data?.video;

    return (
        <section className="h-full py-12 px-4 md:px-8 lg:px-16 bg-white flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Columna Izquierda: Textos (Misión + Logros) */}
                <div className="space-y-16">
                    {/* Seccion 02: Misión */}
                    <AnimatedSection>
                        <SectionHeader number={data?.mission?.sectionNumber} title={data?.mission?.title} />
                        <h3 className="text-lg font-semibold text-teal-600 mb-4 tracking-wide">&gt; {data?.mission?.subtitle}</h3>
                        <div 
                            className="text-gray-600 leading-relaxed text-justify text-sm md:text-base whitespace-pre-line"
                            dangerouslySetInnerHTML={{ __html: data?.mission?.description || '' }}
                        />
                    </AnimatedSection>

                    {/* Seccion 03: Logros */}
                    <AnimatedSection>
                        <SectionHeader number={data?.achievements?.sectionNumber} title={data?.achievements?.title} />
                        <div className="space-y-3">
                            {(data?.achievements?.listItems ?? []).map((item, i) => (
                                <CheckListItem key={i}>{item}</CheckListItem>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>

                {/* Columna Derecha: Video Loop (Screen) / Static Image (Print) */}
                <AnimatedSection className="h-full flex items-center">
                    <div className="w-full aspect-video rounded-lg overflow-hidden shadow-2xl relative bg-gray-100">
                         {/* WEB VIEW: Video Loop */}
                         <div className="w-full h-full block no-print">
                             {videoSrc ? (
                                 <video 
                                    src={videoSrc} 
                                    autoPlay 
                                    loop 
                                    muted 
                                    playsInline 
                                    className="w-full h-full object-cover"
                                 />
                             ) : (
                                data?.image && <img src={data.image} alt="Mission context" className="w-full h-full object-cover" />
                             )}
                         </div>

                         {/* PRINT VIEW: Static Image */}
                         <div className="w-full h-full hidden print-only">
                            <img 
                                src={data?.printImage || data?.image || "https://picsum.photos/1920/1080?grayscale"} 
                                alt="Mission context static" 
                                className="w-full h-full object-cover" 
                            />
                         </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default Mission;
