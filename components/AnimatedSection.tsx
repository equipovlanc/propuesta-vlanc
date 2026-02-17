
import React, { ReactNode, CSSProperties } from 'react';
import { motion, Variants } from 'framer-motion';

interface AnimatedSectionProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  hierarchy?: number; 
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  mode?: 'default' | 'bar'; // Nuevo modo para la barra
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  className, 
  style, 
  onClick,
  hierarchy = 2, 
  direction = 'up',
  mode = 'default'
}) => {
  
  // LOGICA DE TIEMPOS REFINADA
  // H0 (Media): Inmediato.
  // H1 (Títulos): 0.4s (Rápido, establece contexto).
  // H2 (Texto): 1.2s (Gran pausa para respirar y leer después del título).
  
  const isMedia = hierarchy === 0;
  
  // Base 0.4s para H1.
  // Step 0.8s para separar mucho H2 de H1.
  const baseDelay = isMedia ? 0 : 0.4; 
  const stepDelay = 0.8; 
  
  const calculatedDelay = isMedia ? 0 : baseDelay + ((hierarchy - 1) * stepDelay);

  // Variantes por defecto (Fade + Slide)
  const defaultVariants: Variants = {
    hidden: { 
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
        duration: isMedia ? 0 : 1.2,
        ease: "easeOut",
        delay: calculatedDelay
      }
    },
    exit: {
        opacity: isMedia ? 1 : 0,
        transition: { duration: 0.2 }
    }
  };

  // Variantes para el modo 'bar' (Viaje lateral)
  // Entra desde la izquierda (-100vw) hacia su sitio.
  // Sale hacia la derecha (+100vw).
  const barVariants: Variants = {
      hidden: {
          x: '-110vw',
          opacity: 1, // La barra es sólida, viaja físicamente
      },
      visible: {
          x: 0,
          opacity: 1,
          transition: {
              duration: 1.4, // Viaje largo y suave
              ease: [0.22, 1, 0.36, 1], // Ease out cubic custom
              delay: 0.2 // Empieza un poco antes que el título para cruzar la pantalla
          }
      },
      exit: {
          x: '110vw', // Sale disparada a la derecha
          opacity: 1,
          transition: {
              duration: 0.6,
              ease: "easeIn"
          }
      }
  };

  return (
    <motion.div
      onClick={onClick}
      className={className}
      variants={mode === 'bar' ? barVariants : defaultVariants}
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
