
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface IndexItem {
    title?: string;
    id?: string;
}

interface IndexSectionProps {
    data?: {
        title?: string;
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
        <img 
          src="https://images.unsplash.com/photo-1513519247388-19345150d5c7?q=80&w=1200&auto=format&fit=crop" 
          alt="Index Atmosphere" 
          className="w-full h-full object-cover grayscale brightness-110"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center px-12 md:px-24 py-20">
        <AnimatedSection>
            <h2 className="text-[52px] md:text-[60px] font-serif text-vlanc-secondary mb-4 font-bold lowercase tracking-tighter">
                {data?.title || "contenido."}
            </h2>
            <div className="w-16 h-[2px] bg-vlanc-primary mb-16"></div>
        </AnimatedSection>
        <AnimatedSection className="space-y-4">
            {items.length > 0 ? items.map((item, i) => (
                <a 
                  key={i} 
                  href={`#${item.id}`} 
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className="flex items-center text-vlanc-black hover:text-vlanc-primary transition-all duration-300 group cursor-pointer"
                >
                    <span className="text-[21px] font-serif text-vlanc-primary mr-5 opacity-30 group-hover:opacity-100">/</span>
                    <span className="text-[18px] md:text-[21px] font-serif lowercase tracking-tight font-normal"> {item.title}</span>
                </a>
            )) : (
              <p className="text-vlanc-black/30 italic font-sans">Añade secciones en el campo Índice de Sanity...</p>
            )}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default IndexSection;
