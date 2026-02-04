
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface SubPhase {
    number?: string;
    title?: string;
    description?: string;
    note?: string;
}

interface Phase {
    title?: string;
    subPhases?: SubPhase[];
}

interface ScopePhases2Props {
    data?: {
        sectionNumber?: string;
        title?: string;
        phases?: Phase[];
    }
}

const ScopePhases2: React.FC<ScopePhases2Props> = ({ data }) => {
  return (
    <section className="min-h-screen bg-vlanc-bg flex flex-col justify-center py-20 px-12 md:px-24">
      <div className="max-w-7xl mx-auto w-full">
         <AnimatedSection>
            <div className="relative mb-12">
                <h2 className="title-xl text-vlanc-secondary font-bold tracking-tighter">
                    {data?.title || 'trabajos contemplados.'}
                </h2>
                <div className="w-16 h-[2px] bg-vlanc-primary mt-4"></div>
            </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
             {/* Columna Izq: Fases 3 y 4 (Parte 1) */}
             <div className="space-y-12">
                 {/* Fase 3 */}
                 <div>
                    <div className="border-b border-vlanc-primary/20 pb-2 mb-6">
                        <h3 className="subtitle-md text-vlanc-secondary font-bold">{data?.phases?.[0]?.title}</h3>
                    </div>
                    <div className="space-y-6">
                        {(data?.phases?.[0]?.subPhases ?? []).map((sub, i) => (
                            <div key={i} className="text-vlanc-black/80 text-[12px] leading-relaxed">
                                <p className="mb-1"><strong className="text-vlanc-primary tracking-widest uppercase">{sub.number} {sub.title}</strong></p>
                                <p 
                                    className="whitespace-pre-line"
                                    dangerouslySetInnerHTML={{ __html: sub.description || '' }}
                                />
                            </div>
                        ))}
                    </div>
                 </div>
                 
                 {/* Fase 4 - Inicio */}
                 {data?.phases?.[1] && (
                    <div>
                        <div className="border-b border-vlanc-primary/20 pb-2 mb-6">
                            <h3 className="subtitle-md text-vlanc-secondary font-bold">{data?.phases?.[1]?.title}</h3>
                        </div>
                        <div className="space-y-6">
                            {(data?.phases?.[1]?.subPhases ?? []).slice(0, 1).map((sub, i) => (
                                <div key={i} className="text-vlanc-black/80 text-[12px] leading-relaxed">
                                    <p className="mb-1"><strong className="text-vlanc-primary tracking-widest uppercase">{sub.number} {sub.title}</strong></p>
                                    <p 
                                        className="whitespace-pre-line"
                                        dangerouslySetInnerHTML={{ __html: sub.description || '' }}
                                    />
                                    {sub.note && <p className="text-[10px] italic text-vlanc-black/50 mt-2">{sub.note}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                 )}
            </div>

            {/* Columna Der: Fase 4 (resto) y Fase 5 */}
            <div className="space-y-12">
                {/* Fase 4 - Continuación */}
                {data?.phases?.[1] && (data?.phases?.[1]?.subPhases?.length ?? 0) > 1 && (
                    <div className="lg:pt-[76px]"> {/* Alineación con el título de la izq */}
                        <div className="space-y-6">
                             {(data?.phases?.[1]?.subPhases ?? []).slice(1).map((sub, i) => (
                                 <div key={i} className="text-vlanc-black/80 text-[12px] leading-relaxed">
                                    <p className="mb-1"><strong className="text-vlanc-primary tracking-widest uppercase">{sub.number} {sub.title}</strong></p>
                                    <p 
                                        className="whitespace-pre-line"
                                        dangerouslySetInnerHTML={{ __html: sub.description || '' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                 {/* Fase 5 */}
                 {data?.phases?.[2] && (
                     <div>
                        <div className="border-b border-vlanc-primary/20 pb-2 mb-6">
                            <h3 className="subtitle-md text-vlanc-secondary font-bold">{data?.phases?.[2]?.title}</h3>
                        </div>
                        <div className="space-y-6">
                            {(data?.phases?.[2]?.subPhases ?? []).map((sub, i) => (
                                <div key={i} className="text-vlanc-black/80 text-[12px] leading-relaxed">
                                    <p className="mb-1"><strong className="text-vlanc-primary tracking-widest uppercase">{sub.number} {sub.title}</strong></p>
                                    <p 
                                        className="whitespace-pre-line"
                                        dangerouslySetInnerHTML={{ __html: sub.description || '' }}
                                    />
                                </div>
                            ))}
                        </div>
                     </div>
                 )}
            </div>
        </div>
      </div>
    </section>
  );
};

export default ScopePhases2;
