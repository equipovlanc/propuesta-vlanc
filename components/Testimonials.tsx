
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
                    <h2 className="title-xl text-vlanc-secondary mb-4 font-bold tracking-tighter">
                       {data?.title || "qué dicen de nosotros."}
                    </h2>
                    <div className="w-16 h-[2px] bg-vlanc-primary mb-20"></div>
                </AnimatedSection>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {(data?.items ?? []).map((testimonial, index) => (
                        <AnimatedSection key={index} className="flex flex-col">
                            <div className="mb-8 aspect-video overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 rounded-sm shadow-sm">
                                {testimonial.img && <img src={testimonial.img} alt={testimonial.name} className="w-full h-full object-cover" />}
                            </div>
                            <h4 className="subtitle-md text-vlanc-primary font-bold mb-4 uppercase tracking-tighter">{testimonial.name}</h4>
                            <p className="text-vlanc-black/70 italic text-[12px] leading-relaxed">"{testimonial.quote}"</p>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
