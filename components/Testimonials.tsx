
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
        <section className="h-screen w-full bg-vlanc-bg flex items-center px-[120px] overflow-hidden">
            <div className="w-full h-full flex flex-col lg:flex-row gap-16">
                
                {/* COLUMNA TÍTULO */}
                <div className="w-full lg:w-1/4 h-full flex flex-col">
                    <div className="h-1/2 flex flex-col justify-end pb-0">
                        <AnimatedSection>
                            <h2 className="subtitulo1 leading-none">
                                {data?.title || "qué dicen de nosotros."}
                            </h2>
                            {/* Barra decorativa actualizada. CAMBIO: mt-[50px] -> mt-[40px] */}
                            <div className="w-[112px] h-[5px] bg-[#703622] mt-[40px]"></div>
                        </AnimatedSection>
                    </div>
                </div>
                
                {/* COLUMNA TESTIMONIOS */}
                <div className="w-full lg:w-3/4 flex flex-col justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                        {(data?.items ?? []).map((testimonial, index) => (
                            <AnimatedSection key={index} className="flex flex-col h-full">
                                {/* Contenedor Imagen */}
                                <div className="w-full aspect-[3/4] overflow-hidden mb-10 rounded-sm grayscale hover:grayscale-0 transition-all duration-700 shadow-sm">
                                    {testimonial.img ? (
                                        <img src={testimonial.img} alt={testimonial.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-vlanc-secondary/5 flex items-center justify-center">
                                            <span className="text-[10px] uppercase tracking-widest text-vlanc-secondary/20">Foto Testimonio</span>
                                        </div>
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
            </div>
        </section>
    );
};

export default Testimonials;
