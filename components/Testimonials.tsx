import React from 'react';
import AnimatedSection from './AnimatedSection';

interface Testimonial {
    name?: string;
    quote?: string;
    img?: string;
    link?: string;
}

interface TestimonialsProps {
    data?: {
        sectionNumber?: string;
        title?: string;
        items?: Testimonial[];
    }
}

const SectionHeader: React.FC<{ number?: string, title?: string }> = ({ number, title }) => (
    <div className="relative mb-16 ml-8 md:ml-0">
      <h2 className="flex items-baseline text-6xl md:text-8xl font-bold text-gray-800">
        <span>{number}</span>
        <span className="font-light text-4xl md:text-5xl ml-4 tracking-wider">{title}</span>
      </h2>
      <span className="absolute -top-4 -left-4 w-1 h-24 bg-teal-400 transform -rotate-12"></span>
    </div>
);

const TestimonialCard: React.FC<Testimonial> = ({ name, quote, img, link }) => (
    <a href={link || '#'} target="_blank" rel="noopener noreferrer" className="block h-full group">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col border border-gray-100">
            {img && (
                <div className="h-64 overflow-hidden rounded-t-2xl">
                    <img src={img} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 rounded-t-2xl" />
                </div>
            )}
            <div className="p-8 flex-grow flex flex-col justify-center">
                <h4 className="text-lg font-bold text-teal-600 mb-4">&gt; {name}</h4>
                <p className="text-gray-600 italic text-sm md:text-base leading-relaxed">"{quote}"</p>
            </div>
        </div>
    </a>
);

const Testimonials: React.FC<TestimonialsProps> = ({ data }) => {
    return (
        <section className="h-full bg-slate-50 flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full">
                <AnimatedSection>
                    <SectionHeader number={data?.sectionNumber} title={data?.title} />
                </AnimatedSection>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(data?.items ?? []).map((testimonial, index) => (
                        <AnimatedSection key={index}>
                            <TestimonialCard {...testimonial} />
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;