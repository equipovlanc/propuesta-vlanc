
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
        };
        callToAction?: {
            text?: string;
            image?: string;
        };
    };
    investmentTitle?: string;
    locationDate?: string;
}

const SpecialOffers: React.FC<SpecialOffersProps> = ({ data, investmentTitle, locationDate }) => {
  // Datos para los 3 botones superiores
  const plans = data?.conditionalOffer?.discountedPlans || [];
  
  return (
    <section id="special-offers" className="h-full w-full bg-vlanc-bg flex flex-row pt-[150px] pb-[140px] px-[120px] overflow-hidden">
      
      {/* COLUMNA IZQUIERDA: Contenido */}
      <div className="w-1/2 h-full flex flex-col pr-[69.5px] relative">
          
          {/* 1. Cabecera Fija */}
          <AnimatedSection className="shrink-0 mb-6">
                <h2 className="subtitulo1">
                   {investmentTitle || "la inversión."}
                </h2>
                {/* Barra decorativa */}
                <div className="w-[112px] h-[5px] bg-[#8f4933] mt-[40px]"></div>
          </AnimatedSection>

          {/* 2. Contenido Flexible */}
          <AnimatedSection className="flex-grow flex flex-col justify-center overflow-y-auto no-scrollbar">
                
                {/* A. CONDICIONES ESPECIALES (Título y Descripción) */}
                {data?.conditionalOffer && (
                    <div className="mb-6">
                        {data.conditionalOffer.title && (
                            <h3 className="subtitulo2 mb-3 text-vlanc-black">
                                {data.conditionalOffer.title}
                            </h3>
                        )}
                        {data.conditionalOffer.description && (
                            <div 
                                className="cuerpo leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: data.conditionalOffer.description }}
                            />
                        )}
                    </div>
                )}

                {/* B. BOTONES DE PLANES (Justo después de condiciones) */}
                <div className="flex flex-row justify-between gap-2 mb-8 w-full flex-wrap xl:flex-nowrap shrink-0">
                    {plans.map((plan, i) => (
                        <div 
                            key={i} 
                            className="w-[250px] h-[108px] border border-[#8f4933] flex flex-col items-center justify-center gap-2 bg-transparent transition-all duration-300 hover:bg-[#8f4933]/5 shrink-0"
                        >
                            {/* Nombre del Plan */}
                            <span className="tabla1 text-[#8f4933]">{plan.name}</span>
                            {/* Precio Descontado */}
                            <span className="tabla2 text-[#8f4933]">{plan.discountedPrice}</span>
                        </div>
                    ))}
                </div>

                {/* C. OFERTA LANZAMIENTO (Título y Descripción) - Antes del CTA */}
                {data?.launchOffer && (
                    <div className="mb-6">
                        {data.launchOffer.title && (
                            <h3 className="subtitulo2 mb-2 text-vlanc-black">
                                {data.launchOffer.title}
                            </h3>
                        )}
                        {data.launchOffer.description && (
                            <div 
                                className="cuerpo leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: data.launchOffer.description }}
                            />
                        )}
                    </div>
                )}

                {/* D. BOTÓN CTA PRINCIPAL */}
                <button 
                    className="w-full h-[41px] border border-[#8f4933] flex items-center justify-center cursor-pointer transition-all duration-300 bg-[#8f4933] hover:bg-transparent group mb-6 shrink-0"
                    onClick={() => console.log('CTA Clicked')}
                >
                    <span className="tabla1 text-white group-hover:text-[#8f4933] transition-colors">
                        TU HOGAR COMO NUNCA LO IMAGINASTE
                    </span>
                </button>

                {/* E. TEXTO PIE DE OFERTA */}
                {data?.offerFooterText && (
                    <div 
                        className="cuerpo text-sm"
                        dangerouslySetInnerHTML={{ __html: data.offerFooterText }}
                    />
                )}

                {/* F. FIRMA (Integrada en el flujo, 50px margen superior) */}
                <div className="w-full shrink-0">
                    <div className="w-full flex flex-col border-t border-[#8f4933] mt-[50px] pt-1">
                        <div className="flex justify-between items-start">
                            <span className="tabla1">VIVE VLANC SL</span>
                            <span className="tabla1 text-right">ACEPTA PRESUPUESTO_FIRMA</span>
                        </div>
                    </div>
                </div>

          </AnimatedSection>
          
          {/* 3. FECHA (Posición absoluta en el margen inferior, alineada a la derecha de la columna) */}
          <div className="absolute -bottom-[70px] right-[69.5px] translate-y-1/2 z-20">
                <p className="cuerpo font-bold text-right">
                    {locationDate || "En Alcoi a XX de mes de 2025"}
                </p>
          </div>
      </div>

      {/* COLUMNA DERECHA: Imagen */}
      <div className="w-1/2 h-full pl-[69.5px]">
          <AnimatedSection className="w-full h-full relative overflow-hidden">
                {data?.callToAction?.image ? (
                    <>
                        <img 
                            src={data.callToAction.image} 
                            alt="Special Offer" 
                            className="w-full h-full object-cover grayscale brightness-95 hover:grayscale-0 transition-all duration-1000" 
                        />
                        {/* Texto superpuesto: ¿Quieres vivir la experiencia Vlanc? */}
                        {data.callToAction.text && (
                            <div className="absolute bottom-[85px] left-0 w-full flex justify-center z-10 pointer-events-none px-8">
                                <h2 className="especial1">
                                    {data.callToAction.text}
                                </h2>
                            </div>
                        )}
                    </>
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
