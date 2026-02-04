
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
      className={`section-slide w-full min-h-screen relative snap-start snap-always ${isPrintOnly ? 'hidden print:block' : ''} ${className}`}
    >
      <div className="w-full min-h-screen flex flex-col box-border">
          {children}
      </div>
    </div>
  );
};

export default SectionSlide;
