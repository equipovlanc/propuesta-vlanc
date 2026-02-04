
import React from 'react';

interface HeaderProps {
  logo?: string | null;
  pageNumber?: number;
}

const Header: React.FC<HeaderProps> = ({ logo, pageNumber }) => {
  return (
    <header className="absolute top-0 left-0 w-full pt-8 px-8 md:px-10 flex justify-between items-start pointer-events-none z-50">
      {/* Logo Small - Esquina superior izquierda láminas internas */}
      <div className="w-[100px] h-[25px] flex items-center justify-start pointer-events-auto">
        {logo ? (
          <img src={logo} alt="VLANC Studio" className="max-h-full w-auto object-contain" />
        ) : (
          <div className="w-full h-full border border-vlanc-primary/30 bg-vlanc-primary/5 flex items-center justify-center rounded-[1px]">
            <span className="text-[6px] uppercase tracking-[0.3em] text-vlanc-primary/50 font-bold">Logo Small</span>
          </div>
        )}
      </div>

      {/* Número de página - Esquina superior derecha */}
      {pageNumber && (
        <div className="text-[11px] font-sans text-vlanc-black/40 font-bold tracking-[0.2em] pointer-events-auto">
          {pageNumber}
        </div>
      )}
    </header>
  );
};

export default Header;
