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
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;

      const isInteractable = !!target.closest('button, a, input, select, .cursor-pointer, video[controls]');
      setIsOverInteractive(isInteractable);

      const isVideoWithoutControls = !!target.closest('video:not([controls])');
      const isIgnored = !!target.closest('[data-cursor-ignore]');

      if (!isIgnored && isVideoWithoutControls && !isInteractable) {
        setCursorMode('play');
      } else {
        setCursorMode('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cursorX, cursorY]);

  const size = isOverInteractive ? 40 : cursorMode === 'play' ? 80 : 16;
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
        {cursorMode === 'play' && !isOverInteractive && (
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