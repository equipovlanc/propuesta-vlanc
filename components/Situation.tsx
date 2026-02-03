
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface SituationProps {
  data?: {
    sectionNumber?: string;
    title?: string;
    paragraphs?: string[];
    image?: string;
  }
}

const Situation: React.FC<SituationProps> = ({ data }) => {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row bg-vlanc-bg overflow-hidden">
        <div className="w-full lg:w-3/5 flex flex-col justify-center px-12 md:px-24 py-24">
            <AnimatedSection>
                <h2 className="title-xl text-vlanc-black mb-4 tracking-tighter">
                   {data?.title}
                </h2>
                <div className="w-16 h-[2px] bg-vlanc-primary mb-16"></div>
            </AnimatedSection>
            
            <AnimatedSection>
                <div className="space-y-8 text-vlanc-black/80 max-w-2xl">
                    {(data?.paragraphs ?? []).map((p, i) => (
                        <p 
                            key={i} 
                            className="text-[12px] font-sans leading-relaxed text-justify" 
                            dangerouslySetInnerHTML={{ __html: p }} 
                        />
                    ))}
                </div>
            </AnimatedSection>
        </div>
        
        <div className="w-full lg:w-2/5 min-h-[500px] lg:h-auto">
            <AnimatedSection className="h-full">
                {data?.image && (
                  <img 
                    src={data.image} 
                    alt="Situation" 
                    className="w-full h-full object-cover grayscale brightness-90" 
                  />
                )}
            </AnimatedSection>
        </div>
    </section>
  );
};

export default Situation;
