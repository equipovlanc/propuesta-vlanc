
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

  // Negative Z-axis effects (receding)
  // As we scroll through the section, it scales down and fades out
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div 
      id={id}
      ref={containerRef}
      className={`section-slide w-full h-screen relative snap-start snap-always overflow-hidden flex flex-col ${isPrintOnly ? 'hidden print:block' : ''} ${className}`}
    >
      <motion.div 
        style={{ scale, opacity, y }}
        className="print-strict-container w-full h-full flex flex-col box-border origin-center"
      >
          {children}
      </motion.div>
    </div>
  );
};

export default SectionSlide;
