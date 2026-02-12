
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

const App: React.FC = () => {
  const [proposalData, setProposalData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const slug = window.location.pathname.substring(1);

  useEffect(() => {
    const fetchProposalData = async () => {
      if (!slug) { setLoading(false); return; }
      try {
        const query = `*[_type == "proposal" && slug.current == $slug][0]{
          ...,
          "logos": logos{"smallLogo": smallLogo.asset->url, "mainLogo": mainLogo.asset->url, "finalLogo": finalLogo.asset->url},
          "index": index{..., "image": image.asset->url},
          "situation": situation{..., "image": image.asset->url},
          "mission": mission{..., "image": image.asset->url, "video": video.asset->url},
          "team": team{..., "members": members[]{..., "image": image.asset->url}},
          "testimonials": testimonials{..., "items": items[]{..., "img": img.asset->url}},
          "scopeIntro": scopeIntro{..., "image": image.asset->url, "video": video.asset->url},
          "scopePhases": scopePhases1.phases[] {..., "image": image.asset->url, "video": video.asset->url} + scopePhases2.phases[] {..., "image": image.asset->url, "video": video.asset->url},
          "specialOffers": specialOffers{
            ..., 
            conditionalOffer,
            launchOffer,
            "callToAction": callToAction{..., "image": image.asset->url}
          },
          "guarantees": guarantees{..., "items": items[]{..., "icon": icon.asset->url}},
          "premiumServicesList": premiumServices.services[]{..., "image": image.asset->url},
          "contact": contact{..., "image": image.asset->url, "rrss": rrss[]{..., "icon": icon.asset->url}}
        }`;
        const data = await sanityClient.fetch(query, { slug });
        setProposalData(data || localProposalData);
      } catch (err) {
        console.error(err);
        setProposalData(localProposalData);
      } finally {
        setLoading(false);
      }
    };
    fetchProposalData();
  }, [slug]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (!containerRef.current) return;
        const h = window.innerHeight;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            containerRef.current.scrollBy({ top: h, behavior: 'smooth' });
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            containerRef.current.scrollBy({ top: -h, behavior: 'smooth' });
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!slug) return <StudioLanding />;
  if (loading) return <div className="h-screen bg-vlanc-bg flex items-center justify-center font-bold tracking-widest text-vlanc-primary uppercase">Cargando...</div>;
  
  const d = proposalData;

  return (
    // CAMBIO: snap-mandatory para forzar que siempre pare en una sección exacta.
    <div id="app-container" ref={containerRef} className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar bg-vlanc-bg focus:outline-none" tabIndex={0}>
        
        <SectionSlide id="hero"><Hero data={d.hero} headerData={d.header} logo={d.logos?.mainLogo} /></SectionSlide>

        <SectionSlide id="index">
            <Header logo={d.logos?.smallLogo} pageNumber={2} />
            <IndexSection data={d.index} />
        </SectionSlide>

        <SectionSlide id="situation"><Header logo={d.logos?.smallLogo} pageNumber={3} /><Situation data={d.situation} /></SectionSlide>

        <SectionSlide id="mission"><Header logo={d.logos?.smallLogo} pageNumber={4} /><Mission data={d.mission} /></SectionSlide>

        <SectionSlide id="process"><Header logo={d.logos?.smallLogo} pageNumber={5} /><Process data={d.process} /></SectionSlide>

        <SectionSlide id="team"><Header logo={d.logos?.smallLogo} pageNumber={6} /><Team data={d.team} /></SectionSlide>

        <SectionSlide id="testimonials"><Header logo={d.logos?.smallLogo} pageNumber={7} /><Testimonials data={d.testimonials} /></SectionSlide>

        <SectionSlide id="scope"><Header logo={d.logos?.smallLogo} pageNumber={8} /><Scope data={d.scopeIntro} /></SectionSlide>

        {(d.scopePhases || []).map((phase: any, i: number) => (
            <SectionSlide key={i} id={`phase-${i+1}`}>
                <Header logo={d.logos?.smallLogo} pageNumber={9 + i} />
                <ScopePhases data={phase} mainTitle={d.scopePhases1?.title} />
            </SectionSlide>
        ))}

        <SectionSlide id="investment"><Header logo={d.logos?.smallLogo} pageNumber={14} /><Investment data={d.investment} /></SectionSlide>
        
        <SectionSlide id="special-offers">
            <Header logo={d.logos?.smallLogo} pageNumber={15} />
            <SpecialOffers 
                data={d.specialOffers} 
                investmentTitle={d.investment?.title}
                locationDate={d.investment?.locationDate} 
            />
        </SectionSlide>
        
        <SectionSlide id="payment">
            <Header logo={d.logos?.smallLogo} pageNumber={16} />
            <Payment 
                data={d.payment} 
                investmentTitle={d.investment?.title} 
                locationDate={d.investment?.locationDate}
            />
        </SectionSlide>

        <SectionSlide id="team-photo">
            {/* Header eliminado */}
            <DividerSlide image={d.contact?.image} text="¿Nos dejas acompañarte?" />
        </SectionSlide>

        <SectionSlide id="guarantees"><Header logo={d.logos?.smallLogo} pageNumber={18} /><Guarantees data={d.guarantees} /></SectionSlide>

        {(d.premiumServicesList || []).map((service: any, i: number) => (
            <SectionSlide key={i} id={`premium-${i+1}`}>
                <Header logo={d.logos?.smallLogo} pageNumber={19 + i} />
                <PremiumServices data={service} image={service.image} />
            </SectionSlide>
        ))}

        <SectionSlide id="contact"><Contact data={d.contact} finalLogo={d.logos?.finalLogo} /></SectionSlide>
    </div>
  );
};

export default App;
