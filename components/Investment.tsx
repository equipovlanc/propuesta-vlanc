
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
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-vlanc-secondary" fill="none" stroke="currentColor" strokeWidth="4">
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Investment: React.FC<InvestmentProps> = ({ data }) => {
    
    const getRowBg = (color?: string) => {
        if (color === 'light') return 'bg-[#eae0d5]';
        if (color === 'medium') return 'bg-[#dccbc1]'; 
        if (color === 'dark') return 'bg-[#cbb6aa]';
        return 'border-b border-vlanc-primary/10';
    };

    return (
        <section className="h-full w-full bg-vlanc-bg flex flex-col justify-start pt-[150px] pb-[140px] px-[120px]">
            <AnimatedSection className="mb-4">
                <h2 className="subtitulo1 tracking-tighter">
                   {data?.title || "la inversión."}
                </h2>
                {/* Barra decorativa actualizada. CAMBIO: mt-[50px] -> mt-[40px] */}
                <div className="w-[112px] h-[5px] bg-[#703622] mt-[40px] mb-8"></div>
            </AnimatedSection>

            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-start h-full overflow-hidden">
                <div className="lg:col-span-4 space-y-8 overflow-y-auto max-h-full no-scrollbar pr-4">
                    <AnimatedSection>
                        <div 
                            className="cuerpo mb-8" 
                            dangerouslySetInnerHTML={{ __html: data?.introduction || '' }} 
                        />
                        
                        <div className="space-y-6">
                            {(data?.plansDescription ?? []).map((p, i) => (
                                <div key={i} className="space-y-1">
                                    <p className="text-[12px] font-bold text-vlanc-black tracking-widest uppercase">{p.name}_</p>
                                    {/* CAMBIO: leading-relaxed -> leading-[1.4] */}
                                    <p className="text-[11px] text-vlanc-secondary leading-[1.4] text-left font-sans whitespace-pre-line">{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>

                <div className="lg:col-span-8 h-full flex flex-col">
                    <AnimatedSection className="w-full">
                        <div className="grid grid-cols-[3fr_repeat(3,1fr)] bg-[#cbb6aa] rounded-t-sm">
                            <div className="p-3"></div>
                            {(data?.tableHeaders ?? []).map((h, i) => (
                                <div key={i} className="p-3 text-center text-[10px] font-bold tracking-widest text-vlanc-secondary uppercase">{h}</div>
                            ))}
                        </div>
                        
                        <div className="bg-transparent text-[10px]">
                            {(data?.tableRows ?? []).map((row, i) => {
                                if (row.isPremiumSeparator) {
                                    return (
                                        <div key={i} className="grid grid-cols-[3fr_repeat(3,1fr)] bg-[#e6ded6] py-2 border-b border-vlanc-primary/10">
                                            <div className="px-4 py-1 font-bold uppercase tracking-widest text-vlanc-secondary text-right pr-4 italic col-span-4">
                                                SERVICIOS PREMIUM
                                            </div>
                                        </div>
                                    );
                                }
                                
                                return (
                                    <div key={i} className={`grid grid-cols-[3fr_repeat(3,1fr)] ${getRowBg(row.highlightColor)} items-center`}>
                                        <div className="py-2 px-4 font-bold text-vlanc-secondary uppercase tracking-widest leading-tight">
                                            {row.label}
                                        </div>
                                        {(row.checks ?? []).map((isChecked, idx) => (
                                            <div key={idx} className="py-2 flex justify-center items-center">
                                                {isChecked && <CheckIcon />}
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="grid grid-cols-[3fr_repeat(3,1fr)] bg-[#8f4933] text-white mt-auto">
                            <div className="p-4"></div>
                            {(data?.prices ?? []).map((price, i) => (
                                <div key={i} className="p-4 text-center flex flex-col justify-center border-l border-white/20">
                                    <p className="text-[14px] font-serif font-bold tracking-tight whitespace-nowrap">{price}</p>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                    
                    <div className="mt-4 flex justify-between items-center text-[9px] font-bold tracking-widest uppercase text-vlanc-black/40">
                        <span>VIVE VLANC SL</span>
                        <span className="text-right">ACEPTA PRESUPUESTO_FIRMA<br/>En Alcoi a XX de mes de 2025</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Investment;
