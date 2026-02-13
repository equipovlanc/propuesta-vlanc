
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
      className={`section-slide w-full h-screen relative snap-start snap-always overflow-hidden flex flex-col ${isPrintOnly ? 'hidden print:block' : ''} ${className}`}
    >
      {/* Contenedor rígido 1920x1080 forzado en impresión */}
      <div className="print-strict-container w-full h-full flex flex-col box-border">
          {children}
      </div>
    </div>
  );
};

export default SectionSlide;
