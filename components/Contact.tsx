import React from 'react';
import { motion } from 'framer-motion';

interface SocialMedia {
    name?: string;
    url?: string;
    icon?: string;
}

interface PhoneDetails {
    number?: string;
    icon?: string;
}

interface ContactProps {
    data?: {
        location?: { title?: string; address?: string; email?: string };
        phone?: { title?: string; landline?: PhoneDetails; mobile?: PhoneDetails };
        web?: { title?: string; url?: string; displayText?: string };
        rrss?: SocialMedia[];
        image?: string;
    };
    finalLogo?: string | null;
    finalLogoVideo?: string | null;
    onPrint?: () => void;
    isSectionCompleted?: boolean;
}

type Phase = 'playing' | 'sliding' | 'done';

interface OverlayRect {
    left: number;
    top: number;
    width: number;
    height: number;
}

const Contact: React.FC<ContactProps> = ({ data, finalLogo, finalLogoVideo, onPrint, isSectionCompleted = false }) => {
    const [videoHasError, setVideoHasError] = React.useState(false);
    const hasVideo = !!finalLogoVideo && !videoHasError;

    const skipAnimation = isSectionCompleted || !hasVideo;
    const [phase, setPhase] = React.useState<Phase>(skipAnimation ? 'done' : 'playing');

    // Posición inicial del overlay (centrado en pantalla)
    const [startRect, setStartRect] = React.useState<OverlayRect | null>(null);
    // Posición destino del overlay (donde está el placeholder del footer)
    const [targetRect, setTargetRect] = React.useState<OverlayRect | null>(null);

    const footerPlaceholderRef = React.useRef<HTMLDivElement>(null);

    // Calcular posición inicial al montar (centrado en viewport)
    React.useEffect(() => {
        if (skipAnimation) return;
        const logoAspect = 691 / 785;
        const logoW = Math.min(785, window.innerWidth * 0.5);
        const logoH = logoW * logoAspect;
        setStartRect({
            left: window.innerWidth / 2 - logoW / 2,
            top: window.innerHeight / 2 - logoH / 2,
            width: logoW,
            height: logoH,
        });
    }, [skipAnimation]);

    const handleVideoEnd = React.useCallback(() => {
        if (footerPlaceholderRef.current) {
            const rect = footerPlaceholderRef.current.getBoundingClientRect();
            setTargetRect({
                left: rect.left,
                top: rect.top,
                width: rect.width,
                height: rect.height,
            });
            setPhase('sliding');
        }
    }, []);

    const handleVideoError = React.useCallback(() => {
        setVideoHasError(true);
        setPhase('done');
    }, []);

    const handleAnimationComplete = React.useCallback(() => {
        if (phase === 'sliding') setPhase('done');
    }, [phase]);

    const handlePrint = () => {
        if (onPrint) onPrint();
        else setTimeout(() => window.print(), 500);
    };

    const showContent = phase === 'done';

    return (
        <footer className="h-screen w-full flex flex-col pt-[150px] pb-[140px] px-[120px] relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] w-full h-full">

                {/* COLUMNA IZQUIERDA: Placeholder del logo (siempre en el DOM para medir, invisible mientras el overlay está activo) */}
                <div className="flex items-center justify-center h-full w-full">
                    <div
                        ref={footerPlaceholderRef}
                        className="w-full max-w-[785px] aspect-[785/691] flex items-center justify-center overflow-hidden relative p-4 -translate-x-[100px] print-force-visible"
                        style={{ opacity: showContent ? 1 : 0 }}
                    >
                        {/* Logo en posición final: video (primer frame) o imagen si no hay video */}
                        {showContent && (
                            hasVideo ? (
                                <>
                                    <video
                                        src={finalLogoVideo!}
                                        muted
                                        playsInline
                                        className="w-full h-full object-contain print:hidden"
                                        data-cursor-ignore
                                    />
                                    {finalLogo && (
                                        <img src={finalLogo} alt="VLANC Logo" className="w-full h-full object-contain hidden print:block" />
                                    )}
                                </>
                            ) : finalLogo ? (
                                <img src={finalLogo} alt="VLANC Logo" className="w-full h-full object-contain" />
                            ) : null
                        )}
                    </div>
                </div>

                {/* COLUMNA DERECHA: Info de contacto */}
                <motion.div
                    className="flex items-center justify-center h-full w-full pl-10 print-force-visible"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showContent ? 1 : 0 }}
                    transition={{ duration: 1, ease: 'easeOut', delay: showContent ? 0.3 : 0 }}
                >
                    <div className="flex flex-col space-y-12 text-left w-full max-w-md translate-x-[100px]">
                        <div>
                            <h4 className="subtitulo2 font-bold not-italic mb-4 text-vlanc-black">/ {data?.location?.title}</h4>
                            <div className="cuerpo space-y-1 text-vlanc-secondary pl-6">
                                <p>{data?.location?.address}</p>
                                <p className="font-bold">{data?.location?.email}</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="subtitulo2 font-bold not-italic mb-4 text-vlanc-black">/ {data?.phone?.title}</h4>
                            <div className="cuerpo space-y-4 text-vlanc-secondary pl-6">
                                {data?.phone?.landline?.number && (
                                    <div className="flex items-center gap-4">
                                        <div className="shrink-0 w-5 h-5 flex items-center justify-center">
                                            {data.phone.landline.icon
                                                ? <img src={data.phone.landline.icon} alt="Tel" className="w-full h-full object-contain" />
                                                : <div className="w-4 h-4 bg-vlanc-secondary/20 rounded-full" />}
                                        </div>
                                        <p className="text-[15px]">{data.phone.landline.number}</p>
                                    </div>
                                )}
                                {data?.phone?.mobile?.number && (
                                    <div className="flex items-center gap-4">
                                        <div className="shrink-0 w-5 h-5 flex items-center justify-center">
                                            {data.phone.mobile.icon
                                                ? <img src={data.phone.mobile.icon} alt="Mobile" className="w-full h-full object-contain" />
                                                : <div className="w-4 h-4 bg-vlanc-secondary/20 rounded-full" />}
                                        </div>
                                        <p className="text-[15px]">{data.phone.mobile.number}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <h4 className="subtitulo2 font-bold not-italic mb-4 text-vlanc-black">/ {data?.web?.title}</h4>
                            <div className="pl-6">
                                <a
                                    href={data?.web?.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cuerpo border-b border-vlanc-primary text-vlanc-secondary hover:text-vlanc-primary transition-colors"
                                >
                                    {data?.web?.displayText}
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="subtitulo2 font-bold not-italic mb-4 text-vlanc-black">/ RRSS</h4>
                            <div className="flex gap-6 items-center pl-6">
                                {(data?.rrss ?? []).map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:opacity-60 transition-opacity w-6 h-6 flex items-center justify-center"
                                        title={social.name}
                                    >
                                        {social.icon
                                            ? <img src={social.icon} alt={social.name} className="w-full h-full object-contain" />
                                            : <div className="w-6 h-6 rounded-full bg-vlanc-secondary/20 flex items-center justify-center text-[10px] font-bold text-vlanc-secondary">{social.name?.charAt(0) ?? '?'}</div>}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="w-[112px] h-[5px] bg-[#8f4933] mt-[40px] ml-6" />
                    </div>
                </motion.div>
            </div>

            {/* Botón imprimir */}
            <motion.div
                className="absolute bottom-8 left-12 no-print"
                initial={{ opacity: 0 }}
                animate={{ opacity: showContent ? 1 : 0 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
            >
                <button
                    onClick={handlePrint}
                    className="text-[10px] font-bold tracking-[0.3em] text-vlanc-black/30 hover:text-vlanc-primary transition-all duration-300 uppercase outline-none"
                >
                    [ IMPRIMIR PROPUESTA / PDF ]
                </button>
            </motion.div>

            {/* OVERLAY ÚNICO: logo en fixed, se desplaza desde el centro hasta el placeholder del footer.
                - phase='playing': centrado, video reproduciéndose
                - phase='sliding': anima desde startRect hasta targetRect (posición del placeholder)
                - phase='done': desmontado; el placeholder del footer toma el relevo en exactamente el mismo lugar */}
            {phase !== 'done' && startRect && (
                <motion.div
                    className="fixed z-[100] overflow-hidden pointer-events-none print:hidden"
                    initial={{
                        left: startRect.left,
                        top: startRect.top,
                        width: startRect.width,
                        height: startRect.height,
                    }}
                    animate={
                        phase === 'sliding' && targetRect
                            ? {
                                left: targetRect.left,
                                top: targetRect.top,
                                width: targetRect.width,
                                height: targetRect.height,
                            }
                            : {
                                left: startRect.left,
                                top: startRect.top,
                                width: startRect.width,
                                height: startRect.height,
                            }
                    }
                    transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
                    onAnimationComplete={handleAnimationComplete}
                    style={{ position: 'fixed' }}
                >
                    {hasVideo ? (
                        <>
                            <video
                                src={finalLogoVideo!}
                                muted
                                playsInline
                                autoPlay
                                className="w-full h-full object-contain"
                                onEnded={handleVideoEnd}
                                onError={handleVideoError}
                                data-cursor-ignore
                            />
                            {finalLogo && (
                                <img src={finalLogo} alt="VLANC Logo" className="w-full h-full object-contain hidden print:block" />
                            )}
                        </>
                    ) : finalLogo ? (
                        <img src={finalLogo} alt="VLANC Logo" className="w-full h-full object-contain" />
                    ) : null}
                </motion.div>
            )}
        </footer>
    );
};

export default Contact;