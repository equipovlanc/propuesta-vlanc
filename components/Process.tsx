
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
                
                {/* Grid de Pasos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
                    {(data?.steps ?? []).map((step, index) => (
                        <AnimatedSection key={index}>
                            <div className="space-y-6 flex flex-col items-start">
                                {/* Título del paso: subtitulo3, misma línea */}
                                <h3 className="subtitulo3 text-vlanc-black leading-tight">
                                    <span className="font-serif mr-2">{`0${index + 1}`} /</span>
                                    <span>{step.title}</span>
                                </h3>
                                
                                {/* Descripción con clase cuerpo2 (14px) */}
                                <p className="cuerpo2">
                                    {step.description}
                                </p>
                                
                                {/* Botón de Garantía en el punto 3 (índice 2) */}
                                {index === 2 && (
                                    <button 
                                        onClick={() => console.log('Abrir Garantía: Somos tu equipo')}
                                        className="mt-8 inline-block border border-vlanc-primary text-vlanc-primary px-8 py-4 text-[10px] font-bold tracking-[0.3em] uppercase rounded-[1px] bg-transparent hover:bg-vlanc-primary hover:text-white transition-all duration-300 cursor-pointer outline-none active:scale-[0.98] z-20"
                                    >
                                        {data?.badge || "GARANTÍA"}
                                    </button>
                                )}
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
                
                {/* Frase de Cierre alineada al margen izquierdo con cuerpo2 strong */}
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
