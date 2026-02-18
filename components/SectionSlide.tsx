
import React, { ReactNode, useRef, useEffect } from 'react';
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
  const ref = useRef<HTMLDivElement>(null);

  // Manipulación imperativa del DOM para garantizar que pointer-events funciona
  // sin depender del ciclo de renderizado de React, que puede ser más lento durante animaciones pesadas.
  useEffect(() => {
    if (ref.current) {
        if (isPresent) {
            ref.current.style.pointerEvents = 'auto';
            ref.current.classList.remove('pe-none-recursive');
        } else {
            // FORCE DISABLE POINTER EVENTS ON EXIT
            ref.current.style.pointerEvents = 'none';
            ref.current.classList.add('pe-none-recursive');
            
            // Fuerza bruta: desactivar en todos los hijos directos para evitar herencias 'auto'
            // que puedan bloquear la capa inferior.
            const allChildren = ref.current.querySelectorAll('*');
            allChildren.forEach(child => {
                (child as HTMLElement).style.pointerEvents = 'none';
            });
        }
    }
  }, [isPresent]);

  return (
    <motion.div 
      ref={ref}
      id={id}
      // Eliminamos isolation: isolate para evitar problemas de contexto de apilamiento
      className={`z-slide-container absolute inset-0 w-full h-full flex flex-col justify-center items-center overflow-hidden ${className}`}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      style={{
        perspective: 2000,
        // Refuerzo inicial por si el useEffect tarda un frame
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
