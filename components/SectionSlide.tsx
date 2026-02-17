
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
  
  // Track scroll relative to this specific section's position in the parent container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainer,
    offset: ["start start", "end start"]
  });

  // Negative Z-axis effects (receding "Rear Window" effect)
  
  // 1. Scale: Drastic reduction to simulate object moving far away quickly.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.6]); 
  
  // 2. Opacity: Fade out as it moves away.
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  // 3. Y Axis Counter-Movement:
  // When user scrolls down, the content naturally moves UP.
  // To simulate "staying behind" or moving deep into Z space without moving up, 
  // we translate Y downwards (positive value). 
  // "50%" means it moves up at half the speed of the scroll, creating a parallax lag.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div 
      id={id}
      ref={containerRef}
      className={`section-slide w-full h-screen relative snap-start snap-always overflow-hidden flex flex-col ${isPrintOnly ? 'hidden print:block' : ''} ${className}`}
    >
      <motion.div 
        style={{ scale, opacity, y }}
        className="print-strict-container w-full h-full flex flex-col box-border origin-center will-change-transform"
      >
          {children}
      </motion.div>
    </div>
  );
};

export default SectionSlide;
