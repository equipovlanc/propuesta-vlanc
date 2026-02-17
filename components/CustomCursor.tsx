
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClickable, setIsClickable] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Físicas ajustadas para ser más "snappy" (rápido) y menos "floaty" (lento)
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
      const isInteractable = target.closest('button, a, input, select, .cursor-pointer');
      
      // Solo activamos el modo "VER" si es un video, ignorando imágenes estáticas
      const isVideo = target.closest('video');
      
      setIsClickable(!!isInteractable);
      setIsHovering(!!isVideo);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

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
        animate={{
          width: isHovering ? 80 : isClickable ? 40 : 16,
          height: isHovering ? 80 : isClickable ? 40 : 16,
          backgroundColor: isHovering ? 'rgba(143, 73, 51, 0.15)' : 'rgba(143, 73, 51, 0.05)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.5 }}
      >
        {isHovering && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-bold tracking-[0.2em] text-vlanc-primary uppercase"
          >
            VER
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
