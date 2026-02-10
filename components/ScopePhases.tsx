
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

  // Función para romper el título en líneas por cada palabra
  const formattedTitle = (mainTitle || "trabajos contemplados.").split(' ').map((word, i, arr) => (
      <React.Fragment key={i}>
          {word}
          {i < arr.length - 1 && <br />}
      </React.Fragment>
  ));

  return (
    <section className="h-screen w-full bg-vlanc-bg relative overflow-hidden">
        
        {/* --- 1. TÍTULO SECCIÓN (Posición fija: Top 150, Left 120) --- */}
        <div className="absolute top-[150px] left-[120px] z-20">
             <AnimatedSection>
                <h2 className="subtitulo1 leading-none text-left text-vlanc-black">
                    {formattedTitle}
                </h2>
                {/* Barra decorativa */}
                <div className="w-[112px] h-[5px] bg-[#703622] mt-[40px]"></div>
            </AnimatedSection>
        </div>

        {/* --- 2. IMAGEN VERTICAL (Posición fija: Left 575px, Width 409px, Height 100%) --- 
            Va de "sangre a sangre" (top-0 bottom-0)
        */}
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

        {/* --- 3. CONTENIDO (Posición: A la derecha de la imagen, alineado al fondo) --- 
            Left: 575px (inicio img) + 409px (ancho img) + 50px (espacio) = 1034px
            Bottom: 140px (margen inferior estándar)
            Right: 120px (margen derecho estándar)
        */}
        <div className="absolute bottom-[140px] left-[1034px] right-[120px] z-20 flex flex-col justify-end items-start pointer-events-auto">
            <AnimatedSection>
                {/* Título de la Fase (e.g. 1. FASE ANTEPROYECTO) */}
                <h3 className="fase-titulo mb-4">{data?.title}</h3>
                
                {/* Lista de Subfases */}
                <div className="space-y-4">
                    {(data?.subPhases ?? []).map((sub, i) => (
                        <div key={i} className="text-left">
                            <p className="fase-subtitulo mb-2">
                                {sub.number} {sub.title}
                            </p>
                            <p 
                                className="cuerpo text-[14px]" 
                                dangerouslySetInnerHTML={{ __html: sub.description || '' }} 
                            />
                        </div>
                    ))}
                </div>

                {/* Botones (Garantía / Video) */}
                {(data?.guaranteeText || data?.videoUrl) && (
                    <div className="flex items-center gap-6 pt-16">
                        {data?.guaranteeText && (
                            <button className="bg-vlanc-primary text-white text-[10px] font-bold px-8 py-4 tracking-[0.2em] uppercase rounded-[1px] shadow-sm hover:bg-vlanc-secondary transition-colors cursor-pointer">
                                {data.guaranteeText}
                            </button>
                        )}
                        {data?.videoUrl && (
                            <button 
                                onClick={() => setShowVideo(true)}
                                className="border border-vlanc-primary text-vlanc-primary px-8 py-3.5 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-vlanc-primary hover:text-white transition-all rounded-[1px] cursor-pointer"
                            >
                                VER VIDEO
                            </button>
                        )}
                    </div>
                )}
            </AnimatedSection>
        </div>

        {/* --- MODAL VIDEO --- */}
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
