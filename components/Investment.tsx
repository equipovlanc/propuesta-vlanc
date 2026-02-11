
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
        highlightPhrase?: string;
        introduction2?: string;
        locationDate?: string;
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
        <section className="h-full w-full bg-vlanc-bg flex flex-col justify-start pt-[150px] pb-[140px] px-[120px] relative">
            {/* Cabecera Sección */}
            <AnimatedSection className="mb-8 shrink-0">
                <h2 className="subtitulo1">
                   {data?.title || "la inversión."}
                </h2>
                {/* Barra decorativa */}
                <div className="w-[112px] h-[5px] bg-[#703622] mt-[40px]"></div>
            </AnimatedSection>

            {/* Contenedor Principal: Flex para control exacto del layout */}
            <div className="w-full flex flex-row gap-[160px] items-start h-full relative">
                
                {/* COLUMNA IZQUIERDA: Textos y Descripciones (Fluida) */}
                <div className="flex-1 space-y-8 overflow-y-auto max-h-full no-scrollbar pr-4">
                    <AnimatedSection>
                        {/* Introducción Parte 1 (Clase CUERPO, respeta HTML) */}
                        <div 
                            className="cuerpo whitespace-pre-line" 
                            dangerouslySetInnerHTML={{ __html: data?.introduction || '' }} 
                        />
                        
                        {/* Frase Destacada: Negrita, Negro, cuerpo2, con margen vertical */}
                        {data?.highlightPhrase && (
                             <p className="cuerpo2 font-bold text-vlanc-black my-6">
                                {data.highlightPhrase}
                             </p>
                        )}
                        
                        {/* Introducción Parte 2 (Clase CUERPO, respeta HTML) */}
                        <div 
                            className="cuerpo mb-8 whitespace-pre-line" 
                            dangerouslySetInnerHTML={{ __html: data?.introduction2 || '' }} 
                        />
                        
                        {/* Descripción de Planes */}
                        <div className="space-y-6">
                            {(data?.plansDescription ?? []).map((p, i) => (
                                <div key={i} className="space-y-1">
                                    <p className="text-[12px] font-bold text-vlanc-black tracking-widest uppercase">{p.name}_</p>
                                    <p className="text-[11px] text-vlanc-secondary leading-[1.4] text-left font-sans whitespace-pre-line">{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>

                {/* COLUMNA DERECHA: Tabla (Ancho y Alto Fijos) */}
                <div className="shrink-0 flex flex-col items-end">
                    <AnimatedSection className="w-[720px] h-[532px] flex flex-col">
                        
                        {/* Cabecera Tabla (Clase TABLA1) */}
                        <div className="grid grid-cols-[3fr_repeat(3,1fr)] bg-[#cbb6aa] rounded-t-sm shrink-0">
                            <div className="p-3"></div>
                            {(data?.tableHeaders ?? []).map((h, i) => (
                                <div key={i} className="p-3 text-center flex items-center justify-center">
                                    <span className="tabla1">{h}</span>
                                </div>
                            ))}
                        </div>
                        
                        {/* Cuerpo Tabla: Flex Grow (Clase TABLA2) */}
                        <div className="flex-grow flex flex-col bg-transparent">
                            {(data?.tableRows ?? []).map((row, i) => {
                                const rowClass = "flex-grow grid grid-cols-[3fr_repeat(3,1fr)] items-center";

                                if (row.isPremiumSeparator) {
                                    return (
                                        <div key={i} className={`${rowClass} bg-[#e6ded6] border-b border-vlanc-primary/10`}>
                                            <div className="px-4 text-right pr-4 col-span-4">
                                                <span className="tabla2 italic">SERVICIOS PREMIUM</span>
                                            </div>
                                        </div>
                                    );
                                }
                                
                                return (
                                    <div key={i} className={`${rowClass} ${getRowBg(row.highlightColor)}`}>
                                        <div className="px-4 leading-tight">
                                            <span className="tabla2">{row.label}</span>
                                        </div>
                                        {(row.checks ?? []).map((isChecked, idx) => (
                                            <div key={idx} className="flex justify-center items-center">
                                                {isChecked && <CheckIcon />}
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Pie Tabla: Precios (Clase TABLA3) */}
                        <div className="grid grid-cols-[3fr_repeat(3,1fr)] bg-[#8f4933] text-white shrink-0">
                            <div className="p-4"></div>
                            {(data?.prices ?? []).map((price, i) => (
                                <div key={i} className="p-4 text-center flex flex-col justify-center border-l border-white/20">
                                    <span className="tabla3 whitespace-nowrap">{price}</span>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </div>

            {/* FIRMA Y FECHA (Posicionamiento Absoluto en margen inferior) 
                - Bottom: 70px (Punto medio del margen de 140px)
                - Right: 120px (Alineado con margen derecho y tabla)
                - Width: 720px (Ancho de tabla)
            */}
            <div className="absolute bottom-[70px] right-[120px] w-[720px] flex justify-between items-center z-20 pointer-events-none translate-y-1/2">
                <span className="tabla1 opacity-40">VIVE VLANC SL</span>
                <div className="text-right">
                    <p className="tabla1 opacity-40 mb-1">ACEPTA PRESUPUESTO_FIRMA</p>
                    {/* Fecha en CUERPO, ajustado visualmente para encajar en bloque de firma */}
                    <p className="cuerpo font-bold text-[10px] text-vlanc-secondary opacity-60">
                        {data?.locationDate || "En Alcoi a XX de mes de 2025"}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Investment;
