
import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';

interface SubPhase {
    number?: string;
    title?: string;
    description?: string;
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
    <section className="min-h-screen bg-vlanc-bg flex items-center py-20 px-12 md:px-24">
      <div className="w-full h-full flex flex-col lg:flex-row gap-20 items-stretch">
        
        {/* Columna Izquierda: Título Principal e Imagen Vertical a Sangre */}
        <div className="w-full lg:w-5/12 flex flex-col h-full">
            <AnimatedSection>
                <div className="relative mb-12">
                    {/* Subtítulo 1 */}
                    <h2 className="subtitle-pdf text-vlanc-black font-normal lowercase tracking-tighter leading-none">
                        {mainTitle}
                    </h2>
                    <div className="w-20 h-[2px] bg-vlanc-primary mt-6"></div>
                </div>
            </AnimatedSection>
            
            {/* Imagen Vertical Fiel al PDF (Filling space) */}
            <AnimatedSection className="flex-grow relative min-h-[500px] h-full rounded-sm overflow-hidden">
                {data?.image ? (
                     <img src={data.image} alt="Phase" className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 brightness-110 shadow-lg" />
                ) : (
                    <div className="absolute inset-0 bg-vlanc-secondary/10 flex items-center justify-center">
                        <span className="text-xs uppercase tracking-widest text-vlanc-secondary/40">Imagen Fase Vertical</span>
                    </div>
                )}
            </AnimatedSection>
        </div>
        
        {/* Columna Derecha: Contenido de la Fase */}
        <div className="w-full lg:w-7/12 flex flex-col justify-center lg:pl-12 pt-12 lg:pt-32">
            <AnimatedSection>
                {/* Título de Fase: Montserrat Negrita */}
                <h3 className="text-[21px] font-sans font-bold text-vlanc-black uppercase mb-12">{data?.title}</h3>
                
                <div className="space-y-10">
                    {(data?.subPhases ?? []).map((sub, i) => (
                        <div key={i} className="text-[12px] leading-relaxed">
                            {/* Puntos: Montserrat Negrita Negro */}
                            <p className="mb-2 uppercase tracking-widest font-bold text-vlanc-black">
                                {sub.number} {sub.title}
                            </p>
                            {/* Cuerpo: Marrón */}
                            <p className="text-justify whitespace-pre-line text-vlanc-secondary font-sans" dangerouslySetInnerHTML={{ __html: sub.description || '' }} />
                        </div>
                    ))}
                </div>
            </AnimatedSection>

            {/* Botones Estilo PDF (Fondo sólido marrón) */}
            <div className="flex items-center gap-6 pt-16 no-print mt-auto">
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
