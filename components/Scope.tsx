
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

  // Lógica de medición dinámica para el flujo de texto
  useLayoutEffect(() => {
    const handleResize = () => {
      if (!leftColRef.current) return;

      const viewportHeight = window.innerHeight;
      const marginBottom = 120; // Margen inferior de seguridad según diseño
      const limit = viewportHeight - marginBottom;

      let firstOverflowIndex = breakdown.length;

      // Iteramos sobre los elementos del listado para ver cuál desborda
      for (let i = 0; i < itemsRef.current.length; i++) {
        const item = itemsRef.current[i];
        if (item) {
          const rect = item.getBoundingClientRect();
          // Si la parte inferior del ítem supera el límite de seguridad
          if (rect.bottom > limit) {
            firstOverflowIndex = i;
            break;
          }
        }
      }
      setSplitIndex(firstOverflowIndex);
    };

    // Timeout para esperar al renderizado de fuentes y estilos
    const timeout = setTimeout(handleResize, 150);
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [breakdown, data?.intervention?.program]);

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
        
        {/* CONTENEDOR DE TEXTO FLUIDO
            - mt-[297px]: Alineación con el grid de Team
        */}
        <div className="flex w-full mt-[297px] h-full gap-[60px]">
            
            {/* COLUMNA IZQUIERDA: Bloque Principal (Info + Programa + Inicio Breakdown)
                - flex-1: Toma el espacio dinámico hasta la columna de la foto
            */}
            <div ref={leftColRef} className="flex-1 flex flex-col justify-start">
                <AnimatedSection>
                    <h3 className="subtitulo2 mb-8">{data?.intervention?.title}</h3>
                    
                    {/* Datos técnicos (siempre en col 1) */}
                    <div className="space-y-4 cuerpo text-left mb-6">
                        <p><strong className="text-vlanc-primary font-bold uppercase tracking-[0.15em] text-[10px]">LOCALIZACIÓN:</strong> {data?.intervention?.location}</p>
                        <p><strong className="text-vlanc-primary font-bold uppercase tracking-[0.15em] text-[10px]">TIPO DE PROYECTO:</strong> {data?.intervention?.projectType}</p>
                        <p><strong className="text-vlanc-primary font-bold uppercase tracking-[0.15em] text-[10px]">ÁMBITO DE INTERVENCIÓN:</strong> {data?.intervention?.scope}</p>
                    </div>

                    {/* BLOQUE CONTINUO: Programa + Breakdown */}
                    <div className="pt-6 border-t border-vlanc-primary/10">
                        <p className="mb-4"><strong className="text-vlanc-primary font-bold uppercase tracking-[0.15em] text-[10px]">PROGRAMA Y TRABAJOS:</strong></p>
                        
                        {/* El texto de Program precede inmediatamente al listado */}
                        <div 
                            className="cuerpo text-justify mb-6"
                            dangerouslySetInnerHTML={{ __html: data?.intervention?.program || '' }}
                        />

                        {/* Listado de items (Breakdown) - Se ocultan los que sobran por el índice calculado */}
                        <div className="space-y-4">
                            {breakdown.map((item, i) => (
                                <div 
                                    key={i} 
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
                    </div>
                </AnimatedSection>
            </div>

            {/* COLUMNA DERECHA: Salto de contenido bajo la imagen
                - w-[735px]: Ancho exacto de la imagen superior
                - pt-12: Separación visual de la media
                - marginTop: 215px (Calculado: Media 512px - Contenedor top 297px)
            */}
            <div className="w-[735px] flex flex-col justify-start pt-12" style={{ marginTop: '215px' }}>
                <AnimatedSection className="h-full flex flex-col">
                    {/* Resto del Breakdown que no cupo en la izquierda */}
                    <div className="space-y-4">
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
                    
                    {/* Nota de pie (se empuja al final de la columna derecha) */}
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
