
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface ScopeProps {
    data?: {
        title?: string;
        image?: string;
        video?: string;
        intervention?: {
            title?: string;
            location?: string;
            projectType?: string;
            scope?: string;
            program?: string;
            breakdown?: string[];
            note?: string;
        };
    }
}

const Scope: React.FC<ScopeProps> = ({ data }) => {
  const breakdown = data?.intervention?.breakdown ?? [];

  return (
    <section className="h-screen w-full bg-vlanc-bg relative overflow-hidden flex flex-row">
      
        {/* --- COLUMNA IZQUIERDA --- 
            Padding top 150px (Estándar títulos)
            Padding left 120px
        */}
        <div className="w-1/2 h-full flex flex-col pt-[150px] pl-[120px] pr-8 overflow-y-auto no-scrollbar">
            
            {/* 1. TÍTULO Y BARRA */}
            <div className="shrink-0">
                <AnimatedSection>
                    <h2 className="subtitulo1 text-vlanc-black">
                        {data?.title || "qué vamos a hacer por ti."}
                    </h2>
                    {/* Barra decorativa */}
                    <div className="w-[112px] h-[5px] bg-[#703622] mt-[40px]"></div>
                </AnimatedSection>
            </div>

            {/* 2. DATOS TÉCNICOS (Bloque Izquierdo)
                REQUISITO: Alineado a 75px por debajo de la barra marrón.
            */}
            <div className="mt-[75px] shrink-0 pb-10">
                 <AnimatedSection>
                    <h3 className="subtitulo2 mb-6">{data?.intervention?.title}</h3>
                    
                    <div className="space-y-4 cuerpo text-left">
                        <p><strong className="font-bold uppercase">LOCALIZACIÓN:</strong> {data?.intervention?.location}</p>
                        <p><strong className="font-bold uppercase">TIPO DE PROYECTO:</strong> {data?.intervention?.projectType}</p>
                        <p><strong className="font-bold uppercase">ÁMBITO DE INTERVENCIÓN:</strong> {data?.intervention?.scope}</p>
                    </div>
                </AnimatedSection>
            </div>
        </div>

        {/* --- COLUMNA DERECHA --- 
            Padding right 120px
        */}
        <div className="w-1/2 h-full flex flex-col pr-[120px]">
            
            {/* 1. MEDIA (Bloque Superior) - Altura fija 512px */}
            <div className="h-[512px] w-full shrink-0 relative overflow-hidden">
                <AnimatedSection className="h-full w-full">
                    {data?.video ? (
                            <video src={data.video} autoPlay loop muted playsInline className="w-full h-full object-cover grayscale brightness-90" />
                    ) : data?.image ? (
                        <img src={data.image} alt="Scope" className="w-full h-full object-cover grayscale brightness-95" />
                    ) : (
                            <div className="w-full h-full bg-vlanc-secondary/10 flex items-center justify-center text-[10px] uppercase tracking-widest text-vlanc-secondary/30 font-bold border border-vlanc-secondary/5">
                                Media 512px Height
                            </div>
                    )}
                </AnimatedSection>
            </div>

            {/* 2. TEXTO DESCRIPTIVO (Bloque Derecho)
                REQUISITO: Alineado a 50px por debajo del bloque superior (Media).
            */}
            <div className="mt-[50px] flex-grow overflow-y-auto no-scrollbar pl-8 pb-[140px]">
                <AnimatedSection>
                    {/* Programa */}
                    <div className="mb-4">
                        <p className="cuerpo text-left">
                            <strong className="font-bold uppercase">PROGRAMA:</strong> <span dangerouslySetInnerHTML={{ __html: data?.intervention?.program || '' }} />
                        </p>
                    </div>

                    {/* Breakdown Items */}
                    {breakdown.map((item, i) => (
                        <div key={i} className="mb-4">
                            <div className="flex gap-4 items-start">
                                <span 
                                    className="cuerpo leading-[1.4] text-left"
                                    dangerouslySetInnerHTML={{ __html: item }}
                                />
                            </div>
                        </div>
                    ))}

                    {/* Nota Final */}
                    {data?.intervention?.note && (
                        <div className="pt-6 mt-4 border-t border-vlanc-primary/5">
                            <p className="text-[10px] text-vlanc-secondary/60 italic uppercase tracking-widest leading-[1.4]">
                                {data?.intervention?.note}
                            </p>
                        </div>
                    )}
                </AnimatedSection>
            </div>
        </div>
    </section>
  );
};

export default Scope;
