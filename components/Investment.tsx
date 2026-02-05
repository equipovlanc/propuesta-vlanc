
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
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-vlanc-primary" fill="none" stroke="currentColor" strokeWidth="4">
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Investment: React.FC<InvestmentProps> = ({ data }) => {
    return (
        <section className="min-h-screen py-32 px-12 md:px-24 bg-vlanc-bg flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-20">
                <div className="lg:col-span-5 space-y-12">
                    <AnimatedSection>
                        <h2 className="subtitle-pdf text-vlanc-secondary font-bold lowercase mb-4">{data?.title || "la inversión."}</h2>
                        <div className="w-16 h-[2px] bg-vlanc-primary mb-12"></div>
                        <div className="text-[12px] text-vlanc-black/70 leading-relaxed text-justify mb-16" dangerouslySetInnerHTML={{ __html: data?.introduction || '' }} />
                        
                        <div className="space-y-12">
                            {(data?.plansDescription ?? []).map((p, i) => (
                                <div key={i} className="space-y-3">
                                    <p className="text-[14px] font-bold text-vlanc-black uppercase tracking-widest">{p.name}_</p>
                                    <p className="text-[12px] text-vlanc-black/60 leading-relaxed text-justify">{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>

                <div className="lg:col-span-7 pt-12">
                    <AnimatedSection className="bg-white/40 border border-vlanc-primary/10 overflow-hidden shadow-sm">
                        {/* Headers Tabla */}
                        <div className="grid grid-cols-[2fr_repeat(3,1fr)] border-b border-vlanc-primary/10">
                            <div className="p-6"></div>
                            {(data?.plans ?? []).map((p, i) => (
                                <div key={i} className="p-6 text-center text-[11px] font-bold uppercase tracking-widest text-vlanc-black/60">{p.name}</div>
                            ))}
                        </div>
                        
                        {/* Filas Features */}
                        <div className="divide-y divide-vlanc-primary/5">
                            {(data?.featureLabels ?? []).map((label, fIdx) => (
                                <div key={fIdx} className="grid grid-cols-[2fr_repeat(3,1fr)] hover:bg-vlanc-primary/5 transition-colors">
                                    <div className="p-5 pl-10 text-[10px] font-bold text-vlanc-black/70 uppercase tracking-widest flex items-center">{label}</div>
                                    {(data?.plans ?? []).map((p, pIdx) => (
                                        <div key={pIdx} className="p-5 flex justify-center items-center border-l border-vlanc-primary/5">
                                            {p.features?.[fIdx] && <CheckIcon />}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* Franja Precios Marrón (P14 inferior) */}
                        <div className="grid grid-cols-[2fr_repeat(3,1fr)] bg-vlanc-primary/90 text-white border-t border-vlanc-primary/20">
                            <div className="p-6"></div>
                            {(data?.plans ?? []).map((p, i) => (
                                <div key={i} className="p-8 text-center flex flex-col justify-center border-l border-white/10">
                                    <p className="text-[18px] font-serif font-bold tracking-tight">{p.price} € <span className="text-[8px] opacity-60">+ IVA</span></p>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                    
                    <div className="mt-12 flex justify-between items-center text-[10px] font-bold tracking-widest uppercase text-vlanc-black/40">
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
