
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface IndexItem {
    title?: string;
    id?: string;
}

interface IndexSectionProps {
    data?: {
        title?: string;
        image?: { src: string; opacity?: number };
        items?: IndexItem[];
    };
    onNavigate: (id: string) => void;
}

const IndexSection: React.FC<IndexSectionProps> = ({ data, onNavigate }) => {
  const handleLinkClick = (id?: string) => {
    if (id) onNavigate(id);
  };

  const items = data?.items || [];
  const imageSrc = data?.image?.src;
  const imageOpacity = data?.image?.opacity ?? 15;

  return (
    // z-10 relativo al Slide
    <section id="index-section" className="h-full w-full flex overflow-hidden absolute inset-0 pointer-events-auto z-10">
      
      {/* Columna Izquierda: Imagen (J0) */}
      <div className="w-[55.7%] h-full relative overflow-hidden hidden md:block pointer-events-none">
        <AnimatedSection direction="none" hierarchy={0} className="w-full h-full">
            {imageSrc ? (
                <div className="relative w-full h-full ken-burns">
                    <img 
                        src={imageSrc}
                        alt="Indice" 
                        className="w-full h-full object-cover"
                    />
                    <div 
                        className="absolute inset-0 bg-[#8f4933]" 
                        style={{ opacity: imageOpacity / 100 }}
                    />
                </div>
            ) : (
                <div className="w-full h-full bg-vlanc-primary/10 flex items-center justify-center">
                    <span className="text-xs uppercase tracking-widest text-vlanc-primary/40">Imagen Contenido</span>
                </div>
            )}
        </AnimatedSection>
      </div>

      {/* Columna Derecha: Contenido */}
      <div className="w-full md:w-[44.3%] h-full flex flex-col justify-between px-10 md:px-0 md:pl-[76px] md:pr-[120px] pt-[150px] pb-[140px] relative z-20 pointer-events-auto">
        
        {/* Bloque Superior: Título (J1) y Barra */}
        <div className="pointer-events-none">
            <AnimatedSection direction="up" hierarchy={1}>
                <h2 className="subtitulo1">
                    {data?.title || "contenido."}
                </h2>
            </AnimatedSection>
            
            <AnimatedSection mode="bar" className="w-[112px] h-[5px] bg-[#8f4933] mt-[27px] mb-12" />
        </div>
        
        {/* Bloque Inferior: Links (J2) */}
        <div className="space-y-5 relative z-30 pointer-events-auto">
            {items.length > 0 ? items.map((item, i) => (
                <AnimatedSection key={i} direction="up" hierarchy={2}>
                  {/* Se cambia 'a' por 'div' para garantizar que onClick capture el evento sin interferencias del navegador */}
                  <div 
                    onClick={() => handleLinkClick(item.id)}
                    className="flex items-baseline text-vlanc-black hover:text-vlanc-primary transition-all duration-300 group cursor-pointer relative py-1 pointer-events-auto select-none"
                    role="button"
                    aria-label={`Ir a ${item.title}`}
                  >
                      <span className="text-[20px] font-serif text-vlanc-black/40 mr-4 group-hover:text-vlanc-primary transition-colors transform translate-y-[2px] group-hover:translate-x-1 duration-500 pointer-events-none">/</span>
                      <span className="subtitulo3 tracking-tight font-normal pointer-events-none"> 
                          {item.title}
                      </span>
                  </div>
                </AnimatedSection>
            )) : (
              <p className="text-vlanc-black/30 italic font-sans text-xs">Añade secciones en el CMS...</p>
            )}
        </div>
      </div>
    </section>
  );
};

export default IndexSection;
