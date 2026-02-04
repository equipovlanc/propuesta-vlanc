
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

  return (
    <section id="index-section" className="min-h-screen w-full flex flex-col md:flex-row bg-vlanc-bg">
      <div className="w-full md:w-1/2 min-h-[400px] md:h-auto overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1513519247388-19345150d5c7?q=80&w=1200&auto=format&fit=crop" 
          alt="Index" 
          className="w-full h-full object-cover grayscale brightness-110"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center px-12 md:px-24 py-20">
        <AnimatedSection>
            <h2 className="title-xl text-vlanc-secondary mb-4 font-bold">{data?.title || "contenido."}</h2>
            <div className="w-12 h-[2px] bg-vlanc-primary mb-16"></div>
        </AnimatedSection>
        <AnimatedSection className="space-y-6">
            {(data?.items ?? []).map((item, i) => (
                <a 
                  key={i} 
                  href={`#${item.id}`} 
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className="flex items-center text-vlanc-black hover:text-vlanc-primary transition-all duration-300 group cursor-pointer"
                >
                    <span className="subtitle-md text-vlanc-primary mr-4 opacity-40 group-hover:opacity-100">/</span>
                    <span className="subtitle-md lowercase tracking-tight font-light"> {item.title}</span>
                </a>
            ))}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default IndexSection;
