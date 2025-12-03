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
    <section className="h-full bg-white flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
         <AnimatedSection>
            {/* Margen top extra para la rotación de la barra */}
            <div className="relative mb-8 md:mb-12 ml-8 md:ml-0 mt-8">
                <h2 className="flex items-baseline text-6xl md:text-8xl font-bold text-gray-800">
                    <span>{data?.sectionNumber || '07'}</span>
                    <span className="font-light text-4xl md:text-5xl ml-4 tracking-wider uppercase">{data?.title || 'QUÉ VAMOS A HACER POR TI'}</span>
                </h2>
                <span className="absolute -top-4 -left-4 w-1 h-24 bg-teal-400 transform -rotate-12"></span>
            </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
             {/* Columna Izq: Contratación + Documentación parte 1 */}
             <div className="space-y-8">
                 {/* Fase 3 */}
                 <div>
                    <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">{data?.phases?.[0]?.title}</h3>
                    <div className="space-y-4">
                        {(data?.phases?.[0]?.subPhases ?? []).map((sub, i) => (
                            <div key={i} className="text-gray-600 text-sm leading-relaxed">
                                <p><strong className="text-teal-700">{sub.number} {sub.title}</strong></p>
                                <p 
                                    className="mt-1 whitespace-pre-line"
                                    dangerouslySetInnerHTML={{ __html: sub.description || '' }}
                                />
                            </div>
                        ))}
                    </div>
                 </div>
                 
                 {/* Fase 4 - Parte 1 */}
                 <div>
                    <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">{data?.phases?.[1]?.title}</h3>
                    <div className="space-y-4">
                        {(data?.phases?.[1]?.subPhases ?? []).slice(0, 1).map((sub, i) => (
                             <div key={i} className="text-gray-600 text-sm leading-relaxed">
                                <p><strong className="text-teal-700">{sub.number} {sub.title}</strong></p>
                                <p 
                                    className="mt-1 whitespace-pre-line"
                                    dangerouslySetInnerHTML={{ __html: sub.description || '' }}
                                />
                                {sub.note && <p className="text-xs italic text-gray-400 mt-1 whitespace-pre-line">{sub.note}</p>}
                            </div>
                        ))}
                    </div>
                 </div>
            </div>

            {/* Columna Der: Documentación parte 2 + Obra */}
            <div className="space-y-8">
                {/* Fase 4 - Parte 2 */}
                <div>
                    <div className="space-y-4 pt-0 md:pt-12"> 
                         {(data?.phases?.[1]?.subPhases ?? []).slice(1).map((sub, i) => (
                             <div key={i} className="text-gray-600 text-sm leading-relaxed">
                                <p><strong className="text-teal-700">{sub.number} {sub.title}</strong></p>
                                <p 
                                    className="mt-1 whitespace-pre-line"
                                    dangerouslySetInnerHTML={{ __html: sub.description || '' }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                 {/* Fase 5 */}
                 <div>
                    <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">{data?.phases?.[2]?.title}</h3>
                    <div className="space-y-4">
                        {(data?.phases?.[2]?.subPhases ?? []).map((sub, i) => (
                            <div key={i} className="text-gray-600 text-sm leading-relaxed">
                                <p><strong className="text-teal-700">{sub.number} {sub.title}</strong></p>
                                <p 
                                    className="mt-1 whitespace-pre-line"
                                    dangerouslySetInnerHTML={{ __html: sub.description || '' }}
                                />
                            </div>
                        ))}
                    </div>
                 </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ScopePhases2;