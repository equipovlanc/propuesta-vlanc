
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface Testimonial {
    name?: string;
    quote?: string;
    img?: { src: string; opacity?: number };
    url?: string;
}

interface TestimonialsProps {
    data?: {
        title?: string;
        items?: Testimonial[];
    }
}

const Testimonials: React.FC<TestimonialsProps> = ({ data }) => {
    return (
        <section className="h-screen w-full flex items-center px-[120px] overflow-hidden">
            <div className="w-full h-full flex flex-col lg:flex-row gap-16">
                
                {/* COLUMNA TÍTULO (J1) */}
                <div className="w-full lg:w-1/4 h-full flex flex-col">
                    <div className="h-1/2 flex flex-col justify-end pb-0">
                        <AnimatedSection hierarchy={1}>
                            <h2 className="subtitulo1 leading-none">
                                {data?.title || "qué dicen de nosotros."}
                            </h2>
                            <div className="w-[112px] h-[5px] bg-[#8f4933] mt-[27px]"></div>
                        </AnimatedSection>
                    </div>
                </div>
                
                {/* COLUMNA TESTIMONIOS (J2 y J3) */}
                <div className="w-full lg:w-3/4 flex flex-col justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                        {(data?.items ?? []).map((testimonial, index) => {
                            const imgSrc = testimonial.img?.src;
                            const imgOpacity = testimonial.img?.opacity ?? 15;

                            const testimonialContent = (
                                <div className="flex flex-col h-full">
                                    {/* Contenedor Imagen (J3) */}
                                    {/* Nota: En testimonios, la imagen va asociada. Para simplificar, pondremos todo el bloque en J3 o dividiremos. 
                                        Para mantener el efecto "escalonado" solicitado, pondremos todo el bloque en J2, pero las imágenes en J3 
                                        puede ser complicado si están en el mismo map. Vamos a poner el bloque en J2. */}
                                    <div className="w-full aspect-[3/4] overflow-hidden mb-10 rounded-sm shadow-sm relative group">
                                        {imgSrc ? (
                                            <>
                                                <img src={imgSrc} alt={testimonial.name} className="w-full h-full object-cover" />
                                                <div 
                                                    className="absolute inset-0 bg-[#8f4933] pointer-events-none transition-opacity duration-700 group-hover:opacity-0" 
                                                    style={{ opacity: imgOpacity / 100 }}
                                                />
                                            </>
                                        ) : (
                                            <div className="w-full h-full bg-vlanc-secondary/5 flex items-center justify-center">
                                                <span className="text-[10px] uppercase tracking-widest text-vlanc-secondary/20">Foto Testimonio</span>
                                            </div>
                                        )}
                                        
                                        {testimonial.url && (
                                            <div className="absolute inset-0 bg-vlanc-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                                                <span className="text-white text-[10px] font-bold tracking-[0.2em] uppercase bg-vlanc-primary/80 px-4 py-2">Ver Proyecto</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Textos */}
                                    <h4 className="subtitulo2 mb-4 group-hover:text-vlanc-primary transition-colors">{testimonial.name}</h4>
                                    <p className="cuerpo">"{testimonial.quote}"</p>
                                </div>
                            );

                            return (
                                <AnimatedSection key={index} className="h-full group" hierarchy={2}>
                                    {testimonial.url ? (
                                        <a 
                                            href={testimonial.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="block h-full cursor-pointer no-underline"
                                        >
                                            {testimonialContent}
                                        </a>
                                    ) : (
                                        <div className="h-full">
                                            {testimonialContent}
                                        </div>
                                    )}
                                </AnimatedSection>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
