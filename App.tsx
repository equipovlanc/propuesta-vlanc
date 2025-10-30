import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import IndexSection from './components/IndexSection';
import Situation from './components/Situation';
import Mission from './components/Mission';
import Process from './components/Process';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Scope from './components/Scope';
import Investment from './components/Investment';
import SpecialOffers from './components/SpecialOffers';
import Payment from './components/Payment';
import Guarantees from './components/Guarantees';
import PremiumServices from './components/PremiumServices';
import Contact from './components/Contact';
import { proposalData as localProposalData } from './data/proposal.data';
import sanityClient from './sanity/client';

// Define the type for your proposal data.
// It's good practice to have this in a separate types.ts file in a real project.
type ProposalData = typeof localProposalData;

const App: React.FC = () => {
  const [proposalData, setProposalData] = useState<ProposalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProposalData = async () => {
      setLoading(true);
      setError(null);
      setProposalData(null);

      const isSanityConfigured = sanityClient.config().projectId && sanityClient.config().projectId !== 'your-project-id';

      // --- Fallback for Local Development (with clear UI feedback) ---
      if (!isSanityConfigured) {
        setError("Modo de prueba activado, si el error persiste, hágaselo saber a un miembro del equipo, por favor, le agradecemos su paciencia");
        setProposalData(localProposalData);
        setLoading(false);
        return;
      }
      
      // --- Sanity Fetching Logic ---
      const slug = window.location.pathname.substring(1); // Removed the confusing default

      // If there is no slug in the URL, show a clear message and stop.
      if (!slug) {
        setError('Bienvenido. Por favor, especifica una propuesta en la URL para ver su contenido (ej: /celia-blanes)');
        setLoading(false);
        return;
      }

      try {
        const query = `*[_type == "proposal" && slug.current == $slug][0]{
          ...,
          "header": header{...},
          "hero": hero{...},
          "index": index{..., "items": items[]{...}},
          "situation": situation{
            ...,
            "image": image.asset->url
          },
          "mission": mission{
            ...,
            "image": image.asset->url,
            "mission": mission{...},
            "achievements": achievements{..., "listItems": listItems[]}
          },
          "process": process{..., "steps": steps[]{...}},
          "team": team{
            ...,
            "purpose": purpose{...},
            "history": history{...},
            "members": members[]{
              ...,
              "img": img.asset->url
            }
          },
          "testimonials": testimonials{
            ...,
            "items": items[]{
              ...,
              "img": img.asset->url
            }
          },
          "scope": scope{
            ...,
            "images": images[].asset->url,
            "intervention": intervention{..., "breakdown": breakdown[]},
            "contemplatedWork": contemplatedWork{..., "phases": phases[]{...}}
          },
          "investment": investment{..., "plans": plans[]{..., "features": features[]}, "featureLabels": featureLabels[]},
          "specialOffers": specialOffers{
            ...,
            "callToAction": callToAction{
              ...,
              "image": image.asset->url
            },
            "conditionalOffer": conditionalOffer{..., "discountedPlans": discountedPlans[]{...}},
            "launchOffer": launchOffer{...}
          },
          "payment": payment{ 
            ...,
            "paymentMethods": paymentMethods{..., "plans": plans[]{..., "payments": payments[]{...}}},
            "finePrint": finePrint{..., "points": points[]}
          },
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
          setError(`No se encontró una propuesta con el identificador: "${slug}". Asegúrate de que el "Identificador para la URL" en Sanity coincide con el de la URL y que el documento está publicado.`);
        }
      } catch (err) {
        console.error('Error fetching data from Sanity:', err);
        setError('No se pudo cargar la información de la propuesta. Revisa la consola del navegador para más detalles técnicos (pulsa F12).');
      } finally {
        setLoading(false);
      }
    };

    fetchProposalData();
  }, [window.location.pathname]); // Re-fetch when URL changes

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Cargando propuesta...</p></div>;
  }

  // Display error message prominently
  if (error && !proposalData) {
    return <div className="min-h-screen flex items-center justify-center p-8 text-center bg-red-50 text-red-700">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">¡Vaya! Algo no ha ido bien.</h2>
        <p className="text-lg">{error}</p>
      </div>
    </div>;
  }
  
  // Show local data with the error message on top
  if (error && proposalData) {
     return (
       <div>
        <div className="p-4 text-center bg-amber-100 text-amber-800 border-b-2 border-amber-200">
          <p className="font-semibold">{error}</p>
        </div>
        <div className="opacity-50 pointer-events-none">
          {/* Render the components with local data in a disabled state */}
          <PageContent data={proposalData} />
        </div>
      </div>
    );
  }

  if (!proposalData) {
     return <div className="min-h-screen flex items-center justify-center"><p>No hay datos de propuesta para mostrar.</p></div>;
  }

  return <PageContent data={proposalData} />;
};

// Extracted the page content into its own component for clarity
const PageContent: React.FC<{ data: ProposalData }> = ({ data }) => (
  <div className="bg-white text-gray-800">
    <Header data={data.header} />
    <main>
      <Hero data={data.hero} />
      <IndexSection data={data.index} />
      <div id="situation">
        <Situation data={data.situation} />
      </div>
      <div id="mission">
        <Mission data={data.mission} />
      </div>
      <div id="process">
        <Process data={data.process} />
      </div>
      <div id="team">
        <Team data={data.team} />
      </div>
      <div id="testimonials">
        <Testimonials data={data.testimonials} />
      </div>
      <div id="scope">
        <Scope data={data.scope} />
      </div>
      {/* --- Section 08 Grouped --- */}
      <div id="investment">
        <Investment data={data.investment} />
      </div>
      <SpecialOffers data={data.specialOffers} />
      <Payment data={data.payment} />
      {/* --- End of Section 08 --- */}
      <div id="guarantees">
         <Guarantees data={data.guarantees} />
      </div>
      <div id="premium-services">
        <PremiumServices data={data.premiumServices} />
      </div>
      <Contact data={data.contact} />
    </main>
  </div>
);


export default App;