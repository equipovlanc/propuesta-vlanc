
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
    <section id="index-section" className="min-h-screen w-full flex flex-col md:flex-row bg-vlanc-bg">
      <div className="w-full md:w-1/2 min-h-[400px] md:h-auto overflow-hidden">
        {data?.image ? (
            <img 
            src={data.image}
            alt="" 
            className="w-full h-full object-cover grayscale brightness-110"
            />
        ) : (
            <div className="w-full h-full bg-vlanc-primary/10 flex items-center justify-center">
                <span className="text-xs uppercase tracking-widest text-vlanc-primary/40">Imagen Contenido</span>
            </div>
        )}
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center px-12 md:px-24 py-20 relative">
        {/* Sin Header/Logo aquí */}
        
        <AnimatedSection>
            {/* Subtítulo 1: Aplicando nueva clase subtitulo1 */}
            <h2 className="subtitulo1 text-vlanc-black mb-4 tracking-tighter">
                {data?.title || "contenido."}
            </h2>
            {/* Línea horizontal: Marrón, fina */}
            <div className="w-20 h-[2px] bg-vlanc-primary mb-16"></div>
        </AnimatedSection>
        <AnimatedSection className="space-y-4">
            {items.length > 0 ? items.map((item, i) => (
                <a 
                  key={i} 
                  href={`#${item.id}`} 
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className="flex items-center text-vlanc-black hover:text-vlanc-primary transition-all duration-300 group cursor-pointer"
                >
                    <span className="text-[21px] font-serif text-vlanc-black/60 mr-5 group-hover:text-vlanc-primary transition-colors">/</span>
                    {/* Items: Baskerville Regular, Negro */}
                    <span className="text-[24px] font-serif tracking-tight font-normal"> {item.title}</span>
                </a>
            )) : (
              <p className="text-vlanc-black/30 italic font-sans">Añade secciones en Sanity...</p>
            )}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default IndexSection;
