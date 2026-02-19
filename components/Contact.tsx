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
}

type AnimationPhase = 'playing' | 'moving' | 'finished';

// --- Sub-componente para el contenido del logo (Video o Imagen) ---
interface LogoContentProps {
    finalLogoVideo?: string | null;
    finalLogo?: string | null;
    onVideoError?: () => void;
}

const LogoContent = React.forwardRef<HTMLVideoElement, LogoContentProps>(
    ({ finalLogoVideo, finalLogo, onVideoError }, ref) => (
        <>
            {finalLogoVideo ? (
                <video
                    ref={ref}
                    src={finalLogoVideo}
                    muted
                    playsInline
                    loop={false} // Aseguramos que el video no entre en bucle
                    className="w-full h-full object-contain"
                    onError={onVideoError}
                    data-cursor-ignore // Atributo para que el cursor personalizado lo ignore
                />
            ) : finalLogo ? (
                <img src={finalLogo} alt="VLANC Final Logo" className="w-full h-full object-contain" />
            ) : (
                <div className="w-full h-full bg-vlanc-secondary/5 flex items-center justify-center border border-vlanc-secondary/10">
                    <span className="text-[10px] uppercase tracking-widest text-vlanc-secondary/30 font-bold">Logo Final</span>
                </div>
            )}
        </>
    )
);

const Contact: React.FC<ContactProps> = ({ data, finalLogo, finalLogoVideo }) => {
    const [videoHasError, setVideoHasError] = React.useState(false);
    const [phase, setPhase] = React.useState<AnimationPhase>(finalLogoVideo && !videoHasError ? 'playing' : 'finished');
    const videoRef = React.useRef<HTMLVideoElement>(null);

    const handleVideoError = React.useCallback(() => {
        console.warn("Animated logo failed to load. Falling back to static image.");
        if (!videoHasError) {
            setVideoHasError(true);
            if (phase === 'playing') {
                setPhase('moving');
            }
        }
    }, [phase, videoHasError]);

    const handlePrint = () => {
        window.print();
    };

    React.useEffect(() => {
        const video = videoRef.current;
        if (!video || phase !== 'playing' || videoHasError) {
            return;
        }

        let timeoutId: number;

        const transitionToNextPhase = () => {
            video.pause();
            cleanup();
            setPhase('moving');
        };

        const onTimeUpdate = () => {
            // Límite de tiempo por si la animación es más larga
            if (video.currentTime >= 6.5) {
                transitionToNextPhase();
            }
        };

        const onEnded = () => {
            // Se dispara si el video termina antes de los 6.5s
            transitionToNextPhase();
        };

        const cleanup = () => {
            video.removeEventListener('timeupdate', onTimeUpdate);
            video.removeEventListener('ended', onEnded);
            video.removeEventListener('canplay', onCanPlay);
            clearTimeout(timeoutId);
        };

        const onCanPlay = () => {
            timeoutId = window.setTimeout(() => {
                console.warn("Video animation timeout. Forcing transition.");
                cleanup();
                setPhase('moving');
            }, 10000); // Failsafe de 10s

            video.play().catch(e => {
                console.error("Autoplay was prevented for the animated logo.", e);
                cleanup();
                handleVideoError();
            });
        };

        video.addEventListener('timeupdate', onTimeUpdate);
        video.addEventListener('ended', onEnded);
        video.addEventListener('canplay', onCanPlay);
        
        video.load(); // Carga explícita para disparar 'canplay' o 'error'

        return cleanup;
    }, [phase, videoHasError, finalLogoVideo, handleVideoError]);

    const showContent = phase === 'finished';
    const effectiveVideoSrc = videoHasError ? null : finalLogoVideo;

    return (
        <footer className="h-screen w-full flex flex-col pt-[150px] pb-[140px] px-[120px] relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] w-full h-full">
                
                {/* COLUMNA IZQUIERDA: Contenedor final del Logo */}
                <div className="flex items-center justify-center h-full w-full">
                    <AnimatePresence>
                        {phase !== 'playing' && (
                            <motion.div
                                layoutId="final-logo-container"
                                className="w-full max-w-[785px] aspect-[785/691] flex items-center justify-center overflow-hidden relative p-4 -translate-x-[100px]"
                                transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
                                onLayoutAnimationComplete={() => {
                                    if (phase === 'moving') {
                                        setPhase('finished');
                                    }
                                }}
                            >
                                <LogoContent
                                    ref={videoRef}
                                    finalLogo={finalLogo}
                                    finalLogoVideo={effectiveVideoSrc}
                                    onVideoError={handleVideoError}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* COLUMNA DERECHA: Datos de Contacto */}
                <motion.div
                    className="flex items-center justify-center h-full w-full pl-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showContent ? 1 : 0 }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                >
                    <div className="flex flex-col space-y-12 text-left w-full max-w-md translate-x-[100px]">
                        {/* ... contenido de contacto ... */}
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
                                        <div className="shrink-0 w-5 h-5 flex items-center justify-center">{data.phone.landline.icon ? <img src={data.phone.landline.icon} alt="Tel" className="w-full h-full object-contain" /> : <div className="w-4 h-4 bg-vlanc-secondary/20 rounded-full"></div>}</div>
                                        <p className="text-[15px]">{data.phone.landline.number}</p>
                                    </div>
                                )}
                                {data?.phone?.mobile?.number && (
                                    <div className="flex items-center gap-4">
                                        <div className="shrink-0 w-5 h-5 flex items-center justify-center">{data.phone.mobile.icon ? <img src={data.phone.mobile.icon} alt="Mobile" className="w-full h-full object-contain" /> : <div className="w-4 h-4 bg-vlanc-secondary/20 rounded-full"></div>}</div>
                                        <p className="text-[15px]">{data.phone.mobile.number}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <h4 className="subtitulo2 font-bold not-italic mb-4 text-vlanc-black">/ {data?.web?.title}</h4>
                            <div className="pl-6">
                                <a href={data?.web?.url} target="_blank" rel="noopener noreferrer" className="cuerpo border-b border-vlanc-primary text-vlanc-secondary hover:text-vlanc-primary transition-colors">{data?.web?.displayText}</a>
                            </div>
                        </div>
                        <div>
                             <h4 className="subtitulo2 font-bold not-italic mb-4 text-vlanc-black">/ RRSS</h4>
                             <div className="flex gap-6 items-center pl-6">
                                {(data?.rrss ?? []).map((social, i) => (
                                    <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity w-6 h-6 flex items-center justify-center" title={social.name}>
                                        {social.icon ? <img src={social.icon} alt={social.name} className="w-full h-full object-contain" /> : <div className="w-6 h-6 rounded-full bg-vlanc-secondary/20 flex items-center justify-center text-[10px] font-bold text-vlanc-secondary">{social.name ? social.name.charAt(0) : '?'}</div>}
                                    </a>
                                ))}
                             </div>
                        </div>
                        <div className="w-[112px] h-[5px] bg-[#8f4933] mt-[40px] ml-6" />
                    </div>
                </motion.div>
            </div>

            {/* Posicionador del Logo Animado Inicial */}
            <AnimatePresence>
                {phase === 'playing' && effectiveVideoSrc && (
                    <div className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none">
                        <motion.div
                            layoutId="final-logo-container"
                            className="w-full max-w-[785px] aspect-[785/691] flex items-center justify-center overflow-hidden relative p-4"
                            style={{ pointerEvents: 'auto' }}
                        >
                            <LogoContent
                                ref={videoRef}
                                finalLogo={finalLogo}
                                finalLogoVideo={effectiveVideoSrc}
                                onVideoError={handleVideoError}
                            />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* BOTÓN DE IMPRESIÓN */}
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
        </footer>
    );
};

export default Contact;