
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
  
  // LOGICA DE JERARQUÍA "DISTINCTIVA"
  // J1: Títulos. Llegan rápido (0.3s delay) para anclar la vista.
  // J2: Cuerpo. Llegan a medio camino (0.7s delay).
  // J3: Imágenes/Media. Llegan al final (1.1s delay) para cerrar.
  
  const baseDelay = 0.3;
  const stepDelay = 0.4; 
  const calculatedDelay = baseDelay + ((hierarchy - 1) * stepDelay);

  const variants = {
    hidden: { 
      opacity: 0, 
      // Movimiento más pronunciado para que se note el viaje
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0, 
      x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
      scale: 0.9, // Ligera escala para efecto "pop"
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      scale: 1,
      transition: {
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1], // OutExpo para frenada suave
        delay: calculatedDelay
      }
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div
      onClick={onClick}
      className={className}
      variants={variants}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
