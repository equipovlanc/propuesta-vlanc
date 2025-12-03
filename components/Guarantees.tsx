import React from 'react';
import AnimatedSection from './AnimatedSection';

interface Guarantee {
    title?: string;
    description?: string;
    note?: string;
}

interface GuaranteesProps {
    data?: {
        title?: string;
        items?: Guarantee[];
    };
    isInsideModal?: boolean;
}

// Sello elaborado CSS (Medalla/Estrella)
const SealIcon = () => (
    <div className="relative w-20 h-20 flex items-center justify-center mb-6 flex-shrink-0">
         {/* Multiple rotated squares to form a star/seal shape */}
        <div className="absolute inset-0 bg-teal-600 rounded-sm rotate-0 opacity-100"></div>
        <div className="absolute inset-0 bg-teal-600 rounded-sm rotate-12 opacity-80"></div>
        <div className="absolute inset-0 bg-teal-600 rounded-sm rotate-45 opacity-60"></div>
        <div className="absolute inset-0 bg-teal-600 rounded-sm -rotate-12 opacity-80"></div>
        <div className="absolute inset-0 bg-teal-600 rounded-sm rotate-90 opacity-40"></div>
        
        {/* Inner circle border */}
        <div className="absolute inset-1 border-2 border-white/80 rounded-full z-10 flex items-center justify-center">
             {/* "V" in the center */}
            <span className="text-white font-serif text-3xl font-bold drop-shadow-md">V</span>
        </div>
    </div>
);

const Guarantees: React.FC<GuaranteesProps> = ({ data, isInsideModal = false }) => {
    return (
        <section className={`${isInsideModal ? 'h-auto py-8' : 'h-full flex flex-col justify-center'} bg-white`}>
            <div className="max-w-7xl mx-auto w-full">
                <AnimatedSection className="mb-12 ml-8 md:ml-0">
                    <div className="relative inline-block">
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-800">{data?.title || "NUESTRAS GARANTÍAS"}</h2>
                        {/* Only show decorative bar if it won't be cut off, or ensure padding handles it. In modal, we might want to hide it or adjust */}
                        <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-24 bg-teal-400 transform -rotate-12"></span>
                    </div>
                </AnimatedSection>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    {(data?.items ?? []).map((item, i) => (
                         <AnimatedSection key={i} className="group flex flex-col h-full">
                            <SealIcon />
                            <h3 className="text-lg font-bold text-teal-600 mb-4 leading-tight uppercase tracking-wide border-b border-teal-100 pb-2">&gt; {item.title}</h3>
                            <div 
                                className="text-gray-600 text-sm leading-relaxed text-justify mb-4 flex-grow whitespace-pre-line"
                                dangerouslySetInnerHTML={{ __html: item.description || '' }}
                            />
                            {item.note && <p className="text-xs text-gray-400 italic pt-2">{item.note}</p>}
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Guarantees;