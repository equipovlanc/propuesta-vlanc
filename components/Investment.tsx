
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

    // Función auxiliar para procesar texto de Sanity
    const formatText = (text?: string) => {
        if (!text) return '';
        return text.replace(/\n/g, '<br />');
    };

    return (
        <section className="h-full w-full bg-vlanc-bg flex flex-col justify-start pt-[150px] pb-[140px] px-[120px] relative">
            {/* Cabecera Sección */}
            <AnimatedSection className="mb-8 shrink-0">
                <h2 className="subtitulo1">
                   {data?.title || "la inversión."}
                </h2>
                {/* Barra decorativa (Color actualizado #8f4933) */}
                <div className="w-[112px] h-[5px] bg-[#8f4933] mt-[40px]"></div>
            </AnimatedSection>

            {/* Contenedor Principal */}
            <div className="w-full flex flex-row gap-[160px] items-start h-full relative">
                
                {/* COLUMNA IZQUIERDA: Textos y Descripciones */}
                <div className="flex-1 space-y-6 overflow-y-auto max-h-full no-scrollbar pr-4">
                    <AnimatedSection className="space-y-6">
                        {/* Introducción Parte 1 */}
                        <div 
                            className="cuerpo [&>strong]:font-bold" 
                            dangerouslySetInnerHTML={{ __html: formatText(data?.introduction) }} 
                        />
                        
                        {/* Frase Destacada */}
                        {data?.highlightPhrase && (
                             <p className="cuerpo2 font-bold text-vlanc-black">
                                {data.highlightPhrase}
                             </p>
                        )}
                        
                        {/* Introducción Parte 2 */}
                        <div 
                            className="cuerpo [&>strong]:font-bold" 
                            dangerouslySetInnerHTML={{ __html: formatText(data?.introduction2) }} 
                        />
                        
                        {/* Descripción de Planes */}
                        <div className="space-y-6">
                            {(data?.plansDescription ?? []).map((p, i) => (
                                <div key={i} className="space-y-2">
                                    {/* Nombre del plan */}
                                    <h3 className="font-sans font-bold text-[15px] text-vlanc-black uppercase leading-tight">{p.name}_</h3>
                                    
                                    {/* Descripción */}
                                    <div 
                                        className="cuerpo [&>strong]:font-bold"
                                        dangerouslySetInnerHTML={{ __html: formatText(p.desc) }}
                                    />
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>

                {/* COLUMNA DERECHA: Tabla y Firmas */}
                <div className="shrink-0 flex flex-col items-end">
                    {/* Contenedor Tabla */}
                    <AnimatedSection className="w-[720px] h-[532px] flex flex-col">
                        
                        {/* Cabecera Tabla */}
                        <div className="grid grid-cols-[3fr_repeat(3,1fr)] bg-[#cbb6aa] rounded-t-sm shrink-0 h-[47px]">
                            <div className="p-3"></div>
                            {(data?.tableHeaders ?? []).map((h, i) => (
                                <div key={i} className="px-3 text-center flex items-center justify-center h-full">
                                    <span className="tabla1">{h}</span>
                                </div>
                            ))}
                        </div>
                        
                        {/* Cuerpo Tabla */}
                        <div className="flex-grow flex flex-col bg-transparent">
                            {(data?.tableRows ?? []).map((row, i) => {
                                const gridClass = "grid grid-cols-[3fr_repeat(3,1fr)] items-center";

                                if (row.isPremiumSeparator) {
                                    return (
                                        <div key={i} className={`${gridClass} h-[31px] shrink-0 bg-[#e6ded6] border-b border-vlanc-primary/10`}>
                                            <div className="px-4 text-right pr-4 col-span-4 h-full flex items-center justify-end">
                                                <span className="tabla2 italic font-bold">SERVICIOS PREMIUM</span>
                                            </div>
                                        </div>
                                    );
                                }
                                
                                return (
                                    <div key={i} className={`flex-grow ${gridClass} ${getRowBg(row.highlightColor)}`}>
                                        <div className="px-4 leading-tight py-1">
                                            <span className="tabla2">{row.label}</span>
                                        </div>
                                        {(row.checks ?? []).map((isChecked, idx) => (
                                            <div key={idx} className="flex justify-center items-center h-full">
                                                {isChecked && <CheckIcon />}
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Pie Tabla: Precios - SIN BORDES para efecto continuo */}
                        <div className="grid grid-cols-[3fr_repeat(3,1fr)] bg-[#8f4933] text-white shrink-0 h-[35px]">
                            <div className="p-4"></div>
                            {(data?.prices ?? []).map((price, i) => (
                                <div key={i} className="px-4 text-center flex flex-col justify-center h-full">
                                    <span className="tabla3 whitespace-nowrap">{price}</span>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>

                    {/* FIRMA */}
                    <div className="w-[720px] flex flex-col border-t border-[#702622] mt-[25px] pt-1">
                        <div className="flex justify-between items-start">
                            <span className="tabla1">VIVE VLANC SL</span>
                            <span className="tabla1 text-right">ACEPTA PRESUPUESTO_FIRMA</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* FECHA */}
            <div className="absolute bottom-[70px] right-[120px] translate-y-1/2 z-20">
                <p className="cuerpo font-bold text-right">
                    {data?.locationDate || "En Alcoi a XX de mes de 2025"}
                </p>
            </div>
        </section>
    );
};

export default Investment;
