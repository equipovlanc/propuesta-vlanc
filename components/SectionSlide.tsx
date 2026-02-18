
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
    // Reducimos zIndex de salida a 45 para que no entre en conflicto con Header (z-60)
    zIndex: direction > 0 ? 0 : 45,
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
      // Volvemos a 'isolation-isolate' para mayor seguridad en el contexto de apilamiento
      // Añadimos atributo data-exiting para que el CSS global lo capture y desactive eventos
      className={`z-slide-container absolute inset-0 w-full h-full flex flex-col justify-center items-center overflow-hidden isolation-isolate ${className}`}
      data-exiting={!isPresent}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      style={{
        perspective: 2000,
        pointerEvents: isPresent ? 'auto' : 'none' 
      }}
      aria-hidden={!isPresent}
    >
        <div className="w-full h-full relative">
            {children}
        </div>
    </motion.div>
  );
};

export default SectionSlide;
