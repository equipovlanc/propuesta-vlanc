
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

type ProposalData = typeof localProposalData;

const App: React.FC = () => {
  const [proposalData, setProposalData] = useState<ProposalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'sanity' | 'local' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const slug = window.location.pathname.substring(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current || !slug) return; 

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
      if (!slug) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setProposalData(null);

      const isSanityConfigured = sanityClient.config().projectId && sanityClient.config().projectId !== 'your-project-id';

      if (!isSanityConfigured) {
        setProposalData(localProposalData);
        setDataSource('local');
        setLoading(false);
        return;
      }
      
      try {
        const query = `*[_type == "proposal" && slug.current == $slug][0]{
          ...,
          "logos": logos{
            "smallLogo": smallLogo.asset->url,
            "mainLogo": mainLogo.asset->url,
            "finalLogo": finalLogo.asset->url
          },
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

  if (!slug) {
    return <StudioLanding />;
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-vlanc-bg">
        <div className="animate-pulse flex flex-col items-center">
            <div className="h-4 w-32 bg-vlanc-primary/20 rounded mb-4"></div>
            <p className="text-vlanc-primary/40 text-sm tracking-widest uppercase font-bold">Cargando Experiencia VLANC...</p>
        </div>
    </div>
  );
  
  const data = proposalData || localProposalData;

  return (
    <div id="app-container" ref={containerRef} className="h-screen w-full overflow-y-scroll overflow-x-hidden snap-y snap-proximity scroll-smooth no-scrollbar bg-vlanc-bg text-vlanc-black relative">
        
        {/* PORTADA - Diseño específico Página 1 */}
        <SectionSlide id="hero">
            <Hero data={data.hero} headerData={data.header} logo={data.logos?.mainLogo} />
        </SectionSlide>

        {/* LÁMINAS INTERNAS - Solo Logo y Página */}
        <SectionSlide id="index">
            <Header logo={data.logos?.smallLogo} pageNumber={2} />
            <IndexSection data={data.index} />
        </SectionSlide>

        <SectionSlide id="situation">
            <Header logo={data.logos?.smallLogo} pageNumber={3} />
            <Situation data={data.situation} />
        </SectionSlide>

        <SectionSlide id="mission">
            <Header logo={data.logos?.smallLogo} pageNumber={4} />
            <Mission data={data.mission} />
        </SectionSlide>

        <SectionSlide id="process">
            <Header logo={data.logos?.smallLogo} pageNumber={5} />
            <Process data={data.process} />
        </SectionSlide>

        <SectionSlide id="team">
            <Header logo={data.logos?.smallLogo} pageNumber={6} />
            <Team data={data.team} />
        </SectionSlide>

        <SectionSlide id="testimonials">
            <Header logo={data.logos?.smallLogo} pageNumber={7} />
            <Testimonials data={data.testimonials} />
        </SectionSlide>

        <SectionSlide id="scope">
            <Header logo={data.logos?.smallLogo} pageNumber={8} />
            <Scope data={data.scopeIntro} />
        </SectionSlide>

        <SectionSlide id="scope-phases-1">
            <Header logo={data.logos?.smallLogo} pageNumber={9} />
            <ScopePhases 
                data={data.scopePhases1} 
                guaranteesData={data.guarantees} 
            />
        </SectionSlide>

         <SectionSlide id="scope-phases-2">
            <Header logo={data.logos?.smallLogo} pageNumber={10} />
            <ScopePhases2 data={data.scopePhases2} />
        </SectionSlide>

        <SectionSlide id="investment">
            <Header logo={data.logos?.smallLogo} pageNumber={14} />
            <Investment data={data.investment} />
        </SectionSlide>

        <SectionSlide id="special-offers">
            <Header logo={data.logos?.smallLogo} pageNumber={15} />
            <SpecialOffers data={data.specialOffers} />
        </SectionSlide>

        <SectionSlide id="payment">
            <Header logo={data.logos?.smallLogo} pageNumber={16} />
            <Payment data={data.payment} />
        </SectionSlide>

        <SectionSlide id="divider">
            <DividerSlide 
                image={data.dividerSlide?.image || data.contact?.image}
                text={data.dividerSlide?.text || data.contact?.callToAction}
            />
        </SectionSlide>

        <SectionSlide id="guarantees">
            <Header logo={data.logos?.smallLogo} pageNumber={18} />
            <Guarantees data={data.guarantees} />
        </SectionSlide>

        <SectionSlide id="premium-services">
            <Header logo={data.logos?.smallLogo} pageNumber={19} />
            <PremiumServices data={data.premiumServices} />
        </SectionSlide>

        <SectionSlide id="contact">
            <Contact data={data.contact} finalLogo={data.logos?.finalLogo} />
        </SectionSlide>
    </div>
  );
};

export default App;
