
import React, { ReactNode, CSSProperties } from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

// Este componente ahora reacciona a la entrada de la diapositiva padre
const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  className, 
  style, 
  onClick,
  delay = 0,
  direction = 'up'
}) => {
  
  // Variantes internas para dar "vida" a los elementos (stickers)
  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === 'up' ? 60 : direction === 'down' ? -60 : 0,
      x: direction === 'left' ? 60 : direction === 'right' ? -60 : 0,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
        delay: delay + 0.2 // Pequeño delay base para que arranque después de que la diapositiva empiece a moverse
      }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      onClick={onClick}
      className={className}
      variants={variants}
      // Hereda initial/animate/exit del padre (SectionSlide) automáticamente
      style={style}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
