
import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';

interface SubPhase {
    number?: string;
    title?: string;
    description?: string;
    note?: string;
}

interface GuaranteeItem {
    icon?: string;
    badgeContent?: string;
    title?: string;
    description?: string;
    note?: string;
}

interface Phase {
    title?: string;
    image?: { src: string; opacity?: number };
    video?: string;
    guaranteeText?: string;
    videoButtonText?: string;
    subPhases?: SubPhase[];
}

interface ScopePhasesProps {
    data?: Phase;
    mainTitle?: string;
    guaranteeItem?: GuaranteeItem;
}

const ScopePhases: React.FC<ScopePhasesProps> = ({ data, mainTitle = "trabajos contemplados.", guaranteeItem }) => {
    const [showVideo, setShowVideo] = useState(false);
    const [isGuaranteeModalOpen, setIsGuaranteeModalOpen] = useState(false);
    const imageSrc = data?.image?.src;
    const imageOpacity = data?.image?.opacity ?? 15;

    const formattedTitle = (mainTitle || "trabajos contemplados.").split(' ').map((word, i, arr) => (
        <React.Fragment key={i}>
            {word}
            {i < arr.length - 1 && <br />}
        </React.Fragment>
    ));

    const getGuaranteeParts = (text: string) => {
        if (!text.includes('/')) {
            return { badge: text.trim(), desc: '' };
        }
        const parts = text.split('/');
        return {
            badge: parts[0]?.trim(),
            desc: parts.slice(1).join('/').trim()
        };
    };

    const handleVideoClick = () => {
        if (data?.video) setShowVideo(true);
    };

    const openGuaranteeModal = () => setIsGuaranteeModalOpen(true);
    const closeGuaranteeModal = () => setIsGuaranteeModalOpen(false);

    const hasGuarantee = !!data?.guaranteeText;
    const hasButtons = hasGuarantee || (data?.videoButtonText && data?.videoButtonText.trim() !== "");

    return (
        <section className="h-screen w-full relative overflow-hidden">
            {/* TÍTULO (J1) */}
            <div className="absolute top-[150px] left-[120px] z-20">
                <AnimatedSection hierarchy={1}>
                    <h2 className="subtitulo1 leading-none text-left text-vlanc-black">
                        {formattedTitle}
                    </h2>
                </AnimatedSection>
                <AnimatedSection mode="bar" className="w-[112px] h-[5px] bg-[#8f4933] mt-[27px]" />
            </div>

            {/* IMAGEN (J0) */}
            <div className="absolute top-0 bottom-0 left-[575px] w-[409px] z-10 overflow-hidden pointer-events-none">
                <AnimatedSection className="w-full h-full relative" hierarchy={0}>
                    {imageSrc ? (
                        <div className="w-full h-full relative">
                            <img src={imageSrc} alt="Phase" className="w-full h-full object-cover" />
                            <div
                                className="absolute inset-0 pointer-events-none transition-colors duration-1000"
                                style={{ backgroundColor: `rgba(143, 73, 51, ${imageOpacity / 100})` }}
                            />
                        </div>
                    ) : (
                        <div className="w-full h-full bg-vlanc-secondary/10 flex items-center justify-center border border-vlanc-secondary/5">
                            <span className="text-xs tracking-widest text-vlanc-secondary/40">Imagen 409px</span>
                        </div>
                    )}
                </AnimatedSection>
            </div>

            {/* FASES Y BOTONES (J2) */}
            <div
                className="absolute left-[1034px] right-[120px] z-20 flex flex-col justify-end items-start pointer-events-auto"
                style={{ bottom: hasButtons ? '180px' : '140px' }}
            >
                <AnimatedSection className="w-full" hierarchy={2}>
                    <h3 className="fase-titulo mb-8 text-vlanc-black">{data?.title}</h3>
                    <div className="space-y-6">
                        {(data?.subPhases ?? []).map((sub, i) => (
                            <div key={i} className="text-left">
                                <p className="fase-subtitulo mb-1 text-vlanc-black">
                                    {sub.number} {sub.title}
                                </p>
                                <p className="cuerpo text-[14px] leading-[1.5]" dangerouslySetInnerHTML={{ __html: sub.description || '' }} />
                            </div>
                        ))}
                    </div>

                    {hasButtons && (
                        <div className="absolute top-[calc(100%+40px)] left-0 flex items-center gap-6">
                            {hasGuarantee && (() => {
                                const { badge, desc } = getGuaranteeParts(data!.guaranteeText!);
                                return (
                                    <button onClick={openGuaranteeModal} className="flex items-center h-[52px] bg-vlanc-primary text-white px-6 rounded-[1px] shadow-sm hover:bg-vlanc-secondary transition-all cursor-pointer group outline-none active:scale-[0.98]">
                                        <span className="boton1 text-white">{badge}</span>
                                        {desc && (
                                            <>
                                                <span className="mx-3 text-[14px] font-serif leading-none opacity-60">/</span>
                                                <span className="boton2 text-white">{desc}</span>
                                            </>
                                        )}
                                    </button>
                                );
                            })()}
                            {data?.videoButtonText && (
                                <button onClick={handleVideoClick} className="flex items-center h-[52px] border border-vlanc-primary text-vlanc-primary px-8 uppercase hover:bg-vlanc-primary hover:text-white transition-all rounded-[1px] cursor-pointer bg-transparent group outline-none active:scale-[0.98] print:hidden">
                                    <span className="boton1 text-vlanc-primary group-hover:text-white">{data.videoButtonText}</span>
                                </button>
                            )}
                        </div>
                    )}
                </AnimatedSection>
            </div>

            {/* MODAL GARANTÍA */}
            {isGuaranteeModalOpen && guaranteeItem && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-vlanc-bg/80 backdrop-blur-sm px-10 pointer-events-auto" onClick={closeGuaranteeModal}>
                    <AnimatedSection className="bg-vlanc-bg border border-vlanc-primary/10 shadow-2xl p-12 max-w-[613px] w-full relative" onClick={(e) => e.stopPropagation()} hierarchy={2}>
                        <button onClick={closeGuaranteeModal} className="absolute top-6 right-6 text-vlanc-black hover:text-vlanc-primary transition-colors text-3xl leading-none">&times;</button>
                        <div className="flex flex-col items-start w-full relative">
                            <h3 className="subtitulo2 not-italic mb-6 leading-tight text-vlanc-black">/ {guaranteeItem.title}</h3>
                            <div className="cuerpo mb-12" dangerouslySetInnerHTML={{ __html: guaranteeItem.description || '' }} />
                            {(guaranteeItem.badgeContent && guaranteeItem.badgeContent.trim().length > 0) && (
                                <div className="relative ml-6 mb-2">
                                    <div className="absolute -top-7 -left-7 w-[60px] h-[60px] z-10 flex items-center justify-center">
                                        {guaranteeItem.icon ? <img src={guaranteeItem.icon} alt="Garantía" className="w-full h-full object-contain" /> : <div className="w-[40px] h-[40px] bg-vlanc-bg border border-vlanc-black rounded-full" />}
                                    </div>
                                    <div className="border-2 border-vlanc-black bg-transparent px-6 py-6 min-w-[200px] relative z-0">
                                        <div className="cuerpo !text-vlanc-black text-[14px] leading-snug" dangerouslySetInnerHTML={{ __html: guaranteeItem.badgeContent || '' }} />
                                    </div>
                                </div>
                            )}
                            {guaranteeItem.note && (
                                <div className="mt-8 border-t border-vlanc-primary/10 pt-4 w-full">
                                    <p className="text-[10px] text-vlanc-secondary/60 italic">{guaranteeItem.note}</p>
                                </div>
                            )}
                        </div>
                    </AnimatedSection>
                </div>
            )}

            {/* MODAL VIDEO */}
            {showVideo && data?.video && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-vlanc-black/95 backdrop-blur-md p-4 md:p-10 pointer-events-auto"
                    onClick={() => setShowVideo(false)}
                >
                    <AnimatedSection
                        className="relative w-full max-w-7xl aspect-video bg-black shadow-2xl flex items-center justify-center"
                        hierarchy={0}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowVideo(false)}
                            className="absolute -top-10 right-0 text-white/60 hover:text-white transition-colors text-[10px] tracking-[0.2em] font-bold uppercase flex items-center gap-2"
                        >
                            [ Cerrar Video ]
                        </button>
                        <video
                            src={data.video}
                            controls
                            autoPlay
                            className="w-full h-full object-contain"
                        />
                    </AnimatedSection>
                </div>
            )}
        </section>
    );
};

export default ScopePhases;
