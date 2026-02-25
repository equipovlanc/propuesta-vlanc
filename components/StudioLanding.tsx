
import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';

const StudioLanding: React.FC = () => {
  const [projectCode, setProjectCode] = useState('');

  const handleAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectCode.trim()) {
      window.location.href = `/${projectCode.trim().toLowerCase().replace(/\s+/g, '-')}`;
    }
  };

  return (
    <div className="min-h-screen bg-vlanc-bg font-sans text-vlanc-black flex flex-col items-center justify-center p-6 selection:bg-vlanc-primary selection:text-white">
      <div className="max-w-md w-full text-center space-y-16">
        {/* Logo Section */}
        <AnimatedSection>
          <div className="flex flex-col items-center">
            <span className="text-5xl font-bold tracking-[0.3em] text-vlanc-black font-serif mb-2">VLANC</span>
            <span className="text-[12px] tracking-[0.2em] text-vlanc-primary font-bold uppercase">Arquitectura + Interiorismo</span>
          </div>
        </AnimatedSection>

        {/* Access Form Section */}
        <AnimatedSection>
          <div className="space-y-8">
            <h1 className="text-[14px] font-bold tracking-[0.4em] text-vlanc-primary uppercase">Acceso Clientes</h1>
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
          </div>
        </AnimatedSection>

        {/* System Recommendation Message */}
        <AnimatedSection>
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
