
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
        <section className="min-h-screen py-32 px-12 md:px-24 bg-vlanc-bg flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full">
                <AnimatedSection>
                    {/* Subtítulo 1 */}
                    <h2 className="subtitle-pdf text-vlanc-black mb-4 tracking-tighter font-normal">{data?.title || "el proceso Vlanc."}</h2>
                    <div className="w-20 h-[2px] bg-vlanc-primary mb-20"></div>
                </AnimatedSection>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
                    {(data?.steps ?? []).map((step, index) => (
                        <AnimatedSection key={index}>
                            <div className="space-y-6">
                                {/* Encabezado paso: Baskerville Display PT (serif), Regular */}
                                <h3 className="text-[24px] text-vlanc-black flex flex-col font-serif font-normal leading-tight">
                                    <span className="mb-2">{`0${index + 1}`} /</span>
                                    <span>{step.title}</span>
                                </h3>
                                {/* Cuerpo Marrón */}
                                <p className="text-vlanc-secondary text-[12px] font-sans leading-relaxed text-justify">
                                    {step.description}
                                </p>
                                
                                {/* Botón Garantía en Paso 3 (Index 2) */}
                                {index === 2 && data?.badge && (
                                    <div className="mt-6 inline-block border border-vlanc-primary text-vlanc-primary px-4 py-3 text-[10px] font-bold tracking-widest uppercase rounded-[1px] bg-transparent">
                                        {data.badge}
                                    </div>
                                )}
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
                
                <AnimatedSection className="mt-20 text-center">
                    <p className="text-[12px] font-bold text-vlanc-secondary tracking-[0.3em] uppercase">
                        · Tu interés es el nuestro ·
                    </p>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default Process;
