
import React, { useState, useEffect, useRef } from 'react';
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
import ScopePhases2 from './components/ScopePhases2'; 
import Investment from './components/Investment';
import SpecialOffers from './components/SpecialOffers';
import Payment from './components/Payment';
import Guarantees from './components/Guarantees';
import PremiumServices from './components/PremiumServices';
import DividerSlide from './components/DividerSlide';
import Contact from './components/Contact';
import SectionSlide from './components/SectionSlide';
import StudioLanding from './components/StudioLanding'; 
import { proposalData as localProposalData } from './data/proposal.data';
import sanityClient from './sanity/client';

// Define the type for your proposal data.
type ProposalData = typeof localProposalData;

const App: React.FC = () => {
  const [proposalData, setProposalData] = useState<ProposalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 17; // Total number of slides

  // Obtener el slug de la URL actual
  const slug = window.location.pathname.substring(1);

  // --- KEYBOARD NAVIGATION LOGIC ---
  useEffect(() => {
    const handleScroll = () => {
        if (!containerRef.current) return;
        const slides = Array.from(containerRef.current.querySelectorAll('.section-slide')) as HTMLElement[];
        const scrollPosition = containerRef.current.scrollTop + (window.innerHeight / 2);
        
        const index = slides.findIndex(slide => {
            return slide.offsetTop <= scrollPosition && (slide.offsetTop + slide.offsetHeight) > scrollPosition;
        });

        if (index !== -1) {
            setCurrentSlide(index + 1);
        }
    };

    const currentRef = containerRef.current;
    if (currentRef) {
        currentRef.addEventListener('scroll', handleScroll);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentRef || !slug) return;

      const slides = Array.from(currentRef.querySelectorAll('.section-slide')) as HTMLElement[];
      let targetSlide: HTMLElement | null = null;
      
      // Encontrar el slide actual basado en scroll
      let currentIndex = slides.findIndex(slide => {
        const rect = slide.getBoundingClientRect();
        return Math.abs(rect.top) < 5; // Tolerancia pequeña
      });

      // Fallback si no está perfectamente alineado
      if (currentIndex === -1) {
           currentIndex = slides.findIndex(slide => {
            const rect = slide.getBoundingClientRect();
            return rect.top >= -window.innerHeight / 2 && rect.top < window.innerHeight / 2;
          });
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        targetSlide = slides[currentIndex + 1];
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        targetSlide = slides[currentIndex - 1];
      }

      if (targetSlide) {
          targetSlide.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
        if (currentRef) currentRef.removeEventListener('scroll', handleScroll);
    };
  }, [loading, slug]);

  useEffect(() => {
    const fetchProposalData = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setProposalData(null);

      const isSanityConfigured = sanityClient.config().projectId && sanityClient.config().projectId !== 'your-project-id';

      if (!isSanityConfigured) {
        console.warn("Sanity no configurado o ID por defecto. Usando datos locales.");
        setProposalData(localProposalData);
        setLoading(false);
        return;
      }
      
      try {
        const query = `*[_type == "proposal" && slug.current == $slug][0]{
          ...,
          "header": header{..., "logo": logo.asset->url},
          "hero": hero{...},
          "index": index{..., "items": items[]{...}, "image": image.asset->url},
          "situation": situation{..., "image": image.asset->url},
          "mission": mission{
            ...,
            "videoFile": videoFile.asset->url,
            "videoUrl": videoUrl,
            "image": image.asset->url,
            "printImage": printImage.asset->url,
            "mission": mission{...},
            "achievements": achievements{..., "listItems": listItems[]}
          },
          "process": process{..., "steps": steps[]{...}},
          "team": team{
            ...,
            "purpose": purpose{...},
            "history": history{...},
            "members": members[]{..., "img": img.asset->url}
          },
          "testimonials": testimonials{..., "items": items[]{..., "img": img.asset->url}},
          "scopeIntro": scopeIntro{
            ...,
            "images": images[].asset->url,
            "intervention": intervention{..., "breakdown": breakdown[]}
          },
          "scopePhases1": scopePhases1{
            ..., 
            "videoFile": videoFile.asset->url,
            "videoUrl": videoUrl,
            "phases": phases[]{..., "subPhases": subPhases[]{...}}
          },
          "scopePhases2": scopePhases2{..., "phases": phases[]{..., "subPhases": subPhases[]{...}}},
          "investment": investment{..., "plansDescription": plansDescription[]{...}, "plans": plans[]{..., "features": features[]}, "featureLabels": featureLabels[]},
          "specialOffers": specialOffers{
            ...,
            "callToAction": callToAction{..., "image": image.asset->url},
            "conditionalOffer": conditionalOffer{..., "discountedPlans": discountedPlans[]{...}},
            "launchOffer": launchOffer{...}
          },
          "payment": payment{ 
            ...,
            "paymentMethods": paymentMethods{..., "plans": plans[]{..., "payments": payments[]{...}}},
            "finePrint": finePrint{..., "points": points[]}
          },
          "dividerSlide": divider{..., "image": image.asset->url},
          "guarantees": guarantees{..., "items": items[]{...}},
          "premiumServices": premiumServices{..., "services": services[]{..., "description": description[]}},
          "contact": contact{
            ...,
            "image": image.asset->url,
            "location": location{...},
            "phone": phone{..., "numbers": numbers[]},
            "web": web{...}
          }
        }`;
        const params = { slug };
        const data = await sanityClient.fetch<ProposalData>(query, params);

        if (data) {
          setProposalData(data);
        } else {
          setError(`No se encontró la propuesta "${slug}" en Sanity.`);
        }
      } catch (err) {
        console.error('Error fetching data from Sanity:', err);
        setError(`Error de conexión con Sanity: ${(err as any).message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProposalData();
  }, [slug]);

  if (!slug) return <StudioLanding />;
  
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-vlanc-bg">
        <div className="animate-pulse flex flex-col items-center">
             <div className="text-[32px] font-serif font-bold tracking-[0.2em] leading-none text-vlanc-black mb-4">VLANC</div>
             <p className="text-vlanc-primary text-[10px] tracking-widest uppercase">Cargando Propuesta...</p>
        </div>
    </div>
  );

  if (error && !proposalData) return (
    <div className="min-h-screen flex items-center justify-center p-8 text-center bg-vlanc-bg text-vlanc-black">
        <div className="max-w-lg">
             <h2 className="title-xl text-vlanc-primary mb-4">¡Vaya!</h2>
             <p className="text-body mb-6">{error}</p>
             <a href="/" className="bg-vlanc-primary text-white px-8 py-3 rounded-sm hover:bg-vlanc-secondary transition-colors uppercase tracking-widest text-[10px] font-bold">Volver al inicio</a>
        </div>
    </div>
  );
  
  const data = proposalData || localProposalData;

  return (
    <div className="relative overflow-hidden h-screen bg-vlanc-bg">
        {/* Fixed Header Overlay for inner pages */}
        <Header currentSlide={currentSlide} totalSlides={totalSlides} data={data.header} />

        <div id="app-container" ref={containerRef} className="h-screen w-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth no-scrollbar bg-vlanc-bg text-vlanc-black">
            
            {/* Slide 1: Hero */}
            <SectionSlide id="hero">
                <Hero data={data.hero} headerData={data.header} />
            </SectionSlide>

            {/* Slide 2: Index */}
            <SectionSlide id="index">
                <IndexSection data={data.index} />
            </SectionSlide>

            {/* Slide 3: Situation */}
            <SectionSlide id="situation">
                <Situation data={data.situation} />
            </SectionSlide>

            {/* Slide 4: Mission */}
            <SectionSlide id="mission">
                <Mission data={data.mission} />
            </SectionSlide>

            {/* Slide 5: Process */}
            <SectionSlide id="process">
                <Process data={data.process} />
            </SectionSlide>

            {/* Slide 6: Team */}
            <SectionSlide id="team">
                <Team data={data.team} />
            </SectionSlide>

            {/* Slide 7: Testimonials */}
            <SectionSlide id="testimonials">
                <Testimonials data={data.testimonials} />
            </SectionSlide>

            {/* Slide 8: Scope Intro */}
            <SectionSlide id="scope">
                <Scope data={data.scopeIntro || (data as any).scope} />
            </SectionSlide>

            {/* Slide 9: Scope Phases 1 */}
            <SectionSlide id="scope-phases-1">
                <ScopePhases 
                    data={data.scopePhases1} 
                    guaranteesData={data.guarantees} 
                />
            </SectionSlide>

            {/* Slide 10: Scope Phases 2 */}
            <SectionSlide id="scope-phases-2">
                <ScopePhases2 data={data.scopePhases2} />
            </SectionSlide>

            {/* Slide 11: Investment Table */}
            <SectionSlide id="investment">
                <Investment data={data.investment} />
            </SectionSlide>

            {/* Slide 12: Special Offers */}
            <SectionSlide id="special-offers">
                <SpecialOffers data={data.specialOffers} />
            </SectionSlide>

            {/* Slide 13: Payment & Fine Print */}
            <SectionSlide id="payment">
                <Payment data={data.payment} />
            </SectionSlide>

            {/* Slide 14: Divider */}
            <SectionSlide id="divider">
                <DividerSlide 
                    image={data.dividerSlide?.image || data.contact?.image}
                    text={data.dividerSlide?.text || data.contact?.callToAction}
                />
            </SectionSlide>

            {/* Slide 15: Guarantees */}
            <SectionSlide id="guarantees">
                <Guarantees data={data.guarantees} />
            </SectionSlide>

            {/* Slide 16: Premium Services */}
            <SectionSlide id="premium-services">
                <PremiumServices data={data.premiumServices} />
            </SectionSlide>

            {/* Slide 17: Contact */}
            <SectionSlide id="contact">
                <Contact data={data.contact} />
            </SectionSlide>
        </div>
    </div>
  );
};

export default App;
