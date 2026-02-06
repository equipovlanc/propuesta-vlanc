
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
                            <div className="space-y-6">
                                {/* Título del paso: subtitulo3, misma línea, sin mayúsculas forzadas ni gris */}
                                <h3 className="subtitulo3 text-vlanc-black leading-tight">
                                    <span className="font-serif mr-2">{`0${index + 1}`} /</span>
                                    <span>{step.title}</span>
                                </h3>
                                
                                {/* Descripción con clase cuerpo2 (14px) */}
                                <p className="cuerpo2">
                                    {step.description}
                                </p>
                                
                                {index === 2 && data?.badge && (
                                    <div className="mt-8 inline-block border border-vlanc-primary text-vlanc-primary px-6 py-4 text-[10px] font-bold tracking-[0.3em] uppercase rounded-[1px] bg-transparent">
                                        {data.badge}
                                    </div>
                                )}
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
                
                {/* Frase de Cierre alineada al margen inferior */}
                <div className="mt-auto pt-10 flex justify-center">
                    <AnimatedSection>
                        <p className="text-[12px] font-bold text-vlanc-secondary tracking-[0.4em] uppercase opacity-60">
                            · Tu interés es el nuestro ·
                        </p>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
};

export default Process;
