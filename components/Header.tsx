
import React from 'react';

interface HeaderProps {
  logo?: string | null;
  pageNumber?: number;
}

const Header: React.FC<HeaderProps> = ({ logo, pageNumber }) => {
  return (
    <header className="absolute top-0 left-0 w-full pt-8 px-8 md:px-10 flex justify-between items-start pointer-events-none z-50">
      {/* Esquina Superior Izquierda: Solo el Logotipo Small */}
      <div className="w-[110px] h-[25px] flex items-center justify-start pointer-events-auto">
        {logo ? (
          <img src={logo} alt="VLANC" className="max-h-full w-auto object-contain" />
        ) : (
          <div className="w-full h-full border border-vlanc-primary/20 bg-vlanc-primary/5 flex items-center justify-center rounded-sm">
            <span className="text-[7px] uppercase tracking-[0.2em] text-vlanc-primary/40 font-bold">Logo Small</span>
          </div>
        )}
      </div>

      {/* Esquina Superior Derecha: Número de página (visto en PDF p.3, 5, 9...) */}
      {pageNumber && (
        <div className="text-[11px] font-sans text-vlanc-black/30 font-bold tracking-widest pointer-events-auto">
          {pageNumber}
        </div>
      )}
    </header>
  );
};

export default Header;
