
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface DividerSlideProps {
    image?: string;
    text?: string;
}

const DividerSlide: React.FC<DividerSlideProps> = ({ image, text }) => {
    return (
        <section className="h-full w-full flex bg-vlanc-bg relative overflow-hidden">
            <div className="w-full lg:w-2/3 h-full">
                {image && <img src={image} alt="Divider" className="w-full h-full object-cover grayscale brightness-90" />}
            </div>
            
            <div className="absolute right-0 bottom-0 w-full lg:w-1/2 h-1/2 bg-white flex items-center justify-center p-12 lg:p-24 shadow-2xl border-l border-t border-vlanc-primary/10">
                 <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-vlanc-bg/30 -z-10"></div>
                 
                 <AnimatedSection className="w-full text-right">
                     <div className="relative inline-block">
                        <h2 className="text-4xl md:text-[52px] font-serif italic text-vlanc-secondary tracking-tighter leading-tight text-right uppercase">
                            {text || "¿NOS DEJAS ACOMPAÑARTE?"}
                        </h2>
                        <span className="absolute -right-8 top-1/2 -translate-y-1/2 w-[2px] h-32 bg-vlanc-primary transform -rotate-12"></span>
                     </div>
                 </AnimatedSection>
            </div>
        </section>
    );
};

export default DividerSlide;
