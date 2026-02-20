
import React, { useRef } from 'react';
import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';

interface SectionData {
    title?: string;
    subtitle?: string;
    description?: string;
    listItems?: string[];
}

interface MissionProps {
    data?: {
        image?: { src: string; opacity?: number };
        video?: string;
        mission?: SectionData;
        achievements?: SectionData;
    };
    step?: number; // 0 = Video centrado, 1 = Video izquierda + Misión, 2 = Video izquierda + Logros
    isPrinting?: boolean;
}

const Mission: React.FC<MissionProps> = ({ data, step = 0, isPrinting = false }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const imageSrc = data?.image?.src;
    const imageOpacity = data?.image?.opacity ?? 15;

    const effectiveStep = isPrinting ? 2 : step;

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
        <section className="h-full w-full flex flex-col lg:flex-row overflow-hidden">
            
            {/* Columna Izquierda: Media (J0) */}
            <div className="w-full lg:w-[55.7%] h-full flex items-center justify-center relative z-10">
                
                <motion.div 
                    className="flex items-center justify-center w-full h-full px-10"
                    initial={{ 
                        x: effectiveStep === 0 ? '22.15vw' : 0 
                    }}
                    animate={{ 
                        x: effectiveStep === 0 ? '22.15vw' : 0 
                    }}
                    transition={{ 
                        duration: 1.2, 
                        ease: [0.22, 1, 0.36, 1] 
                    }}
                >
                    <AnimatedSection hierarchy={0} className="w-full flex justify-center">
                        <div 
                            className="relative group cursor-pointer shadow-2xl overflow-hidden rounded-sm bg-vlanc-bg"
                            style={{ width: 'min(852px, 100%)', aspectRatio: '852/469' }}
                            onClick={toggleFullScreen}
                        >
                            {/* VIDEO */}
                            {data?.video && (
                                <video 
                                    ref={videoRef}
                                    src={data.video} 
                                    autoPlay 
                                    loop 
                                    muted 
                                    playsInline 
                                    className="w-full h-full object-cover relative z-10 transition-all duration-700 group-hover:scale-105 print:hidden" 
                                />
                            )}

                            {/* IMAGEN */}
                            {imageSrc ? (
                                <div className={`absolute inset-0 z-0 w-full h-full ${data?.video ? 'hidden print:block' : 'block'}`}>
                                    <img 
                                        src={imageSrc} 
                                        alt="Mission" 
                                        className="w-full h-full object-cover" 
                                    />
                                    <div 
                                        className="absolute inset-0 bg-[#8f4933] pointer-events-none" 
                                        style={{ opacity: imageOpacity / 100 }}
                                    />
                                </div>
                            ) : !data?.video && (
                                <div className="w-full h-full bg-vlanc-primary/5 flex items-center justify-center">
                                     <span className="text-vlanc-primary/30 font-bold uppercase tracking-widest text-[10px]">Esperando Media (852x469)</span>
                                </div>
                            )}
                            
                            {/* Overlay de color al hacer hover */}
                            <div className="absolute inset-0 z-20 bg-vlanc-primary/10 opacity-0 group-hover:opacity-100 transition-opacity print:hidden pointer-events-none" />
                        </div>
                    </AnimatedSection>
                </motion.div>
            </div>

            {/* Columna Derecha: Contenido */}
            <div className="w-full lg:w-[44.3%] h-full flex flex-col justify-between pl-10 lg:pl-[76px] pr-[120px] pt-[150px] pb-[140px] relative z-0">
                
                {/* Bloque Superior: La Misión (Visible si step >= 1) */}
                {effectiveStep >= 1 && (
                    <div className="flex flex-col">
                        <AnimatedSection hierarchy={1}>
                            <h2 className="subtitulo1 leading-none">
                                {data?.mission?.title || "la misión."}
                            </h2>
                        </AnimatedSection>
                        <AnimatedSection mode="bar" className="w-[112px] h-[5px] bg-[#8f4933] mt-[27px] mb-12" />
                        
                        <AnimatedSection hierarchy={2}>
                            <h3 className="subtitulo2 mb-6 leading-tight max-w-sm">
                                {data?.mission?.subtitle}
                            </h3>
                            <p className="cuerpo w-full">
                                {data?.mission?.description}
                            </p>
                        </AnimatedSection>
                    </div>
                )}

                {/* Bloque Inferior: Qué vas a conseguir (Visible si step >= 2) */}
                {effectiveStep >= 2 && (
                    <div className="flex flex-col">
                        <AnimatedSection hierarchy={1}>
                            <h2 className="subtitulo1 leading-none">
                                {data?.achievements?.title || "qué vas a conseguir."}
                            </h2>
                        </AnimatedSection>
                        <AnimatedSection mode="bar" className="w-[112px] h-[5px] bg-[#8f4933] mt-[27px] mb-12" />
                        
                        <AnimatedSection hierarchy={2}>
                            <ul className="space-y-4 w-full">
                                {(data?.achievements?.listItems ?? []).map((item, i) => (
                                    <li key={i} className="cuerpo">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </AnimatedSection>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Mission;
