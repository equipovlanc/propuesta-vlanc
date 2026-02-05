
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface Testimonial {
    name?: string;
    quote?: string;
    img?: string;
}

interface TestimonialsProps {
    data?: {
        title?: string;
        items?: Testimonial[];
    }
}

const Testimonials: React.FC<TestimonialsProps> = ({ data }) => {
    return (
        <section className="min-h-screen bg-vlanc-bg flex flex-col justify-center py-32 px-12 md:px-24">
            <div className="max-w-7xl mx-auto w-full">
                <AnimatedSection>
                    {/* Subtítulo 1 */}
                    <h2 className="subtitle-pdf text-vlanc-black mb-4 font-normal tracking-tighter lowercase">
                       {data?.title || "qué dicen de nosotros."}
                    </h2>
                    <div className="w-20 h-[2px] bg-vlanc-primary mb-20"></div>
                </AnimatedSection>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {(data?.items ?? []).map((testimonial, index) => (
                        <AnimatedSection key={index} className="flex flex-col">
                            {/* PDF Layout: Nombre, Texto, Foto (vertical) o similar. Ajustando a "Nombre (S2), Texto (Body), Foto" */}
                            
                             {/* Subtítulo 2 para nombre */}
                            <h4 className="text-[24px] font-serif italic text-vlanc-black mb-6">{testimonial.name}</h4>
                            
                            {/* Cuerpo Marrón */}
                            <p className="text-vlanc-secondary text-[12px] leading-relaxed text-justify mb-8 font-sans">"{testimonial.quote}"</p>

                            <div className="mt-auto aspect-[3/4] w-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 rounded-sm shadow-sm">
                                {testimonial.img ? (
                                    <img src={testimonial.img} alt={testimonial.name} className="w-full h-full object-cover" />
                                ) : (
                                     <div className="w-full h-full bg-vlanc-secondary/5 flex items-center justify-center">Foto Cliente</div>
                                )}
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
