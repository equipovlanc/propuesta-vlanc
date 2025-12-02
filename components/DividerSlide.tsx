
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface DividerSlideProps {
    image?: string;
    text?: string;
}

const DividerSlide: React.FC<DividerSlideProps> = ({ image, text }) => {
    return (
        <section className="h-full w-full flex bg-white relative">
             {/* Imagen ocupa 60-70% */}
            <div className="w-full lg:w-2/3 h-full">
                {image && <img src={image} alt="Divider" className="w-full h-full object-cover grayscale" />}
            </div>
            
            {/* Texto y bloque blanco */}
            <div className="absolute right-0 bottom-0 w-full lg:w-1/2 h-1/2 bg-white flex items-center justify-center p-12 lg:p-24 shadow-2xl">
                 {/* Decorative block bg */}
                 <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gray-50 -z-10"></div>
                 
                 <AnimatedSection className="w-full text-right">
                     <div className="relative inline-block">
                        <h2 className="text-4xl md:text-6xl font-light text-gray-800 tracking-widest leading-tight text-right">
                            {text || "¿NOS DEJAS ACOMPAÑARTE?"}
                        </h2>
                        <span className="absolute -right-8 top-1/2 -translate-y-1/2 w-1 h-32 bg-teal-400 transform -rotate-12"></span>
                     </div>
                 </AnimatedSection>
            </div>
        </section>
    );
};

export default DividerSlide;
