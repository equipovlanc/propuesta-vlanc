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
      className={`section-slide w-full h-screen min-h-screen relative snap-start snap-always overflow-hidden ${isPrintOnly ? 'hidden print:block' : ''} ${className}`}
    >
      {/* Contenedor interno para Márgenes Globales: Marco blanco alrededor */}
      <div className="w-full h-full p-8 md:p-12 lg:p-16 flex flex-col justify-center box-border">
          {children}
      </div>
    </div>
  );
};

export default SectionSlide;