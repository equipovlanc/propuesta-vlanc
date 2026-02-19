import React, { useState, useEffect, useRef } from 'react';
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
      if (video) {
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
    <section className="h-screen w-full relative overflow-hidden bg-vlanc-bg">
      <AnimatePresence mode='wait'>
        
        {/* VIDEO PLAYER */}
        {isPlaying && video && !showFinalState && (
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

        {/* FINAL STATE (IMAGE + TEXT) */}
        {showFinalState && (
            <motion.div 
                key="image"
                className="absolute inset-0 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.0 }}
            >
                 <div className="w-full h-full relative cursor-pointer" onClick={handleImageClick}>
                    {imageSrc && (
                        <>
                            <img src={imageSrc} alt="Team" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-[#8f4933] pointer-events-none" style={{ opacity: imageOpacity / 100 }} />
                        </>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                         <AnimatedSection>
                            <h2 className="especial1 text-center px-4">{text}</h2>
                         </AnimatedSection>
                    </div>
                 </div>
            </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DividerSlide;