
import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';

interface ProcessStep {
    title?: string;
    description?: string;
}

interface GuaranteeItem {
    icon?: string;
    badgeContent?: string;
    title?: string;
    description?: string;
    note?: string;
}

interface ProcessProps {
    data?: {
        title?: string;
        steps?: ProcessStep[];
        badge?: string;
    };
    guaranteeItem?: GuaranteeItem;
    step?: number; // Prop para controlar qué items están revelados
}

const Process: React.FC<ProcessProps> = ({ data, guaranteeItem, step = 8 }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <section className="h-full w-full pt-[150px] pb-[140px] px-[120px] flex flex-col justify-start overflow-hidden relative">
            <div className="w-full flex flex-col h-full">
                <div className="mb-12 shrink-0">
                    <AnimatedSection hierarchy={1}>
                        <h2 className="subtitulo1">
                            {data?.title || "el proceso Vlanc."}
                        </h2>
                    </AnimatedSection>
                    <AnimatedSection mode="bar" className="w-[112px] h-[5px] bg-[#8f4933] mt-[27px]" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 flex-grow content-between">
                    {(data?.steps ?? []).map((s, index) => {
                        // El item está visible si el 'step' actual es mayor que el índice del item.
                        const isRevealed = step > index;

                        return (
                            <AnimatedSection key={index} hierarchy={2}>
                                <motion.div
                                    className="space-y-6 flex flex-col items-start relative print-force-visible"
                                    initial={{ opacity: isRevealed ? 1 : 0.08, filter: isRevealed ? 'blur(0px)' : 'blur(5px)' }}
                                    animate={{ opacity: isRevealed ? 1 : 0.08, filter: isRevealed ? 'blur(0px)' : 'blur(5px)' }}
                                    transition={{ duration: 0.9, ease: "easeInOut" }}
                                >
                                    {/* Título + Número */}
                                    <div className="relative inline-block">
                                        <h3 className="subtitulo3 font-bold text-vlanc-black leading-tight">
                                            <span className="font-serif mr-2">{`0${index + 1}`} /</span>
                                            <span dangerouslySetInnerHTML={{ __html: s.title || '' }} />
                                        </h3>
                                    </div>

                                    {/* Descripción */}
                                    <div className="relative block w-full">
                                        <div className="cuerpo2 text-left">
                                            <div dangerouslySetInnerHTML={{ __html: s.description || '' }} />
                                            {index === 4 && (
                                                <p className="mt-4 font-bold text-vlanc-secondary">
                                                    · Tu interés es el nuestro ·
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Botón Garantía (Solo index 2 / Paso 3) */}
                                    {(index === 2 && guaranteeItem && guaranteeItem.isActive !== false) && (
                                        <div className="relative inline-block mt-6">
                                            <button
                                                onClick={openModal}
                                                className="inline-flex items-center border border-vlanc-primary text-vlanc-primary px-5 py-3 rounded-[1px] bg-transparent hover:bg-vlanc-primary hover:text-white transition-all duration-300 cursor-pointer outline-none active:scale-[0.98] z-20 group print:border-2 print:!border-vlanc-primary"
                                            >
                                                <span className="boton1">
                                                    {data?.badge || "GARANTÍA"}
                                                </span>
                                                <span className="mx-2 text-[14px] font-serif leading-none opacity-60">/</span>
                                                <span className="boton2">
                                                    Somos tu equipo
                                                </span>
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatedSection>
                        );
                    })}
                </div>
            </div>

            {/* MODAL DE GARANTÍA */}
            {isModalOpen && guaranteeItem && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-vlanc-bg/80 backdrop-blur-sm px-10"
                    onClick={closeModal}
                >
                    <AnimatedSection
                        className="bg-vlanc-bg border border-vlanc-primary/10 shadow-2xl p-12 max-w-[613px] w-full relative"
                        onClick={(e) => e.stopPropagation()}
                        hierarchy={2}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-6 right-6 text-vlanc-black hover:text-vlanc-primary transition-colors text-3xl leading-none"
                        >
                            &times;
                        </button>

                        <div className="flex flex-col items-start w-full relative">
                            <h3 className="subtitulo2 not-italic mb-6 leading-tight text-vlanc-black">
                                / {guaranteeItem.title}
                            </h3>

                            <div
                                className="cuerpo mb-12"
                                dangerouslySetInnerHTML={{ __html: guaranteeItem.description || '' }}
                            />

                            {(guaranteeItem.badgeContent && guaranteeItem.badgeContent.trim().length > 0) && (
                                <div className="relative ml-6 mb-2">
                                    <div className="absolute -top-7 -left-7 w-[60px] h-[60px] z-10 flex items-center justify-center">
                                        {guaranteeItem.icon ? (
                                            <img src={guaranteeItem.icon} alt="Garantía" className="w-full h-full object-contain drop-shadow-sm" />
                                        ) : (
                                            <div className="w-[40px] h-[40px] bg-vlanc-bg border border-vlanc-black rounded-full flex items-center justify-center">
                                                <span className="text-[6px] font-bold">ICON</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-2 border-vlanc-black bg-transparent px-6 py-6 min-w-[200px] relative z-0">
                                        <div
                                            className="cuerpo !text-vlanc-black text-[14px] leading-snug"
                                            dangerouslySetInnerHTML={{ __html: guaranteeItem.badgeContent || '' }}
                                        />
                                    </div>
                                </div>
                            )}

                            {guaranteeItem.note && (
                                <div className="mt-8 border-t border-vlanc-primary/10 pt-4 w-full">
                                    <p className="text-[10px] text-vlanc-secondary/60 italic">
                                        {guaranteeItem.note}
                                    </p>
                                </div>
                            )}
                        </div>
                    </AnimatedSection>
                </div>
            )}
        </section>
    );
};

export default Process;
