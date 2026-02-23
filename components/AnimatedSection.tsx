
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

  // LOGICA DE TIEMPOS ZEN
  const isMedia = hierarchy === 0;

  // Base: H1 empieza un poco más tarde para dejar asentar la transición de página (0.6s)
  const baseDelay = isMedia ? 0 : 0.6;

  // Step: Gran separación entre Título y Contenido (1.3s)
  // H1 aparece en 0.6s
  // H2 aparece en 1.9s (Casi 2 segundos después de cargar la página)
  // Esto evita la ansiedad y fuerza una lectura pausada.
  const stepDelay = 1.3;

  const calculatedDelay = isMedia ? 0 : baseDelay + ((hierarchy - 1) * stepDelay);

  // Variantes por defecto (Contenido normal)
  const defaultVariants: Variants = {
    hidden: {
      opacity: isMedia ? 1 : 0,
      // Movimiento reducido a 20px para ser más sutil y elegante
      y: isMedia ? 0 : (direction === 'up' ? 20 : direction === 'down' ? -20 : 0),
      x: isMedia ? 0 : (direction === 'left' ? 20 : direction === 'right' ? -20 : 0),
      scale: 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: isMedia ? 0 : 2.5, // Duración muy larga (2.5s) para suavidad extrema
        ease: [0.22, 1, 0.36, 1], // Cubic bezier suave
        delay: calculatedDelay
      }
    },
    exit: {
      opacity: isMedia ? 1 : 0,
      transition: { duration: 0.5, ease: "easeInOut" } // Salida un poco más relajada también
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
        duration: 1.6, // Un poco más lento también el viaje de la barra
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2 // Empieza antes que los textos
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
      className={`${className || ''} print-force-visible`}
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
