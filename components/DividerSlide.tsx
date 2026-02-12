
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface DividerSlideProps {
    image?: string;
    text?: string;
}

const DividerSlide: React.FC<DividerSlideProps> = ({ image, text }) => {
    return (
        <section className="h-full w-full bg-vlanc-bg flex flex-col items-center pt-[150px] px-[120px] relative">
             {/* Wrapper para alinear imagen y texto juntos */}
             <div className="w-full max-w-[1320px] flex flex-col">
                 {/* Contenedor Imagen: 1320x670px */}
                 <div className="w-full aspect-[1320/670] shrink-0">
                     <AnimatedSection className="w-full h-full">
                        {image ? (
                            <img 
                                src={image} 
                                alt="Team" 
                                className="w-full h-full object-cover grayscale brightness-105 shadow-xl rounded-[1px]" 
                            />
                        ) : (
                             <div className="w-full h-full bg-vlanc-primary/10 flex items-center justify-center border border-vlanc-primary/5">
                                <span className="text-xs uppercase tracking-widest text-vlanc-primary/40 font-bold">Foto Equipo 1320x670</span>
                            </div>
                        )}
                     </AnimatedSection>
                 </div>
                 
                 {/* Texto debajo, alineado a la derecha del contenedor */}
                 <AnimatedSection className="mt-12 text-right">
                    <h2 className="especial2">
                        {text || "¿Nos dejas acompañarte?"}
                    </h2>
                 </AnimatedSection>
             </div>
        </section>
    );
};

export default DividerSlide;
