
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
import CustomCursor from './components/CustomCursor';
import sanityClient from './sanity/client';

const App: React.FC = () => {
  const [proposalData, setProposalData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const slug = window.location.pathname.substring(1);

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
          "contact": contact{
            ..., 
            "image": image.asset->url, 
            "phone": phone{
                ...,
                "landline": landline{..., "icon": icon.asset->url},
                "mobile": mobile{..., "icon": icon.asset->url}
            },
            "rrss": rrss[]{..., "icon": icon.asset->url}
          }
        }`;
        const data = await sanityClient.fetch(query, { slug });
        
        if (!data) {
          setError("No se ha encontrado la propuesta solicitada.");
        } else {
          setProposalData(data);
        }
      } catch (err) {
        console.error("Error fetching from Sanity:", err);
        setError("Error de conexión al cargar la propuesta.");
      } finally {
        setLoading(false);
      }
    };
    fetchProposalData();
  }, [slug]);

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

  if (loading) {
    return (
      <div className="h-screen bg-vlanc-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-vlanc-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-vlanc-primary uppercase">Cargando propuesta...</span>
        </div>
      </div>
    );
  }

  if (error || !proposalData) {
    return (
      <div className="h-screen bg-vlanc-bg flex items-center justify-center p-10 text-center">
        <div className="max-w-md">
          <h1 className="subtitulo2 mb-4">Lo sentimos</h1>
          <p className="cuerpo mb-8">{error || "No hemos podido cargar los datos."}</p>
          <a href="/" className="boton1 bg-vlanc-primary text-white px-8 py-3 rounded-sm">Volver al inicio</a>
        </div>
      </div>
    );
  }
  
  const d = proposalData;

  return (
    <div id="app-container" ref={containerRef} className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar bg-vlanc-bg focus:outline-none relative" tabIndex={0}>
        <CustomCursor />
        
        <SectionSlide id="hero" scrollContainer={containerRef}><Hero data={d.hero} headerData={d.header} logo={d.logos?.mainLogo} /></SectionSlide>

        <SectionSlide id="index" scrollContainer={containerRef}>
            <Header logo={d.logos?.smallLogo} pageNumber={2} />
            <IndexSection data={d.index} />
        </SectionSlide>

        <SectionSlide id="situation" scrollContainer={containerRef}><Header logo={d.logos?.smallLogo} pageNumber={3} /><Situation data={d.situation} /></SectionSlide>

        <SectionSlide id="mission" scrollContainer={containerRef}><Header logo={d.logos?.smallLogo} pageNumber={4} /><Mission data={d.mission} /></SectionSlide>

        <SectionSlide id="process" scrollContainer={containerRef}>
            <Header logo={d.logos?.smallLogo} pageNumber={5} />
            <Process data={d.process} guaranteeItem={d.guarantees?.items?.[0]} />
        </SectionSlide>

        <SectionSlide id="team" scrollContainer={containerRef}><Header logo={d.logos?.smallLogo} pageNumber={6} /><Team data={d.team} /></SectionSlide>

        <SectionSlide id="testimonials" scrollContainer={containerRef}><Header logo={d.logos?.smallLogo} pageNumber={7} /><Testimonials data={d.testimonials} /></SectionSlide>

        <SectionSlide id="scope" scrollContainer={containerRef}><Header logo={d.logos?.smallLogo} pageNumber={8} /><Scope data={d.scopeIntro} /></SectionSlide>

        {(d.scopePhases || []).map((phase: any, i: number) => {
            const numPhases1 = d.scopePhases1?.phases?.length || 0;
            const currentSectionTitle = i < numPhases1 ? d.scopePhases1?.title : d.scopePhases2?.title;

            return (
                <SectionSlide key={i} id={`phase-${i+1}`} scrollContainer={containerRef}>
                    <Header logo={d.logos?.smallLogo} pageNumber={9 + i} />
                    <ScopePhases 
                        data={phase} 
                        mainTitle={currentSectionTitle} 
                        guaranteeItem={d.guarantees?.items?.[i + 1]} 
                    />
                </SectionSlide>
            );
        })}

        <SectionSlide id="investment" scrollContainer={containerRef}><Header logo={d.logos?.smallLogo} pageNumber={14} /><Investment data={d.investment} /></SectionSlide>
        
        <SectionSlide id="special-offers" scrollContainer={containerRef}>
            <Header logo={d.logos?.smallLogo} pageNumber={15} />
            <SpecialOffers 
                data={d.specialOffers} 
                investmentTitle={d.investment?.title}
                locationDate={d.investment?.locationDate} 
                premiumService={d.premiumServicesList?.[1]}
            />
        </SectionSlide>
        
        <SectionSlide id="payment" scrollContainer={containerRef}>
            <Header logo={d.logos?.smallLogo} pageNumber={16} />
            <Payment 
                data={d.payment} 
                investmentTitle={d.investment?.title} 
                locationDate={d.investment?.locationDate}
            />
        </SectionSlide>

        <SectionSlide id="team-photo" scrollContainer={containerRef}>
            <DividerSlide image={d.contact?.image} text="¿Nos dejas acompañarte?" />
        </SectionSlide>

        <SectionSlide id="guarantees" scrollContainer={containerRef}><Header logo={d.logos?.smallLogo} pageNumber={18} /><Guarantees data={d.guarantees} /></SectionSlide>

        {(d.premiumServicesList || []).map((service: any, i: number) => (
            <SectionSlide key={i} id={`premium-${i+1}`} scrollContainer={containerRef}>
                <Header logo={d.logos?.smallLogo} pageNumber={19 + i} />
                <PremiumServices data={service} image={service.image} index={i} />
            </SectionSlide>
        ))}

        <SectionSlide id="contact" scrollContainer={containerRef}><Contact data={d.contact} finalLogo={d.logos?.finalLogo} /></SectionSlide>
    </div>
  );
};

export default App;
