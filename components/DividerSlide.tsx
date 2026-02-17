
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface DividerSlideProps {
    image?: { src: string; opacity?: number };
    text?: string;
}

const DividerSlide: React.FC<DividerSlideProps> = ({ image, text }) => {
    const imageSrc = image?.src;
    const imageOpacity = image?.opacity ?? 15;

    return (
        <section className="h-full w-full bg-vlanc-bg flex flex-col items-center pt-[150px] px-[120px] relative">
             <div className="w-full max-w-[1320px] flex flex-col">
                 {/* Imagen (J3) */}
                 <div className="w-full aspect-[1320/670] shrink-0 relative">
                     <AnimatedSection className="w-full h-full" hierarchy={3}>
                        {imageSrc ? (
                            <div className="w-full h-full relative">
                                <img 
                                    src={imageSrc} 
                                    alt="Team" 
                                    className="w-full h-full object-cover shadow-xl rounded-[1px]" 
                                />
                                <div 
                                    className="absolute inset-0 bg-[#8f4933] pointer-events-none rounded-[1px]" 
                                    style={{ opacity: imageOpacity / 100 }}
                                />
                            </div>
                        ) : (
                             <div className="w-full h-full bg-vlanc-primary/10 flex items-center justify-center border border-vlanc-primary/5">
                                <span className="text-xs uppercase tracking-widest text-vlanc-primary/40 font-bold">Foto Equipo 1320x670</span>
                            </div>
                        )}
                     </AnimatedSection>
                 </div>
                 
                 {/* Texto (J2) */}
                 <AnimatedSection className="mt-12 text-right" hierarchy={2}>
                    <h2 className="especial2">
                        {text || "¿Nos dejas acompañarte?"}
                    </h2>
                 </AnimatedSection>
             </div>
        </section>
    );
};

export default DividerSlide;
