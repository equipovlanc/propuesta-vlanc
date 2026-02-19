
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [cursorMode, setCursorMode] = useState<'default' | 'clickable' | 'play'>('default');
  
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
      
      const isInteractable = !!target.closest('button, a, input, select, .cursor-pointer');
      const isVideoElement = !!target.closest('video');
      const hasControls = target.hasAttribute('controls');

      if (isVideoElement && !hasControls) {
          setCursorMode('play');
      } else if (isInteractable) {
          setCursorMode('clickable');
      } else {
          setCursorMode('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);
  
  const size = cursorMode === 'play' ? 80 : cursorMode === 'clickable' ? 40 : 16;
  const bgColor = cursorMode === 'play' ? 'rgba(143, 73, 51, 0.15)' : 'rgba(143, 73, 51, 0.05)';

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
