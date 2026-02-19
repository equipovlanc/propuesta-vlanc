
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [cursorMode, setCursorMode] = useState<'default' | 'play'>('default');
  const [isOverInteractive, setIsOverInteractive] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 28, stiffness: 600, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isInteractable = !!target.closest('button, a, input, select, .cursor-pointer, video[controls]');
      setIsOverInteractive(isInteractable);

      const isVideoWithoutControls = !!target.closest('video:not([controls])');

      if (isVideoWithoutControls) {
          setCursorMode('play');
      } else {
          setCursorMode('default');
      }
    };
    
    // Usamos mousemove en lugar de mouseover para una detección más consistente al mover el ratón
    window.addEventListener('mousemove', moveCursor);
    document.documentElement.addEventListener('mousemove', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.documentElement.removeEventListener('mousemove', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Efecto para gestionar el cursor del sistema
  useEffect(() => {
    document.body.style.cursor = isOverInteractive ? 'auto' : 'none';
    // Función de limpieza para restaurar el cursor si el componente se desmonta
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [isOverInteractive]);
  
  const size = isOverInteractive ? 0 : cursorMode === 'play' ? 80 : 16;
  const bgColor = cursorMode === 'play' ? 'rgba(143, 73, 51, 0.15)' : 'rgba(143, 73, 51, 0.05)';

  if (isOverInteractive) {
    return null;
  }

  return (
    <motion.div
      className="custom-cursor fixed top-0 left-0 pointer-events-none z-[10000] hidden md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <motion.div
        className="rounded-full border border-vlanc-primary bg-vlanc-primary/5 flex items-center justify-center overflow-hidden"
        animate={{ width: size, height: size, backgroundColor: bgColor }}
        transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.5 }}
      >
        {cursorMode === 'play' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-bold tracking-[0.2em] text-vlanc-primary uppercase"
          >
            PLAY
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
