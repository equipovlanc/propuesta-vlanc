
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
import SectionSlide from './components/SectionSlide';
import StudioLanding from './components/StudioLanding'; 
import CustomCursor from './components/CustomCursor';
import sanityClient from './sanity/client';
import { ScrollContext } from './context/ScrollContext';

const App: React.FC = () => {
  const [proposalData, setProposalData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Virtual Scroll State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 = forward, -1 = backward
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Internal Step State
  const [internalStep, setInternalStep] = useState(0);
  // Estado para recordar qué secciones han sido completadas totalmente
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());

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

  // Navigation Logic defined BEFORE sections to be used in closure
  const navigate = (newIndex: number) => {
    if (newIndex < 0) return; // Removed length check here, handled by array access safety ideally or checked before call
    if (newIndex === currentIndex) return;
    if (isAnimating) return; 

    const isMovingForward = newIndex > currentIndex;
    // Safety check for array bounds
    if (sectionsRef.current && newIndex >= sectionsRef.current.length) return;
    
    // Need to access IDs from a stable source or recalculate. 
    // Since 'sections' is now derived on render, we can just use the logic below or access the current computed sections.
    // For simplicity inside navigate, we assume the caller passed a valid index.
    // However, to check ID specific logic we need the section objects.
    // We will let the effect handle the ID logic or just proceed with index.
    
    // To properly handle the 'nextSectionId' logic without circular dependency (sections -> navigate -> sections),
    // we can defer the ID check or assume the structure is stable enough.
    // Better yet, we construct sections on every render, so 'navigate' has access to 'sections' variable if defined before? 
    // No, 'sections' uses 'navigate'.
    
    // SOLUTION: Use a ref or simple logic since we know the IDs mapping.
    // Or just construct sections first, THEN navigate function? No, sections needs navigate.
    
    // We will define 'navigate' first, BUT it needs to know about section IDs for the logic below.
    // We can infer IDs based on index or just access the data directly.
    
    // Let's implement the logic with a helper to get ID from index
    // OR simply accept that we might need to look up the ID from the computed list in the previous render?
    // Actually, 'sections' is computed in render. We can access it if we define it as a variable, not state.
    
    setDirection(isMovingForward ? 1 : -1);
    setCurrentIndex(newIndex);
    
    // ID Logic moved to effect or simplified:
    // We can check the proposalData structure to know if we are going to mission/process.
    // Index 3 is Mission. Index 4 is Process. (Based on list order)
    
    // Hardcoded check based on known structure is safer than circular dependency
    // 0: Hero, 1: Index, 2: Situation, 3: Mission, 4: Process
    let nextId = '';
    if (newIndex === 3) nextId = 'mission';
    if (newIndex === 4) nextId = 'process';
    
    const currentId = currentIndex === 3 ? 'mission' : (currentIndex === 4 ? 'process' : '');

    // 1. MARCAR COMO COMPLETADA
    if (isMovingForward) {
        if (currentId === 'mission') setCompletedSections(prev => new Set(prev).add('mission'));
        if (currentId === 'process') setCompletedSections(prev => new Set(prev).add('process'));
    }

    // 2. DETERMINAR ESTADO INICIAL
    if (nextId === 'mission') {
        if (completedSections.has('mission')) {
            setInternalStep(2);
        } else {
            setInternalStep(isMovingForward ? 0 : 2);
        }
    } else if (nextId === 'process') {
         const processStepsCount = proposalData?.process?.steps?.length || 8;
         if (completedSections.has('process')) {
            setInternalStep(processStepsCount);
         } else {
            setInternalStep(isMovingForward ? 0 : processStepsCount);
         }
    } else {
         setInternalStep(0);
    }

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const navigateToId = (id: string) => {
      // Find index in current sections list
      const index = sections.findIndex(s => s.id === id);
      if (index !== -1) navigate(index);
  };

  // Construct Sections Array dynamically - REMOVED useMemo to prevent stale closures on 'navigate'
  // When 'internalStep' changes, 'navigate' sets it, triggering re-render.
  // If useMemo was here, it would capture the 'navigate' from the render where internalStep changed.
  // BUT that 'navigate' might have captured 'isAnimating = true' if not careful.
  // By removing useMemo, we ensure 'IndexSection' always gets the 'navigate' from the CURRENT render cycle.
  const sections = (() => {
    if (!proposalData) return [];
    const d = proposalData;

    const list = [
        // 0: Hero
        { id: 'hero', comp: <Hero data={d.hero} headerData={d.header} logo={d.logos?.mainLogo} /> },
        // 1: Index
        { id: 'index', comp: <IndexSection data={d.index} onNavigate={(id) => navigateToId(id)} /> },
        // 2: Situation
        { id: 'situation', comp: <Situation data={d.situation} />, headerPage: 3 },
        // 3: Mission
        { id: 'mission', comp: <Mission data={d.mission} step={internalStep} />, headerPage: 4 },
        // 4: Process (Le pasamos el internalStep)
        { id: 'process', comp: <Process data={d.process} guaranteeItem={d.guarantees?.items?.[0]} step={internalStep} />, headerPage: 5 },
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
  })();

  // Ref to keep track of sections for navigate function safety if needed, 
  // though we rely on hardcoded indices for specific logic inside navigate to avoid loops.
  const sectionsRef = useRef(sections);
  sectionsRef.current = sections;


  // Event Listeners
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
        if (isAnimating) return;
        if (Math.abs(e.deltaY) < 30) return;

        if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
        
        wheelTimeout.current = window.setTimeout(() => {
             const activeSection = sections[currentIndex];
             const isCompleted = completedSections.has(activeSection.id);
             
             // --- LÓGICA ESPECIAL MISION (Página 4) ---
             if (activeSection.id === 'mission') {
                 if (!isCompleted) {
                    if (e.deltaY > 0) { // Bajando
                        if (internalStep < 2) {
                            setInternalStep(prev => prev + 1);
                            return;
                        }
                    } else { // Subiendo
                        if (internalStep > 0) {
                            setInternalStep(prev => prev - 1);
                            return;
                        }
                    }
                 }
             }

             // --- LÓGICA ESPECIAL PROCESO (Página 5) ---
             if (activeSection.id === 'process') {
                 const totalSteps = proposalData?.process?.steps?.length || 8;
                 
                 if (!isCompleted) {
                     if (e.deltaY > 0) { // Bajando
                         if (internalStep < totalSteps) {
                             setInternalStep(prev => prev + 1);
                             return;
                         }
                     } else { // Subiendo
                         if (internalStep > 0) {
                             setInternalStep(prev => prev - 1);
                             return;
                         }
                     }
                 }
             }

             // Navegación Global Estándar
             if (e.deltaY > 0) {
                 navigate(currentIndex + 1);
             } else {
                 navigate(currentIndex - 1);
             }
        }, 50);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (isAnimating) return;
        const activeSection = sections[currentIndex];
        const isCompleted = completedSections.has(activeSection.id);

        // LOGICA ESPECIAL PARA PAGINA 4 (MISION) TECLADO
        if (activeSection.id === 'mission' && !isCompleted) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                if (internalStep < 2) {
                    setInternalStep(prev => prev + 1);
                    return;
                }
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                if (internalStep > 0) {
                    setInternalStep(prev => prev - 1);
                    return;
                }
            }
        }
        
        // LOGICA ESPECIAL PARA PAGINA 5 (PROCESO) TECLADO
        if (activeSection.id === 'process' && !isCompleted) {
            const totalSteps = proposalData?.process?.steps?.length || 8;
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                if (internalStep < totalSteps) {
                    setInternalStep(prev => prev + 1);
                    return;
                }
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                if (internalStep > 0) {
                    setInternalStep(prev => prev - 1);
                    return;
                }
            }
        }

        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') navigate(currentIndex + 1);
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') navigate(currentIndex - 1);
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, isAnimating, sections, internalStep, proposalData, completedSections]);


  // Renders
  if (!slug) return <StudioLanding />;
  if (loading) return <div className="h-screen bg-vlanc-bg flex items-center justify-center text-vlanc-primary font-bold tracking-widest uppercase">Cargando...</div>;
  if (error) return <div className="h-screen bg-vlanc-bg flex items-center justify-center">{error}</div>;

  const activeSection = sections[currentIndex];

  return (
    <ScrollContext.Provider value={direction}>
        <div id="app-container" className="fixed inset-0 w-full h-full overflow-hidden">
            <CustomCursor />
            
            {/* Renderizado Condicional del Header: Solo si NO es Hero (0) Y NO es Index (1) */}
            {currentIndex > 1 && (
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
                        direction={direction}
                    >
                        {activeSection.comp}
                    </SectionSlide>
                </AnimatePresence>
            </div>

            {/* Navigation Dots */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 pointer-events-none opacity-20">
                {sections.map((_, i) => (
                    <div key={i} className={`w-1 h-1 rounded-full transition-all ${i === currentIndex ? 'bg-vlanc-primary scale-150' : 'bg-vlanc-black'}`} />
                ))}
            </div>
        </div>
    </ScrollContext.Provider>
  );
};

export default App;
