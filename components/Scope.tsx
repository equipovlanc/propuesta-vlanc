
import React, { useState, useLayoutEffect, useRef } from 'react';
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
  const [splitIndex, setSplitIndex] = useState<number>(breakdown.length);
  const leftColRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Lógica para detectar el desbordamiento y dividir el texto
  useLayoutEffect(() => {
    const handleResize = () => {
      if (!leftColRef.current) return;

      const viewportHeight = window.innerHeight;
      const marginBottom = 120; // Margen inferior de seguridad
      const limit = viewportHeight - marginBottom;

      let firstOverflowIndex = breakdown.length;

      for (let i = 0; i < itemsRef.current.length; i++) {
        const item = itemsRef.current[i];
        if (item) {
          const rect = item.getBoundingClientRect();
          // Si el borde inferior del ítem de la lista toca el margen de 120px
          if (rect.bottom > limit) {
            firstOverflowIndex = i;
            break;
          }
        }
      }
      setSplitIndex(firstOverflowIndex);
    };

    // Pequeño timeout para asegurar que las fuentes y el layout inicial se han asentado
    const timeout = setTimeout(handleResize, 100);
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [breakdown, data?.intervention?.program]);

  const breakdownCol1 = breakdown.slice(0, splitIndex);
  const breakdownCol2 = breakdown.slice(splitIndex);

  return (
    <section className="h-screen w-full bg-vlanc-bg relative overflow-hidden px-[120px]">
      
        {/* MEDIA ALINEADA AL MARGEN DERECHO: 735x512px */}
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

        {/* TÍTULO DE SECCIÓN: 140px top, margen 120px */}
        <div className="absolute top-[140px] left-[120px] z-20">
            <AnimatedSection>
                <h2 className="subtitulo1 mb-4 tracking-tighter text-vlanc-black">
                    {data?.title || "qué vamos a hacer por ti."}
                </h2>
                <div className="w-20 h-[3px] bg-vlanc-primary"></div>
            </AnimatedSection>
        </div>
        
        {/* CONTENEDOR DE TEXTO EN DOS COLUMNAS
            - El contenedor empieza a 297px (alineación con Team)
        */}
        <div className="flex w-full mt-[297px] h-full gap-[60px]">
            
            {/* COLUMNA IZQUIERDA: Información Técnica + Inicio del Breakdown
                - flex-1: Toma el espacio hasta la columna de la foto
            */}
            <div ref={leftColRef} className="flex-1 flex flex-col justify-start">
                <AnimatedSection>
                    <h3 className="subtitulo2 mb-8">{data?.intervention?.title}</h3>
                    
                    <div className="space-y-6 cuerpo text-left mb-8">
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

                    {/* Parte 1 del Breakdown que cabe en la columna 1 */}
                    <div className="space-y-5">
                        {breakdown.map((item, i) => (
                            <div 
                                key={i} 
                                // Fix: Ensure ref callback returns void to satisfy TypeScript's Ref type requirements
                                ref={el => { itemsRef.current[i] = el; }}
                                className={`flex gap-4 items-start ${i >= splitIndex ? 'hidden' : 'block'}`}
                            >
                                <span className="text-vlanc-primary font-bold mt-1.5 text-[14px]">/</span>
                                <span 
                                    className="cuerpo leading-relaxed text-justify"
                                    dangerouslySetInnerHTML={{ __html: item }}
                                />
                            </div>
                        ))}
                    </div>
                </AnimatedSection>
            </div>

            {/* COLUMNA DERECHA: Continuación del Breakdown bajo la foto
                - w-[735px]: Ancho exacto de la foto
                - mt-[215px]: Offset calculado para empezar bajo la foto (512 - 297 = 215px de diferencia desde el top del contenedor flex)
            */}
            <div className="w-[735px] flex flex-col justify-start pt-12" style={{ marginTop: '215px' }}>
                <AnimatedSection className="h-full flex flex-col">
                    {/* Parte 2 del Breakdown (lo que no cupo a la izquierda) */}
                    <div className="space-y-5">
                        {breakdownCol2.map((item, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <span className="text-vlanc-primary font-bold mt-1.5 text-[14px]">/</span>
                                <span 
                                    className="cuerpo leading-relaxed text-justify"
                                    dangerouslySetInnerHTML={{ __html: item }}
                                />
                            </div>
                        ))}
                    </div>
                    
                    {/* Nota de pie de sección - se empuja al final de la columna derecha */}
                    {data?.intervention?.note && (
                        <div className="mt-auto pb-[120px] pt-8 border-t border-vlanc-primary/10">
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
