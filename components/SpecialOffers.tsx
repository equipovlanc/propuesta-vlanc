
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface DiscountedPlan {
    name?: string;
    originalPrice?: string;
    discountedPrice?: string;
}

interface SpecialOffersProps {
    data?: {
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
    }
}

const SpecialOffers: React.FC<SpecialOffersProps> = ({ data }) => {
  return (
    <section id="special-offers" className="min-h-screen bg-vlanc-bg flex flex-col justify-center py-32 px-12 md:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-20">
            <AnimatedSection>
                <div className="border-l-2 border-vlanc-primary pl-10">
                    <h3 className="subtitle-md font-bold mb-6 text-vlanc-secondary uppercase tracking-tighter italic">/ {data?.conditionalOffer?.title}</h3>
                    <div 
                        className="text-vlanc-black/70 mb-8 text-[12px] leading-relaxed text-justify whitespace-pre-line"
                        dangerouslySetInnerHTML={{ __html: data?.conditionalOffer?.description || '' }}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        {(data?.conditionalOffer?.discountedPlans ?? []).map((plan, i) => (
                            <div key={i} className="p-6 bg-white/40 border border-vlanc-primary/10 rounded-sm text-center">
                                <p className="font-bold text-[10px] text-vlanc-black/50 uppercase tracking-widest mb-1">{plan.name}</p>
                                <p className="line-through text-vlanc-black/30 text-[10px] mb-1">{plan.originalPrice}</p>
                                <p className="font-serif font-bold text-vlanc-primary text-[18px]">{plan.discountedPrice}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </AnimatedSection>
            
            <AnimatedSection>
                 <div className="border-l-2 border-vlanc-primary pl-10">
                    <h3 className="subtitle-md font-bold mb-6 text-vlanc-secondary uppercase tracking-tighter italic">/ {data?.launchOffer?.title}</h3>
                    <div 
                        className="text-vlanc-black/70 mb-8 text-[12px] leading-relaxed text-justify whitespace-pre-line"
                        dangerouslySetInnerHTML={{ __html: data?.launchOffer?.description || '' }}
                    />
                    <div className="p-10 bg-vlanc-primary/5 text-center border border-vlanc-primary/20 rounded-sm">
                        <p className="font-serif font-bold text-vlanc-secondary text-[21px] tracking-tight uppercase">{data?.launchOffer?.premiumServiceName}</p>
                        <p className="text-[10px] text-vlanc-black/50 font-bold tracking-[0.2em] mt-4 uppercase">Valorado en <span className="text-vlanc-primary text-[14px] ml-1">{data?.launchOffer?.premiumServiceValue} + IVA</span></p>
                    </div>
                </div>
            </AnimatedSection>
        </div>
        
        <AnimatedSection>
            <div className="relative group overflow-hidden rounded-sm shadow-2xl">
                {data?.callToAction?.image && (
                    <img 
                        src={data.callToAction.image} 
                        alt="Interior" 
                        className="w-full h-[650px] object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0" 
                    />
                )}
                <div className="absolute inset-0 bg-vlanc-secondary/40 flex items-center justify-center p-12">
                    <h3 className="text-4xl lg:text-[52px] font-serif italic text-white text-center tracking-tighter leading-tight uppercase" dangerouslySetInnerHTML={{ __html: data?.callToAction?.text || '' }} />
                </div>
            </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SpecialOffers;
