
import React from 'react';

interface HeaderProps {
  logo?: string | null;
  pageNumber?: number;
  onNavigate?: (index: number) => void;
  onPrint?: () => void;
}

const Header: React.FC<HeaderProps> = ({ logo, pageNumber, onNavigate, onPrint }) => {
  return (
    <header className="absolute top-0 left-0 w-full pointer-events-none z-[60]">
      {/* Logo Small - Navegación al Índice (Sección 1, índice 1) */}
      <button
        onClick={() => onNavigate && onNavigate(1)}
        className="absolute top-[20px] left-[52px] w-[78px] h-[78px] flex items-center justify-center pointer-events-auto cursor-pointer group bg-transparent border-none p-0 outline-none"
      >
        {logo ? (
          <img
            src={logo}
            alt="VLANC Studio"
            className="w-full h-full object-contain transition-opacity group-hover:opacity-70 print-force-visible print:opacity-100 print:filter-none print:transform-none"
            style={{ willChange: 'transform' }}
          />
        ) : (
          <div className="w-full h-full border border-vlanc-primary/30 bg-vlanc-primary/5 flex items-center justify-center rounded-[1px]">
            <span className="text-[6px] uppercase tracking-[0.3em] text-vlanc-primary/50 font-bold">Logo</span>
          </div>
        )}
      </button>

      {/* Número de página y línea vertical - Coordenadas fijas */}
      {pageNumber && (
        <div className="absolute top-0 right-[60px] flex flex-col items-center pointer-events-auto">
          {/* Línea vertical */}
          <div className="w-[1px] h-[90px] bg-[#703622]"></div>

          <div className="mt-2 text-[11px] font-sans text-[#703622] font-normal tracking-[0.2em]">
            {pageNumber}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
