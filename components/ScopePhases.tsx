
import React, { useState, useEffect, useRef } from 'react';
import AnimatedSection from './AnimatedSection';
import CustomPortableText from './CustomPortableText';
import { getLogoBottomOffset, CANVAS_WIDTH } from '../utils/logoBottom';

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
    isActive?: boolean;
}

interface Phase {
    title?: string;
    image?: { src: string; opacity?: number };
    video?: string;
    guaranteeText?: string;
    videoButtonText?: string;
    videoButtonIsActive?: boolean;
    guaranteeButtonIsActive?: boolean;
    subPhases?: SubPhase[];
}

interface ScopePhasesProps {
    data?: Phase;
    mainTitle?: string;
    guaranteeItem?: GuaranteeItem;
    guaranteesList?: { text: string; item: GuaranteeItem }[];
}

// Tamaños base de las clases de texto de la columna de fases. Se reducen en
// bloque, de 1 en 1 px, cuando el contenido crece tanto que sube por encima del
// logo de la esquina superior izquierda.
const FASE_TITULO_SIZE = 18;
const FASE_SUBTITULO_SIZE = 15;
const CUERPO_SIZE = 14;
// Tope: deja el cuerpo en 10px. Más abajo el texto deja de leerse en pantalla.
const MAX_FONT_REDUCTION = 4;
// Hueco libre mínimo entre el borde inferior del logo y la primera línea del
// bloque de fases, en px CSS. Subir este número hace que reduzca antes.
const LOGO_MIN_GAP = 2;
const ScopePhases: React.FC<ScopePhasesProps> = ({ data, mainTitle = "trabajos contemplados.", guaranteeItem, guaranteesList = [] }) => {
    const [showVideo, setShowVideo] = useState(false);
    const [openGuaranteeIndex, setOpenGuaranteeIndex] = useState<number | null>(null);
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

    const openGuaranteeModal = (index: number) => setOpenGuaranteeIndex(index);
    const closeGuaranteeModal = () => setOpenGuaranteeIndex(null);

    // Cada diapositiva monta su propia instancia, así que esto sólo crece hasta el
    // primer valor que cumple y ahí se queda: no puede oscilar.
    const [fontReduction, setFontReduction] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const blockRef = useRef<HTMLDivElement>(null);
    // Reducción desde la que ya hemos pedido un incremento. El ResizeObserver puede
    // dispararse varias veces antes del re-render y, sin esto, cada disparo mediría
    // el mismo DOM y encogería el texto de más.
    const bumpedFromRef = useRef(-1);

    useEffect(() => {
        const checkSpace = () => {
            const section = sectionRef.current;
            const block = blockRef.current;
            if (!section || !block) return;
            if (fontReduction >= MAX_FONT_REDUCTION || bumpedFromRef.current === fontReduction) return;

            const logoBottom = getLogoBottomOffset(section);
            if (logoBottom === null) return;

            // Las diapositivas entran con una animación de escala (3x o 0.4x hasta 1),
            // así que todo se mide como desplazamiento DENTRO del lienzo: la escala se
            // cancela y la medida vale también mientras dura la animación.
            const sectionRect = section.getBoundingClientRect();
            const scale = sectionRect.width / CANVAS_WIDTH;
            if (!scale) return;

            // El bloque está anclado abajo y crece hacia arriba, así que su borde
            // superior es justo lo que se acerca al logo.
            const blockTop = (block.getBoundingClientRect().top - sectionRect.top) / scale;
            const gap = blockTop - logoBottom;
            if (gap < LOGO_MIN_GAP) {
                bumpedFromRef.current = fontReduction;
                setFontReduction(fontReduction + 1);
            }
        };

        checkSpace();
        window.addEventListener('resize', checkSpace);
        // También al cambiar el contenido: fuentes que terminan de cargar, etc.
        const resizeObserver = new ResizeObserver(checkSpace);
        if (blockRef.current) resizeObserver.observe(blockRef.current);

        return () => {
            window.removeEventListener('resize', checkSpace);
            resizeObserver.disconnect();
        };
    }, [fontReduction, data]);

    // Un botón de garantía solo se pinta si su garantía sigue activa (App.tsx ya filtra
    // los que estén desactivados desde la fase), y el de vídeo si su interruptor lo permite.
    const visibleGuarantees = guaranteesList.filter(g => g.item && g.item.isActive !== false);
    const showVideoButton = data?.videoButtonIsActive !== false && !!data?.videoButtonText && data.videoButtonText.trim() !== "";
    const hasButtons = visibleGuarantees.length > 0 || showVideoButton;
    const activeModalItem = openGuaranteeIndex !== null ? guaranteesList[openGuaranteeIndex]?.item : null;

    return (
        <section className="h-screen w-full relative overflow-hidden" ref={sectionRef}>
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
                ref={blockRef}
                className="absolute left-[1034px] right-[120px] z-20 flex flex-col justify-end items-start pointer-events-auto"
                /* Las variables van en este bloque y no en la sección entera para que
                   la reducción no alcance al popup de garantías, que es hermano suyo. */
                style={{
                    bottom: hasButtons ? '180px' : '140px',
                    '--fase-titulo-size': `${FASE_TITULO_SIZE - fontReduction}px`,
                    '--fase-subtitulo-size': `${FASE_SUBTITULO_SIZE - fontReduction}px`,
                    '--cuerpo-size': `${CUERPO_SIZE - fontReduction}px`,
                } as React.CSSProperties}
            >
                <AnimatedSection className="w-full" hierarchy={2}>
                    <h3 className="fase-titulo mb-8 text-vlanc-black">{data?.title}</h3>
                    <div className="space-y-6">
                        {(data?.subPhases ?? []).map((sub, i) => (
                            <div key={i} className="text-left">
                                <p className="fase-subtitulo mb-1 text-vlanc-black">
                                    {sub.number} {sub.title}
                                </p>
                                <CustomPortableText 
                                    value={sub.description} 
                                    className="cuerpo leading-[1.5]" 
                                />
                            </div>
                        ))}
                    </div>

                    {hasButtons && (
                        <div className="absolute top-[calc(100%+40px)] left-0 w-full flex items-center gap-6">
                            {guaranteesList.map((g, index) => {
                                if (g.item && g.item.isActive !== false) {
                                    const { badge, desc } = getGuaranteeParts(g.text);
                                    return (
                                        <button key={index} onClick={() => openGuaranteeModal(index)} className="flex items-center h-[52px] bg-vlanc-primary text-white px-6 rounded-[1px] shadow-sm hover:bg-vlanc-secondary transition-all cursor-pointer group outline-none active:scale-[0.98] shrink min-w-0">
                                            <span className="boton1 text-white shrink-0 whitespace-nowrap">{badge}</span>
                                            {desc && (
                                                <div className="flex items-center shrink min-w-0 ml-3 overflow-hidden">
                                                    <span className="mr-3 text-[14px] font-serif leading-none opacity-60 shrink-0">/</span>
                                                    <span className="boton2 text-white truncate">{desc}</span>
                                                </div>
                                            )}
                                        </button>
                                    );
                                }
                                return null;
                            })}
                            {showVideoButton && (
                                <button onClick={handleVideoClick} className="flex shrink-0 items-center h-[52px] border border-vlanc-primary text-vlanc-primary px-8 uppercase hover:bg-vlanc-primary hover:text-white transition-all rounded-[1px] cursor-pointer bg-transparent group outline-none active:scale-[0.98] print:hidden">
                                    <span className="boton1 text-vlanc-primary group-hover:text-white">{data.videoButtonText}</span>
                                </button>
                            )}
                        </div>
                    )}
                </AnimatedSection>
            </div>

            {/* MODAL GARANTÍA */}
            {openGuaranteeIndex !== null && activeModalItem && (
                <div className="absolute inset-0 z-[100] flex items-center justify-center bg-vlanc-bg/80 backdrop-blur-sm px-10 pointer-events-auto" onClick={closeGuaranteeModal}>
                    <AnimatedSection className="bg-vlanc-bg border border-vlanc-primary/10 shadow-2xl p-12 max-w-[613px] w-full relative" onClick={(e) => e.stopPropagation()} hierarchy={2}>
                        <button onClick={closeGuaranteeModal} className="absolute top-6 right-6 text-vlanc-black hover:text-vlanc-primary transition-colors text-3xl leading-none">&times;</button>
                        <div className="flex flex-col items-start w-full relative">
                            <h3 className="subtitulo2 not-italic mb-6 leading-tight text-vlanc-black">
                                / <CustomPortableText value={activeModalItem.title} isInline />
                            </h3>
                            <CustomPortableText 
                                value={activeModalItem.description} 
                                className="cuerpo mb-12" 
                            />
                            {(activeModalItem.badgeContent && (Array.isArray(activeModalItem.badgeContent) ? activeModalItem.badgeContent.length > 0 : typeof activeModalItem.badgeContent === 'string' ? activeModalItem.badgeContent.trim().length > 0 : true)) && (
                                <div className="relative ml-6 mb-2">
                                    <div className="absolute -top-7 -left-7 w-[60px] h-[60px] z-10 flex items-center justify-center">
                                        {activeModalItem.icon ? <img src={activeModalItem.icon} alt="Garantía" className="w-full h-full object-contain" /> : <div className="w-[40px] h-[40px] bg-vlanc-bg border border-vlanc-black rounded-full" />}
                                    </div>
                                    <div className="border-2 border-vlanc-black bg-transparent px-6 py-6 min-w-[200px] relative z-0">
                                        <CustomPortableText 
                                            value={activeModalItem.badgeContent} 
                                            className="cuerpo !text-vlanc-black text-[14px] leading-snug" 
                                            isInline
                                        />
                                    </div>
                                </div>
                            )}
                            {activeModalItem.note && (
                                <div className="mt-8 border-t border-vlanc-primary/10 pt-4 w-full">
                                    <p className="text-[10px] text-vlanc-secondary/60 italic">{activeModalItem.note}</p>
                                </div>
                            )}
                        </div>
                    </AnimatedSection>
                </div>
            )}

            {/* MODAL VIDEO */}
            {showVideo && data?.video && (
                <div
                    className="absolute inset-0 z-[100] flex items-center justify-center bg-vlanc-black/95 backdrop-blur-md p-4 md:p-10 pointer-events-auto"
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
