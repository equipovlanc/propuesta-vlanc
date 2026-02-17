
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
  
  // Detectamos el scroll de ESTA sección.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainer,
    offset: ["start start", "end start"]
  });

  // EFECTO "VENTANA TRASERA" (EJE Z)
  // Estrategia: Position Sticky + Scale Down
  // 1. El 'sticky' (en el CSS abajo) mantiene la sección pegada arriba. NO sube.
  // 2. La siguiente sección sube y la tapa (z-index natural del DOM).
  // 3. Mientras es tapada, esta sección se hace pequeña y oscura.

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.75]); 
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
  const blur = useTransform(scrollYProgress, [0, 1], ["0px", "10px"]);
  // Nota: Ya no usamos 'y' transform. Sticky se encarga de la posición.

  return (
    <div 
      id={id}
      ref={containerRef}
      // CAMBIOS CLAVE EN CSS:
      // 1. sticky top-0: Fija el elemento arriba. El navegador garantiza que no se mueva.
      // 2. h-screen: Ocupa toda la pantalla.
      // 3. z-0: Nivel base. La siguiente slide tendrá un z-index superior por orden natural y la cubrirá.
      className={`section-slide w-full h-screen sticky top-0 snap-start flex flex-col ${isPrintOnly ? 'hidden print:block' : ''} ${className}`}
    >
      <motion.div 
        style={{ scale, opacity, filter: blur }}
        className="print-strict-container w-full h-full flex flex-col box-border origin-center bg-vlanc-bg will-change-transform"
        // bg-vlanc-bg es CRUCIAL: asegura que el fondo sea sólido para tapar a la diapositiva anterior si hay transparencias
      >
          {children}
      </motion.div>
    </div>
  );
};

export default SectionSlide;
