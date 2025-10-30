
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface Guarantee {
    title?: string;
    description?: string;
}

interface GuaranteesProps {
    data?: {
        title?: string;
        items?: Guarantee[];
    }
}

const Guarantees: React.FC<GuaranteesProps> = ({ data }) => {
    return (
        <section className="py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-white">
            <div className="max-w-7xl mx-auto">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">{data?.title}</h2>
                    <span className="block mx-auto mt-4 w-1 h-24 bg-teal-400 transform -rotate-12"></span>
                </AnimatedSection>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {(data?.items ?? []).map((item, i) => (
                         <AnimatedSection key={i}>
                            <h3 className="text-xl font-semibold text-teal-600 mb-4">&gt; {item.title}</h3>
                            <p className="text-gray-600">{item.description}</p>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Guarantees;
