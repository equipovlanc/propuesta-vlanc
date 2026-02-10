
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface ProcessStep {
    title?: string;
    description?: string;
}

interface ProcessProps {
    data?: {
        title?: string;
        steps?: ProcessStep[];
        badge?: string;
    }
}

const Process: React.FC<ProcessProps> = ({ data }) => {
    return (
        <section className="h-full w-full pt-[140px] pb-[120px] px-[120px] bg-vlanc-bg flex flex-col justify-start overflow-hidden">
            <div className="w-full flex flex-col h-full">
                {/* Título de sección */}
                <AnimatedSection className="mb-20">
                    <h2 className="subtitulo1 mb-4 tracking-tighter">
                        {data?.title || "el proceso Vlanc."}
                    </h2>
                    <div className="w-20 h-[3px] bg-vlanc-primary"></div>
                </AnimatedSection>
                
                {/* Grid de Pasos - 4 columnas x 2 filas (automático por grid-cols-4) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
                    {(data?.steps ?? []).map((step, index) => (
                        <AnimatedSection key={index}>
                            <div className="space-y-6 flex flex-col items-start">
                                {/* Título del paso: subtitulo3 con número serif */}
                                <h3 className="subtitulo3 text-vlanc-black leading-tight">
                                    <span className="font-serif mr-2">{`0${index + 1}`} /</span>
                                    <span>{step.title}</span>
                                </h3>
                                
                                {/* Descripción cuerpo2 (14px) con alineación justificada */}
                                <p className="cuerpo2 text-justify">
                                    {step.description}
                                </p>
                                
                                {/* Botón de Garantía en el paso 03 (índice 2) */}
                                {index === 2 && (
                                    <button 
                                        onClick={() => console.log('Abrir Garantía')}
                                        className="mt-6 inline-flex items-center border border-vlanc-primary text-vlanc-primary px-5 py-3 rounded-[1px] bg-transparent hover:bg-vlanc-primary hover:text-white transition-all duration-300 cursor-pointer outline-none active:scale-[0.98] z-20 group"
                                    >
                                        <span className="text-[14px] font-sans font-bold tracking-[0.1em] uppercase leading-none">
                                            {data?.badge || "GARANTÍA"}
                                        </span>
                                        <span className="mx-2 text-[14px] font-serif leading-none opacity-60">/</span>
                                        <span className="text-[14px] font-serif leading-none">
                                            Somos tu equipo
                                        </span>
                                    </button>
                                )}
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
                
                {/* Frase de Cierre */}
                <div className="mt-auto pt-10 flex justify-start">
                    <AnimatedSection>
                        <p className="cuerpo2">
                            <strong>· Tu interés es el nuestro ·</strong>
                        </p>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
};

export default Process;
