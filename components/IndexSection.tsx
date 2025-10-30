import React from 'react';
import AnimatedSection from './AnimatedSection';

interface IndexItem {
    number?: string | null;
    title?: string;
    id?: string; // Used for anchor links
}

interface IndexSectionProps {
    data?: {
        title?: string;
        items?: IndexItem[];
    }
}

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-center ml-12 md:ml-0">
        <div className="bg-gray-100 w-16 h-16 md:w-24 md:h-24 mr-8"></div>
        <div className="relative">
            <h2 className="text-5xl md:text-7xl font-bold text-gray-800 tracking-tighter">{children}</h2>
            {/* Corrected bar position: vertically centered and placed to the left of the title. */}
            <span className="absolute -left-8 top-1/2 -translate-y-1/2 w-1 h-32 bg-teal-400 transform -rotate-12"></span>
        </div>
    </div>
);


const IndexSection: React.FC<IndexSectionProps> = ({ data }) => {

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, id?: string) => {
    if (!id) return;
    event.preventDefault(); // Prevent the default anchor link behavior
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <AnimatedSection>
            <SectionTitle>{data?.title}</SectionTitle>
        </AnimatedSection>
        <AnimatedSection className="space-y-3">
            {(data?.items ?? []).map((item, i) => (
                <a 
                  key={i} 
                  href={`#${item.id}`} 
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className="flex justify-between items-baseline text-gray-700 pb-2 border-b border-gray-200 hover:text-teal-600 transition-colors duration-300 group cursor-pointer"
                >
                    <div className="flex items-baseline">
                        {item.number && <span className="text-lg font-semibold mr-3">{item.number}</span>}
                        <p className={`font-medium ${!item.number && 'ml-8'}`}>&gt; {item.title}</p>
                    </div>
                    {/* Page numbers removed as requested */}
                </a>
            ))}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default IndexSection;
