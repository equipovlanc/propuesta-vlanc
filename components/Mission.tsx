
import React, { useRef } from 'react';
import AnimatedSection from './AnimatedSection';

interface SectionData {
    title?: string;
    subtitle?: string;
    description?: string;
    listItems?: string[];
}

interface MissionProps {
    data?: {
        image?: string;
        video?: string;
        mission?: SectionData;
        achievements?: SectionData;
    }
}

const Mission: React.FC<MissionProps> = ({ data }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const toggleFullScreen = () => {
        if (videoRef.current) {
            if (videoRef.current.requestFullscreen) {
                videoRef.current.requestFullscreen();
            } else if ((videoRef.current as any).webkitRequestFullscreen) {
                (videoRef.current as any).webkitRequestFullscreen();
            } else if ((videoRef.current as any).msRequestFullscreen) {
                (videoRef.current as any).msRequestFullscreen();
            }
        }
    };

    return (
        <section className="h-full w-full flex flex-col lg:flex-row bg-vlanc-bg overflow-hidden">
            
            {/* Columna Izquierda: Video */}
            <div className="w-full lg:w-[55.7%] h-full flex items-center justify-center relative bg-vlanc-bg">
                <AnimatedSection className="flex items-center justify-center w-full h-full px-10">
                    <div 
                        className="relative group cursor-pointer shadow-2xl overflow-hidden rounded-sm"
                        style={{ width: 'min(852px, 100%)', aspectRatio: '852/469' }}
                        onClick={toggleFullScreen}
                    >
                        {data?.video ? (
                            <video 
                                ref={videoRef}
                                src={data.video} 
                                autoPlay 
                                loop 
                                muted 
                                playsInline 
                                className="w-full h-full object-cover grayscale brightness-90 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" 
                            />
                        ) : data?.image ? (
                            <img src={data.image} alt="Mission" className="w-full h-full object-cover grayscale" />
                        ) : (
                            <div className="w-full h-full bg-vlanc-primary/5 flex items-center justify-center">
                                 <span className="text-vlanc-primary/30 font-bold uppercase tracking-widest text-[10px]">Esperando Video (852x469)</span>
                            </div>
                        )}
                        
                        {/* Overlay decorativo */}
                        <div className="absolute inset-0 bg-vlanc-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full border border-white flex items-center justify-center">
                                <svg className="w-6 h-6 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </div>

            {/* Columna Derecha: Contenido 
                - Ajuste de márgenes: pt-[150px], pb-[140px]
            */}
            <div className="w-full lg:w-[44.3%] h-full flex flex-col justify-between pl-10 lg:pl-[76px] pr-[120px] pt-[150px] pb-[140px]">
                
                {/* Bloque Superior: La Misión */}
                <div className="flex flex-col">
                    <AnimatedSection>
                        <h2 className="subtitulo1 leading-none">
                            {data?.mission?.title || "la misión."}
                        </h2>
                        {/* Barra decorativa actualizada. CAMBIO: mt-[50px] -> mt-[40px] */}
                        <div className="w-[112px] h-[5px] bg-[#703622] mt-[40px] mb-12"></div>
                    </AnimatedSection>
                    
                    <AnimatedSection>
                        <h3 className="subtitulo2 mb-6 leading-tight max-w-sm">
                            {data?.mission?.subtitle}
                        </h3>
                        <p className="cuerpo w-full">
                            {data?.mission?.description}
                        </p>
                    </AnimatedSection>
                </div>

                {/* Bloque Inferior: Qué vas a conseguir */}
                <div className="flex flex-col">
                    <AnimatedSection>
                        <h2 className="subtitulo1 leading-none">
                            {data?.achievements?.title || "qué vas a conseguir."}
                        </h2>
                         {/* Barra decorativa actualizada. CAMBIO: mt-[50px] -> mt-[40px] */}
                        <div className="w-[112px] h-[5px] bg-[#703622] mt-[40px] mb-12"></div>
                    </AnimatedSection>
                    
                    <AnimatedSection>
                        <ul className="space-y-4 w-full">
                            {(data?.achievements?.listItems ?? []).map((item, i) => (
                                <li key={i} className="cuerpo">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
};

export default Mission;
