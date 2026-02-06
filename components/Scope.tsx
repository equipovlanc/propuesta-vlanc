
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
    <section className="h-screen w-full bg-vlanc-bg relative overflow-hidden px-[120px]">
      
        {/* MEDIA ALINEADA AL MARGEN: 735x512px, superior derecha (right-120px) */}
        <div className="absolute top-0 right-[120px] w-[735px] h-[512px] z-10 overflow-hidden">
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

        {/* TÍTULO DE SECCIÓN: 140px top, margen 120px (dentro del padding del section) */}
        <div className="absolute top-[140px] left-[120px] z-20">
            <AnimatedSection>
                <h2 className="subtitulo1 mb-4 tracking-tighter text-vlanc-black">
                    {data?.title || "qué vamos a hacer por ti."}
                </h2>
                <div className="w-20 h-[3px] bg-vlanc-primary"></div>
            </AnimatedSection>
        </div>
        
        {/* CONTENEDOR DE TEXTO EN DOS COLUMNAS
            - mt-[297px]: Alineado con el inicio del grid de Team
            - gap-[60px]: Espacio entre columnas
        */}
        <div className="flex w-full mt-[297px] h-full pb-[120px] gap-[60px]">
            
            {/* COLUMNA IZQUIERDA: Información Técnica
                - flex-1: Toma el espacio restante hasta la columna de la foto
            */}
            <div className="flex-1 flex flex-col justify-start">
                <AnimatedSection>
                    <h3 className="subtitulo2 mb-8">{data?.intervention?.title}</h3>
                    
                    <div className="space-y-6 cuerpo text-left">
                        <p><strong className="text-vlanc-primary font-bold uppercase tracking-widest">LOCALIZACIÓN:</strong> {data?.intervention?.location}</p>
                        <p><strong className="text-vlanc-primary font-bold uppercase tracking-widest">TIPO DE PROYECTO:</strong> {data?.intervention?.projectType}</p>
                        <p><strong className="text-vlanc-primary font-bold uppercase tracking-widest">ÁMBITO DE INTERVENCIÓN:</strong> {data?.intervention?.scope}</p>
                        
                        <div className="pt-4 border-t border-vlanc-primary/10">
                             <p><strong className="text-vlanc-primary font-bold uppercase tracking-widest">PROGRAMA:</strong></p>
                             <div 
                                className="mt-2 text-justify"
                                dangerouslySetInnerHTML={{ __html: data?.intervention?.program || '' }}
                             />
                        </div>
                    </div>
                </AnimatedSection>
            </div>

            {/* COLUMNA DERECHA: Desglose (Breakdown)
                - w-[735px]: Coincide exactamente con el ancho de la foto superior
                - Alineada al margen derecho por el flujo del flex y el padding del padre
            */}
            <div className="w-[735px] flex flex-col justify-start">
                <AnimatedSection className="h-full">
                    {/* Listado de trabajos (Breakdown) */}
                    <div className="space-y-5">
                        {breakdown.map((item, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <span className="text-vlanc-primary font-bold mt-1.5 text-[14px]">/</span>
                                <span 
                                    className="cuerpo leading-relaxed text-justify"
                                    dangerouslySetInnerHTML={{ __html: item }}
                                />
                            </div>
                        ))}
                    </div>
                    
                    {/* Nota de pie de sección */}
                    {data?.intervention?.note && (
                        <div className="mt-auto pt-8 border-t border-vlanc-primary/10">
                            <p className="text-[10px] text-vlanc-secondary/60 italic uppercase tracking-widest leading-relaxed">
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
