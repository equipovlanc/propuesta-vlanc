
import React from 'react';
import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';

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
    };
    step?: number; // 0 = Intro, 1 = Plan 1, 2 = Plan 2, 3 = Plan 3
    isPrinting?: boolean;
}

const CheckIcon = () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-vlanc-secondary" fill="none" stroke="currentColor" strokeWidth="4">
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Investment: React.FC<InvestmentProps> = ({ data, step = 3, isPrinting = false }) => {
    
    const effectiveStep = isPrinting ? 3 : step;

    const getRowBg = (color?: string) => {
        if (color === 'light') return 'bg-[#eae0d5]';
        if (color === 'medium') return 'bg-[#dccbc1]'; 
        if (color === 'dark') return 'bg-[#cbb6aa]';
        return 'border-b border-vlanc-primary/10';
    };

    const formatText = (text?: string) => {
        if (!text) return '';
        return text.replace(/\n/g, '<br />');
    };

    return (
        <section className="h-full w-full flex flex-col justify-start pt-[150px] pb-[140px] px-[120px] relative">
            {/* Cabecera Sección (J1) */}
            <div className="mb-8 shrink-0">
                <AnimatedSection hierarchy={1}>
                    <h2 className="subtitulo1">
                       {data?.title || "la inversión."}
                    </h2>
                </AnimatedSection>
                <AnimatedSection mode="bar" className="w-[112px] h-[5px] bg-[#8f4933] mt-[27px]" />
            </div>

            {/* Contenedor Principal */}
            <div className="w-full flex flex-row gap-[120px] items-start h-full relative">
                
                {/* COLUMNA IZQUIERDA (Textos) */}
                <div className="flex-1 space-y-6 overflow-y-auto max-h-full no-scrollbar pr-4">
                    {/* Intro siempre visible */}
                    <AnimatedSection className="space-y-6" hierarchy={2}>
                        <div 
                            className="cuerpo [&>strong]:font-bold" 
                            dangerouslySetInnerHTML={{ __html: formatText(data?.introduction) }} 
                        />
                        {data?.highlightPhrase && (
                             <p className="cuerpo2 font-bold text-vlanc-black">
                                {data.highlightPhrase}
                             </p>
                        )}
                        <div 
                            className="cuerpo [&>strong]:font-bold" 
                            dangerouslySetInnerHTML={{ __html: formatText(data?.introduction2) }} 
                        />
                    </AnimatedSection>
                        
                    {/* Descripción de Planes (Revelación Secuencial) */}
                    <div className="space-y-6 mt-8">
                        {(data?.plansDescription ?? []).map((p, i) => (
                            <motion.div 
                                key={i} 
                                className="space-y-2"
                                initial={{ opacity: isPrinting ? 1 : 0, x: isPrinting ? 0 : -20 }}
                                animate={{ 
                                    opacity: effectiveStep >= i + 1 ? 1 : (isPrinting ? 1 : 0.1),
                                    x: effectiveStep >= i + 1 ? 0 : (isPrinting ? 0 : -20),
                                    filter: effectiveStep >= i + 1 ? 'blur(0px)' : (isPrinting ? 'blur(0px)' : 'blur(2px)')
                                }}
                                transition={{ duration: isPrinting ? 0 : 0.8, ease: "easeOut" }}
                            >
                                <h3 className={`font-sans font-bold text-[15px] uppercase leading-tight ${effectiveStep === i + 1 || isPrinting ? 'text-vlanc-primary' : 'text-vlanc-black'}`}>
                                    {p.name}_
                                </h3>
                                <div 
                                    className="cuerpo [&>strong]:font-bold"
                                    dangerouslySetInnerHTML={{ __html: formatText(p.desc) }}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* COLUMNA DERECHA: Tabla Interactiva */}
                <div className="shrink-0 flex flex-col items-end">
                    <AnimatedSection className="w-[820px] h-[532px] flex flex-col relative rounded-sm overflow-hidden" hierarchy={2}>
                        
                        {/* CAPAS DE RESALTADO (Highlight Columns) */}
                        {/* Grid Layer absoluta detrás del contenido */}
                        <div className="absolute inset-0 grid grid-cols-[2.5fr_1fr_1fr_1fr] h-full pointer-events-none z-0">
                            {/* Columna Plan 1 */}
                            <motion.div 
                                className="col-start-2 row-span-full bg-vlanc-primary/5"
                                initial={{ opacity: isPrinting ? 0 : 0 }}
                                animate={{ opacity: effectiveStep === 1 ? 1 : 0 }}
                                transition={{ duration: isPrinting ? 0 : 0.5 }}
                            />
                             {/* Columna Plan 2 */}
                             <motion.div 
                                className="col-start-3 row-span-full bg-vlanc-primary/5"
                                initial={{ opacity: isPrinting ? 0 : 0 }}
                                animate={{ opacity: effectiveStep === 2 ? 1 : 0 }} 
                                transition={{ duration: isPrinting ? 0 : 0.5 }}
                            />
                             {/* Columna Plan 3 */}
                             <motion.div 
                                className="col-start-4 row-span-full bg-vlanc-primary/5"
                                initial={{ opacity: isPrinting ? 0 : 0 }}
                                animate={{ opacity: effectiveStep === 3 ? 1 : 0 }} 
                                transition={{ duration: isPrinting ? 0 : 0.5 }}
                            />
                        </div>

                        {/* CONTENIDO TABLA (z-10) */}
                        <div className="relative z-10 w-full h-full flex flex-col">
                            
                            {/* Cabecera Tabla */}
                            <div className="grid grid-cols-[2.5fr_1fr_1fr_1fr] bg-[#cbb6aa] shrink-0 h-[47px]">
                                <div className="p-3"></div>
                                {(data?.tableHeaders ?? []).map((h, i) => (
                                    <motion.div 
                                        key={i} 
                                        className="px-3 text-center flex items-center justify-center h-full gap-3"
                                        initial={{ opacity: isPrinting ? 1 : 0 }}
                                        animate={{ opacity: effectiveStep >= i + 1 ? 1 : 0 }}
                                        transition={{ duration: isPrinting ? 0 : 0.5, delay: isPrinting ? 0 : 0.2 }}
                                    >
                                        <div className="w-[14px] h-[14px] border border-[#703622] bg-[#efe8e1]/50 print:bg-white shrink-0 rounded-[1px]" />
                                        <span className={`tabla1 whitespace-nowrap ${effectiveStep === i + 1 || isPrinting ? 'text-vlanc-secondary' : ''}`}>{h}</span>
                                    </motion.div>
                                ))}
                            </div>
                            
                            {/* Cuerpo Tabla */}
                            <div className="flex-grow flex flex-col bg-transparent">
                                {(data?.tableRows ?? []).map((row, i) => {
                                    const gridClass = "grid grid-cols-[2.5fr_1fr_1fr_1fr] items-center";

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
                                                <motion.div 
                                                    key={idx} 
                                                    className="flex justify-center items-center h-full"
                                                    initial={{ opacity: isPrinting ? 1 : 0 }}
                                                    animate={{ opacity: effectiveStep >= idx + 1 ? 1 : 0 }}
                                                    transition={{ duration: isPrinting ? 0 : 0.4 }}
                                                >
                                                    {isChecked && <CheckIcon />}
                                                </motion.div>
                                            ))}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Pie Tabla: Precios */}
                            <div className="grid grid-cols-[2.5fr_1fr_1fr_1fr] bg-[#8f4933] text-white shrink-0 h-[35px]">
                                <div className="p-4"></div>
                                {(data?.prices ?? []).map((price, i) => (
                                    <motion.div 
                                        key={i} 
                                        className="px-4 text-center flex flex-col justify-center h-full"
                                        initial={{ opacity: isPrinting ? 1 : 0 }}
                                        animate={{ opacity: effectiveStep >= i + 1 ? 1 : 0 }}
                                        transition={{ duration: isPrinting ? 0 : 0.5, delay: isPrinting ? 0 : 0.1 }}
                                    >
                                        <span className="tabla3 whitespace-nowrap">{price}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                    </AnimatedSection>

                    {/* FIRMA */}
                    <AnimatedSection className="w-[820px] flex flex-col border-t border-[#703622] mt-[25px] pt-1" hierarchy={2}>
                        <div className="flex justify-between items-start">
                            <span className="tabla1">VIVE VLANC SL</span>
                            <span className="tabla1 text-right">ACEPTA PRESUPUESTO_FIRMA</span>
                        </div>
                    </AnimatedSection>
                </div>
            </div>

            {/* FECHA */}
            <AnimatedSection className="absolute bottom-[70px] right-[120px] translate-y-1/2 z-20" hierarchy={2}>
                <p className="cuerpo font-bold text-right">
                    {data?.locationDate || "En Alcoi a XX de mes de 2025"}
                </p>
            </AnimatedSection>
        </section>
    );
};

export default Investment;
