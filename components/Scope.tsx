
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
    <section className="h-full w-full bg-vlanc-bg flex flex-col justify-center px-10 py-16">
      
        <AnimatedSection className="mb-12">
            <h2 className="subtitulo1 mb-4 tracking-tighter">
                {data?.title || "qué vamos a hacer por ti."}
            </h2>
            <div className="w-20 h-[2px] bg-vlanc-primary"></div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start h-full overflow-hidden">
            <div className="lg:col-span-7 h-full overflow-y-auto no-scrollbar pr-4">
                <AnimatedSection>
                    {/* Subtitulo 2 Italic */}
                    <h3 className="subtitulo2 mb-8">{data?.intervention?.title}</h3>
                    
                    <div className="space-y-6 cuerpo">
                        <p><strong className="text-vlanc-primary font-bold uppercase tracking-widest">LOCALIZACIÓN:</strong> {data?.intervention?.location}</p>
                        <p><strong className="text-vlanc-primary font-bold uppercase tracking-widest">TIPO DE PROYECTO:</strong> {data?.intervention?.projectType}</p>
                        <p><strong className="text-vlanc-primary font-bold uppercase tracking-widest">ÁMBITO DE INTERVENCIÓN:</strong> {data?.intervention?.scope}</p>
                        
                        <div className="pt-4 border-t border-vlanc-primary/10">
                             <p><strong className="text-vlanc-primary font-bold uppercase tracking-widest">PROGRAMA:</strong></p>
                             <div 
                                className="mt-2"
                                dangerouslySetInnerHTML={{ __html: data?.intervention?.program || '' }}
                             />
                        </div>
                    </div>
                    
                    <div className="mt-8 space-y-4 cuerpo">
                        {(data?.intervention?.breakdown ?? []).map((item, i) => (
                            <div key={i} className="flex gap-4">
                                <span className="text-vlanc-black font-bold">·</span>
                                <span 
                                    className="leading-relaxed text-justify [&>strong]:font-bold [&>strong]:text-vlanc-black"
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
            
            <div className="lg:col-span-5 h-[60%] lg:h-full relative overflow-hidden rounded-sm">
                <AnimatedSection className="h-full w-full">
                    {data?.video ? (
                         <video src={data.video} autoPlay loop muted playsInline className="w-full h-full object-cover grayscale" />
                    ) : data?.image ? (
                        <img src={data.image} alt="Scope" className="w-full h-full object-cover grayscale brightness-95" />
                    ) : (
                         <div className="w-full h-full bg-vlanc-secondary/10 flex items-center justify-center text-xs">Media</div>
                    )}
                    <div className="absolute top-10 right-10 text-right mix-blend-difference text-white/50">
                        <p className="text-[40px] font-serif italic">VIDEO O FOTO?</p>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    </section>
  );
};

export default Scope;
