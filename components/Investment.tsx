
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface Plan {
    name?: string;
    price?: string;
    features?: boolean[];
}

interface InvestmentProps {
    data?: {
        title?: string;
        introduction?: string;
        plansDescription?: { name?: string; desc?: string }[];
        plans?: Plan[];
        featureLabels?: string[];
    }
}

const CheckIcon = () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-vlanc-primary" fill="none" stroke="currentColor" strokeWidth="4">
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Investment: React.FC<InvestmentProps> = ({ data }) => {
    return (
        <section className="min-h-screen py-16 px-12 md:px-24 bg-vlanc-bg flex flex-col justify-center">
            {/* Título Principal */}
            <AnimatedSection className="mb-8">
                <h2 className="subtitle-pdf text-vlanc-black mb-4 font-normal tracking-tighter lowercase">
                   {data?.title || "la inversión."}
                </h2>
                <div className="w-20 h-[2px] bg-vlanc-primary mb-8"></div>
            </AnimatedSection>

            <div className="max-w-full w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start h-full">
                {/* Columna Izquierda: Descripción */}
                <div className="lg:col-span-4 space-y-8">
                    <AnimatedSection>
                        <div className="text-[12px] text-vlanc-secondary leading-relaxed text-justify mb-8" dangerouslySetInnerHTML={{ __html: data?.introduction || '' }} />
                        
                        <div className="space-y-8">
                            {(data?.plansDescription ?? []).map((p, i) => (
                                <div key={i} className="space-y-2">
                                    <p className="text-[12px] font-bold text-vlanc-black uppercase tracking-widest">{p.name}_</p>
                                    <p className="text-[11px] text-vlanc-secondary leading-relaxed text-justify">{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>

                {/* Columna Derecha: Tabla Compacta */}
                <div className="lg:col-span-8">
                    <AnimatedSection className="bg-white/40 border border-vlanc-primary/10 overflow-hidden shadow-sm">
                        {/* Headers Tabla */}
                        <div className="grid grid-cols-[1.5fr_repeat(3,1fr)] border-b border-vlanc-primary/10">
                            <div className="p-3"></div>
                            {(data?.plans ?? []).map((p, i) => (
                                <div key={i} className="p-3 text-center text-[10px] font-bold uppercase tracking-widest text-vlanc-black/60">{p.name}</div>
                            ))}
                        </div>
                        
                        {/* Filas Features (Padding reducido para caber en pantalla) */}
                        <div className="divide-y divide-vlanc-primary/5">
                            {(data?.featureLabels ?? []).map((label, fIdx) => (
                                <div key={fIdx} className="grid grid-cols-[1.5fr_repeat(3,1fr)] hover:bg-vlanc-primary/5 transition-colors">
                                    <div className="py-2.5 px-4 text-[9px] font-bold text-vlanc-black/70 uppercase tracking-widest flex items-center">{label}</div>
                                    {(data?.plans ?? []).map((p, pIdx) => (
                                        <div key={pIdx} className="py-2.5 px-2 flex justify-center items-center border-l border-vlanc-primary/5">
                                            {p.features?.[fIdx] && <CheckIcon />}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* Franja Precios Marrón */}
                        <div className="grid grid-cols-[1.5fr_repeat(3,1fr)] bg-vlanc-primary/90 text-white border-t border-vlanc-primary/20">
                            <div className="p-4 flex items-center text-[9px] uppercase tracking-widest opacity-80">Servicios Premium</div>
                            {(data?.plans ?? []).map((p, i) => (
                                <div key={i} className="p-4 text-center flex flex-col justify-center border-l border-white/10">
                                    <p className="text-[14px] font-serif font-bold tracking-tight">{p.price} € <span className="text-[8px] opacity-60">+ IVA</span></p>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                    
                    <div className="mt-8 flex justify-between items-center text-[9px] font-bold tracking-widest uppercase text-vlanc-black/40">
                        <span>VIVE VLANC SL</span>
                        <span>ACEPTA PRESUPUESTO_FIRMA</span>
                        <span>En Alcoi a XX de mes de 2025</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Investment;
