
import React from 'react';

interface HeaderProps {
  logo?: string | null;
  pageNumber?: number;
}

const Header: React.FC<HeaderProps> = ({ logo, pageNumber }) => {
  return (
    <header className="absolute top-0 left-0 w-full pointer-events-none z-50">
      {/* Logo Small - Esquina superior izquierda (Mantiene padding original) */}
      <div className="absolute top-8 left-8 md:left-10 w-[100px] h-[25px] flex items-center justify-start pointer-events-auto">
        {logo ? (
          <img src={logo} alt="VLANC Studio" className="max-h-full w-auto object-contain" />
        ) : (
          <div className="w-full h-full border border-vlanc-primary/30 bg-vlanc-primary/5 flex items-center justify-center rounded-[1px]">
            <span className="text-[6px] uppercase tracking-[0.3em] text-vlanc-primary/50 font-bold">Logo Small</span>
          </div>
        )}
      </div>

      {/* Número de página y línea vertical - Esquina superior derecha */}
      {/* Posicionado a 60px del borde derecho, línea a sangre (top-0) */}
      {pageNumber && (
        <div className="absolute top-0 right-[60px] flex flex-col items-center pointer-events-auto">
            {/* Línea vertical: 90px alto, color secundario, pegada arriba */}
            <div className="w-[1px] h-[90px] bg-[#703622]"></div>
            
            {/* Número debajo de la línea */}
            <div className="mt-2 text-[11px] font-sans text-[#703622] font-normal tracking-[0.2em]">
                {pageNumber}
            </div>
        </div>
      )}
    </header>
  );
};

export default Header;
