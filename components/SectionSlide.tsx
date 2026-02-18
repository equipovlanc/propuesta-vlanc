
import React, { ReactNode } from 'react';
import { motion, Variants, useIsPresent } from 'framer-motion';

interface ZSlideProps {
  children: ReactNode;
  id?: string;
  className?: string;
  direction: number; // 1 (forward) or -1 (backward)
}

// Variantes para el efecto de "Viaje Espacial"
const slideVariants: Variants = {
  enter: (direction: number) => ({
    // Escala grande para que venga "detrás de la cabeza" o muy del fondo
    scale: direction > 0 ? 3.0 : 0.4, 
    opacity: 0,
    zIndex: direction > 0 ? 50 : 0, 
    // Blur reducido a 3px
    filter: 'blur(3px)',
  }),
  center: {
    scale: 1,
    opacity: 1,
    zIndex: 10,
    filter: 'blur(0px)',
    transition: {
      duration: 1.6, 
      ease: [0.25, 1, 0.5, 1] as const,
    }
  },
  exit: (direction: number) => ({
    scale: direction > 0 ? 0.4 : 3.0, 
    opacity: 0,
    zIndex: direction > 0 ? 0 : 50,
    filter: 'blur(3px)', 
    transition: {
      duration: 1.6,
      ease: [0.25, 1, 0.5, 1] as const,
    }
  })
};

const SectionSlide: React.FC<ZSlideProps> = ({ children, id, className = "", direction }) => {
  const isPresent = useIsPresent();

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
        perspective: 2000, 
        // CONTROL DE CLICS:
        // Si está presente (es la diapositiva activa o entrante), permitimos clics (auto).
        // Si NO está presente (está saliendo), bloqueamos clics (none) inmediatamente.
        // Esto evita que la diapositiva saliente bloquee a la entrante, independientemente del z-index.
        pointerEvents: isPresent ? 'auto' : 'none' 
      }}
    >
        <div className="w-full h-full relative">
            {children}
        </div>
    </motion.div>
  );
};

export default SectionSlide;
