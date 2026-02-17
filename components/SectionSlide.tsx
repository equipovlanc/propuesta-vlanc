
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ZSlideProps {
  children: ReactNode;
  id?: string;
  className?: string;
  isActive: boolean;
  direction: number; // 1 (forward) or -1 (backward)
}

// Variantes para el efecto de profundidad Z "Gran Recorrido"
const slideVariants = {
  enter: (direction: number) => ({
    // Aumentamos la escala inicial para que parezca que viene de MUY lejos o MUY cerca
    scale: direction > 0 ? 2.5 : 0.6, 
    opacity: 0,
    zIndex: direction > 0 ? 10 : 0, 
    filter: 'blur(20px)', // Más desenfoque inicial para suavizar la llegada
  }),
  center: {
    scale: 1,
    opacity: 1,
    zIndex: 1,
    filter: 'blur(0px)',
    transition: {
      // Duración aumentada para elegancia extrema
      duration: 2.0, 
      // Curva Bezier personalizada para un "aterrizaje" muy suave
      ease: [0.25, 1, 0.5, 1], 
    }
  },
  exit: (direction: number) => ({
    // La página que se va se aleja mucho más (0.6) o se acerca mucho más (2.5)
    scale: direction > 0 ? 0.6 : 2.5, 
    opacity: 0,
    zIndex: direction > 0 ? 0 : 10,
    filter: 'blur(20px)',
    transition: {
      duration: 2.0,
      ease: [0.25, 1, 0.5, 1],
    }
  })
};

const SectionSlide: React.FC<ZSlideProps> = ({ children, id, className = "", isActive, direction }) => {
  return (
    <motion.div 
      id={id}
      className={`z-slide-container absolute inset-0 w-full h-full flex flex-col justify-center items-center overflow-hidden ${className}`}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      style={{
        backfaceVisibility: 'hidden',
        perspective: 1500, // Aumentamos perspectiva para exagerar la profundidad 3D
      }}
    >
        {/* Capa de contenido */}
        <div className="w-full h-full relative">
            {children}
        </div>
    </motion.div>
  );
};

export default SectionSlide;
