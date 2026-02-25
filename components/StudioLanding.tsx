import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sanityClient from '../sanity/client';

const StudioLanding: React.FC = () => {
  const [projectCode, setProjectCode] = useState('');
  const [studioLogo, setStudioLogo] = useState<string | null>(null);
  const [stage, setStage] = useState<'loading' | 'logo-intro' | 'recommendation' | 'final'>('loading');

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const query = `*[_type == "proposal"] | order(_createdAt desc)[0]{
          "mainLogo": logos.mainLogo.asset->url
        }`;
        const data = await sanityClient.fetch(query);
        if (data?.mainLogo) {
          setStudioLogo(data.mainLogo);
        }
        setStage('logo-intro');
      } catch (err) {
        console.error("Error fetching studio logo:", err);
        setStage('logo-intro');
      }
    };
    fetchLogo();
  }, []);

  useEffect(() => {
    if (stage === 'logo-intro') {
      const timer = setTimeout(() => setStage('recommendation'), 2000);
      return () => clearTimeout(timer);
    }
    if (stage === 'recommendation') {
      const timer = setTimeout(() => setStage('final'), 2500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectCode.trim()) {
      window.location.href = `/${projectCode.trim().toLowerCase().replace(/\s+/g, '-')}`;
    }
  };

  const showRecommendation = stage === 'recommendation' || stage === 'final';
  const isFinal = stage === 'final';

  return (
    <div className="min-h-screen bg-vlanc-bg font-sans text-vlanc-black flex flex-col items-center justify-center p-6 selection:bg-vlanc-primary selection:text-white relative overflow-hidden">

      {/* Centered Logo Container */}
      <motion.div
        layout
        initial={false}
        className="z-10 flex flex-col items-center"
        animate={{
          y: isFinal ? -80 : 0, // Move up in final stage
          scale: isFinal ? 1 : 2, // 1x in final, 2x in intro
        }}
        transition={{
          duration: 2.5,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {studioLogo ? (
          <img
            src={studioLogo}
            alt="VLANC Architecture + Interiorismo"
            className="w-64 md:w-80 h-auto object-contain"
          />
        ) : (
          <div className="flex flex-col items-center">
            <span className="text-5xl font-bold tracking-[0.3em] text-vlanc-black font-serif mb-2">VLANC</span>
            <span className="text-[12px] tracking-[0.2em] text-vlanc-primary font-bold uppercase">Arquitectura + Interiorismo</span>
          </div>
        )}
      </motion.div>

      {/* Access Form Section */}
      <AnimatePresence>
        {isFinal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 w-full max-w-md text-center space-y-8 z-10"
          >
            <h1 className="text-[14px] font-bold text-vlanc-primary uppercase">Acceso Clientes</h1>
            <form onSubmit={handleAccess} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Introduce tu código"
                value={projectCode}
                onChange={(e) => setProjectCode(e.target.value)}
                className="bg-white border border-vlanc-primary/20 rounded-sm px-6 py-4 text-vlanc-black focus:outline-none focus:border-vlanc-primary transition-colors tracking-widest text-[12px] uppercase font-sans text-center"
              />
              <button
                type="submit"
                className="bg-vlanc-primary hover:bg-vlanc-secondary text-white font-bold px-10 py-4 rounded-sm transition-all tracking-widest uppercase text-[12px]"
              >
                Acceder
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* System Recommendation Message */}
      <AnimatePresence>
        {showRecommendation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute bottom-12 w-full text-center px-6 transition-opacity duration-1000 ${isFinal ? 'opacity-40' : 'opacity-100'}`}
          >
            <div className={`mx-auto max-w-xs pt-8 border-t border-vlanc-primary/10`}>
              <p className="text-[11px] text-vlanc-black tracking-[0.1em] leading-relaxed uppercase font-medium">
                Se recomienda usar <span className="text-vlanc-primary">F11</span> (pantalla completa)<br />
                y una resolución de aspecto de pantalla de <span className="text-vlanc-primary">1920x1080px</span>.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudioLanding;
