
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
        <section className="h-full w-full bg-vlanc-bg flex items-center px-10 py-20">
            <div className="w-full h-full flex flex-col lg:flex-row gap-16">
                
                <div className="w-full lg:w-1/4 pt-10">
                    <AnimatedSection>
                        <h2 className="subtitulo1 mb-4 tracking-tighter leading-none">
                        {data?.title || "qué dicen de nosotros."}
                        </h2>
                        <div className="w-20 h-[2px] bg-vlanc-primary"></div>
                    </AnimatedSection>
                </div>
                
                <div className="w-full lg:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-8 h-full items-start pt-10">
                    {(data?.items ?? []).map((testimonial, index) => (
                        <AnimatedSection key={index} className="flex flex-col h-full">
                            <div className="w-full aspect-[3/4] overflow-hidden mb-6 rounded-sm grayscale hover:grayscale-0 transition-all duration-700">
                                {testimonial.img ? (
                                    <img src={testimonial.img} alt={testimonial.name} className="w-full h-full object-cover" />
                                ) : (
                                     <div className="w-full h-full bg-vlanc-secondary/5 flex items-center justify-center">Foto</div>
                                )}
                            </div>

                            {/* Subtitulo 2 (Italic) para nombres */}
                            <h4 className="subtitulo2 mb-4">{testimonial.name}</h4>
                            
                            <p className="cuerpo">
                                "{testimonial.quote}"
                            </p>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
