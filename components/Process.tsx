
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
        <section className="h-full w-full pt-[150px] pb-[140px] px-[120px] bg-vlanc-bg flex flex-col justify-start overflow-hidden">
            <div className="w-full flex flex-col h-full">
                {/* Título de sección */}
                <AnimatedSection className="mb-12 shrink-0">
                    <h2 className="subtitulo1">
                        {data?.title || "el proceso Vlanc."}
                    </h2>
                    {/* Barra decorativa actualizada (#8f4933) */}
                    <div className="w-[112px] h-[5px] bg-[#8f4933] mt-[40px]"></div>
                </AnimatedSection>
                
                {/* Grid de Pasos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 flex-grow content-between">
                    {(data?.steps ?? []).map((step, index) => (
                        <AnimatedSection key={index}>
                            <div className="space-y-6 flex flex-col items-start">
                                {/* Título del paso */}
                                <h3 className="subtitulo3 font-bold text-vlanc-black leading-tight">
                                    <span className="font-serif mr-2">{`0${index + 1}`} /</span>
                                    <span>{step.title}</span>
                                </h3>
                                
                                {/* Descripción */}
                                <div className="cuerpo2 text-left">
                                    <p>{step.description}</p>
                                    
                                    {/* Texto 'Tu interés es el nuestro' */}
                                    {index === 4 && (
                                        <p className="mt-4 font-bold text-vlanc-secondary">
                                            · Tu interés es el nuestro ·
                                        </p>
                                    )}
                                </div>
                                
                                {/* Botón de Garantía en el paso 03 */}
                                {index === 2 && (
                                    <button 
                                        onClick={() => console.log('Abrir Garantía')}
                                        className="mt-6 inline-flex items-center border border-vlanc-primary text-vlanc-primary px-5 py-3 rounded-[1px] bg-transparent hover:bg-vlanc-primary hover:text-white transition-all duration-300 cursor-pointer outline-none active:scale-[0.98] z-20 group"
                                    >
                                        <span className="boton1">
                                            {data?.badge || "GARANTÍA"}
                                        </span>
                                        <span className="mx-2 text-[14px] font-serif leading-none opacity-60">/</span>
                                        <span className="boton2">
                                            Somos tu equipo
                                        </span>
                                    </button>
                                )}
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
