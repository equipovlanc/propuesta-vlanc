
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ZSlideProps {
  children: ReactNode;
  id?: string;
  className?: string;
  isActive: boolean;
  direction: number; // 1 (forward) or -1 (backward)
}

// Variantes para el efecto de profundidad Z
const slideVariants = {
  enter: (direction: number) => ({
    scale: direction > 0 ? 1.4 : 0.8, // Si voy adelante, la nueva viene desde "detrás" de mi cabeza (grande) o del fondo?
    // Corrección: El usuario quiere "Alejarse en el horizonte".
    // NEXT (1): La actual se aleja (scale down). La NUEVA debe venir desde "delante" (Scale > 1) hacia su sitio.
    // PREV (-1): La actual se hace grande (va hacia mi). La NUEVA viene del fondo (Scale < 1).
    opacity: 0,
    zIndex: direction > 0 ? 10 : 0, // La nueva tapa a la vieja si voy adelante
    filter: 'blur(10px)',
  }),
  center: {
    scale: 1,
    opacity: 1,
    zIndex: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1], // Ease personalizado ultra suave
    }
  },
  exit: (direction: number) => ({
    scale: direction > 0 ? 0.8 : 1.4, // Si voy adelante, la vieja se va al fondo (0.8). Si voy atrás, la vieja viene hacia mi (1.4)
    opacity: 0,
    zIndex: direction > 0 ? 0 : 10,
    filter: 'blur(10px)',
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
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
        perspective: 1000,
      }}
    >
        {/* Capa de contenido: Se anima internamente para el efecto parallax si los hijos usan motion */}
        <div className="w-full h-full relative">
            {children}
        </div>
    </motion.div>
  );
};

export default SectionSlide;
