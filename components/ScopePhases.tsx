
import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';

interface SubPhase {
    number?: string;
    title?: string;
    description?: string;
}

interface Phase {
    title?: string;
    badge?: string;
    videoUrl?: string;
    subPhases?: SubPhase[];
}

interface ScopePhasesProps {
    data?: Phase;
    mainTitle?: string;
}

const ScopePhases: React.FC<ScopePhasesProps> = ({ data, mainTitle = "trabajos contemplados." }) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="min-h-screen bg-vlanc-bg flex flex-col justify-center py-20 px-12 md:px-24">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20">
        <AnimatedSection>
            <div className="relative mb-16">
                <h2 className="subtitle-pdf text-vlanc-secondary font-bold lowercase">
                    {mainTitle}
                </h2>
                <div className="w-16 h-[2px] bg-vlanc-primary mt-4"></div>
            </div>
            
            {/* Imagen representativa (estilo PDF) */}
            <div className="aspect-[4/5] w-full overflow-hidden rounded-sm grayscale opacity-90 brightness-110 shadow-lg">
                <img src="https://images.unsplash.com/photo-1503387762-592fcf08973b?q=80&w=1200" alt="Atmosphere" className="w-full h-full object-cover" />
            </div>
        </AnimatedSection>
        
        <div className="flex flex-col justify-center space-y-12">
            <AnimatedSection>
                <div className="border-b border-vlanc-primary/20 pb-4 mb-10">
                    <h3 className="text-[21px] font-serif font-bold text-vlanc-secondary lowercase">{data?.title}</h3>
                </div>
                
                <div className="space-y-8">
                    {(data?.subPhases ?? []).map((sub, i) => (
                        <div key={i} className="text-[12px] leading-relaxed text-vlanc-black/80">
                            <p className="mb-2 uppercase tracking-widest font-bold text-vlanc-primary">
                                {sub.number} {sub.title}
                            </p>
                            <p className="text-justify whitespace-pre-line" dangerouslySetInnerHTML={{ __html: sub.description || '' }} />
                        </div>
                    ))}
                </div>
            </AnimatedSection>

            {/* Botones Estilo PDF */}
            <div className="flex items-center gap-6 pt-10 no-print">
                {data?.badge && (
                    <div className="bg-vlanc-primary text-white text-[10px] font-bold px-6 py-4 tracking-[0.2em] uppercase rounded-[1px] shadow-md">
                        {data.badge}
                    </div>
                )}
                {data?.videoUrl && (
                    <button 
                        onClick={() => setShowVideo(true)}
                        className="border border-vlanc-primary text-vlanc-primary px-8 py-3.5 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-vlanc-primary hover:text-white transition-all rounded-[1px]"
                    >
                        VER VIDEO
                    </button>
                )}
            </div>
        </div>
      </div>

      {showVideo && (
            <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setShowVideo(false)}>
                <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg shadow-2xl" onClick={e => e.stopPropagation()}>
                    <video src={data?.videoUrl} controls autoPlay className="w-full h-full" />
                    <button onClick={() => setShowVideo(false)} className="absolute -top-12 right-0 text-white text-4xl">&times;</button>
                </div>
            </div>
      )}
    </section>
  );
};

export default ScopePhases;
