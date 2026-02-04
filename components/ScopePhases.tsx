
import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';
import Guarantees from './Guarantees';

interface Guarantee {
    title?: string;
    description?: string;
    note?: string;
}
interface GuaranteesData {
    title?: string;
    items?: Guarantee[];
}

interface SubPhase {
    number?: string;
    title?: string;
    description?: string;
}

interface Phase {
    title?: string;
    badge?: string;
    subPhases?: SubPhase[];
}

interface ScopePhasesProps {
    data?: {
        title?: string;
        videoFile?: string;
        videoUrl?: string;
        phases?: Phase[];
    };
    guaranteesData?: GuaranteesData;
}

const ScopePhases: React.FC<ScopePhasesProps> = ({ data, guaranteesData }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [showGuarantees, setShowGuarantees] = useState(false);

  const videoSrc = data?.videoFile || data?.videoUrl;

  return (
    <>
        <section className="h-full bg-vlanc-bg flex flex-col justify-center relative py-20 px-12 md:px-24">
          <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
            <AnimatedSection>
                <div className="relative mb-12">
                    <h2 className="title-xl text-vlanc-secondary font-bold tracking-tighter">
                        {data?.title || "trabajos contemplados."}
                    </h2>
                    <div className="w-16 h-[2px] bg-vlanc-primary mt-4"></div>
                </div>
            </AnimatedSection>
            
            <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative">
                 {/* Phase 1 */}
                 <div className="flex flex-col justify-between">
                     <div className="space-y-6">
                        <div className="border-b border-vlanc-primary/20 pb-2 mb-6">
                            <h3 className="subtitle-md text-vlanc-secondary font-bold">{data?.phases?.[0]?.title}</h3>
                        </div>
                        <div className="space-y-6">
                            {(data?.phases?.[0]?.subPhases ?? []).map((sub, i) => (
                                <AnimatedSection key={i} className="text-vlanc-black/80 text-[12px] leading-relaxed">
                                    <p className="mb-1"><strong className="text-vlanc-primary tracking-widest uppercase">{sub.number} {sub.title}</strong></p>
                                    <p 
                                        className="whitespace-pre-line"
                                        dangerouslySetInnerHTML={{ __html: sub.description || '' }}
                                    />
                                </AnimatedSection>
                            ))}
                        </div>
                     </div>
                     
                     <div className="mt-12 flex items-center gap-6 no-print">
                        {data?.phases?.[0]?.badge && (
                            <div className="bg-vlanc-primary/80 text-white text-[10px] font-bold px-4 py-3 tracking-widest uppercase rounded-sm shadow-sm flex items-center gap-3">
                                {data.phases[0].badge}
                            </div>
                        )}
                        <button 
                            onClick={() => setShowVideo(true)}
                            className="border border-vlanc-primary text-vlanc-primary px-5 py-2 rounded-sm text-[10px] font-bold hover:bg-vlanc-primary hover:text-white transition tracking-widest uppercase"
                        >
                            VER VIDEO
                        </button>
                     </div>
                </div>
                
                {/* Phase 2 */}
                <div className="flex flex-col justify-between">
                     <div className="space-y-6">
                        <div className="border-b border-vlanc-primary/20 pb-2 mb-6">
                            <h3 className="subtitle-md text-vlanc-secondary font-bold">{data?.phases?.[1]?.title}</h3>
                        </div>
                        <div className="space-y-6">
                            {(data?.phases?.[1]?.subPhases ?? []).map((sub, i) => (
                                <AnimatedSection key={i} className="text-vlanc-black/80 text-[12px] leading-relaxed">
                                     <p className="mb-1"><strong className="text-vlanc-primary tracking-widest uppercase">{sub.number} {sub.title}</strong></p>
                                     <p 
                                        className="whitespace-pre-line"
                                        dangerouslySetInnerHTML={{ __html: sub.description || '' }}
                                     />
                                </AnimatedSection>
                            ))}
                        </div>
                     </div>
                     
                     {data?.phases?.[1]?.badge && (
                         <div className="mt-12 no-print">
                            <div className="inline-block bg-vlanc-primary/80 text-white text-[10px] font-bold px-4 py-3 tracking-widest uppercase rounded-sm shadow-sm">
                                {data.phases[1].badge}
                            </div>
                         </div>
                     )}
                </div>
            </div>
          </div>
        </section>

        {/* MODAL VIDEO */}
        {showVideo && (
            <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setShowVideo(false)}>
                <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                    {videoSrc && <video src={videoSrc} controls autoPlay className="w-full h-full" />}
                    <button onClick={() => setShowVideo(false)} className="absolute top-4 right-4 text-white hover:text-gray-300 text-4xl font-bold">&times;</button>
                </div>
            </div>
        )}
    </>
  );
};

export default ScopePhases;
