
import React, { useState, useEffect } from 'react';
import AnimatedSection from './AnimatedSection';
import { motion, AnimatePresence } from 'framer-motion';

interface DescriptionBlock {
    text: string;
    style: 'normal' | 'title';
    isNumbered?: boolean;
    number?: string;
    hasSeparator?: boolean;
}

interface PremiumService {
    title?: string;
    subtitle?: string;
    price?: string;
    description?: DescriptionBlock[];
    note?: string;
}

interface DiscountedPlan {
    name?: string;
    originalPrice?: string;
    discountedPrice?: string;
}

interface SpecialOffersProps {
    data?: {
        title?: string;
        offerFooterText?: string;
        conditionalOffer?: {
            title?: string;
            description?: string;
            discountedPlans?: DiscountedPlan[];
        };
        launchOffer?: {
            title?: string;
            description?: string;
        };
        callToAction?: {
            text?: string;
            image?: { src: string; opacity?: number };
        };
        popupVideo?: string;
        overlayLogo?: string;
    };
    investmentTitle?: string;
    locationDate?: string;
    premiumService?: PremiumService;
    step?: number;
    setNavigationBlocked?: (blocked: boolean) => void;
    isSectionCompleted?: boolean;
}

// Sub-componente Flip Card
const FlipCard: React.FC<{ plan: DiscountedPlan; initialFlipped?: boolean }> = ({ plan, initialFlipped = false }) => {
    // Inicializamos el estado con initialFlipped.
    // Al navegar y volver (desmontar/montar), tomará el valor actualizado de initialFlipped.
    const [isFlipped, setIsFlipped] = useState(initialFlipped);

    return (
        <div
            className="flex-1 min-w-[140px] h-[80px] perspective-[1000px] cursor-pointer group print:perspective-none"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                className="relative w-full h-full preserve-3d print:transform-none"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                {/* CARA FRONTAL (Original) */}
                <div
                    className="absolute inset-0 w-full h-full backface-hidden border border-[#8f4933]/20 bg-vlanc-bg hover:bg-[#8f4933]/5 flex flex-col items-center justify-center gap-1 print:hidden"
                    // translateZ(1px) evita el z-fighting (solapamiento visual) separando la capa del plano cero
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(0deg) translateZ(1px)", WebkitFontSmoothing: "antialiased" }}
                >
                    <span className="tabla1 text-[#8f4933] text-[10px]">{plan.name}</span>
                    <span className="tabla2 text-[#8f4933] font-bold decoration-slice">{plan.originalPrice}</span>
                </div>

                {/* CARA TRASERA (Descuento - 3 LÍNEAS) */}
                <div
                    className="absolute inset-0 w-full h-full backface-hidden border border-[#8f4933] bg-[#8f4933] flex flex-col items-center justify-center gap-0.5 print-force-visible print:relative print:inset-auto print:visible print:!transform-none"
                    // translateZ(1px) evita el z-fighting en la cara trasera
                    style={{ WebkitFontSmoothing: "antialiased", ...(isFlipped ? { backfaceVisibility: "hidden", transform: "rotateY(180deg) translateZ(1px)" } : { backfaceVisibility: "hidden", transform: "rotateY(180deg) translateZ(1px)" }) }}
                >
                    {/* Línea 1: Nombre del Plan - AUMENTADO A 12px */}
                    <span className="tabla1 text-white text-[12px] mb-0.5 tracking-wider">{plan.name}</span>

                    {/* Línea 2: Precio Original (Tachado y sin negrita) */}
                    <span className="text-white/70 text-[10px] font-sans font-normal line-through decoration-white/60 leading-none">
                        {plan.originalPrice}
                    </span>

                    {/* Línea 3: Precio Descuento (Negrita) */}
                    <span className="tabla2 text-white font-bold text-[12px] leading-none mt-0.5">
                        {plan.discountedPrice}
                    </span>
                </div>
            </motion.div>
        </div>
    );
};

const SpecialOffers: React.FC<SpecialOffersProps> = ({
    data,
    investmentTitle,
    locationDate,
    premiumService,
    step = 4,
    setNavigationBlocked,
    isSectionCompleted = false
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal Premium
    const [showVideo, setShowVideo] = useState(false); // Modal Video (Paso 3)

    const plans = data?.conditionalOffer?.discountedPlans || [];
    const imageSrc = data?.callToAction?.image?.src;
    const imageOpacity = data?.callToAction?.image?.opacity ?? 15;

    // Verificación estricta de texto
    const hasCtaText = data?.callToAction?.text && data.callToAction.text.trim().length > 0;

    const openModal = () => { if (premiumService) setIsModalOpen(true); };
    const closeModal = () => setIsModalOpen(false);

    // Efecto para abrir el video automáticamente en el Paso 3 y bloquear navegación
    useEffect(() => {
        if (step === 3 && data?.popupVideo) {
            setShowVideo(true);
            if (setNavigationBlocked) setNavigationBlocked(true);
        }
    }, [step, data?.popupVideo, setNavigationBlocked]);

    const openVideo = () => {
        if (data?.popupVideo) {
            setShowVideo(true);
            if (setNavigationBlocked) setNavigationBlocked(true);
        }
    };

    const closeVideo = () => {
        setShowVideo(false);
        if (setNavigationBlocked) setNavigationBlocked(false);
    };

    const renderDescriptionBlock = (block: DescriptionBlock, key: number, allBlocks: DescriptionBlock[]) => {
        const isTitle = block.style === 'title';
        const nextBlock = allBlocks[key + 1];
        const isConsecutiveNumbered = block.isNumbered && nextBlock?.isNumbered;
        const marginBottomClass = isConsecutiveNumbered ? "h-[5px]" : "h-5";

        return (
            <div key={key} className="w-full">
                {isTitle ? (
                    <h4 className="cuerpo uppercase mb-0 text-vlanc-black">
                        <span dangerouslySetInnerHTML={{ __html: block.text }} />
                    </h4>
                ) : (
                    <div className="flex flex-row items-start gap-4">
                        {block.isNumbered && block.number && (
                            <div className="shrink-0 w-[35px] h-[20px] bg-[#8f4933] text-white flex items-center justify-center rounded-[1px] mt-0.5">
                                <span className="text-[14px] font-bold tracking-widest leading-none">{block.number}</span>
                            </div>
                        )}
                        <p className="cuerpo" dangerouslySetInnerHTML={{ __html: block.text }} />
                    </div>
                )}
                {block.hasSeparator && <div className="w-full h-[1px] bg-[#8f4933] mt-3 mb-3 opacity-30"></div>}
                {!block.hasSeparator && <div className={marginBottomClass}></div>}
            </div>
        );
    };

    // Usar filter-none para evitar capas de composición que borronean el texto en 3D
    const getRevealClasses = (isVisible: boolean) => {
        return `transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 filter-none' : 'opacity-10 blur-[2px]'} print-force-visible`;
    };

    return (
        <section id="special-offers" className="h-full w-full flex flex-row pt-[150px] pb-[140px] px-[120px] overflow-hidden print:overflow-visible">
            <div className="w-1/2 h-full flex flex-col pr-[69.5px] relative print:overflow-visible">
                <div className="shrink-0 mb-6">
                    <AnimatedSection hierarchy={1}>
                        <h2 className="subtitulo1">{investmentTitle || "la inversión."}</h2>
                    </AnimatedSection>
                    <AnimatedSection mode="bar" className="w-[112px] h-[5px] bg-[#8f4933] mt-[27px]" />
                </div>

                <AnimatedSection className="flex-grow flex flex-col justify-center overflow-y-auto no-scrollbar print:overflow-visible print:justify-start print:pt-4 print-force-visible" hierarchy={2}>

                    {/* CAJA 1: CONDICIONES ESPECIALES (Visible Step >= 1) */}
                    <div
                        className={`border border-[#8f4933]/30 p-5 mb-4 shrink-0 overflow-hidden print:overflow-visible print:p-[20px] print:m-[1px] ${getRevealClasses(step >= 1)}`}
                    >
                        {data?.conditionalOffer && (
                            <div className="mb-4">
                                <h3 className="subtitulo2 mb-2 text-vlanc-black">{data.conditionalOffer.title}</h3>
                                <div className="cuerpo leading-relaxed" dangerouslySetInnerHTML={{ __html: data.conditionalOffer.description || '' }} />
                            </div>
                        )}

                        {/* FLIP CARDS */}
                        <div className="flex flex-row justify-between gap-2 w-full flex-wrap xl:flex-nowrap">
                            {plans.map((plan, i) => (
                                <FlipCard key={i} plan={plan} initialFlipped={isSectionCompleted} />
                            ))}
                        </div>
                    </div>

                    {/* CAJA 2: OFERTA LANZAMIENTO (Visible Step >= 2) */}
                    <div
                        className={`border border-[#8f4933]/30 p-5 mb-4 shrink-0 overflow-hidden print:overflow-visible print:p-[20px] print:m-[1px] ${getRevealClasses(step >= 2)}`}
                    >
                        {data?.launchOffer && (
                            <div className="mb-4">
                                <h3 className="subtitulo2 mb-2 text-vlanc-black">{data.launchOffer.title}</h3>
                                <div className="cuerpo leading-relaxed" dangerouslySetInnerHTML={{ __html: data.launchOffer.description || '' }} />
                            </div>
                        )}

                        <button className="w-full h-[41px] border border-[#8f4933] flex items-center justify-center cursor-pointer transition-all duration-300 bg-[#8f4933] hover:bg-transparent group mb-4 shrink-0" onClick={openModal}>
                            <span className="tabla1 text-white group-hover:text-[#8f4933] transition-colors">TU HOGAR COMO NUNCA LO IMAGINASTE</span>
                        </button>

                        {data?.offerFooterText && <div className="cuerpo text-sm" dangerouslySetInnerHTML={{ __html: data.offerFooterText }} />}
                    </div>

                    {/* FIRMA (Visible Step >= 2) */}
                    <div className={`w-full shrink-0 ${getRevealClasses(step >= 2)}`}>
                        <div className="w-full flex flex-col border-t border-[#8f4933] mt-[20px] pt-1">
                            <div className="flex justify-between items-start">
                                <span className="tabla1">VIVE VLANC SL</span>
                                <span className="tabla1 text-right">ACEPTA PRESUPUESTO_FIRMA</span>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Fecha (Visible Step >= 2) */}
                <AnimatedSection className="absolute -bottom-[70px] right-[69.5px] translate-y-1/2 z-20" hierarchy={2}>
                    <div className={getRevealClasses(step >= 2)}>
                        <p className="cuerpo font-bold text-right">{locationDate || "En Alcoi a XX de mes de 2025"}</p>
                    </div>
                </AnimatedSection>
            </div>

            <div className="w-1/2 h-full pl-[69.5px]">
                <AnimatedSection className="w-full h-full relative overflow-hidden" hierarchy={0}>
                    {/* Contenedor Clickable para re-abrir video */}
                    <div
                        className="w-full h-full relative cursor-pointer group"
                        onClick={openVideo}
                    >
                        {imageSrc && (
                            <>
                                <img src={imageSrc} alt="Special Offer" className="w-full h-full object-cover" />
                                <div
                                    className="absolute inset-0 pointer-events-none transition-colors duration-1000"
                                    style={{ backgroundColor: `rgba(143, 73, 51, ${imageOpacity / 100})` }}
                                />

                                {/* CTA TEXT - SOLO SI HAY TEXTO (VERIFICADO) */}
                                {hasCtaText && (
                                    <div className="absolute bottom-[85px] left-0 w-full flex justify-center z-10 px-8">
                                        <h2 className="especial1">{data.callToAction.text}</h2>
                                    </div>
                                )}

                                {/* LOGO OVERLAY (Paso 4) - Transición más lenta (3s) */}
                                {data?.overlayLogo && (
                                    <motion.div
                                        className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none bg-vlanc-primary/10 backdrop-blur-[2px] print-force-visible"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: step >= 4 ? 1 : 0 }}
                                        transition={{ duration: 3.0, ease: "easeInOut" }}
                                    >
                                        <div className="w-full max-w-[400px] p-10">
                                            <img src={data.overlayLogo} alt="Logo Overlay" className="w-full h-auto drop-shadow-xl" />
                                        </div>
                                    </motion.div>
                                )}

                                {/* Overlay de color en hover */}
                                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-vlanc-primary/10" />
                            </>
                        )}
                    </div>
                </AnimatedSection>
            </div>

            {/* MODAL SERVICIO PREMIUM */}
            {isModalOpen && premiumService && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-vlanc-bg/80 backdrop-blur-sm px-10 print:hidden" onClick={closeModal}>
                    <AnimatedSection className="bg-vlanc-bg border border-vlanc-primary/10 shadow-2xl p-12 max-w-[672px] w-full relative max-h-[90vh] overflow-y-auto no-scrollbar" onClick={(e) => e.stopPropagation()} hierarchy={2}>
                        <button onClick={closeModal} className="absolute top-6 right-6 text-vlanc-black hover:text-vlanc-primary transition-colors text-3xl leading-none">&times;</button>
                        <div className="flex flex-col items-start w-full relative">
                            <h3 className="subtitulo2 not-italic font-bold mb-8 text-vlanc-black">/ {premiumService.subtitle}</h3>
                            <h4 className="cuerpo uppercase mb-5 text-vlanc-black">{premiumService.title}</h4>
                            <div className="w-full">{(premiumService.description ?? []).map((block, i, arr) => renderDescriptionBlock(block, i, arr))}</div>
                            {premiumService.note && <div className="mt-4"><p className="text-[10px] text-vlanc-secondary/60 italic tracking-wider w-full whitespace-pre-line" dangerouslySetInnerHTML={{ __html: premiumService.note }} /></div>}
                            {premiumService.price && <div className="mt-8 bg-[#8f4933] text-white px-8 py-3 rounded-[1px] flex items-center justify-center cursor-default"><span className="boton1 text-white tracking-[0.1em]">{premiumService.price}</span></div>}
                        </div>
                    </AnimatedSection>
                </div>
            )}

            {/* MODAL VIDEO (Paso 3) - print:hidden */}
            <AnimatePresence>
                {showVideo && data?.popupVideo && (
                    <motion.div
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-vlanc-black/95 backdrop-blur-md p-4 md:p-10 pointer-events-auto print:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeVideo} // Cerrar al click fuera
                    >
                        <AnimatedSection
                            className="relative w-full max-w-6xl aspect-video bg-black shadow-2xl flex items-center justify-center"
                            hierarchy={0}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={closeVideo}
                                className="absolute -top-12 right-0 text-white hover:text-vlanc-primary transition-colors text-[12px] tracking-[0.2em] font-bold uppercase flex items-center gap-2"
                            >
                                [ Cerrar y Continuar ]
                            </button>
                            {/* VIDEO PAUSADO POR DEFECTO (sin autoPlay) */}
                            <video
                                src={data.popupVideo}
                                controls
                                className="w-full h-full object-contain"
                            />
                        </AnimatedSection>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default SpecialOffers;
