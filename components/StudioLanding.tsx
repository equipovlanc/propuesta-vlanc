import React, { useState, useEffect } from 'react';
import AnimatedSection from './AnimatedSection';
import sanityClient from '../sanity/client';

const StudioLanding: React.FC = () => {
  const [projectCode, setProjectCode] = useState('');
  const [studioLogo, setStudioLogo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      } catch (err) {
        console.error("Error fetching studio logo:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLogo();
  }, []);

  const handleAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectCode.trim()) {
      window.location.href = `/${projectCode.trim().toLowerCase().replace(/\s+/g, '-')}`;
    }
  };

  if (isLoading || !studioLogo) {
    return <div className="min-h-screen bg-vlanc-bg" />;
  }

  return (
    <div className="min-h-screen bg-vlanc-bg font-sans text-vlanc-black flex flex-col items-center justify-center p-6 selection:bg-vlanc-primary selection:text-white relative overflow-hidden">

      <div className="flex flex-col items-center max-w-2xl w-full translate-y-[-40px]">
        {/* Logo Section (Hierarchy 1) */}
        <AnimatedSection hierarchy={1} className="flex flex-col items-center mb-16">
          <img
            src={studioLogo}
            alt="VLANC Architecture + Interiorismo"
            className="w-[288px] md:w-[432px] h-auto object-contain"
          />
        </AnimatedSection>

        {/* Access Form Section (Hierarchy 2) */}
        <AnimatedSection hierarchy={2} className="w-full max-w-md text-center space-y-8 z-10">
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
        </AnimatedSection>
      </div>

      {/* System Recommendation Message (Hierarchy 3) */}
      <div className="absolute bottom-16 w-full text-center px-6">
        <AnimatedSection hierarchy={3} className="mx-auto max-w-xs opacity-40">
          <div className="pt-8 border-t border-vlanc-primary/10">
            <p className="text-[11px] text-vlanc-black/40 tracking-[0.1em] leading-relaxed uppercase font-medium">
              Se recomienda usar <span className="text-vlanc-primary">F11</span> (pantalla completa)<br />
              y una resolución de aspecto de pantalla de <span className="text-vlanc-primary">1920x1080px</span>.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default StudioLanding;
