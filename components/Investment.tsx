
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface TableRow {
    label: string;
    isPremiumSeparator?: boolean;
    highlightColor?: 'none' | 'light' | 'medium' | 'dark';
    checks: boolean[];
}

interface InvestmentProps {
    data?: {
        title?: string;
        introduction?: string;
        plansDescription?: { name?: string; desc?: string }[];
        tableHeaders?: string[];
        tableRows?: TableRow[];
        prices?: string[];
    }
}

const CheckIcon = () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-vlanc-primary" fill="none" stroke="currentColor" strokeWidth="4">
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Investment: React.FC<InvestmentProps> = ({ data }) => {
    
    // Helper para colores de fila basados en PDF
    const getRowBg = (color?: string, isPremium?: boolean) => {
        if (isPremium) return 'bg-transparent'; // Separador
        switch (color) {
            case 'light': return 'bg-vlanc-primary/5';
            case 'medium': return 'bg-vlanc-primary/10';
            case 'dark': return 'bg-vlanc-primary/20';
            default: return 'bg-transparent';
        }
    };

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
                        <div 
                            className="text-[12px] text-vlanc-secondary leading-relaxed text-justify mb-8 [&>strong]:font-bold [&>strong]:text-vlanc-black" 
                            dangerouslySetInnerHTML={{ __html: data?.introduction || '' }} 
                        />
                        
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

                {/* Columna Derecha: Tabla Compleja */}
                <div className="lg:col-span-8">
                    <AnimatedSection className="bg-white/40 border border-vlanc-primary/10 overflow-hidden shadow-sm">
                        
                        {/* Headers Tabla */}
                        <div className="grid grid-cols-[2fr_repeat(3,1fr)] border-b border-vlanc-primary/20 bg-vlanc-primary/10">
                            <div className="p-3"></div>
                            {(data?.tableHeaders ?? []).map((h, i) => (
                                <div key={i} className="p-3 text-center text-[10px] font-bold uppercase tracking-widest text-vlanc-black">{h}</div>
                            ))}
                        </div>
                        
                        {/* Filas Dinámicas */}
                        <div className="divide-y divide-vlanc-primary/5">
                            {(data?.tableRows ?? []).map((row, i) => {
                                if (row.isPremiumSeparator) {
                                    return (
                                        <div key={i} className="grid grid-cols-[2fr_repeat(3,1fr)] bg-transparent py-4">
                                            <div className="px-4 text-[9px] font-bold uppercase tracking-widest text-vlanc-black/40 text-right pr-8 col-span-1">SERVICIOS PREMIUM</div>
                                            <div className="col-span-3"></div>
                                        </div>
                                    );
                                }
                                return (
                                    <div key={i} className={`grid grid-cols-[2fr_repeat(3,1fr)] ${getRowBg(row.highlightColor)} transition-colors`}>
                                        <div className="py-2.5 px-4 text-[10px] font-bold text-vlanc-black/70 uppercase tracking-widest flex items-center leading-tight">
                                            {row.label}
                                        </div>
                                        {(row.checks ?? []).map((isChecked, idx) => (
                                            <div key={idx} className="py-2.5 px-2 flex justify-center items-center border-l border-vlanc-primary/5">
                                                {isChecked && <CheckIcon />}
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Franja Precios Marrón (Oscuro sólido #8f4933) */}
                        <div className="grid grid-cols-[2fr_repeat(3,1fr)] bg-[#8f4933] text-white border-t border-vlanc-primary/20">
                            <div className="p-4"></div>
                            {(data?.prices ?? []).map((price, i) => (
                                <div key={i} className="p-4 text-center flex flex-col justify-center border-l border-white/10">
                                    <p className="text-[14px] font-serif font-bold tracking-tight">{price} € <span className="text-[8px] opacity-60">+ IVA</span></p>
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
