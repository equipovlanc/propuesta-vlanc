
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
    <div className="min-h-screen bg-vlanc-bg font-sans text-vlanc-black selection:bg-vlanc-primary selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-vlanc-bg/80 backdrop-blur-md border-b border-vlanc-primary/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-[0.3em] text-vlanc-black font-serif">VLANC</span>
            <span className="text-[10px] tracking-[0.2em] text-vlanc-primary font-bold">ARQUITECTURA + INTERIORISMO</span>
          </div>
          <div className="hidden md:flex gap-8 text-[11px] font-bold tracking-[0.2em] text-vlanc-black/60 uppercase">
            <a href="#projects" className="hover:text-vlanc-primary transition-colors">Proyectos</a>
            <a href="#services" className="hover:text-vlanc-primary transition-colors">Servicios</a>
            <a href="#client-access" className="bg-vlanc-primary text-white px-5 py-2 rounded-sm hover:bg-vlanc-secondary transition-colors">Acceso Clientes</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
            alt="Minimal Architecture" 
            className="w-full h-full object-cover scale-105 animate-[kenburns_20s_ease-in-out_infinite] opacity-60"
          />
          <div className="absolute inset-0 bg-vlanc-bg/40"></div>
        </div>
        
        <div className="relative z-10 text-center px-6">
          <AnimatedSection>
            <h1 className="text-vlanc-black text-5xl md:text-[60px] font-serif leading-tight mb-6 uppercase tracking-tighter">
              DISEÑAMOS EL <br/>
              <span className="italic font-normal">ESPACIO DE TU VIDA</span>
            </h1>
            <p className="text-vlanc-black/80 text-[14px] md:text-[16px] max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
              Estudio boutique especializado en crear hogares con alma a través de la arquitectura consciente y el interiorismo de detalle.
            </p>
            <div className="mt-12">
              <a href="#projects" className="border-b-2 border-vlanc-primary text-vlanc-black py-2 tracking-[0.3em] text-[12px] font-bold hover:text-vlanc-primary transition-all uppercase">
                Ver Proyectos
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 bg-vlanc-bg">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-20">
            <h2 className="text-[12px] font-bold tracking-[0.4em] text-vlanc-primary uppercase mb-4">Nuestros Servicios</h2>
            <div className="w-16 h-[2px] bg-vlanc-primary mb-10"></div>
            <p className="text-[21px] md:text-[32px] font-serif text-vlanc-black max-w-3xl leading-snug">
              Acompañamos a nuestros clientes desde la <span className="italic">primera idea</span> hasta la <span className="font-bold">entrega de llaves</span>.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { 
                title: "Arquitectura", 
                desc: "Proyectos de obra nueva con enfoque en la eficiencia energética y la integración con el entorno natural.",
                img: "https://images.unsplash.com/photo-1518005020251-58296b8a8794?q=80&w=800&auto=format&fit=crop"
              },
              { 
                title: "Interiorismo", 
                desc: "Diseño de espacios interiores que transmiten calma, utilizando materiales nobles y una iluminación cuidada.",
                img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop"
              },
              { 
                title: "Project Management", 
                desc: "Gestión integral de obra y presupuestos para que no tengas que preocuparte por nada durante el proceso.",
                img: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=800&auto=format&fit=crop"
              }
            ].map((s, i) => (
              <AnimatedSection key={i} className="group cursor-default">
                <div className="aspect-[3/4] overflow-hidden mb-8 rounded-sm shadow-sm">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
                </div>
                <h3 className="text-[21px] font-serif mb-4 tracking-tight text-vlanc-black">{s.title}</h3>
                <p className="text-vlanc-black/60 text-[12px] leading-relaxed font-sans">{s.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-32 px-6 bg-vlanc-bg">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-20">
             <AnimatedSection>
                <h2 className="text-[12px] font-bold tracking-[0.4em] text-vlanc-primary uppercase mb-4">Proyectos</h2>
                <h3 className="text-4xl md:text-[60px] font-serif leading-none tracking-tighter">OBRAS RECIENTES</h3>
             </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection className="relative aspect-[16/10] group overflow-hidden shadow-lg">
               <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
               <div className="absolute inset-0 bg-vlanc-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-10 text-white">
                  <p className="text-[11px] tracking-[0.3em] font-bold uppercase mb-2">Valencia, 2023</p>
                  <h4 className="text-[24px] font-serif tracking-tight">Casa Minimalista Blanca</h4>
               </div>
            </AnimatedSection>
            <AnimatedSection className="relative aspect-[16/10] group overflow-hidden shadow-lg">
               <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
               <div className="absolute inset-0 bg-vlanc-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-10 text-white">
                  <p className="text-[11px] tracking-[0.3em] font-bold uppercase mb-2">Alicante, 2024</p>
                  <h4 className="text-[24px] font-serif tracking-tight">Ático Terraza al Mar</h4>
               </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Client Access Portal */}
      <section id="client-access" className="py-40 px-6 bg-vlanc-black text-vlanc-bg">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-vlanc-primary font-bold tracking-[0.4em] uppercase mb-8 text-[12px]">Portal de Clientes</h2>
            <h3 className="text-[32px] md:text-[48px] font-serif mb-12 tracking-tight leading-tight">¿Tienes un proyecto <br/><span className="italic">con nosotros?</span></h3>
            <p className="text-vlanc-bg/50 mb-12 max-w-lg mx-auto text-[12px] font-sans">
              Introduce el código de proyecto que te hemos facilitado para acceder a tu propuesta interactiva personalizada.
            </p>
            <form onSubmit={handleAccess} className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="text" 
                placeholder="Introduce tu código" 
                value={projectCode}
                onChange={(e) => setProjectCode(e.target.value)}
                className="flex-grow bg-white/5 border border-white/10 rounded-sm px-6 py-4 text-vlanc-bg focus:outline-none focus:border-vlanc-primary transition-colors tracking-widest text-[12px] uppercase font-sans"
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
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 bg-vlanc-bg text-center border-t border-vlanc-primary/10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[28px] font-serif font-bold tracking-[0.3em] text-vlanc-black mb-6">VLANC</p>
          <div className="flex justify-center gap-10 mb-12 text-[11px] text-vlanc-black/40 tracking-[0.3em] uppercase font-bold">
            <a href="#" className="hover:text-vlanc-primary transition-colors">Instagram</a>
            <a href="#" className="hover:text-vlanc-primary transition-colors">Behance</a>
            <a href="#" className="hover:text-vlanc-primary transition-colors">LinkedIn</a>
          </div>
          <p className="text-[9px] text-vlanc-black/30 tracking-[0.4em] uppercase font-bold">© 2024 VLANC Architecture & Interior Design. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default StudioLanding;
