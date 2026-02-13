
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
    video?: string;
    guaranteeText?: string;
    videoButtonText?: string;
    subPhases?: SubPhase[];
}

interface ScopePhasesProps {
    data?: Phase;
    mainTitle?: string;
}

const ScopePhases: React.FC<ScopePhasesProps> = ({ data, mainTitle = "trabajos contemplados." }) => {
  const [showVideo, setShowVideo] = useState(false);

  // Función para romper el título en líneas por cada palabra
  const formattedTitle = (mainTitle || "trabajos contemplados.").split(' ').map((word, i, arr) => (
      <React.Fragment key={i}>
          {word}
          {i < arr.length - 1 && <br />}
      </React.Fragment>
  ));

  // Función para separar texto de garantía
  const getGuaranteeParts = (text: string) => {
      const parts = text.split('/');
      return {
          badge: parts[0]?.trim(),
          desc: parts.slice(1).join('/').trim()
      };
  };

  const handleVideoClick = () => {
      if (data?.video) {
          setShowVideo(true);
      } else {
          console.log("No hay video cargado");
      }
  };

  const hasGuarantee = !!data?.guaranteeText;
  const hasVideo = !!(data?.videoButtonText && data?.video);
  const hasButtons = hasGuarantee || (data?.videoButtonText && data?.videoButtonText.trim() !== "");

  return (
    <section className="h-screen w-full bg-vlanc-bg relative overflow-hidden">
        
        {/* --- 1. TÍTULO SECCIÓN --- */}
        <div className="absolute top-[150px] left-[120px] z-20">
             <AnimatedSection>
                <h2 className="subtitulo1 leading-none text-left text-vlanc-black">
                    {formattedTitle}
                </h2>
                {/* Barra decorativa actualizada (#8f4933) */}
                <div className="w-[112px] h-[5px] bg-[#8f4933] mt-[40px]"></div>
            </AnimatedSection>
        </div>

        {/* --- 2. IMAGEN VERTICAL --- */}
        <div className="absolute top-0 bottom-0 left-[575px] w-[409px] z-10 overflow-hidden pointer-events-none">
             <AnimatedSection className="w-full h-full">
                {data?.image ? (
                    <img src={data.image} alt="Phase" className="w-full h-full object-cover grayscale opacity-90 brightness-110" />
                ) : (
                    <div className="w-full h-full bg-vlanc-secondary/10 flex items-center justify-center border border-vlanc-secondary/5">
                        <span className="text-xs tracking-widest text-vlanc-secondary/40">Imagen 409px</span>
                    </div>
                )}
             </AnimatedSection>
        </div>

        {/* --- 3. CONTENIDO --- */}
        <div className="absolute bottom-[140px] left-[1034px] right-[120px] z-20 flex flex-col justify-end items-start pointer-events-auto">
            <AnimatedSection className="w-full">
                {/* Título de la Fase */}
                <h3 className="fase-titulo mb-8 text-vlanc-black">{data?.title}</h3>
                
                {/* Lista de Subfases */}
                <div className="space-y-6">
                    {(data?.subPhases ?? []).map((sub, i) => (
                        <div key={i} className="text-left">
                            <p className="fase-subtitulo mb-1 text-vlanc-black">
                                {sub.number} {sub.title}
                            </p>
                            <p 
                                className="cuerpo text-[14px] leading-[1.5]" 
                                dangerouslySetInnerHTML={{ __html: sub.description || '' }} 
                            />
                        </div>
                    ))}
                </div>

                {/* Botones */}
                {hasButtons && (
                    <div className="flex items-center gap-6 mt-12">
                        {hasGuarantee && (() => {
                            const { badge, desc } = getGuaranteeParts(data!.guaranteeText!);
                            return (
                                <button className="flex items-center bg-vlanc-primary text-white px-6 py-4 rounded-[1px] shadow-sm hover:bg-vlanc-secondary transition-all cursor-pointer group">
                                    <span className="boton1 text-white">
                                        {badge}
                                    </span>
                                    {desc && (
                                        <>
                                            <span className="mx-3 text-[14px] font-serif leading-none opacity-60">/</span>
                                            <span className="boton2 text-white">
                                                {desc}
                                            </span>
                                        </>
                                    )}
                                </button>
                            );
                        })()}
                        
                        {data?.videoButtonText && (
                            <button 
                                onClick={handleVideoClick}
                                className="border border-vlanc-primary text-vlanc-primary px-8 py-4 uppercase hover:bg-vlanc-primary hover:text-white transition-all rounded-[1px] cursor-pointer bg-transparent group"
                            >
                                <span className="boton1 text-vlanc-primary group-hover:text-white">
                                    {data.videoButtonText}
                                </span>
                            </button>
                        )}
                    </div>
                )}
            </AnimatedSection>
        </div>

        {/* --- MODAL VIDEO --- */}
        {showVideo && data?.video && (
            <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 pointer-events-auto" onClick={() => setShowVideo(false)}>
                <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg shadow-2xl" onClick={e => e.stopPropagation()}>
                    <video src={data.video} controls autoPlay className="w-full h-full" />
                    <button onClick={() => setShowVideo(false)} className="absolute -top-12 right-0 text-white text-4xl">&times;</button>
                </div>
            </div>
        )}
    </section>
  );
};

export default ScopePhases;
