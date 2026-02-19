import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { motion, AnimatePresence } from 'framer-motion';

interface DividerSlideProps {
  image?: { src: string; opacity?: number };
  text?: string;
  video?: string;
  step?: number;
  isCompleted?: boolean;
}

const DividerSlide: React.FC<DividerSlideProps> = ({ 
  image, 
  text, 
  video, 
  step = 0, 
  isCompleted = false 
}) => {
  // State to track if we are showing the final state (Image + Text)
  const [showFinalState, setShowFinalState] = useState(isCompleted);
  // State to track if video is playing
  const [isPlaying, setIsPlaying] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  // Effect: Handle Step 1 (Trigger Video)
  useEffect(() => {
    // If we are at step 1, and not completed, and not already showing final state
    if (step >= 1 && !isCompleted && !showFinalState) {
        if (video) {
            setIsPlaying(true);
            // Small timeout to ensure element is mounted
            setTimeout(() => {
                videoRef.current?.play().catch(e => console.log("Autoplay prevented", e));
            }, 100);
        } else {
            // If no video, skip directly to final state
            setShowFinalState(true);
        }
    }
  }, [step, isCompleted, showFinalState, video]);

  // Effect: If isCompleted is true (returning to section), show final state immediately
  useEffect(() => {
      if (isCompleted) {
          setShowFinalState(true);
          setIsPlaying(false);
      }
  }, [isCompleted]);

  const handleVideoEnd = () => {
      setIsPlaying(false);
      setShowFinalState(true);
  };

  const handleImageClick = () => {
      // Solo permite reproducir el video si no se está reproduciendo ya y la imagen/texto son visibles
      if (video && showFinalState && !isPlaying) {
          setShowFinalState(false);
          setIsPlaying(true);
          setTimeout(() => {
              videoRef.current?.play();
          }, 50);
      }
  };

  const imageSrc = image?.src;
  const imageOpacity = image?.opacity ?? 15;

  return (
    <section 
        className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-vlanc-bg cursor-pointer"
        onClick={handleImageClick}
    >
      {/* Video Overlay: Se superpone sin afectar a la maquetación base. */}
      <AnimatePresence>
        {isPlaying && video && (
            <motion.div 
                key="video"
                className="absolute inset-0 z-20 bg-black print:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
            >
                <video 
                    ref={videoRef}
                    src={video}
                    className="w-full h-full object-cover"
                    onEnded={handleVideoEnd}
                    playsInline
                    muted={false} 
                />
            </motion.div>
        )}
      </AnimatePresence>
    <section className="h-full w-full flex flex-col items-center pt-[150px] px-[120px] relative bg-vlanc-bg">
         <div className="w-full max-w-[1320px] flex flex-col">
             {/* Media Container (J0) */}
             <div className="w-full aspect-[1320/670] shrink-0 relative">
                 <AnimatedSection className="w-full h-full relative shadow-xl rounded-[1px] overflow-hidden bg-black" hierarchy={0}>
                    
                    {/* VIDEO LAYER */}
                    <AnimatePresence>
                        {!showFinalState && video && (
                            <motion.div 
                                key="video"
                                className="absolute inset-0 z-20 bg-black"
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.0 }}
                            >
                                <video 
                                    ref={videoRef}
                                    src={video}
                                    className="w-full h-full object-cover"
                                    onEnded={handleVideoEnd}
                                    playsInline
                                    controls
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

      {/* Maquetación Base: Imagen de fondo */}
      {imageSrc && (
        <motion.div
            className="absolute inset-0 z-0"
            initial={{ opacity: isCompleted ? 1 : 0 }}
            animate={{ opacity: showFinalState ? 1 : 0 }}
            transition={{ duration: 1.0, delay: 0.2 }} // Aparece después de que el video se oculte
        >
            <img src={imageSrc} alt="Team" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#8f4933] pointer-events-none" style={{ opacity: imageOpacity / 100 }} />
        </motion.div>
      )}
                    {/* IMAGE LAYER */}
                    <motion.div 
                        className="absolute inset-0 z-10 w-full h-full"
                        initial={{ opacity: isCompleted ? 1 : 0 }}
                        animate={{ opacity: showFinalState ? 1 : 0 }}
                        transition={{ duration: 1.0 }}
                    >
                        {imageSrc ? (
                            <div className="w-full h-full relative">
                                <img 
                                    src={imageSrc} 
                                    alt="Team" 
                                    className="w-full h-full object-cover" 
                                />
                                <div 
                                    className="absolute inset-0 bg-[#8f4933] pointer-events-none" 
                                    style={{ opacity: imageOpacity / 100 }}
                                />
                            </div>
                        ) : (
                             <div className="w-full h-full bg-vlanc-primary/10 flex items-center justify-center border border-vlanc-primary/5">
                                <span className="text-xs uppercase tracking-widest text-vlanc-primary/40 font-bold">Foto Equipo 1320x670</span>
                            </div>
                        )}
                    </motion.div>

      {/* Maquetación Base: Texto centrado */}
      <div className="relative z-10 pointer-events-none">
        <AnimatePresence>
            {showFinalState && (
                <motion.h2
                    className="especial1 text-center px-4"
                    initial={isCompleted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.4 } }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }} // Aparece después de la imagen
                >
                    {text}
                </motion.h2>
            )}
        </AnimatePresence>
      </div>
                 </AnimatedSection>
             </div>
             
             {/* Text (J2) - Only visible in final state */}
             <div className="mt-12 text-right overflow-hidden min-h-[100px]">
                <AnimatePresence>
                    {showFinalState && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <h2 className="especial2">
                                {text || "¿Nos dejas acompañarte?"}
                            </h2>
                        </motion.div>
                    )}
                </AnimatePresence>
             </div>
         </div>
    </section>
  );
};

export default DividerSlide;