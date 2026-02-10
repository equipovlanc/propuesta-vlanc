
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
    <section className="h-screen w-full bg-vlanc-bg relative overflow-hidden">
      
        {/* --- BLOQUE SUPERIOR (Altura fija 512px coincidiendo con imagen) --- */}
        <div className="w-full h-[512px] relative mb-12">
            
            {/* 1. TÍTULO SECCIÓN (Posición estándar) */}
            <div className="absolute top-[150px] left-[120px] z-20">
                <AnimatedSection>
                    <h2 className="subtitulo1 tracking-tighter text-vlanc-black">
                        {data?.title || "qué vamos a hacer por ti."}
                    </h2>
                    {/* Barra decorativa */}
                    <div className="w-[112px] h-[5px] bg-[#703622] mt-[40px]"></div>
                </AnimatedSection>
            </div>

            {/* 2. MEDIA (Derecha) */}
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

            {/* 3. DATOS TÉCNICOS + SCOPE (Izquierda Abajo - Alineado con borde imagen) */}
            <div className="absolute bottom-0 left-[120px] z-20 pr-[60px]" style={{ maxWidth: 'calc(100% - 735px - 120px)' }}>
                 <AnimatedSection>
                    <h3 className="subtitulo2 mb-6">{data?.intervention?.title}</h3>
                    
                    <div className="space-y-2 cuerpo text-left">
                        <p><strong className="text-vlanc-primary font-bold uppercase tracking-[0.15em] text-[10px]">LOCALIZACIÓN:</strong> {data?.intervention?.location}</p>
                        <p><strong className="text-vlanc-primary font-bold uppercase tracking-[0.15em] text-[10px]">TIPO DE PROYECTO:</strong> {data?.intervention?.projectType}</p>
                        {/* El Scope es la última línea, alineándose visualmente con el final de la imagen a la derecha */}
                        <p><strong className="text-vlanc-primary font-bold uppercase tracking-[0.15em] text-[10px]">ÁMBITO DE INTERVENCIÓN:</strong> {data?.intervention?.scope}</p>
                    </div>
                </AnimatedSection>
            </div>
        </div>

        {/* --- BLOQUE INFERIOR (Resto del contenido en 2 columnas) --- */}
        <div className="flex w-full px-[120px] gap-24 h-[calc(100vh-512px-48px)] pb-[140px]">
            
            {/* COLUMNA 1: PROGRAMA */}
            <div className="w-1/2 pt-6 border-t border-vlanc-primary/10">
                <AnimatedSection>
                    <p className="mb-4"><strong className="text-vlanc-primary font-bold uppercase tracking-[0.15em] text-[10px]">PROGRAMA Y TRABAJOS:</strong></p>
                    <div 
                        className="cuerpo text-left"
                        dangerouslySetInnerHTML={{ __html: data?.intervention?.program || '' }}
                    />
                </AnimatedSection>
            </div>

            {/* COLUMNA 2: BREAKDOWN (Listado) + NOTA */}
            <div className="w-1/2 pt-6 border-t border-vlanc-primary/10 flex flex-col h-full">
                <AnimatedSection className="h-full flex flex-col">
                    <div className="space-y-4 overflow-y-auto no-scrollbar pr-4 flex-grow">
                        {breakdown.map((item, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <span className="text-vlanc-primary font-bold mt-1.5 text-[14px]">/</span>
                                <span 
                                    className="cuerpo leading-[1.4] text-left"
                                    dangerouslySetInnerHTML={{ __html: item }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Nota al pie de la columna derecha */}
                    {data?.intervention?.note && (
                        <div className="pt-6 mt-4 border-t border-vlanc-primary/5 shrink-0">
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
