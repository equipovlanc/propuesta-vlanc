import React from 'react';
import AnimatedSection from './AnimatedSection';

interface Testimonial {
    name?: string;
    quote?: string;
    img?: string;
    link?: string; // URL for the clickable card
}

interface TestimonialsProps {
    data?: {
        sectionNumber?: string;
        title?: string;
        items?: Testimonial[];
    }
}

const SectionHeader: React.FC<{ number?: string, title?: string }> = ({ number, title }) => (
    <div className="relative mb-12 ml-8 md:ml-0">
      <h2 className="flex items-baseline text-6xl md:text-8xl font-bold text-gray-800">
        <span>{number}</span>
        <span className="font-light text-4xl md:text-5xl ml-4 tracking-wider">{title}</span>
      </h2>
      <span className="absolute -top-4 -left-4 w-1 h-24 bg-teal-400 transform -rotate-12"></span>
    </div>
);

const TestimonialCard: React.FC<Testimonial> = ({ name, quote, img, link }) => (
    <a href={link || '#'} target="_blank" rel="noopener noreferrer" className="block h-full">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 h-full">
            {img && <img src={img} alt={name} className="w-full h-56 object-cover" />}
            <div className="p-6">
                <h4 className="text-lg font-semibold text-teal-600 mb-2">&gt; {name}</h4>
                <p className="text-gray-600 italic">"{quote}"</p>
            </div>
        </div>
    </a>
);

const Testimonials: React.FC<TestimonialsProps> = ({ data }) => {
    return (
        <section className="py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-slate-50">
            <div className="max-w-7xl mx-auto">
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
