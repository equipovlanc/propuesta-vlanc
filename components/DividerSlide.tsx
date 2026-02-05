
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface DividerSlideProps {
    image?: string;
    text?: string;
}

const DividerSlide: React.FC<DividerSlideProps> = ({ image, text }) => {
    return (
        <section className="h-screen w-full flex items-center justify-center bg-vlanc-bg p-10 relative">
             <div className="max-w-6xl w-full h-[60vh] relative">
                 <AnimatedSection className="w-full h-full relative z-10">
                    {/* Imagen Equipo Horizontal */}
                    {image ? (
                        <img src={image} alt="Team" className="w-full h-full object-cover grayscale brightness-105 shadow-xl rounded-sm" />
                    ) : (
                         <div className="w-full h-full bg-vlanc-primary/10 flex items-center justify-center">
                            <span className="text-xs uppercase tracking-widest text-vlanc-primary/40">Foto Equipo Horizontal</span>
                        </div>
                    )}
                 </AnimatedSection>
                 
                 {/* Texto Overlay Inferior Derecho */}
                 <AnimatedSection className="absolute -bottom-16 right-0 lg:-right-12 z-20">
                    <h2 className="text-[42px] md:text-[60px] font-serif italic text-vlanc-secondary tracking-tighter leading-none text-right">
                        {text || "¿Nos dejas acompañarte?"}
                    </h2>
                 </AnimatedSection>
             </div>
        </section>
    );
};

export default DividerSlide;
