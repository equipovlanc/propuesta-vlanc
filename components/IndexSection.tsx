
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
  const imageSrc = data?.image?.src;
  const imageOpacity = data?.image?.opacity ?? 15;

  return (
    <section id="index-section" className="h-screen w-full flex bg-vlanc-bg overflow-hidden">
      
      {/* Columna Izquierda: Imagen (Ken Burns) */}
      <div className="w-[55.7%] h-full relative overflow-hidden hidden md:block">
        <AnimatedSection direction="none" className="w-full h-full">
            {imageSrc ? (
                <div className="relative w-full h-full ken-burns">
                    <img 
                        src={imageSrc}
                        alt="Indice" 
                        className="w-full h-full object-cover"
                    />
                    <div 
                        className="absolute inset-0 bg-[#8f4933] pointer-events-none" 
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
      <div className="w-full md:w-[44.3%] h-full flex flex-col justify-between px-10 md:px-0 md:pl-[76px] md:pr-[120px] pt-[150px] pb-[140px] relative bg-vlanc-bg">
        
        {/* Bloque Superior */}
        <AnimatedSection direction="up" delay={0.2}>
            <h2 className="subtitulo1">
                {data?.title || "contenido."}
            </h2>
            
            <div className="w-[112px] h-[5px] bg-[#8f4933] mt-[27px] mb-12"></div>
        </AnimatedSection>
        
        {/* Bloque Inferior: Staggered links */}
        <div className="space-y-5">
            {items.length > 0 ? items.map((item, i) => (
                <AnimatedSection key={i} direction="up" delay={0.3 + (i * 0.05)}>
                  <a 
                    href={`#${item.id}`} 
                    onClick={(e) => handleLinkClick(e, item.id)}
                    className="flex items-baseline text-vlanc-black hover:text-vlanc-primary transition-all duration-300 group cursor-pointer"
                  >
                      <span className="text-[20px] font-serif text-vlanc-black/40 mr-4 group-hover:text-vlanc-primary transition-colors transform translate-y-[2px] group-hover:translate-x-1 duration-500">/</span>
                      <span className="subtitulo3 tracking-tight font-normal"> 
                          {item.title}
                      </span>
                  </a>
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
