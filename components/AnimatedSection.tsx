
import React, { ReactNode, CSSProperties } from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  hierarchy?: number; 
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  className, 
  style, 
  onClick,
  hierarchy = 2, 
  direction = 'up'
}) => {
  
  // LOGICA DE TIEMPOS ACTUALIZADA
  // Hierarchy 0 (Media): Inmediato. Necesario para mantener la referencia visual durante el movimiento.
  // Hierarchy 1 (Títulos): 0.5s. Aparecen mientras la página aún "vuela" para dar dinamismo.
  // Hierarchy 2 (Textos): 0.8s+. Aparecen al aterrizar o justo antes.
  
  const isMedia = hierarchy === 0;
  
  // Si es media, no hay delay. Si es texto, empezamos en 0.5s
  const baseDelay = isMedia ? 0 : 0.5; 
  const stepDelay = 0.3; // Separación entre niveles de texto
  
  const calculatedDelay = isMedia ? 0 : baseDelay + ((hierarchy - 1) * stepDelay);

  const variants = {
    hidden: { 
      // Si es media (H0), empieza visible y en su sitio (opacity 1, scale 1).
      // Si es texto, empieza oculto.
      opacity: isMedia ? 1 : 0, 
      y: isMedia ? 0 : (direction === 'up' ? 30 : direction === 'down' ? -30 : 0), 
      x: isMedia ? 0 : (direction === 'left' ? 30 : direction === 'right' ? -30 : 0),
      scale: isMedia ? 1 : 0.98, 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      scale: 1,
      transition: {
        duration: isMedia ? 0 : 1.2, // Texto aparece suavemente (1.2s)
        ease: "easeOut" as const,
        delay: calculatedDelay
      }
    },
    exit: {
        opacity: isMedia ? 1 : 0, // Media no hace fade out al salir, se va con el slide
        transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      onClick={onClick}
      className={className}
      variants={variants}
      style={style}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
