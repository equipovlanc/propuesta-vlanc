
import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';

interface SubPhase {
    number?: string;
    title?: string;
    description?: string;
    note?: string;
}

interface Phase {
    title?: string;
    image?: string;
    videoUrl?: string;
    guaranteeText?: string;
    subPhases?: SubPhase[];
}

interface ScopePhasesProps {
    data?: Phase;
    mainTitle?: string;
}

const ScopePhases: React.FC<ScopePhasesProps> = ({ data, mainTitle = "trabajos contemplados." }) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="h-full w-full bg-vlanc-bg flex relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full lg:w-[45%] h-full z-0">
             <AnimatedSection className="w-full h-full">
                {data?.image ? (
                        <img src={data.image} alt="Phase" className="w-full h-full object-cover grayscale opacity-90 brightness-110" />
                ) : (
                    <div className="w-full h-full bg-vlanc-secondary/10 flex items-center justify-center">
                        <span className="text-xs tracking-widest text-vlanc-secondary/40">Imagen Vertical</span>
                    </div>
                )}
             </AnimatedSection>
        </div>

        <div className="w-full h-full flex z-10 pointer-events-none">
            {/* Columna Izquierda: Título alineado a 150px */}
            <div className="hidden lg:flex w-[25%] h-full pt-[150px] pl-[120px] flex-col bg-vlanc-bg">
                 <AnimatedSection>
                    <h2 className="subtitulo1 leading-none text-left">
                        {mainTitle}
                    </h2>
                    {/* Barra decorativa actualizada. CAMBIO: mt-[50px] -> mt-[40px] */}
                    <div className="w-[112px] h-[5px] bg-[#703622] mt-[40px]"></div>
                </AnimatedSection>
            </div>

            <div className="w-full lg:w-[35%] h-full relative overflow-hidden pointer-events-auto">
                  {data?.image && (
                     <img src={data.image} className="w-full h-full object-cover grayscale" />
                  )}
            </div>

            {/* Columna Derecha: Contenido alineado a 150px */}
            <div className="w-full lg:w-[40%] h-full flex flex-col justify-start px-10 lg:pl-10 lg:pr-[120px] pt-[150px] pb-[140px] overflow-y-auto no-scrollbar pointer-events-auto bg-vlanc-bg">
                <AnimatedSection>
                    <h3 className="text-[21px] font-sans font-bold text-vlanc-black uppercase mb-12">{data?.title}</h3>
                    
                    <div className="space-y-8">
                        {(data?.subPhases ?? []).map((sub, i) => (
                            <div key={i} className="text-[12px] leading-[1.4]">
                                <p className="mb-2 tracking-widest font-bold text-vlanc-black uppercase">
                                    {sub.number} {sub.title}
                                </p>
                                <p 
                                    className="cuerpo" 
                                    dangerouslySetInnerHTML={{ __html: sub.description || '' }} 
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-6 pt-16 mt-auto">
                        {data?.guaranteeText && (
                            <button className="bg-vlanc-primary text-white text-[10px] font-bold px-8 py-4 tracking-[0.2em] uppercase rounded-[1px] shadow-sm hover:bg-vlanc-secondary transition-colors">
                                {data.guaranteeText}
                            </button>
                        )}
                        {data?.videoUrl && (
                            <button 
                                onClick={() => setShowVideo(true)}
                                className="border border-vlanc-primary text-vlanc-primary px-8 py-3.5 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-vlanc-primary hover:text-white transition-all rounded-[1px]"
                            >
                                VER VIDEO
                            </button>
                        )}
                    </div>
                </AnimatedSection>
            </div>
        </div>

      {showVideo && (
            <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 pointer-events-auto" onClick={() => setShowVideo(false)}>
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
