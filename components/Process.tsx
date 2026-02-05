
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
                    <h2 className="subtitulo1 mb-4 tracking-tighter">{data?.title || "el proceso Vlanc."}</h2>
                    <div className="w-20 h-[2px] bg-vlanc-primary mb-20"></div>
                </AnimatedSection>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
                    {(data?.steps ?? []).map((step, index) => (
                        <AnimatedSection key={index}>
                            <div className="space-y-6">
                                {/* Subtitulo 3 (Regular) para los pasos */}
                                <h3 className="subtitulo3 flex flex-col leading-tight">
                                    <span className="mb-2">{`0${index + 1}`} /</span>
                                    <span>{step.title}</span>
                                </h3>
                                
                                <p className="cuerpo">
                                    {step.description}
                                </p>
                                
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
