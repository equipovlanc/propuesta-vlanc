
import React, { ReactNode, CSSProperties } from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  // Nueva prop para controlar el orden de aparición (1, 2, 3...)
  hierarchy?: number; 
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  className, 
  style, 
  onClick,
  hierarchy = 2, // Por defecto J2 (cuerpo)
  direction = 'up'
}) => {
  
  // CÁLCULO DE TIEMPOS "ELEGANTES"
  // La diapositiva tarda 2.0s en llegar.
  // J1 (Títulos): Empieza a los 0.5s (cuando la diapositiva ya es visible).
  // J2 (Textos): Empieza a los 1.5s (1 segundo después de J1).
  // J3 (Imágenes): Empieza a los 2.5s (1 segundo después de J2).
  
  const baseDelay = 0.5;
  const stepDelay = 1.0; // 1 segundo exacto entre jerarquías
  const calculatedDelay = baseDelay + ((hierarchy - 1) * stepDelay);

  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0, // Movimiento más largo
      x: direction === 'left' ? 80 : direction === 'right' ? -80 : 0,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      transition: {
        duration: 1.5, // Aparición interna muy lenta y suave
        ease: [0.215, 0.61, 0.355, 1],
        delay: calculatedDelay
      }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.5 }
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
