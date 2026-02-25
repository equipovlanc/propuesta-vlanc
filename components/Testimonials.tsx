
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
                        </AnimatedSection>
                        <AnimatedSection mode="bar" className="w-[112px] h-[5px] bg-[#8f4933] mt-[27px]" />
                    </div>
                </div>

                {/* COLUMNA TESTIMONIOS (Cascada J2 -> J3 -> J4...) */}
                <div className="w-full lg:w-3/4 flex flex-col justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                        {(data?.items ?? []).map((testimonial, index) => {
                            const imgSrc = testimonial.img?.src;
                            const imgOpacity = testimonial.img?.opacity ?? 15;

                            // Calculamos jerarquía dinámica para efecto cascada: 
                            // Cliente 1 (idx 0) = J2 (Normal)
                            // Cliente 2 (idx 1) = J3 (Retraso 1.3s)
                            // Cliente 3 (idx 2) = J4 (Retraso 2.6s)
                            const cardHierarchy = 2 + index;

                            return (
                                <div key={index} className="flex flex-col h-full group">
                                    {/* Imagen - Ahora sigue la jerarquía de cascada para entrar junto al texto */}
                                    <AnimatedSection hierarchy={cardHierarchy} className="w-full aspect-[3/4] overflow-hidden mb-10 rounded-sm shadow-sm relative">
                                        {imgSrc ? (
                                            <>
                                                <img src={imgSrc} alt={testimonial.name} className="w-full h-full object-cover" />
                                                <div
                                                    className="absolute inset-0 pointer-events-none transition-colors duration-700 group-hover:bg-transparent"
                                                    style={{ backgroundColor: `rgba(143, 73, 51, ${imgOpacity / 100})` }}
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
                                    </AnimatedSection>

                                    {/* Textos - Misma jerarquía que la imagen para entrar en bloque */}
                                    <AnimatedSection hierarchy={cardHierarchy}>
                                        {testimonial.url ? (
                                            <a
                                                href={testimonial.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block cursor-pointer no-underline"
                                            >
                                                <h4 className="subtitulo2 mb-4 group-hover:text-vlanc-primary transition-colors" dangerouslySetInnerHTML={{ __html: testimonial.name || '' }} />
                                                <p className="cuerpo" dangerouslySetInnerHTML={{ __html: `"${testimonial.quote}"` }} />
                                            </a>
                                        ) : (
                                            <div>
                                                <h4 className="subtitulo2 mb-4 group-hover:text-vlanc-primary transition-colors" dangerouslySetInnerHTML={{ __html: testimonial.name || '' }} />
                                                <p className="cuerpo" dangerouslySetInnerHTML={{ __html: `"${testimonial.quote}"` }} />
                                            </div>
                                        )}
                                    </AnimatedSection>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
