
import React from 'react';

interface HeaderProps {
  currentSlide: number;
  totalSlides: number;
  data?: {
    logo?: string;
  };
}

const Header: React.FC<HeaderProps> = ({ currentSlide, totalSlides, data }) => {
  // En la primera diapositiva (Hero), el header es diferente (o no se muestra este overlay)
  // Pero según el diseño general de revista, el nombre de la marca suele estar presente.
  // En el PDF P1, VLANC está abajo derecha. En P2+, VLANC está arriba izquierda.
  
  if (currentSlide === 1) return null; // El Hero tiene su propio layout

  return (
    <header className="fixed top-0 left-0 w-full z-50 py-8 px-12 md:px-24 pointer-events-none mix-blend-multiply">
      <div className="flex justify-between items-start">
        <div className="text-left">
           {data?.logo ? (
               <img src={data.logo} alt="VLANC" className="h-6 object-contain" />
           ) : (
                <span className="text-[14px] font-serif font-bold tracking-[0.2em] text-vlanc-primary uppercase">VLANC</span>
           )}
        </div>
        <div className="text-right">
            <span className="text-[12px] font-sans text-vlanc-black/60">{currentSlide}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
