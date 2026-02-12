
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface DiscountedPlan {
    name?: string;
    originalPrice?: string;
    discountedPrice?: string;
}

interface SpecialOffersProps {
    data?: {
        title?: string;
        offerFooterText?: string;
        conditionalOffer?: {
            title?: string;
            description?: string;
            discountedPlans?: DiscountedPlan[];
        };
        launchOffer?: {
            title?: string;
            description?: string;
            premiumServiceName?: string;
            premiumServiceValue?: string;
        };
        callToAction?: {
            text?: string;
            image?: string;
        };
    };
    investmentTitle?: string;
}

const SpecialOffers: React.FC<SpecialOffersProps> = ({ data, investmentTitle }) => {
  // Datos para los 3 botones superiores
  const plans = data?.conditionalOffer?.discountedPlans || [];
  
  return (
    <section id="special-offers" className="h-full w-full bg-vlanc-bg flex flex-row pt-[150px] pb-[140px] px-[120px] overflow-hidden">
      
      {/* COLUMNA IZQUIERDA: Botones, Texto y Firma */}
      {/* Padding derecho de 69.5px (mitad de 139px) */}
      <div className="w-1/2 h-full flex flex-col pr-[69.5px]">
          
          {/* Cabecera */}
          <AnimatedSection className="shrink-0 mb-6">
                <h2 className="subtitulo1">
                   {investmentTitle || "la inversión."}
                </h2>
                {/* Barra decorativa #8f4933 */}
                <div className="w-[112px] h-[5px] bg-[#8f4933] mt-[40px]"></div>
          </AnimatedSection>

          {/* Contenido Flexible */}
          <AnimatedSection className="flex-grow flex flex-col justify-center overflow-y-auto no-scrollbar">
                
                {/* 0. CONDICIONES ESPECIALES Y TEXTO INTRODUCTORIO */}
                <div className="mb-6">
                    {data?.conditionalOffer?.title && (
                        <h3 className="subtitulo2 mb-4 text-vlanc-black">{data.conditionalOffer.title}</h3>
                    )}
                    {data?.conditionalOffer?.description && (
                        <div 
                            className="cuerpo"
                            dangerouslySetInnerHTML={{ __html: data.conditionalOffer.description }}
                        />
                    )}
                </div>

                {/* 0.5 OFERTA LANZAMIENTO */}
                <div className="mb-6">
                    {data?.launchOffer?.title && (
                        <h3 className="subtitulo2 mb-2 text-vlanc-black">{data.launchOffer.title}</h3>
                    )}
                    
                    {/* Renderizado de Descripción de Lanzamiento (FALTABA ESTO) */}
                    {data?.launchOffer?.description && (
                         <div 
                            className="cuerpo mb-2"
                            dangerouslySetInnerHTML={{ __html: data.launchOffer.description }}
                        />
                    )}

                    {/* Servicio Premium Extra (Si aplica) */}
                    {data?.launchOffer?.premiumServiceName && (
                        <p className="text-[12px] font-bold text-vlanc-secondary tracking-widest uppercase mt-2">
                            {data.launchOffer.premiumServiceName} 
                            {data.launchOffer.premiumServiceValue && ` - ${data.launchOffer.premiumServiceValue}`}
                        </p>
                    )}
                </div>

                {/* 1. LOS 3 BOTONES (250x108px) - HORIZONTAL */}
                <div className="flex flex-row justify-between gap-2 mb-6 w-full flex-wrap xl:flex-nowrap shrink-0">
                    {plans.map((plan, i) => (
                        <div 
                            key={i} 
                            className="w-[250px] h-[108px] border border-[#8f4933] flex flex-col items-center justify-center gap-2 bg-transparent transition-all duration-300 hover:bg-[#8f4933]/5 shrink-0"
                        >
                            {/* Tipografía Tabla 1 (Bold Uppercase) */}
                            <span className="tabla1 text-[#8f4933]">{plan.name}</span>
                            {/* Tipografía Tabla 2 (Regular Uppercase) */}
                            <span className="tabla2 text-[#8f4933]">{plan.discountedPrice}</span>
                        </div>
                    ))}
                </div>

                {/* 2. BOTÓN "TU HOGAR COMO NUNCA LO IMAGINASTE" */}
                {/* Alto 41px, Ancho Columna, Pulsable */}
                <button 
                    className="w-full h-[41px] border border-[#8f4933] flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-[#8f4933] group mb-6 shrink-0"
                    onClick={() => console.log('CTA Clicked')}
                >
                    <span className="tabla1 text-[#8f4933] group-hover:text-white transition-colors">
                        TU HOGAR COMO NUNCA LO IMAGINASTE
                    </span>
                </button>

                {/* 3. CUERPO DE TEXTO (OfferFooterText) */}
                <div 
                    className="cuerpo mb-6"
                    dangerouslySetInnerHTML={{ __html: data?.offerFooterText || '' }}
                />

                {/* 4. FIRMA (Estética idéntica a Inversión) */}
                <div className="w-full flex flex-col border-t border-[#8f4933] mt-auto pt-1 shrink-0">
                    <div className="flex justify-between items-start">
                        <span className="tabla1">VIVE VLANC SL</span>
                        <span className="tabla1 text-right">ACEPTA PRESUPUESTO_FIRMA</span>
                    </div>
                </div>
          </AnimatedSection>
      </div>

      {/* COLUMNA DERECHA: Imagen */}
      {/* Padding izquierdo de 69.5px (mitad de 139px) */}
      <div className="w-1/2 h-full pl-[69.5px]">
          <AnimatedSection className="w-full h-full relative overflow-hidden">
                {data?.callToAction?.image ? (
                    <img 
                        src={data.callToAction.image} 
                        alt="Special Offer" 
                        className="w-full h-full object-cover grayscale brightness-95 hover:grayscale-0 transition-all duration-1000" 
                    />
                ) : (
                    <div className="w-full h-full bg-[#8f4933]/10 flex items-center justify-center border border-[#8f4933]/20">
                        <span className="tabla1 opacity-40">IMAGEN OFERTA</span>
                    </div>
                )}
          </AnimatedSection>
      </div>

    </section>
  );
};

export default SpecialOffers;
