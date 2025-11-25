
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface ContactProps {
    data?: {
        image?: string;
        callToAction?: string;
        location?: {
            title?: string;
            address?: string;
            email?: string;
        };
        phone?: {
            title?: string;
            numbers?: string[];
        };
        web?: {
            title?: string;
            url?: string;
            displayText?: string;
        };
    }
}

const Contact: React.FC<ContactProps> = ({ data }) => {
    return (
        <footer className="py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-white">
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                <AnimatedSection className="mb-16">
                    {data?.image && <img src={data.image} alt="VLANC Team" className="rounded-lg shadow-xl" />}
                </AnimatedSection>
                <AnimatedSection>
                    <div className="relative inline-block">
                         <h2 className="text-3xl md:text-5xl font-light text-gray-800 tracking-wider">
                            {data?.callToAction}
                        </h2>
                        <span className="absolute -top-12 -left-4 w-1 h-24 bg-teal-400 transform -rotate-12"></span>
                    </div>
                </AnimatedSection>

                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-4xl text-left">
                    <AnimatedSection>
                        <h4 className="font-bold mb-2">&gt; {data?.location?.title}</h4>
                        <p className="text-sm text-gray-600">{data?.location?.address}</p>
                        <p className="text-sm text-gray-600">{data?.location?.email}</p>
                    </AnimatedSection>
                     <AnimatedSection>
                        <h4 className="font-bold mb-2">&gt; {data?.phone?.title}</h4>
                        {(data?.phone?.numbers ?? []).map((number, i) => (
                             <p key={i} className="text-sm text-gray-600">{number}</p>
                        ))}
                    </AnimatedSection>
                     <AnimatedSection>
                        <h4 className="font-bold mb-2">&gt; {data?.web?.title}</h4>
                        <a href={data?.web?.url} target="_blank" rel="noopener noreferrer" className="text-sm text-teal-600 hover:underline">{data?.web?.displayText}</a>
                    </AnimatedSection>
                </div>

                {/* Print/Download Button - Hidden in the actual print via CSS class .no-print */}
                <AnimatedSection className="mt-24 no-print">
                    <button 
                        onClick={() => window.print()}
                        className="group flex items-center gap-3 bg-teal-600 text-white px-8 py-4 rounded-full font-bold hover:bg-teal-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        IMPRIMIR / GUARDAR PDF
                    </button>
                    <p className="mt-4 text-xs text-gray-400 max-w-md mx-auto">
                        Al pulsar, selecciona "Guardar como PDF" (Formato A4).
                    </p>
                </AnimatedSection>
            </div>
        </footer>
    );
};

export default Contact;
