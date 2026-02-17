
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ZSlideProps {
  children: ReactNode;
  id?: string;
  className?: string;
  isActive: boolean;
  direction: number; // 1 (forward) or -1 (backward)
}

// Variantes para el efecto de "Viaje Espacial"
const slideVariants = {
  enter: (direction: number) => ({
    // ESCALA EXTREMA: 3.5 hace que parezca que la página atraviesa la cámara
    scale: direction > 0 ? 3.5 : 0.2, 
    opacity: 0,
    zIndex: direction > 0 ? 50 : 0, 
    filter: 'blur(20px)',
  }),
  center: {
    scale: 1,
    opacity: 1,
    zIndex: 10,
    filter: 'blur(0px)',
    transition: {
      // Velocidad ajustada: Más rápido que antes (2.0s -> 1.6s)
      duration: 1.6, 
      ease: [0.25, 1, 0.5, 1], // Curva "Logística" suave
    }
  },
  exit: (direction: number) => ({
    // ESCALA EXTREMA: Se aleja hasta ser un punto en el horizonte
    scale: direction > 0 ? 0.2 : 3.5, 
    opacity: 0,
    zIndex: direction > 0 ? 0 : 50,
    filter: 'blur(10px)',
    transition: {
      duration: 1.6,
      ease: [0.25, 1, 0.5, 1],
    }
  })
};

const SectionSlide: React.FC<ZSlideProps> = ({ children, id, className = "", isActive, direction }) => {
  return (
    <motion.div 
      id={id}
      // ELIMINADO: bg-vlanc-bg u otros fondos. Ahora es transparente.
      className={`z-slide-container absolute inset-0 w-full h-full flex flex-col justify-center items-center overflow-hidden pointer-events-none ${className}`}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      style={{
        backfaceVisibility: 'hidden',
        perspective: 2000, // Perspectiva profunda
      }}
    >
        {/* Capa de contenido: Restauramos pointer-events para interactividad */}
        <div className="w-full h-full relative pointer-events-auto">
            {children}
        </div>
    </motion.div>
  );
};

export default SectionSlide;
