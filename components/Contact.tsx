
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
    };
    finalLogo?: string | null;
}

const Contact: React.FC<ContactProps> = ({ data, finalLogo }) => {
    return (
        <footer className="h-full py-32 px-12 md:px-24 bg-vlanc-bg flex flex-col justify-center items-center">
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center w-full">
                {/* Imagen Despedida */}
                <AnimatedSection className="mb-20 w-full max-w-5xl">
                    {data?.image && <img src={data.image} alt="Despedida" className="rounded-sm shadow-2xl w-full h-[500px] object-cover grayscale opacity-90 brightness-95" />}
                </AnimatedSection>
                
                {/* Call to Action Final */}
                <AnimatedSection>
                    <div className="relative inline-block mb-28">
                         <h2 className="text-4xl md:text-[62px] font-serif italic text-vlanc-black tracking-tighter uppercase leading-none">
                            {data?.callToAction || "¿NOS DEJAS ACOMPAÑARTE?"}
                        </h2>
                        <span className="absolute -right-10 top-0 w-[1.5px] h-32 bg-vlanc-primary transform -rotate-15 opacity-60"></span>
                    </div>
                </AnimatedSection>

                {/* Logo Cierre - Sanity Controlado */}
                <AnimatedSection className="mb-32 flex justify-center w-full">
                    <div className="w-[300px] md:w-[380px] h-[100px] flex items-center justify-center">
                        {finalLogo ? (
                            <img src={finalLogo} alt="Estudio Final" className="max-h-full w-auto object-contain" />
                        ) : (
                            <div className="w-full h-full border border-vlanc-secondary/20 bg-vlanc-secondary/5 flex flex-col items-center justify-center rounded-sm">
                                <span className="text-[21px] font-serif font-bold text-vlanc-secondary/20 uppercase tracking-[0.4em]">VLANC</span>
                                <span className="text-[7px] text-vlanc-primary/40 font-bold uppercase tracking-[0.2em] mt-2">Logo Cierre Final</span>
                            </div>
                        )}
                    </div>
                </AnimatedSection>

                {/* Info Contacto */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-20 w-full max-w-5xl text-left border-t border-vlanc-primary/10 pt-20">
                    <AnimatedSection>
                        <h4 className="font-serif italic text-[21px] mb-5 text-vlanc-primary">/ {data?.location?.title}</h4>
                        <p className="text-[12px] text-vlanc-black/70 font-sans leading-relaxed mb-1">{data?.location?.address}</p>
                        <p className="text-[12px] text-vlanc-primary font-bold tracking-widest uppercase">{data?.location?.email}</p>
                    </AnimatedSection>
                     <AnimatedSection>
                        <h4 className="font-serif italic text-[21px] mb-5 text-vlanc-primary">/ {data?.phone?.title}</h4>
                        {(data?.phone?.numbers ?? []).map((number, i) => (
                             <p key={i} className="text-[12px] text-vlanc-black/70 font-sans tracking-widest font-medium mb-1">{number}</p>
                        ))}
                    </AnimatedSection>
                     <AnimatedSection>
                        <h4 className="font-serif italic text-[21px] mb-5 text-vlanc-primary">/ {data?.web?.title}</h4>
                        <a href={data?.web?.url} target="_blank" rel="noopener noreferrer" className="text-[13px] text-vlanc-black font-bold border-b border-vlanc-primary/50 hover:text-vlanc-primary transition-colors tracking-[0.2em] uppercase leading-relaxed">{data?.web?.displayText}</a>
                    </AnimatedSection>
                </div>

                {/* Botón Imprimir (No se imprime) */}
                <AnimatedSection className="mt-40 no-print opacity-20 hover:opacity-100 transition-opacity">
                    <button 
                        onClick={() => window.print()}
                        className="text-[10px] text-vlanc-black font-bold uppercase tracking-[0.4em] flex items-center gap-3"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                        </svg>
                        Exportar a PDF
                    </button>
                </AnimatedSection>
            </div>
        </footer>
    );
};

export default Contact;
