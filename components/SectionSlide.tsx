
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

  // EFECTO DE PROFUNDIDAD MEJORADO
  // 1. Escala: Se reduce al 90% (suficiente para ver que está atrás, pero no minúsculo).
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]); 
  
  // 2. Opacidad: No desaparece del todo (0.5), para mantener la referencia visual de "pila".
  // Esto ayuda a la navegación hacia atrás, ya que el usuario sigue viendo "algo" ahí.
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // 3. Oscuridad (Brightness): Lo que se aleja se ve más oscuro.
  // Usamos filter brightness en lugar de solo opacity para dar volumen.
  const filter = useTransform(scrollYProgress, (v) => `brightness(${1 - v * 0.5}) blur(${v * 5}px)`);

  return (
    <div 
      id={id}
      ref={containerRef}
      // sticky top-0: Mantiene la sección fijada mientras la siguiente sube.
      // z-0: Nivel base. La siguiente tendrá un z-index superior por orden natural del DOM.
      className={`section-slide w-full h-screen sticky top-0 flex flex-col ${isPrintOnly ? 'hidden print:block' : ''} ${className}`}
    >
      <motion.div 
        style={{ scale, opacity, filter }}
        // shadow-[0_-50px...]: SOMBRA SUPERIOR GIGANTE.
        // Esto es clave: la diapositiva proyecta sombra hacia arriba, pero como esta diapositiva
        // será cubierta por la SIGUIENTE, necesitamos que la SIGUIENTE tenga sombra.
        // Al poner la sombra en el contenedor "print-strict", cada diapositiva tiene una sombra física
        // que "tapa" a la anterior al pasar por encima.
        className="print-strict-container w-full h-full flex flex-col box-border origin-center bg-vlanc-bg shadow-[0_-60px_100px_-20px_rgba(0,0,0,0.3)] will-change-transform"
      >
          {children}
      </motion.div>
    </div>
  );
};

export default SectionSlide;
