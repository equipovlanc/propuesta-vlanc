
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
  
  // Track scroll relativo: "start start" (tope sección toca tope pantalla) -> "end start" (fondo sección toca tope pantalla)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainer,
    offset: ["start start", "end start"]
  });

  // FÍSICA DEL EFECTO "VENTANA TRASERA" (REAR WINDOW)
  
  // 1. ANCLAJE VERTICAL (La clave):
  // Al mover y: "100%", compensamos exactamente la subida del scroll.
  // Resultado visual: El elemento NO sube, se queda fijo en el centro de la pantalla
  // esperando a ser cubierto por la siguiente diapositiva.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // 2. PROFUNDIDAD (Escala):
  // Reducimos agresivamente a 0.5 para que parezca que se va lejos en el horizonte.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5]); 
  
  // 3. ATMÓSFERA (Opacidad y Blur):
  // Se oscurece y se desenfoca al alejarse, simulando distancia física.
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], ["0px", "20px"]);

  return (
    <div 
      id={id}
      ref={containerRef}
      className={`section-slide w-full h-screen relative snap-start snap-always flex flex-col ${isPrintOnly ? 'hidden print:block' : ''} ${className}`}
      style={{ zIndex: 0 }} // Z-Index bajo para que la siguiente slide (z-index natural mayor) pase POR ENCIMA
    >
      <motion.div 
        style={{ scale, opacity, y, filter: blur }}
        className="print-strict-container w-full h-full flex flex-col box-border origin-center will-change-transform"
        // Configuraciones para evitar flickering en monitores de alta tasa de refresco
        initial={{ transformPerspective: 1000 }}
      >
          {children}
      </motion.div>
    </div>
  );
};

export default SectionSlide;
