
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
import StudioLanding from './components/StudioLanding'; // New import
import { proposalData as localProposalData } from './data/proposal.data';
import sanityClient from './sanity/client';

// Define the type for your proposal data.
type ProposalData = typeof localProposalData;

const App: React.FC = () => {
  const [proposalData, setProposalData] = useState<ProposalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'sanity' | 'local' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Obtener el slug de la URL actual (ej: /celia-blanes -> celia-blanes)
  const slug = window.location.pathname.substring(1);

  // --- KEYBOARD NAVIGATION LOGIC ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current || !slug) return; // Only if we are in a proposal

      const slides = Array.from(containerRef.current.querySelectorAll('.section-slide')) as HTMLElement[];
      
      let currentSlideIndex = slides.findIndex(slide => {
        const rect = slide.getBoundingClientRect();
        const middleOfScreen = window.innerHeight / 2;
        return rect.top <= middleOfScreen && rect.bottom >= middleOfScreen;
      });

      if (currentSlideIndex === -1) {
          currentSlideIndex = slides.findIndex(slide => {
            const rect = slide.getBoundingClientRect();
            return rect.top >= -100 && rect.top < window.innerHeight / 2; 
          });
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const nextSlide = slides[currentSlideIndex + 1];
        if (nextSlide) {
          nextSlide.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevSlide = slides[currentSlideIndex - 1];
        if (prevSlide) {
          prevSlide.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [loading, slug]);

  useEffect(() => {
    const fetchProposalData = async () => {
      // Si no hay slug (estamos en la raíz), no cargamos nada
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
        setDataSource('local');
        setLoading(false);
        return;
      }
      
      try {
        const query = `*[_type == "proposal" && slug.current == $slug][0]{
          ...,
          "header": header{...},
          "hero": hero{...},
          "index": index{..., "items": items[]{...}},
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
          setDataSource('sanity');
        } else {
          setError(`No se encontró la propuesta "${slug}" en Sanity.`);
          setDataSource(null);
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

  // --- RENDERIZADO CONDICIONAL ---

  // 1. Landing Page Principal del Estudio (Ruta Raíz)
  if (!slug) {
    return <StudioLanding />;
  }

  // 2. Pantalla de Carga
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse flex flex-col items-center">
            <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>
            <p className="text-gray-400 text-sm tracking-widest uppercase">Cargando Propuesta Interactiva...</p>
        </div>
    </div>
  );
  
  // 3. Pantalla de Error (Solo si no hay datos)
  if (error && !proposalData) return (
    <div className="min-h-screen flex items-center justify-center p-8 text-center bg-white text-gray-800">
        <div className="max-w-lg">
             <h2 className="text-2xl font-bold text-red-500 mb-4">¡Vaya!</h2>
             <p className="text-lg mb-6">{error}</p>
             <p className="text-sm text-gray-500 mb-6">Asegúrate de que el enlace sea correcto o contacta con el estudio.</p>
             <a href="/" className="bg-teal-600 text-white px-8 py-3 rounded hover:bg-teal-700 transition-colors uppercase tracking-widest text-xs font-bold">Volver al inicio</a>
        </div>
    </div>
  );
  
  // 4. Propuesta (Renderizado Principal)
  const data = proposalData || localProposalData;

  return (
    <div id="app-container" ref={containerRef} className="h-screen w-full overflow-y-scroll overflow-x-hidden snap-y snap-proximity scroll-smooth no-scrollbar bg-white text-gray-800 relative">
        
        {/* Slide 1: Hero */}
        <SectionSlide id="hero">
            <div className="absolute top-0 left-0 w-full z-10 px-8 pt-4">
                <Header data={data.header} />
            </div>
            <Hero data={data.hero} />
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
  );
};

export default App;
