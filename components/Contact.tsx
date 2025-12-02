
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
        <footer className="h-full py-12 px-4 md:px-8 lg:px-16 bg-white flex flex-col justify-center items-center">
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center w-full">
                <AnimatedSection className="mb-12 w-full max-w-4xl">
                    {data?.image && <img src={data.image} alt="VLANC Team" className="rounded-lg shadow-xl w-full h-[400px] object-cover" />}
                </AnimatedSection>
                <AnimatedSection>
                    <div className="relative inline-block">
                         <h2 className="text-3xl md:text-5xl font-light text-gray-800 tracking-wider uppercase">
                            {data?.callToAction || "¿QUIERES VIVIR LA EXPERIENCIA VLANC?"}
                        </h2>
                        <span className="absolute -top-12 -left-4 w-1 h-24 bg-teal-400 transform -rotate-12"></span>
                    </div>
                </AnimatedSection>

                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-4xl text-left">
                    <AnimatedSection>
                        <h4 className="font-bold mb-2 text-teal-600">&gt; {data?.location?.title}</h4>
                        <p className="text-sm text-gray-600">{data?.location?.address}</p>
                        <p className="text-sm text-gray-600">{data?.location?.email}</p>
                    </AnimatedSection>
                     <AnimatedSection>
                        <h4 className="font-bold mb-2 text-teal-600">&gt; {data?.phone?.title}</h4>
                        {(data?.phone?.numbers ?? []).map((number, i) => (
                             <p key={i} className="text-sm text-gray-600">{number}</p>
                        ))}
                    </AnimatedSection>
                     <AnimatedSection>
                        <h4 className="font-bold mb-2 text-teal-600">&gt; {data?.web?.title}</h4>
                        <a href={data?.web?.url} target="_blank" rel="noopener noreferrer" className="text-sm text-teal-600 hover:underline">{data?.web?.displayText}</a>
                    </AnimatedSection>
                </div>

                {/* Print Button - Hidden in print */}
                <AnimatedSection className="mt-12 no-print opacity-50 hover:opacity-100 transition-opacity">
                    <button 
                        onClick={() => window.print()}
                        className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                        </svg>
                        Imprimir
                    </button>
                </AnimatedSection>
            </div>
        </footer>
    );
};

export default Contact;
