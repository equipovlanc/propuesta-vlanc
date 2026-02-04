
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface ScopeProps {
    data?: {
        title?: string;
        intervention?: {
            title?: string;
            location?: string;
            projectType?: string;
            scope?: string;
            program?: string;
            breakdown?: string[];
            note?: string;
        };
        images?: string[];
    }
}

const Scope: React.FC<ScopeProps> = ({ data }) => {
  return (
    <section className="min-h-screen py-32 px-12 md:px-24 bg-vlanc-bg flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <AnimatedSection>
            <h2 className="title-xl text-vlanc-secondary mb-4 font-bold tracking-tighter">
                {data?.title || "qué vamos a hacer por ti."}
            </h2>
            <div className="w-16 h-[2px] bg-vlanc-primary mb-20"></div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-8 space-y-10">
                <AnimatedSection>
                    <h3 className="subtitle-md text-vlanc-primary font-bold mb-8 italic">/ {data?.intervention?.title}</h3>
                    <div className="space-y-4 text-vlanc-black/80 text-[12px]">
                        <p><strong className="text-vlanc-secondary">LOCALIZACIÓN:</strong> {data?.intervention?.location}</p>
                        <p><strong className="text-vlanc-secondary">TIPO DE PROYECTO:</strong> {data?.intervention?.projectType}</p>
                        <p><strong className="text-vlanc-secondary">ÁMBITO DE INTERVENCIÓN:</strong> {data?.intervention?.scope}</p>
                        <div 
                            className="pt-4 font-medium leading-relaxed whitespace-pre-line text-justify"
                            dangerouslySetInnerHTML={{ __html: data?.intervention?.program || '' }}
                        />
                    </div>
                    
                    <div className="mt-10 space-y-4 text-vlanc-black/70 text-[12px]">
                        {(data?.intervention?.breakdown ?? []).map((item, i) => (
                            <div key={i} className="flex gap-4">
                                <span className="text-vlanc-primary font-bold">/</span>
                                <span 
                                    className="leading-relaxed text-justify"
                                    dangerouslySetInnerHTML={{ __html: item }}
                                />
                            </div>
                        ))}
                    </div>
                    
                    {data?.intervention?.note && (
                        <p className="mt-12 text-[10px] text-vlanc-black/40 italic uppercase tracking-widest">{data?.intervention?.note}</p>
                    )}
                </AnimatedSection>
            </div>
            
            <div className="lg:col-span-4">
                <AnimatedSection>
                    <div className="space-y-8">
                        {data?.images?.map((img, i) => (
                            <img key={i} src={img} alt={`Scope ${i}`} className="w-full grayscale brightness-95 shadow-lg rounded-sm" />
                        ))}
                    </div>
                </AnimatedSection>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Scope;
