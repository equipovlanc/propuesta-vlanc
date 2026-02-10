
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
    <section className="h-screen w-full bg-vlanc-bg relative overflow-hidden flex flex-col">
      
        {/* --- BLOQUE SUPERIOR (Altura fija 512px) --- */}
        <div className="w-full h-[512px] relative shrink-0">
            
            {/* 1. TÍTULO SECCIÓN (Posición estándar) */}
            <div className="absolute top-[150px] left-[120px] z-20">
                <AnimatedSection>
                    <h2 className="subtitulo1 text-vlanc-black">
                        {data?.title || "qué vamos a hacer por ti."}
                    </h2>
                    {/* Barra decorativa */}
                    <div className="w-[112px] h-[5px] bg-[#703622] mt-[40px]"></div>
                </AnimatedSection>
            </div>

            {/* 2. MEDIA (Derecha: 735px) */}
            <div className="absolute top-0 right-[120px] w-[735px] h-full z-10 overflow-hidden">
                <AnimatedSection className="h-full w-full">
                    {data?.video ? (
                            <video src={data.video} autoPlay loop muted playsInline className="w-full h-full object-cover grayscale brightness-90" />
                    ) : data?.image ? (
                        <img src={data.image} alt="Scope" className="w-full h-full object-cover grayscale brightness-95" />
                    ) : (
                            <div className="w-full h-full bg-vlanc-secondary/10 flex items-center justify-center text-[10px] uppercase tracking-widest text-vlanc-secondary/30 font-bold border border-vlanc-secondary/5">
                                Media 735x512
                            </div>
                    )}
                </AnimatedSection>
            </div>

            {/* 3. DATOS TÉCNICOS + SCOPE (Izquierda Abajo - Alineado con borde inferior imagen) 
                - Width fijo de 735px.
                - Espaciado unificado a space-y-4 (equivalente a un salto de línea).
            */}
            <div className="absolute bottom-0 left-[120px] z-20" style={{ width: '735px' }}>
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

        {/* --- BLOQUE INFERIOR (TEXTO EN COLUMNAS FLUIDAS) --- 
            - CAMBIO: pt-4 -> pt-[50px] para alinear texto exactamente 50px bajo el bloque superior.
        */}
        <div className="flex-grow w-full px-[120px] pt-[50px] pb-[140px] overflow-y-auto no-scrollbar">
            <AnimatedSection 
                className="w-full min-h-full" 
                style={{ 
                    columnCount: 2, 
                    columnGap: 'calc(100% - 1470px)', 
                    columnFill: 'balance' 
                }}
            >
                {/* 1. Programa 
                    - Margen inferior ajustado a mb-4 para consistencia.
                */}
                <div className="mb-4 break-inside-avoid">
                    <p className="cuerpo text-left">
                        <strong className="font-bold uppercase">PROGRAMA:</strong> <span dangerouslySetInnerHTML={{ __html: data?.intervention?.program || '' }} />
                    </p>
                </div>

                {/* 2. Breakdown Items */}
                {breakdown.map((item, i) => (
                    <div key={i} className="mb-4 break-inside-avoid">
                        <div className="flex gap-4 items-start">
                            <span 
                                className="cuerpo leading-[1.4] text-left"
                                dangerouslySetInnerHTML={{ __html: item }}
                            />
                        </div>
                    </div>
                ))}

                {/* 3. Nota Final */}
                {data?.intervention?.note && (
                    <div className="pt-6 mt-4 border-t border-vlanc-primary/5 break-inside-avoid">
                        <p className="text-[10px] text-vlanc-secondary/60 italic uppercase tracking-widest leading-[1.4]">
                            {data?.intervention?.note}
                        </p>
                    </div>
                )}
            </AnimatedSection>
        </div>
    </section>
  );
};

export default Scope;
