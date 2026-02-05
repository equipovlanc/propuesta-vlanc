
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
          "situation": situation{..., "image": image.asset->url},
          "mission": mission{..., "image": image.asset->url},
          "scopeIntro": scopeIntro{..., "images": images[].asset->url},
          "scopePhases": [
             scopePhases1.phases[0],
             scopePhases1.phases[1],
             scopePhases2.phases[0],
             scopePhases2.phases[1],
             scopePhases2.phases[2]
          ],
          "premiumServicesList": premiumServices.services[]{..., "image": image.asset->url},
          "contact": contact{..., "image": image.asset->url}
        }`;
        const data = await sanityClient.fetch(query, { slug });
        setProposalData(data || localProposalData);
      } catch (err) {
        setProposalData(localProposalData);
      } finally {
        setLoading(false);
      }
    };
    fetchProposalData();
  }, [slug]);

  if (!slug) return <StudioLanding />;
  if (loading) return <div className="h-screen bg-vlanc-bg flex items-center justify-center font-bold tracking-widest text-vlanc-primary uppercase">Cargando experiencia...</div>;
  
  const d = proposalData;

  return (
    <div id="app-container" ref={containerRef} className="h-screen w-full overflow-y-scroll snap-y snap-proximity no-scrollbar bg-vlanc-bg">
        
        {/* P1: Portada */}
        <SectionSlide id="hero"><Hero data={d.hero} headerData={d.header} logo={d.logos?.mainLogo} /></SectionSlide>

        {/* P2: Contenido */}
        <SectionSlide id="index"><Header logo={d.logos?.smallLogo} pageNumber={2} /><IndexSection data={d.index} /></SectionSlide>

        {/* P3: Situación */}
        <SectionSlide id="situation"><Header logo={d.logos?.smallLogo} pageNumber={3} /><Situation data={d.situation} /></SectionSlide>

        {/* P4: Misión */}
        <SectionSlide id="mission"><Header logo={d.logos?.smallLogo} pageNumber={4} /><Mission data={d.mission} /></SectionSlide>

        {/* P5: Proceso */}
        <SectionSlide id="process"><Header logo={d.logos?.smallLogo} pageNumber={5} /><Process data={d.process} /></SectionSlide>

        {/* P6: Equipo */}
        <SectionSlide id="team"><Header logo={d.logos?.smallLogo} pageNumber={6} /><Team data={d.team} /></SectionSlide>

        {/* P7: Testimonios */}
        <SectionSlide id="testimonials"><Header logo={d.logos?.smallLogo} pageNumber={7} /><Testimonials data={d.testimonials} /></SectionSlide>

        {/* P8: Ámbito */}
        <SectionSlide id="scope"><Header logo={d.logos?.smallLogo} pageNumber={8} /><Scope data={d.scopeIntro} /></SectionSlide>

        {/* P9-P13: Trabajos Contemplados (5 Láminas) */}
        {(d.scopePhases || []).map((phase: any, i: number) => (
            <SectionSlide key={i} id={`phase-${i+1}`}>
                <Header logo={d.logos?.smallLogo} pageNumber={9 + i} />
                <ScopePhases data={phase} />
            </SectionSlide>
        ))}

        {/* P14-P16: Inversión */}
        <SectionSlide id="investment"><Header logo={d.logos?.smallLogo} pageNumber={14} /><Investment data={d.investment} /></SectionSlide>
        <SectionSlide id="special-offers"><Header logo={d.logos?.smallLogo} pageNumber={15} /><SpecialOffers data={d.specialOffers} /></SectionSlide>
        <SectionSlide id="payment"><Header logo={d.logos?.smallLogo} pageNumber={16} /><Payment data={d.payment} /></SectionSlide>

        {/* P17: Divider / Team Photo */}
        <SectionSlide id="team-photo"><Header logo={d.logos?.smallLogo} pageNumber={17} /><DividerSlide image={d.contact?.image} text="¿Nos dejas acompañarte?" /></SectionSlide>

        {/* P18: Garantías */}
        <SectionSlide id="guarantees"><Header logo={d.logos?.smallLogo} pageNumber={18} /><Guarantees data={d.guarantees} /></SectionSlide>

        {/* P19-P23: Premium Services (5 Láminas) */}
        {(d.premiumServicesList || []).map((service: any, i: number) => (
            <SectionSlide key={i} id={`premium-${i+1}`}>
                <Header logo={d.logos?.smallLogo} pageNumber={19 + i} />
                <PremiumServices data={service} image={service.image} />
            </SectionSlide>
        ))}

        {/* P24: Cierre Final */}
        <SectionSlide id="contact"><Contact data={d.contact} finalLogo={d.logos?.finalLogo} /></SectionSlide>
    </div>
  );
};

export default App;
