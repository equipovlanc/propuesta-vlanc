
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DividerSlideProps {
    data?: {
        image?: { src: string; opacity?: number };
        text?: string;
        video?: { src: string };
    };
    step?: number;
    isSectionCompleted?: boolean;
    setNavigationBlocked?: (blocked: boolean) => void;
}

const DividerSlide: React.FC<DividerSlideProps> = ({ data, step = 0, isSectionCompleted = false, setNavigationBlocked }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const loopCount = useRef(0);
    const [showVideoModal, setShowVideoModal] = useState(false);

    // El estado final es cuando la sección se ha completado O cuando hemos pasado el paso del video (step > 1)
    const isFinalState = isSectionCompleted || step > 1;

    const imageSrc = data?.image?.src;
    const imageOpacity = data?.image?.opacity ?? 15;
    const videoSrc = data?.video?.src;

    useEffect(() => {
        if (step === 1 && !isFinalState && videoRef.current) {
            loopCount.current = 0; // Reseteamos el contador al empezar a reproducir
            videoRef.current.play().catch(error => {
                console.error("La auto-reproducción del video fue prevenida:", error);
            });
        }
    }, [step, isFinalState]);

    const handleVideoEnd = () => {
        loopCount.current += 1;
        if (loopCount.current < 2 && videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
        // El video se detiene después de 2 reproducciones, esperando el siguiente scroll.
    };

    const openVideoModal = () => {
        if (videoSrc) {
            setShowVideoModal(true);
            setNavigationBlocked?.(true);
        }
    };
    
    const closeVideoModal = () => {
        setShowVideoModal(false);
        setNavigationBlocked?.(false);
    };

    return (
        <>
            <section className="h-full w-full flex flex-col items-center pt-[150px] px-[120px] relative print:pt-0 print:px-0">
                <div className="w-full max-w-[1320px] flex flex-col">
                    {/* Contenedor de Media */}
                    <div className="w-full aspect-[1320/670] shrink-0 relative">
                        {/* Video Player (Solo en Paso 1) */}
                        {videoSrc && !isFinalState && (
                            <motion.div
                                className="absolute inset-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: step === 1 ? 1 : 0 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            >
                                <video
                                    ref={videoRef}
                                    src={videoSrc}
                                    muted
                                    playsInline
                                    onEnded={handleVideoEnd}
                                    className="w-full h-full object-cover shadow-xl rounded-[1px]"
                                />
                            </motion.div>
                        )}

                        {/* Imagen (Paso 2+ o Estado Final) */}
                        <motion.div
                            className="w-full h-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: (isSectionCompleted || step >= 2) ? 1 : 0 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        >
                            {imageSrc && (
                                <div
                                    className={`w-full h-full relative ${isFinalState && videoSrc ? 'cursor-pointer' : ''}`}
                                    onClick={isFinalState ? openVideoModal : undefined}
                                >
                                    <img
                                        src={imageSrc}
                                        alt={data?.text || "Team"}
                                        className="w-full h-full object-cover shadow-xl rounded-[1px]"
                                    />
                                    <div
                                        className="absolute inset-0 bg-[#8f4933] pointer-events-none rounded-[1px]"
                                        style={{ opacity: imageOpacity / 100 }}
                                    />
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Texto (Paso 3+ o Estado Final) */}
                    <motion.div
                        className="mt-12 text-right"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: (isSectionCompleted || step >= 3) ? 1 : 0,
                            y: (isSectionCompleted || step >= 3) ? 0 : 20
                        }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: (isSectionCompleted || step >= 3) ? 0.5 : 0 }}
                    >
                        <h2 className="especial2">
                            {data?.text || "¿Nos dejas acompañarte?"}
                        </h2>
                    </motion.div>
                </div>
            </section>
            
            {/* MODAL VIDEO */}
            <AnimatePresence>
                {showVideoModal && videoSrc && (
                    <motion.div
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-vlanc-black/95 backdrop-blur-md p-4 md:p-10 pointer-events-auto print:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeVideoModal}
                    >
                        <motion.div
                            className="relative w-full max-w-6xl aspect-video bg-black shadow-2xl flex items-center justify-center"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={closeVideoModal}
                                className="absolute -top-12 right-0 text-white hover:text-vlanc-primary transition-colors text-[12px] tracking-[0.2em] font-bold uppercase flex items-center gap-2"
                            >
                                [ Cerrar y Continuar ]
                            </button>
                            <video
                                src={videoSrc}
                                controls
                                autoPlay
                                className="w-full h-full object-contain"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default DividerSlide;
