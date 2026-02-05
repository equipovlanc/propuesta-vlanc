
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
    <section className="h-full w-full bg-vlanc-bg flex relative overflow-hidden">
        
        {/* Columna Izquierda: Imagen A SANGRE (Full Height, Absolute Left) */}
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

        {/* Overlay para el Título Principal (Sobre la imagen o desplazado) - Según PDF P9 el título está arriba a la izquierda sobre fondo claro... 
            Espera, en el PDF P9, el título "trabajos contemplados" está SOBRE la zona crema a la izquierda de la imagen? 
            No, el PDF P9 muestra: Fondo crema a la izquierda con el título. Imagen en el CENTRO/DERECHA cortada?
            Ah, viendo el screenshot P9:
            Izquierda: Fondo Crema. Título "trabajos contemplados".
            Centro/Derecha: Foto Vertical cortada. 
            Derecha del todo: Texto.
            
            PERO el usuario dijo "imagenes verticales de arriba a abajo de la pagina...". 
            Vamos a asumir diseño 2 columnas: 
            Columna 1 (Izq): Título + Imagen debajo? O Imagen Izq y Texto Der?
            El screenshot P9 muestra: Izquierda (Título). Centro (Foto). Derecha (Texto). Es un layout de 3 columnas o 2 columnas con imagen en medio.
            
            Re-interpretación PDF P9:
            Lado Izquierdo (~30%): Título arriba. Abajo espacio vacío.
            Centro (~30%): Imagen Vertical a sangre.
            Derecha (~40%): Textos de la fase.
        */}

        <div className="w-full h-full flex z-10 pointer-events-none">
            {/* Columna 1: Título */}
            <div className="hidden lg:flex w-[25%] h-full pt-32 pl-12 flex-col bg-vlanc-bg">
                 <AnimatedSection>
                    <h2 className="subtitle-pdf text-vlanc-black font-normal tracking-tighter leading-none text-left">
                        {mainTitle}
                    </h2>
                    <div className="w-20 h-[2px] bg-vlanc-primary mt-6"></div>
                </AnimatedSection>
            </div>

            {/* Columna 2: Imagen (La ponemos aquí en el flujo normal si queremos que ocupe espacio, o usamos la absoluta de fondo si es a sangre total) 
                El usuario dijo "imagenes verticales de arriba a abajo". Hagamos que la imagen sea la columna central.
            */}
            <div className="w-full lg:w-[35%] h-full relative overflow-hidden pointer-events-auto">
                 {/* Si hay imagen en data, la mostramos aquí a full height */}
                  {data?.image && (
                     <img src={data.image} className="w-full h-full object-cover grayscale" />
                  )}
            </div>

            {/* Columna 3: Contenido Texto */}
            <div className="w-full lg:w-[40%] h-full flex flex-col justify-center px-12 lg:pr-24 py-20 overflow-y-auto no-scrollbar pointer-events-auto bg-vlanc-bg">
                <AnimatedSection>
                    <h3 className="text-[21px] font-sans font-bold text-vlanc-black uppercase mb-12">{data?.title}</h3>
                    
                    <div className="space-y-8">
                        {(data?.subPhases ?? []).map((sub, i) => (
                            <div key={i} className="text-[12px] leading-relaxed">
                                {/* Puntos: Montserrat Negrita Negro. IMPORTANTE: Renderizar negritas del Sanity si las hay */}
                                <p className="mb-2 tracking-widest font-bold text-vlanc-black uppercase">
                                    {sub.number} {sub.title}
                                </p>
                                <p 
                                    className="text-justify whitespace-pre-line text-vlanc-secondary font-sans [&>strong]:font-bold [&>strong]:text-vlanc-black" 
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
