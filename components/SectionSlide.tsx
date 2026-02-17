
import React, { ReactNode, useRef, RefObject } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SectionSlideProps {
  children: ReactNode;
  id?: string;
  className?: string;
  isPrintOnly?: boolean;
  scrollContainer?: RefObject<HTMLElement | null>;
}

const SectionSlide: React.FC<SectionSlideProps> = ({ children, id, className = "", isPrintOnly = false, scrollContainer }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Detecta el progreso de scroll de ESTE contenedor en particular
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainer,
    offset: ["start start", "end start"]
  });

  // Efecto "Rear Window" (Ventana Trasera) / Profundidad Z Negativa
  // Cuando el usuario hace scroll hacia abajo (scrollYProgress va de 0 a 1):
  
  // 1. Scale: Se reduce para simular que se aleja hacia el fondo.
  //    Rango [1, 0.9]: No muy exagerado para evitar espacios blancos excesivos, pero suficiente para el efecto 3D.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]); 
  
  // 2. Opacity: Se oscurece ligeramente al alejarse.
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  
  // 3. Y Axis Counter-Movement (La clave):
  //    Normalmente, al hacer scroll, el elemento sube (se va por arriba).
  //    Para que parezca que se queda "quieto" y solo se aleja en Z, lo movemos hacia abajo (Y positivo).
  //    "85%" compensa casi todo el movimiento de subida del scroll. La siguiente diapositiva, que no tiene
  //    esta transformación (porque su scrollYProgress es < 0 aun), subirá y lo cubrirá.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "85%"]);

  return (
    <div 
      id={id}
      ref={containerRef}
      className={`section-slide w-full h-screen relative snap-start snap-always overflow-hidden flex flex-col ${isPrintOnly ? 'hidden print:block' : ''} ${className}`}
      style={{ zIndex: 1 }} // Asegura contexto de apilamiento base
    >
      <motion.div 
        style={{ scale, opacity, y }}
        className="print-strict-container w-full h-full flex flex-col box-border origin-center"
        // Optimizaciones para evitar tembleque (jitter) en textos
        initial={{ transformPerspective: 1000 }}
        transition={{ type: "tween", ease: "linear" }} 
      >
          {children}
      </motion.div>
    </div>
  );
};

export default SectionSlide;
