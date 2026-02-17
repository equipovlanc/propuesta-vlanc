
import React, { ReactNode, CSSProperties } from 'react';
import { motion, Variants } from 'framer-motion';
import { useScrollDirection } from '../context/ScrollContext';

interface AnimatedSectionProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  hierarchy?: number; 
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  mode?: 'default' | 'bar'; 
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
  const scrollDir = useScrollDirection(); 
  
  // LOGICA DE TIEMPOS
  const isMedia = hierarchy === 0;
  const baseDelay = isMedia ? 0 : 0.4; 
  const stepDelay = 0.6; // Reducido ligeramente el step ya que la duración es muy larga
  const calculatedDelay = isMedia ? 0 : baseDelay + ((hierarchy - 1) * stepDelay);

  // Variantes por defecto (Contenido normal)
  const defaultVariants: Variants = {
    hidden: { 
      opacity: isMedia ? 1 : 0, 
      y: isMedia ? 0 : (direction === 'up' ? 25 : direction === 'down' ? -25 : 0), 
      x: isMedia ? 0 : (direction === 'left' ? 25 : direction === 'right' ? -25 : 0),
      scale: 1, // ELIMINADO ESCALADO (0.98 -> 1) para evitar temblor en textos
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      scale: 1,
      transition: {
        duration: isMedia ? 0 : 1.8, // AUMENTADO a 1.8s para aparición muy suave
        ease: [0.22, 1, 0.36, 1], // Curva Bezier suave (cubic-bezier)
        delay: calculatedDelay
      }
    },
    exit: {
        opacity: isMedia ? 1 : 0,
        transition: { duration: 0.3 }
    }
  };

  // Variantes para la BARRA (Motion Blur + Dirección Dinámica)
  const barVariants: Variants = {
      hidden: {
          x: scrollDir > 0 ? '-120vw' : '120vw', 
          opacity: 1,
          scaleX: 2.5, 
          filter: 'blur(10px)', 
      },
      visible: {
          x: 0,
          opacity: 1,
          scaleX: 1,
          filter: 'blur(0px)',
          transition: {
              duration: 1.4, 
              ease: [0.16, 1, 0.3, 1], 
              delay: 0.1 
          }
      },
      exit: {
          x: scrollDir > 0 ? '120vw' : '-120vw',
          opacity: 1,
          scaleX: 3.0, 
          filter: 'blur(15px)',
          transition: {
              duration: 0.8,
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
