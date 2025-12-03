
import React, { ReactNode } from 'react';

interface SectionSlideProps {
  children: ReactNode;
  id?: string;
  className?: string;
  isPrintOnly?: boolean;
}

const SectionSlide: React.FC<SectionSlideProps> = ({ children, id, className = "", isPrintOnly = false }) => {
  return (
    <div 
      id={id}
      // UPDATE: 
      // 1. Used 'min-h-screen' instead of 'h-screen' so content can grow beyond 100vh.
      // 2. Removed 'overflow-hidden' to ensure titles/content aren't clipped.
      className={`section-slide w-full min-h-screen relative snap-start snap-always ${isPrintOnly ? 'hidden print:block' : ''} ${className}`}
    >
      {/* Contenedor interno para Márgenes Globales: Marco blanco alrededor */}
      {/* UPDATE: Ensure min-h-screen here too for vertical centering of short content */}
      <div className="w-full min-h-screen p-8 md:p-12 lg:p-16 flex flex-col justify-center box-border">
          {children}
      </div>
    </div>
  );
};

export default SectionSlide;
