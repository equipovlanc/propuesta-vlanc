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
  // Estado para bloquear la navegación (ej: Modal abierto en paso 3 de special-offers)
  const [isNavigationBlocked, setNavigationBlocked] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const slug = window.location.pathname.substring(1);
  const wheelTimeout = useRef<number | null>(null);

  const handlePrint = () => setIsPrinting(true);

  useEffect(() => {
    if (isPrinting) {
      const afterPrint = () => {
        setIsPrinting(false);
        window.removeEventListener('afterprint', afterPrint);
      };
      window.addEventListener('afterprint', afterPrint);
      
      const printTimeout = setTimeout(() => {
        window.print();
        const fallbackTimeout = setTimeout(() => {
          if (isPrinting) {
            setIsPrinting(false);
          }
        }, 1500);
        
        const clearFallback = () => clearTimeout(fallbackTimeout);
        window.addEventListener('afterprint', clearFallback, { once: true });

      }, 500);

      return () => {
        clearTimeout(printTimeout);
      };
    }
  }, [isPrinting]);

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
          "logos": logos{
            "smallLogo": smallLogo.asset->url, 
            "mainLogo": mainLogo.asset->url, 
            "finalLogo": finalLogo.asset->url,
            "finalLogoVideo": finalLogoVideo.asset->url
          },
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
            "callToAction": callToAction{..., "image": {"src": image.asset->url, "opacity": image.overlayOpacity}},
            "popupVideo": popupVideo.asset->url,
            "overlayLogo": overlayLogo.asset->url
          },
          "dividerSlide": dividerSlide{..., "image": {"src": image.asset->url, "opacity": image.overlayOpacity}, "video": video.asset->url},
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
    if (newIndex < 0) return; 
    if (newIndex === currentIndex) return;
    if (isAnimating) return; 
    if (isNavigationBlocked) return; // Bloqueo si hay modal abierto

    const isMovingForward = newIndex > currentIndex;
    if (sectionsRef.current && newIndex >= sectionsRef.current.length) return;
    
    setDirection(isMovingForward ? 1 : -1);
    setCurrentIndex(newIndex);
    
    // Recuperamos el ID de la sección actual para marcar como completada
    const currentSection = sectionsRef.current[currentIndex];
    if (isMovingForward && currentSection) {
        if (['mission', 'process', 'investment', 'special-offers', 'divider-slide'].includes(currentSection.id)) {
            setCompletedSections(prev => new Set(prev).add(currentSection.id));
        }
    }

    // Determinamos el paso inicial de la NUEVA sección
    const nextSection = sectionsRef.current[newIndex];
    if (nextSection) {
        if (nextSection.id === 'mission') {
            if (completedSections.has('mission')) setInternalStep(2);
            else setInternalStep(isMovingForward ? 0 : 2);
        } 
        else if (nextSection.id === 'process') {
            const processStepsCount = proposalData?.process?.steps?.length || 8;
            if (completedSections.has('process')) setInternalStep(processStepsCount);
            else setInternalStep(isMovingForward ? 0 : processStepsCount);
        }
        else if (nextSection.id === 'investment') {
            if (completedSections.has('investment')) setInternalStep(3);
            else setInternalStep(isMovingForward ? 0 : 3);
        }
        else if (nextSection.id === 'special-offers') {
            // Pasos: 0 (Init), 1 (Condiciones), 2 (Oferta), 3 (Video), 4 (Logo)
            if (completedSections.has('special-offers')) setInternalStep(4);
            else setInternalStep(isMovingForward ? 0 : 4);
        }
        else if (nextSection.id === 'divider-slide') {
            const dividerStepsCount = 3; // 0: init, 1: video, 2: image, 3: text
            if (completedSections.has('divider-slide')) setInternalStep(dividerStepsCount);
            else setInternalStep(isMovingForward ? 0 : dividerStepsCount);
        }
        else {
            setInternalStep(0);
        }
    }

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const navigateToId = (id: string) => {
      const index = sections.findIndex(s => s.id === id);
      if (index !== -1) navigate(index);
  };

  // Construct Sections Array dynamically
  const sections = (() => {
    if (!proposalData) return [];
    const d = proposalData;

    const list: any[] = [
        // 0: Hero
        { id: 'hero', comp: <Hero data={d.hero} headerData={d.header} logo={d.logos?.mainLogo} /> },
        // 1: Index
        { id: 'index', comp: <IndexSection data={d.index} onNavigate={(id) => navigateToId(id)} /> },
        // 2: Situation
        { id: 'situation', comp: <Situation data={d.situation} />, headerPage: 3 },
        // 3: Mission
        { id: 'mission', comp: <Mission isPrinting={isPrinting} data={d.mission} step={internalStep} />, headerPage: 4 },
        // 4: Process
        { id: 'process', comp: <Process isPrinting={isPrinting} data={d.process} guaranteeItem={d.guarantees?.items?.[0]} step={internalStep} />, headerPage: 5 },
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
        { id: 'investment', comp: <Investment isPrinting={isPrinting} data={d.investment} step={internalStep} />, headerPage: 14 },
        { 
            id: 'special-offers', 
            comp: <SpecialOffers 
                isPrinting={isPrinting}
                data={d.specialOffers} 
                investmentTitle={d.investment?.title} 
                locationDate={d.investment?.locationDate} 
                premiumService={d.premiumServicesList?.[1]} 
                step={internalStep} 
                setNavigationBlocked={setNavigationBlocked}
                isSectionCompleted={completedSections.has('special-offers')}
            />, 
            headerPage: 15 
        },
        { id: 'payment', comp: <Payment data={d.payment} investmentTitle={d.investment?.title} locationDate={d.investment?.locationDate} />, headerPage: 16 },
        { 
            id: 'divider-slide', 
            comp: <DividerSlide 
                isPrinting={isPrinting}
                data={d.dividerSlide} 
                step={internalStep}
                isSectionCompleted={completedSections.has('divider-slide')}
                setNavigationBlocked={setNavigationBlocked}
            />, 
            headerPage: 17
        },
        { id: 'guarantees', comp: <Guarantees data={d.guarantees} />, headerPage: 18 }
    );

    (d.premiumServicesList || []).forEach((service: any, i: number) => {
        list.push({
            id: `premium-${i+1}`,
            comp: <PremiumServices data={service} image={service.image} index={i} />,
            headerPage: 19 + i
        });
    });

    list.push({ id: 'contact', comp: <Contact onPrint={handlePrint} isPrinting={isPrinting} data={d.contact} finalLogo={d.logos?.finalLogo} finalLogoVideo={d.logos?.finalLogoVideo} /> });

    return list;
  })();

  const sectionsRef = useRef(sections);
  sectionsRef.current = sections;


  // Event Listeners
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
        if (isAnimating) return;
        if (Math.abs(e.deltaY) < 30) return;
        if (isNavigationBlocked) return; // Bloquear scroll si modal abierto

        if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
        
        wheelTimeout.current = window.setTimeout(() => {
             const activeSection = sections[currentIndex];
             const isCompleted = completedSections.has(activeSection.id);
             
             if (activeSection.id === 'mission' && !isCompleted) {
                if (e.deltaY > 0) {
                    if (internalStep < 2) { setInternalStep(prev => prev + 1); return; }
                } else {
                    if (internalStep > 0) { setInternalStep(prev => prev - 1); return; }
                }
             }

             if (activeSection.id === 'process' && !isCompleted) {
                 const totalSteps = proposalData?.process?.steps?.length || 8;
                 if (e.deltaY > 0) {
                     if (internalStep < totalSteps) { setInternalStep(prev => prev + 1); return; }
                 } else {
                     if (internalStep > 0) { setInternalStep(prev => prev - 1); return; }
                 }
             }

             if (activeSection.id === 'investment' && !isCompleted) {
                if (e.deltaY > 0) { 
                    if (internalStep < 3) { setInternalStep(prev => prev + 1); return; }
                } else {
                    if (internalStep > 0) { setInternalStep(prev => prev - 1); return; }
                }
             }

             if (activeSection.id === 'special-offers' && !isCompleted) {
                 if (e.deltaY > 0) {
                     if (internalStep < 4) { setInternalStep(prev => prev + 1); return; }
                 } else {
                     if (internalStep > 0) { setInternalStep(prev => prev - 1); return; }
                 }
             }
             
             if (activeSection.id === 'divider-slide' && !isCompleted) {
                const totalSteps = 3; // 0: init, 1: video, 2: image, 3: text
                if (e.deltaY > 0) {
                    if (internalStep < totalSteps) { setInternalStep(prev => prev + 1); return; }
                } else {
                    if (internalStep > 0) { setInternalStep(prev => prev - 1); return; }
                }
            }

             // Navegación Global Estándar
             if (e.deltaY > 0) navigate(currentIndex + 1);
             else navigate(currentIndex - 1);

        }, 50);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (isAnimating) return;
        if (isNavigationBlocked) return; // Bloquear teclado también

        const activeSection = sections[currentIndex];
        const isCompleted = completedSections.has(activeSection.id);

        const handleStep = (maxSteps: number) => {
             if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                if (internalStep < maxSteps) { setInternalStep(prev => prev + 1); return true; }
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                if (internalStep > 0) { setInternalStep(prev => prev - 1); return true; }
            }
            return false;
        };

        if (activeSection.id === 'mission' && !isCompleted) if (handleStep(2)) return;
        if (activeSection.id === 'process' && !isCompleted) if (handleStep(proposalData?.process?.steps?.length || 8)) return;
        if (activeSection.id === 'investment' && !isCompleted) if (handleStep(3)) return;
        if (activeSection.id === 'special-offers' && !isCompleted) if (handleStep(4)) return;
        if (activeSection.id === 'divider-slide' && !isCompleted) if (handleStep(3)) return;


        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') navigate(currentIndex + 1);
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') navigate(currentIndex - 1);
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, isAnimating, sections, internalStep, proposalData, completedSections, isNavigationBlocked]);


  // Renders
  if (!slug) return (
    <>
        <CustomCursor />
        <StudioLanding />
    </>
  );
  if (loading) return <div className="h-screen bg-vlanc-bg flex items-center justify-center text-vlanc-primary font-bold tracking-widest uppercase">Cargando...</div>;
  if (error) return <div className="h-screen bg-vlanc-bg flex items-center justify-center">{error}</div>;

  const activeSection = sections.length > 0 ? sections[currentIndex] : null;

  if (!slug) return (
    <>
        <CustomCursor />
        <StudioLanding />
    </>
  );
  if (loading) return <div className="h-screen bg-vlanc-bg flex items-center justify-center text-vlanc-primary font-bold tracking-widest uppercase">Cargando...</div>;
  if (error) return <div className="h-screen bg-vlanc-bg flex items-center justify-center">{error}</div>;

  return (
    <ScrollContext.Provider value={direction}>
      <div id="app-container" className={isPrinting ? 'is-printing' : ''}>
        <CustomCursor />
        {isPrinting ? (
          sections.map((section, idx) => (
            <div key={section.id} className="z-slide-container">
              {idx > 1 && section.headerPage && proposalData && (
                <Header 
                  logo={proposalData.logos?.smallLogo} 
                  pageNumber={section.headerPage} 
                  onNavigate={() => {}}
                />
              )}
              {section.comp}
            </div>
          ))
        ) : (
          activeSection && (
            <div className="fixed inset-0 w-full h-full overflow-hidden">
                {currentIndex > 1 && (
                    <Header 
                        logo={proposalData.logos?.smallLogo} 
                        pageNumber={activeSection.headerPage} 
                        onNavigate={navigate}
                    />
                )}
                <div className="relative w-full h-full perspective-[1000px]">
                    <AnimatePresence initial={true} custom={direction} mode="popLayout">
                        <SectionSlide key={currentIndex} id={activeSection.id} direction={direction}>
                            {activeSection.comp}
                        </SectionSlide>
                    </AnimatePresence>
                </div>
                <div className="absolute right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 pointer-events-none opacity-20">
                    {sections.map((_, i) => (
                        <div key={i} className={`w-1 h-1 rounded-full transition-all ${i === currentIndex ? 'bg-vlanc-primary scale-150' : 'bg-vlanc-black'}`} />
                    ))}
                </div>
            </div>
          )
        )}
      </div>
    </ScrollContext.Provider>
  );
};

export default App;