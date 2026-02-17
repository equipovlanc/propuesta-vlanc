
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
  
  // LOGICA DE TIEMPOS AJUSTADA
  // El slide tarda 1.6s.
  // Delay 1.4s: Empezamos cuando el slide está al 90% de su posición final.
  // Esto evita que el texto se mueva con el slide y se vea borroso.
  
  const baseDelay = 1.4; 
  
  // Step: 0.2s. Cascada rápida.
  // J1: 1.4s
  // J2: 1.6s
  // J3: 1.8s
  const stepDelay = 0.2; 
  
  const calculatedDelay = baseDelay + ((hierarchy - 1) * stepDelay);

  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0, 
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
      scale: 0.98, 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8, // Aparición suave pero no eterna
        ease: "easeOut" as const,
        delay: calculatedDelay
      }
    },
    exit: {
        opacity: 0,
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
