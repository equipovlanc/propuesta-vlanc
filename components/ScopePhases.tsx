

import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';
import Guarantees from './Guarantees';

interface Guarantee {
    title?: string;
    description?: string;
    note?: string;
}
interface GuaranteesData {
    title?: string;
    items?: Guarantee[];
}

interface SubPhase {
    number?: string;
    title?: string;
    description?: string;
}

interface Phase {
    title?: string;
    subPhases?: SubPhase[];
}

interface ScopePhasesProps {
    data?: {
        title?: string;
        videoUrl?: string;
        phases?: Phase[];
    };
    guaranteesData?: GuaranteesData;
}

const ScopePhases: React.FC<ScopePhasesProps> = ({ data, guaranteesData }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [showGuarantees, setShowGuarantees] = useState(false);

  return (
    <>
        <section className="h-full bg-white flex flex-col justify-center relative">
          <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
            <AnimatedSection>
                {/* Título corregido: Estilo estándar VLANC */}
                <div className="relative mb-8 md:mb-12 ml-8 md:ml-0">
                    <h2 className="flex items-baseline text-6xl md:text-8xl font-bold text-gray-800">
                        <span>07</span>
                        <span className="font-light text-4xl md:text-5xl ml-4 tracking-wider">{data?.title}</span>
                    </h2>
                    <span className="absolute -top-4 -left-4 w-1 h-24 bg-teal-400 transform -rotate-12"></span>
                </div>
            </AnimatedSection>
            
            <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative">
                 {/* Columna 1: Anteproyecto */}
                 <div className="flex flex-col justify-between">
                     <div className="space-y-6">
                        <div className="border-b border-gray-200 pb-2 mb-4">
                            <h3 className="text-xl font-bold text-gray-800">{data?.phases?.[0]?.title}</h3>
                        </div>
                        <div className="space-y-4">
                            {(data?.phases?.[0]?.subPhases ?? []).map((sub, i) => (
                                <AnimatedSection key={i} className="text-gray-600 text-sm leading-relaxed">
                                    <p><strong className="text-teal-700">{sub.number} {sub.title}</strong></p>
                                    <p className="whitespace-pre-line mt-1">{sub.description}</p>
                                </AnimatedSection>
                            ))}
                        </div>
                     </div>
                     
                     {/* BOTONES ABAJO IZQUIERDA - HIDDEN ON PRINT */}
                     <div className="mt-8 flex items-center gap-4 no-print">
                        {/* Botón Video */}
                        <button 
                            onClick={() => setShowVideo(true)}
                            className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-sm text-xs font-semibold hover:bg-black transition shadow-lg tracking-widest"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                            </svg>
                            VER VIDEO
                        </button>

                        {/* Botón Garantías (Sello V) */}
                        <button 
                            onClick={() => setShowGuarantees(true)}
                            className="relative group w-12 h-12 flex items-center justify-center"
                            title="Ver Garantías"
                        >
                             <div className="absolute inset-0 bg-teal-600 rotate-45 rounded-sm shadow-md group-hover:bg-teal-700 transition"></div>
                             <div className="absolute inset-0 bg-teal-600 -rotate-12 rounded-sm opacity-50"></div>
                             <span className="relative font-bold text-white text-lg font-serif">V</span>
                        </button>
                     </div>
                </div>
                
                {/* Columna 2: Interiorismo */}
                <div className="space-y-6">
                     <div className="border-b border-gray-200 pb-2 mb-4">
                        <h3 className="text-xl font-bold text-gray-800">{data?.phases?.[1]?.title}</h3>
                     </div>
                     <div className="space-y-4">
                        {(data?.phases?.[1]?.subPhases ?? []).map((sub, i) => (
                            <AnimatedSection key={i} className="text-gray-600 text-sm leading-relaxed">
                                 <p><strong className="text-teal-700">{sub.number} {sub.title}</strong></p>
                                 <p className="whitespace-pre-line mt-1">{sub.description}</p>
                            </AnimatedSection>
                        ))}
                     </div>
                </div>
            </div>
          </div>
        </section>

        {/* MODAL VIDEO */}
        {showVideo && (
            <div 
                className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                onClick={() => setShowVideo(false)}
            >
                <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                    {data?.videoUrl && (
                        <video src={data.videoUrl} controls autoPlay className="w-full h-full" />
                    )}
                    <button 
                        onClick={() => setShowVideo(false)}
                        className="absolute top-4 right-4 text-white hover:text-gray-300 text-4xl font-bold"
                    >
                        &times;
                    </button>
                </div>
            </div>
        )}

        {/* MODAL GARANTÍAS */}
        {showGuarantees && (
            <div 
                className="fixed inset-0 z-50 bg-white/95 flex items-center justify-center"
                onClick={() => setShowGuarantees(false)}
            >
                <div 
                    className="w-full h-full max-w-7xl overflow-y-auto bg-white shadow-2xl relative" 
                    onClick={e => e.stopPropagation()}
                >
                    {/* Botón cerrar */}
                    <button 
                        onClick={() => setShowGuarantees(false)}
                        className="fixed top-8 right-8 text-gray-400 hover:text-black text-5xl font-bold z-[60] leading-none"
                    >
                        &times;
                    </button>
                    
                    {/* Contenedor con mucho padding para evitar cortes */}
                    <div className="p-8 md:p-16 lg:p-24 pt-24 md:pt-32 pb-32">
                        {/* Pasamos isInsideModal=true para que el componente se comporte fluidamente */}
                        <Guarantees data={guaranteesData} isInsideModal={true} />
                    </div>
                </div>
            </div>
        )}
    </>
  );
};

export default ScopePhases;