
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
  return (
    <section className="min-h-screen py-32 px-12 md:px-24 bg-vlanc-bg flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <AnimatedSection>
            {/* Subtítulo 1 */}
            <h2 className="subtitle-pdf text-vlanc-black mb-4 font-normal tracking-tighter lowercase">
                {data?.title || "qué vamos a hacer por ti."}
            </h2>
            <div className="w-20 h-[2px] bg-vlanc-primary mb-16"></div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-8 space-y-10">
                <AnimatedSection>
                    {/* Subtítulo 2 */}
                    <h3 className="text-[24px] font-serif italic text-vlanc-black mb-8">{data?.intervention?.title}</h3>
                    
                    {/* Cuerpo Marrón */}
                    <div className="space-y-4 text-vlanc-secondary text-[12px]">
                        <p><strong className="text-vlanc-secondary font-bold uppercase">LOCALIZACIÓN:</strong> {data?.intervention?.location}</p>
                        <p><strong className="text-vlanc-secondary font-bold uppercase">TIPO DE PROYECTO:</strong> {data?.intervention?.projectType}</p>
                        <p><strong className="text-vlanc-secondary font-bold uppercase">ÁMBITO DE INTERVENCIÓN:</strong> {data?.intervention?.scope}</p>
                        <div 
                            className="pt-4 font-medium leading-relaxed whitespace-pre-line text-justify"
                            dangerouslySetInnerHTML={{ __html: data?.intervention?.program || '' }}
                        />
                    </div>
                    
                    <div className="mt-10 space-y-4 text-vlanc-secondary text-[12px]">
                        {(data?.intervention?.breakdown ?? []).map((item, i) => (
                            <div key={i} className="flex gap-4">
                                <span className="text-vlanc-black font-bold">·</span>
                                <span 
                                    className="leading-relaxed text-justify"
                                    dangerouslySetInnerHTML={{ __html: item }}
                                />
                            </div>
                        ))}
                    </div>
                    
                    {data?.intervention?.note && (
                        <p className="mt-12 text-[10px] text-vlanc-secondary/60 italic uppercase tracking-widest">{data?.intervention?.note}</p>
                    )}
                </AnimatedSection>
            </div>
            
            {/* Columna Derecha: Video o Imagen Vertical */}
            <div className="lg:col-span-4 h-[600px] lg:h-auto self-stretch">
                <AnimatedSection className="h-full w-full">
                    <div className="h-full w-full overflow-hidden rounded-sm shadow-lg">
                        {data?.video ? (
                             <video src={data.video} autoPlay loop muted playsInline className="w-full h-full object-cover grayscale" />
                        ) : data?.image ? (
                            <img src={data.image} alt="Scope" className="w-full h-full object-cover grayscale brightness-95" />
                        ) : (
                             <div className="w-full h-full bg-vlanc-secondary/10 flex items-center justify-center text-xs">Media</div>
                        )}
                    </div>
                </AnimatedSection>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Scope;
