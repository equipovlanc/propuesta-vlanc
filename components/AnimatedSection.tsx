
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
  const scrollDir = useScrollDirection(); // 1 (Avance/Next) o -1 (Retroceso/Prev)
  
  // LOGICA DE TIEMPOS
  const isMedia = hierarchy === 0;
  const baseDelay = isMedia ? 0 : 0.4; 
  const stepDelay = 0.8; 
  const calculatedDelay = isMedia ? 0 : baseDelay + ((hierarchy - 1) * stepDelay);

  // Variantes por defecto (Contenido normal)
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

  // Variantes para la BARRA (Motion Blur + Dirección Dinámica)
  // Si scrollDir > 0 (Vamos a la siguiente): Entra desde IZQ (-120vw), Sale por DER (120vw)
  // Si scrollDir < 0 (Volvemos a la anterior): Entra desde DER (120vw), Sale por IZQ (-120vw)
  const barVariants: Variants = {
      hidden: {
          x: scrollDir > 0 ? '-120vw' : '120vw', 
          opacity: 1,
          scaleX: 2.5, // Estiramiento para efecto velocidad
          filter: 'blur(10px)', // Blur de movimiento
      },
      visible: {
          x: 0,
          opacity: 1,
          scaleX: 1,
          filter: 'blur(0px)',
          transition: {
              duration: 1.2, 
              ease: [0.16, 1, 0.3, 1], // Ease Out muy suave
              delay: 0.1 // Pequeño delay respecto a la carga de página
          }
      },
      exit: {
          x: scrollDir > 0 ? '120vw' : '-120vw',
          opacity: 1,
          scaleX: 3.0, // Más estiramiento al salir disparada
          filter: 'blur(15px)',
          transition: {
              duration: 0.8,
              ease: "easeIn" // Aceleración al salir
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
