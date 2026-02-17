
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import IndexSection from './components/IndexSection';
import Situation from './components/Situation';
import Mission from './components/Mission';
import Process from './components/Process';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Scope from './components/Scope';
import ScopePhases from './components/ScopePhases';
import Investment from './components/Investment';
import SpecialOffers from './components/SpecialOffers';
import Payment from './components/Payment';
import Guarantees from './components/Guarantees';
import PremiumServices from './components/PremiumServices';
import DividerSlide from './components/DividerSlide';
import Contact from './components/Contact';
import SectionSlide from './components/SectionSlide'; // Ahora es el Z-Slide
import StudioLanding from './components/StudioLanding'; 
import CustomCursor from './components/CustomCursor';
import sanityClient from './sanity/client';

const App: React.FC = () => {
  const [proposalData, setProposalData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Virtual Scroll State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 = forward, -1 = backward
  const [isAnimating, setIsAnimating] = useState(false);
  
  const slug = window.location.pathname.substring(1);
  const wheelTimeout = useRef<number | null>(null);

  // Fetch Data
  useEffect(() => {
    const fetchProposalData = async () => {
      if (!slug) { 
        setLoading(false); 
        return; 
      }
      try {
        const query = `*[_type == "proposal" && slug.current == $slug][0]{
          ...,
          "logos": logos{"smallLogo": smallLogo.asset->url, "mainLogo": mainLogo.asset->url, "finalLogo": finalLogo.asset->url},
          "index": index{..., "image": {"src": image.asset->url, "opacity": image.overlayOpacity}},
          "situation": situation{..., "image": {"src": image.asset->url, "opacity": image.overlayOpacity}},
          "mission": mission{..., "image": {"src": image.asset->url, "opacity": image.overlayOpacity}, "video": video.asset->url},
          "team": team{..., "members": members[]{..., "image": {"src": image.asset->url, "opacity": image.overlayOpacity}}},
          "testimonials": testimonials{..., "items": items[]{..., "img": {"src": img.asset->url, "opacity": img.overlayOpacity}}},
          "scopeIntro": scopeIntro{..., "image": {"src": image.asset->url, "opacity": image.overlayOpacity}, "video": video.asset->url},
          "scopePhases": scopePhases1.phases[] {..., "image": {"src": image.asset->url, "opacity": image.overlayOpacity}, "video": video.asset->url} + scopePhases2.phases[] {..., "image": {"src": image.asset->url, "opacity": image.overlayOpacity}, "video": video.asset->url},
          "specialOffers": specialOffers{
            ..., 
            conditionalOffer,
            launchOffer,
            "callToAction": callToAction{..., "image": {"src": image.asset->url, "opacity": image.overlayOpacity}}
          },
          "guarantees": guarantees{..., "items": items[]{..., "icon": icon.asset->url}},
          "premiumServicesList": premiumServices.services[]{..., "image": {"src": image.asset->url, "opacity": image.overlayOpacity}},
          "contact": contact{
            ..., 
            "image": {"src": image.asset->url, "opacity": image.overlayOpacity}, 
            "phone": phone{
                ...,
                "landline": landline{..., "icon": icon.asset->url},
                "mobile": mobile{..., "icon": icon.asset->url}
            },
            "rrss": rrss[]{..., "icon": icon.asset->url}
          }
        }`;
        const data = await sanityClient.fetch(query, { slug });
        if (!data) setError("No se ha encontrado la propuesta solicitada.");
        else setProposalData(data);
      } catch (err) {
        console.error(err);
        setError("Error de conexión.");
      } finally {
        setLoading(false);
      }
    };
    fetchProposalData();
  }, [slug]);

  // Construct Sections Array dynamically
  const sections = useMemo(() => {
    if (!proposalData) return [];
    const d = proposalData;
    
    // Helper para mapear IDs a índices
    const mapIdToSection = (id: string) => {
        // Esta lógica debe coincidir con el orden de abajo
        // Simplemente definimos el orden y luego podemos buscar
    };

    const list = [
        // 0: Hero
        { id: 'hero', comp: <Hero data={d.hero} headerData={d.header} logo={d.logos?.mainLogo} /> },
        // 1: Index
        { id: 'index', comp: <IndexSection data={d.index} onNavigate={(id) => navigateToId(id)} /> },
        // 2: Situation
        { id: 'situation', comp: <Situation data={d.situation} />, headerPage: 3 },
        // 3: Mission
        { id: 'mission', comp: <Mission data={d.mission} />, headerPage: 4 },
        // 4: Process
        { id: 'process', comp: <Process data={d.process} guaranteeItem={d.guarantees?.items?.[0]} />, headerPage: 5 },
        // 5: Team
        { id: 'team', comp: <Team data={d.team} />, headerPage: 6 },
        // 6: Testimonials
        { id: 'testimonials', comp: <Testimonials data={d.testimonials} />, headerPage: 7 },
        // 7: Scope Intro
        { id: 'scope', comp: <Scope data={d.scopeIntro} />, headerPage: 8 },
    ];

    // Phases
    (d.scopePhases || []).forEach((phase: any, i: number) => {
        const numPhases1 = d.scopePhases1?.phases?.length || 0;
        const currentSectionTitle = i < numPhases1 ? d.scopePhases1?.title : d.scopePhases2?.title;
        list.push({
            id: `phase-${i+1}`,
            comp: <ScopePhases data={phase} mainTitle={currentSectionTitle} guaranteeItem={d.guarantees?.items?.[i + 1]} />,
            headerPage: 9 + i
        });
    });

    list.push(
        { id: 'investment', comp: <Investment data={d.investment} />, headerPage: 14 },
        { id: 'special-offers', comp: <SpecialOffers data={d.specialOffers} investmentTitle={d.investment?.title} locationDate={d.investment?.locationDate} premiumService={d.premiumServicesList?.[1]} />, headerPage: 15 },
        { id: 'payment', comp: <Payment data={d.payment} investmentTitle={d.investment?.title} locationDate={d.investment?.locationDate} />, headerPage: 16 },
        { id: 'team-photo', comp: <DividerSlide image={d.contact?.image} text="¿Nos dejas acompañarte?" /> },
        { id: 'guarantees', comp: <Guarantees data={d.guarantees} />, headerPage: 18 }
    );

    (d.premiumServicesList || []).forEach((service: any, i: number) => {
        list.push({
            id: `premium-${i+1}`,
            comp: <PremiumServices data={service} image={service.image} index={i} />,
            headerPage: 19 + i
        });
    });

    list.push({ id: 'contact', comp: <Contact data={d.contact} finalLogo={d.logos?.finalLogo} /> });

    return list;
  }, [proposalData]);

  // Navigation Logic
  const navigate = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= sections.length) return;
    if (newIndex === currentIndex) return;
    if (isAnimating) return; // Debounce animations

    setDirection(newIndex > currentIndex ? 1 : -1);
    setCurrentIndex(newIndex);
    setIsAnimating(true);
    
    // Allow new navigation after animation completes
    setTimeout(() => setIsAnimating(false), 1200);
  };

  const navigateToId = (id: string) => {
      const index = sections.findIndex(s => s.id === id);
      if (index !== -1) navigate(index);
  };

  // Event Listeners
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
        if (isAnimating) return;
        
        // Threshold to ignore small trackpad movements
        if (Math.abs(e.deltaY) < 30) return;

        if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
        
        wheelTimeout.current = window.setTimeout(() => {
             if (e.deltaY > 0) {
                 navigate(currentIndex + 1);
             } else {
                 navigate(currentIndex - 1);
             }
        }, 50);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (isAnimating) return;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') navigate(currentIndex + 1);
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') navigate(currentIndex - 1);
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, isAnimating, sections]);


  // Renders
  if (!slug) return <StudioLanding />;
  if (loading) return <div className="h-screen bg-vlanc-bg flex items-center justify-center text-vlanc-primary font-bold tracking-widest uppercase">Cargando...</div>;
  if (error) return <div className="h-screen bg-vlanc-bg flex items-center justify-center">{error}</div>;

  const activeSection = sections[currentIndex];

  return (
    // CAMBIO IMPORTANTE: Se elimina bg-vlanc-bg para ver el grid del body
    <div id="app-container" className="fixed inset-0 w-full h-full overflow-hidden">
        <CustomCursor />
        
        {/* Renderizado Condicional del Header: Solo si no es Hero */}
        {currentIndex > 0 && (
             <Header 
                logo={proposalData.logos?.smallLogo} 
                pageNumber={activeSection.headerPage} 
                onNavigate={navigate}
             />
        )}

        {/* 3D STAGE */}
        <div className="relative w-full h-full perspective-[1000px]">
             <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <SectionSlide 
                    key={currentIndex} 
                    id={activeSection.id}
                    isActive={true}
                    direction={direction}
                >
                    {activeSection.comp}
                </SectionSlide>
             </AnimatePresence>
        </div>

        {/* Navigation Dots (Opcional, visual feedback) */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 pointer-events-none opacity-20">
            {sections.map((_, i) => (
                <div key={i} className={`w-1 h-1 rounded-full transition-all ${i === currentIndex ? 'bg-vlanc-primary scale-150' : 'bg-vlanc-black'}`} />
            ))}
        </div>
    </div>
  );
};

export default App;
