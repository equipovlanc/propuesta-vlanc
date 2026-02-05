
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
      // CAMBIO: h-screen estricto, overflow-hidden para evitar scroll interno que rompa el snap.
      className={`section-slide w-full h-screen relative snap-start snap-always overflow-hidden flex flex-col ${isPrintOnly ? 'hidden print:block' : ''} ${className}`}
    >
      {/* Contenedor interno para asegurar layout */}
      <div className="w-full h-full flex flex-col box-border">
          {children}
      </div>
    </div>
  );
};

export default SectionSlide;
