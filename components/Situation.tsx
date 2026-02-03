
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
    <section className="h-screen flex flex-col lg:flex-row bg-vlanc-bg overflow-hidden">
        {/* Left Content - 60% */}
        <div className="w-full lg:w-[60%] flex flex-col justify-center px-12 md:px-24 h-full relative">
            <AnimatedSection>
                <h2 className="title-xl text-vlanc-black mb-6 tracking-tighter">
                   {data?.title}
                </h2>
                <div className="w-24 h-[3px] bg-vlanc-primary mb-16"></div>
            </AnimatedSection>
            
            <AnimatedSection>
                <div className="space-y-8 text-vlanc-black/80 max-w-xl pr-12">
                    {(data?.paragraphs ?? []).map((p, i) => (
                        <p 
                            key={i} 
                            className="text-[13px] font-sans leading-[1.8] text-justify font-medium" 
                            dangerouslySetInnerHTML={{ __html: p }} 
                        />
                    ))}
                </div>
            </AnimatedSection>
            
            {/* Page number handled by Header overlay, but can be added here if specific design needs */}
            <div className="absolute bottom-24 left-24 font-serif text-vlanc-primary text-[21px]">{data?.sectionNumber}</div>
        </div>
        
        {/* Right Image - 40% Full Height */}
        <div className="hidden lg:block lg:w-[40%] h-full">
            <div className="w-full h-full relative">
                 {data?.image && (
                  <img 
                    src={data.image} 
                    alt="Situation" 
                    className="w-full h-full object-cover grayscale contrast-125" 
                  />
                )}
            </div>
        </div>
    </section>
  );
};

export default Situation;
