
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DividerSlideProps {
    data?: {
        image?: { src: string; opacity?: number };
        text?: string;
        video?: string;
    };
    step?: number;
    isSectionCompleted?: boolean;
    setNavigationBlocked?: (blocked: boolean) => void;
    isPrintMode?: boolean;
}

const DividerSlide: React.FC<DividerSlideProps> = ({ data, step = 0, isSectionCompleted = false, setNavigationBlocked, isPrintMode = false }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const [controlsVisible, setControlsVisible] = useState(false);
    const [videoFinished, setVideoFinished] = useState(false);

    // --- State for Custom Controls ---
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false); // Default unmuted as requested
    const [volume, setVolume] = useState(1);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const imageSrc = data?.image?.src;
    const imageOpacity = data?.image?.opacity ?? 15;
    const videoSrc = data?.video;

    // Video is visible on steps 0 and 1, only if NOT completed
    const isVideoVisible = (step === 0 || step === 1) && !isSectionCompleted;
    // Image is visible if completed OR in print mode OR if we specifically want it to replace the video
    // The user said: "al volver lo que estará sera la imagen" (back to page implies isSectionCompleted)
    const isImageVisible = isSectionCompleted || isPrintMode;

    // --- Effects for Video State Sync ---
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleVolumeChange = () => {
            setIsMuted(video.muted);
            setVolume(video.volume);
        };
        const handleTimeUpdate = () => setProgress(video.currentTime);
        const handleLoadedMetadata = () => setDuration(video.duration);

        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);
        video.addEventListener('volumechange', handleVolumeChange);
        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
            video.removeEventListener('volumechange', handleVolumeChange);
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, [videoSrc]);

    // Effect for programmatic playback on scroll
    useEffect(() => {
        if (step === 1 && !isSectionCompleted && videoRef.current) {
            videoRef.current.play().catch(error => {
                console.error("Video playback was prevented by the browser:", error);
            });
        }
    }, [step, isSectionCompleted]);

    // --- Global Mouse Tracking for Controls Visibility ---
    useEffect(() => {
        if (!isVideoVisible) {
            if (controlsVisible) setControlsVisible(false);
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            const node = videoContainerRef.current;
            if (!node) return;

            const { left, top, right, bottom } = node.getBoundingClientRect();
            const { clientX, clientY } = e;

            if (clientX >= left && clientX <= right && clientY >= top && clientY <= bottom) {
                if (!controlsVisible) setControlsVisible(true);
            } else {
                if (controlsVisible) setControlsVisible(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isVideoVisible, controlsVisible]);

    const handleVideoEnd = () => {
        // Stay at the last frame and show text
        setVideoFinished(true);
        setIsPlaying(false);
    };

    // --- Custom Controls Handlers ---
    const handlePlayPause = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        const video = videoRef.current;
        if (video) {
            video.paused ? video.play() : video.pause();
        }
    };

    const handleMuteToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        const video = videoRef.current;
        if (video) video.muted = !video.muted;
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const video = videoRef.current;
        if (video) {
            const newVolume = parseFloat(e.target.value);
            video.volume = newVolume;
            video.muted = newVolume === 0;
        }
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const video = videoRef.current;
        if (video) video.currentTime = parseFloat(e.target.value);
    };

    const handleFullscreen = (e: React.MouseEvent) => {
        e.stopPropagation();
        const videoElem = videoRef.current;
        if (videoElem?.requestFullscreen) videoElem.requestFullscreen();
        else if ((videoElem as any)?.webkitRequestFullscreen) (videoElem as any).webkitRequestFullscreen();
    };

    const formatTime = (time: number) => {
        if (isNaN(time) || time === 0) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <section className="h-full w-full flex flex-col items-center pt-[150px] px-[120px] relative">
            <div className="w-full max-w-[1191px] flex flex-col">
                <div className="w-full aspect-video shrink-0 relative">
                    {/* VIDEO CONTAINER */}
                    {videoSrc && (
                        <motion.div
                            className="absolute inset-0 bg-black"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isVideoVisible ? 1 : 0 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            style={{ pointerEvents: isVideoVisible ? 'auto' : 'none' }}
                        >
                            <div
                                ref={videoContainerRef}
                                className="relative w-full h-full"
                                onClick={() => handlePlayPause()}
                            >
                                <video
                                    ref={videoRef}
                                    src={videoSrc}
                                    playsInline
                                    onEnded={handleVideoEnd}
                                    className="w-full h-full object-contain shadow-xl rounded-[1px]"
                                />

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: controlsVisible ? 1 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex items-center gap-3 z-10"
                                    style={{ pointerEvents: controlsVisible ? 'auto' : 'none' }}
                                    onClick={e => e.stopPropagation()}
                                >
                                    <button onClick={handlePlayPause} className="text-white p-2 focus:outline-none cursor-pointer">
                                        {isPlaying ? <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg> : <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>}
                                    </button>

                                    <span className="text-white text-xs font-sans w-10 text-center">{formatTime(progress)}</span>
                                    <input type="range" min="0" max={duration || 0} value={progress} onChange={handleProgressChange} className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-vlanc-primary" />
                                    <span className="text-white text-xs font-sans w-10 text-center">{formatTime(duration)}</span>

                                    <div className="flex items-center gap-2">
                                        <button onClick={handleMuteToggle} className="text-white p-2 focus:outline-none cursor-pointer">
                                            {isMuted || volume === 0 ? <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" /></svg> : <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>}
                                        </button>
                                        <input type="range" min="0" max="1" step="0.05" value={isMuted ? 0 : volume} onChange={handleVolumeChange} className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-vlanc-primary" />
                                    </div>

                                    <button onClick={handleFullscreen} className="text-white p-2 focus:outline-none cursor-pointer">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" /></svg>
                                    </button>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}

                    {/* IMAGE CONTAINER */}
                    <motion.div
                        className="w-full h-full absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isImageVisible ? 1 : 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        style={{ pointerEvents: isImageVisible ? 'auto' : 'none' }}
                    >
                        {imageSrc && (
                            <div className="w-full h-full relative">
                                <img src={imageSrc} alt={data?.text || "Team"} className="w-full h-full object-cover shadow-xl rounded-[1px]" />
                                <div className="absolute inset-0 bg-[#8f4933] pointer-events-none rounded-[1px]" style={{ opacity: imageOpacity / 100 }} />
                            </div>
                        )}
                    </motion.div>
                </div>

                <motion.div
                    className="mt-12 text-right print-force-visible"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: (isSectionCompleted || videoFinished) ? 1 : 0,
                        y: (isSectionCompleted || videoFinished) ? 0 : 20
                    }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: (isSectionCompleted || videoFinished) ? 0.5 : 0 }}
                >
                    <h2 className="especial2">{data?.text || "¿Nos dejas acompañarte?"}</h2>
                </motion.div>
            </div>
        </section>
    );
};

export default DividerSlide;
