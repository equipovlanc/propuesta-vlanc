
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
  return (
    <section id="special-offers" className="min-h-screen bg-vlanc-bg flex flex-col justify-center py-32 px-12 md:px-24">
      
       <AnimatedSection>
            <h2 className="subtitle-pdf text-vlanc-black mb-4 font-normal tracking-tighter lowercase">
               {investmentTitle || "la inversión."}
            </h2>
            <div className="w-20 h-[2px] bg-vlanc-primary mb-16"></div>
      </AnimatedSection>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-20">
            {/* Oferta Condicional */}
            <AnimatedSection>
                <div className="border-l-2 border-vlanc-primary pl-10">
                    {/* Título Oferta: Subtítulo 2 Italic pero más pequeño para jerarquía */}
                    <h3 className="text-[21px] font-serif font-normal italic mb-6 text-vlanc-black">{data?.conditionalOffer?.title}</h3>
                    <div 
                        className="text-vlanc-secondary mb-8 text-[12px] leading-relaxed text-justify whitespace-pre-line font-sans"
                        dangerouslySetInnerHTML={{ __html: data?.conditionalOffer?.description || '' }}
                    />
                    <div className="grid grid-cols-3 gap-4">
                        {(data?.conditionalOffer?.discountedPlans ?? []).map((plan, i) => (
                            <div key={i} className="p-4 bg-[#8f4933]/10 border border-[#8f4933]/20 rounded-[1px] text-center">
                                <p className="font-bold text-[9px] text-vlanc-black uppercase tracking-widest mb-1">{plan.name}</p>
                                <p className="line-through text-vlanc-black/40 text-[9px] mb-1">{plan.originalPrice}</p>
                                <p className="font-serif font-bold text-vlanc-primary text-[16px]">{plan.discountedPrice}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </AnimatedSection>
            
            {/* Oferta Lanzamiento */}
            <AnimatedSection>
                 <div className="border-l-2 border-vlanc-primary pl-10">
                    <h3 className="text-[21px] font-serif font-normal italic mb-6 text-vlanc-black">{data?.launchOffer?.title}</h3>
                    <div 
                        className="text-vlanc-secondary mb-8 text-[12px] leading-relaxed text-justify whitespace-pre-line font-sans"
                        dangerouslySetInnerHTML={{ __html: data?.launchOffer?.description || '' }}
                    />
                    {/* Botón Grande Marrón Sólido */}
                    <div className="w-full bg-[#8f4933] text-white p-6 text-center shadow-md rounded-[1px]">
                         <p className="font-bold text-[14px] tracking-[0.2em] uppercase mb-2">{data?.launchOffer?.premiumServiceName}</p>
                    </div>
                    <p className="text-[10px] text-vlanc-black/50 font-bold tracking-[0.1em] mt-4 uppercase text-center">
                        Valorado en <span className="text-vlanc-primary ml-1">{data?.launchOffer?.premiumServiceValue} + IVA</span>
                    </p>
                </div>
            </AnimatedSection>
        </div>
        
        <AnimatedSection>
            <div className="relative group overflow-hidden rounded-[1px] shadow-2xl h-full min-h-[500px]">
                {data?.callToAction?.image && (
                    <img 
                        src={data.callToAction.image} 
                        alt="Interior" 
                        className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0" 
                    />
                )}
                <div className="absolute inset-0 bg-vlanc-secondary/40 flex items-center justify-center p-12">
                    <h3 className="text-3xl lg:text-[42px] font-serif italic text-white text-center tracking-tighter leading-tight uppercase font-normal" dangerouslySetInnerHTML={{ __html: data?.callToAction?.text || '' }} />
                </div>
            </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SpecialOffers;
