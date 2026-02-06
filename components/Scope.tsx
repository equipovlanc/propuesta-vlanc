
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
  // Dividimos el breakdown en dos para simular el flujo entre columnas
  const breakdown = data?.intervention?.breakdown ?? [];
  const midIndex = Math.ceil(breakdown.length / 2);
  const breakdownCol1 = breakdown.slice(0, 1); // Solo el primero o pocos en la col 1 para dar aire
  const breakdownCol2 = breakdown.slice(1);    // El resto a la col 2 bajo la foto

  return (
    <section className="h-screen w-full bg-vlanc-bg relative overflow-hidden">
      
        {/* MEDIA A SANGRE: 735x512px, superior derecha */}
        <div className="absolute top-0 right-0 w-[735px] h-[512px] z-10 overflow-hidden">
            <AnimatedSection className="h-full w-full">
                {data?.video ? (
                        <video src={data.video} autoPlay loop muted playsInline className="w-full h-full object-cover grayscale brightness-90" />
                ) : data?.image ? (
                    <img src={data.image} alt="Scope" className="w-full h-full object-cover grayscale brightness-95" />
                ) : (
                        <div className="w-full h-full bg-vlanc-secondary/10 flex items-center justify-center text-[10px] uppercase tracking-widest text-vlanc-secondary/30 font-bold">
                            Media 735x512
                        </div>
                )}
            </AnimatedSection>
        </div>

        {/* TÍTULO DE SECCIÓN: 140px top, 120px left */}
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
            - pb-[120px]: Margen inferior de seguridad
        */}
        <div className="flex w-full mt-[297px] h-full pb-[120px]">
            
            {/* COLUMNA IZQUIERDA: Alineada al margen 120px
                - pr-[60px]: Separación con la columna derecha
            */}
            <div className="flex-1 ml-[120px] pr-[60px] flex flex-col justify-start">
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

                    {/* Inicio del breakdown en Col 1 si es necesario */}
                    <div className="mt-8 space-y-4">
                        {breakdownCol1.map((item, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <span className="text-vlanc-black font-bold mt-1">·</span>
                                <span 
                                    className="cuerpo leading-relaxed text-justify"
                                    dangerouslySetInnerHTML={{ __html: item }}
                                />
                            </div>
                        ))}
                    </div>
                </AnimatedSection>
            </div>

            {/* COLUMNA DERECHA: Ancho 735px (Igual que la foto)
                - pr-[120px]: Margen derecho estándar para el texto
            */}
            <div className="w-[735px] pr-[120px] flex flex-col justify-start">
                <AnimatedSection className="h-full">
                    {/* Continuación del breakdown en Col 2 */}
                    <div className="space-y-4">
                        {breakdownCol2.map((item, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <span className="text-vlanc-black font-bold mt-1">·</span>
                                <span 
                                    className="cuerpo leading-relaxed text-justify"
                                    dangerouslySetInnerHTML={{ __html: item }}
                                />
                            </div>
                        ))}
                    </div>
                    
                    {/* Nota y Cierre */}
                    {data?.intervention?.note && (
                        <div className="mt-12 pt-6 border-t border-vlanc-primary/10">
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
