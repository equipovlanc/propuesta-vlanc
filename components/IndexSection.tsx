
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface IndexItem {
    title?: string;
    id?: string;
}

interface IndexSectionProps {
    data?: {
        title?: string;
        image?: string;
        items?: IndexItem[];
    }
}

const IndexSection: React.FC<IndexSectionProps> = ({ data }) => {
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, id?: string) => {
    if (!id) return;
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const items = data?.items || [];

  return (
    <section id="index-section" className="h-screen w-full flex bg-vlanc-bg overflow-hidden">
      
      {/* Columna Izquierda: Imagen (55.7% del ancho según SVG 802.5/1440) */}
      <div className="w-[55.7%] h-full relative overflow-hidden hidden md:block">
        <AnimatedSection className="w-full h-full">
            {data?.image ? (
                <img 
                src={data.image}
                alt="Indice" 
                className="w-full h-full object-cover grayscale brightness-105"
                />
            ) : (
                <div className="w-full h-full bg-vlanc-primary/10 flex items-center justify-center">
                    <span className="text-xs uppercase tracking-widest text-vlanc-primary/40">Imagen Contenido</span>
                </div>
            )}
        </AnimatedSection>
      </div>

      {/* Columna Derecha: Contenido (44.3%) */}
      {/* Padding izquierdo calculado: 76px. Padding derecho 120px. Padding bottom 120px */}
      <div className="w-full md:w-[44.3%] h-full flex flex-col justify-center px-10 md:px-0 md:pl-[76px] md:pr-[120px] pb-[120px] relative">
        <AnimatedSection>
            {/* Título: "contenido." usa la nueva configuración de subtitulo1 (72px, negro) */}
            <h2 className="subtitulo1 mb-6">
                {data?.title || "contenido."}
            </h2>
            
            {/* Línea divisoria: ancho 84px según SVG */}
            <div className="w-[84px] h-[3px] bg-vlanc-primary mb-12"></div>
        </AnimatedSection>
        
        <AnimatedSection className="space-y-5">
            {items.length > 0 ? items.map((item, i) => (
                <a 
                  key={i} 
                  href={`#${item.id}`} 
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className="flex items-baseline text-vlanc-black hover:text-vlanc-primary transition-all duration-300 group cursor-pointer"
                >
                    {/* Barra inclinada decorativa */}
                    <span className="text-[20px] font-serif text-vlanc-black/40 mr-4 group-hover:text-vlanc-primary transition-colors transform translate-y-[2px]">/</span>
                    
                    {/* Texto del ítem */}
                    <span className="subtitulo3 tracking-tight font-normal"> 
                        {item.title}
                    </span>
                </a>
            )) : (
              <p className="text-vlanc-black/30 italic font-sans text-xs">Añade secciones en el CMS...</p>
            )}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default IndexSection;
