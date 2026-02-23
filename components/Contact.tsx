import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

// Logo content: muestra video (para web) e imagen estática (para impresión)
const LogoContent: React.FC<{
    finalLogoVideo?: string | null;
    finalLogo?: string | null;
    autoPlay?: boolean;
    onVideoEnd?: () => void;
    onVideoError?: () => void;
}> = ({ finalLogoVideo, finalLogo, autoPlay = false, onVideoEnd, onVideoError }) => {
    if (finalLogoVideo) {
        return (
            <>
                <video
                    src={finalLogoVideo}
                    muted
                    playsInline
                    loop={false}
                    autoPlay={autoPlay}
                    className="w-full h-full object-contain print:hidden"
                    onEnded={onVideoEnd}
                    onError={onVideoError}
                    data-cursor-ignore
                />
                {finalLogo && (
                    <img
                        src={finalLogo}
                        alt="VLANC Final Logo"
                        className="w-full h-full object-contain hidden print:block"
                    />
                )}
            </>
        );
    }
    if (finalLogo) {
        return <img src={finalLogo} alt="VLANC Final Logo" className="w-full h-full object-contain" />;
    }
    return (
        <div className="w-full h-full bg-vlanc-secondary/5 flex items-center justify-center border border-vlanc-secondary/10">
            <span className="text-[10px] uppercase tracking-widest text-vlanc-secondary/30 font-bold">Logo Final</span>
        </div>
    );
};

const Contact: React.FC<ContactProps> = ({ data, finalLogo, finalLogoVideo, onPrint, isSectionCompleted = false }) => {
    const [videoHasError, setVideoHasError] = React.useState(false);

    const hasVideo = !!finalLogoVideo && !videoHasError;

    // Si ya estaba completado o no hay video, arrancamos directo con todo visible.
    const skipAnimation = isSectionCompleted || !hasVideo;

    // overlayActive: controla si el overlay de reproducción está montado
    const [overlayActive, setOverlayActive] = React.useState(!skipAnimation);
    // contentVisible: solo se activa DESPUÉS de que el overlay haya desaparecido del todo
    const [contentVisible, setContentVisible] = React.useState(skipAnimation);

    const handleVideoEnd = React.useCallback(() => {
        // El video terminó: desmontamos el overlay. El contenido aparecerá en onExitComplete.
        setOverlayActive(false);
    }, []);

    const handleVideoError = React.useCallback(() => {
        setVideoHasError(true);
        setOverlayActive(false);
    }, []);

    const handleOverlayExited = React.useCallback(() => {
        // El overlay ha terminado completamente su fade-out. Ahora mostramos el contenido.
        setContentVisible(true);
    }, []);

    const handlePrint = () => {
        if (onPrint) {
            onPrint();
        } else {
            setTimeout(() => window.print(), 500);
        }
    };

    return (
        <footer className="h-screen w-full flex flex-col pt-[150px] pb-[140px] px-[120px] relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] w-full h-full">

                {/* COLUMNA IZQUIERDA: Logo en posición final */}
                <div className="flex items-center justify-center h-full w-full">
                    <AnimatePresence>
                        {contentVisible && (
                            <motion.div
                                className="w-full max-w-[785px] aspect-[785/691] flex items-center justify-center overflow-hidden relative p-4 -translate-x-[100px] print-force-visible"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                            >
                                {/* Muestra el video (primer frame, sin autoplay) o imagen para impresión */}
                                <LogoContent
                                    finalLogoVideo={hasVideo ? finalLogoVideo : null}
                                    finalLogo={finalLogo}
                                    autoPlay={false}
                                    onVideoError={handleVideoError}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* COLUMNA DERECHA: Info de contacto */}
                <motion.div
                    className="flex items-center justify-center h-full w-full pl-10 print-force-visible"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: contentVisible ? 1 : 0 }}
                    transition={{ duration: 1, ease: 'easeOut', delay: contentVisible ? 0.3 : 0 }}
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
                animate={{ opacity: contentVisible ? 1 : 0 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
            >
                <button
                    onClick={handlePrint}
                    className="text-[10px] font-bold tracking-[0.3em] text-vlanc-black/30 hover:text-vlanc-primary transition-all duration-300 uppercase outline-none"
                >
                    [ IMPRIMIR PROPUESTA / PDF ]
                </button>
            </motion.div>

            {/* OVERLAY: video del logo, centrado, solo en primera visita.
                onExitComplete dispara contentVisible=true DESPUÉS de que el fade sea completo.
                Así nunca se solapa el contenido con el overlay. */}
            <AnimatePresence onExitComplete={handleOverlayExited}>
                {overlayActive && hasVideo && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-vlanc-bg pointer-events-none print:hidden"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: 'easeInOut' }}
                    >
                        <div className="w-full max-w-[785px] aspect-[785/691] flex items-center justify-center overflow-hidden relative p-4">
                            <LogoContent
                                finalLogoVideo={finalLogoVideo}
                                finalLogo={finalLogo}
                                autoPlay={true}
                                onVideoEnd={handleVideoEnd}
                                onVideoError={handleVideoError}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </footer>
    );
};

export default Contact;