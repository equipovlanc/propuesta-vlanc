
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
    <section id="special-offers" className="h-full py-12 px-4 md:px-8 lg:px-16 bg-white flex flex-col justify-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-16">
            <AnimatedSection>
                <div className="border-l-4 border-teal-400 pl-8 group">
                    <h3 className="text-2xl font-bold mb-6 text-gray-800 group-hover:text-teal-600 transition-colors">{data?.conditionalOffer?.title}</h3>
                    <p className="text-gray-600 mb-6 text-sm leading-relaxed whitespace-pre-line">{data?.conditionalOffer?.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        {(data?.conditionalOffer?.discountedPlans ?? []).map((plan, i) => (
                            <div key={i} className="p-4 bg-slate-50 hover:bg-teal-50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-sm cursor-default">
                                <p className="font-bold text-xs text-gray-700">{plan.name}</p>
                                <p className="line-through text-gray-400 text-xs my-1">{plan.originalPrice}</p>
                                <p className="font-bold text-teal-600 text-base">{plan.discountedPrice}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </AnimatedSection>
            <AnimatedSection>
                 <div className="border-l-4 border-teal-400 pl-8 group">
                    <h3 className="text-2xl font-bold mb-6 text-gray-800 group-hover:text-teal-600 transition-colors">{data?.launchOffer?.title}</h3>
                    <p className="text-gray-600 mb-6 text-sm leading-relaxed whitespace-pre-line">{data?.launchOffer?.description}</p>
                    <div className="p-8 bg-teal-50 text-center rounded-sm hover:scale-105 transition-transform duration-300 shadow-sm hover:shadow-md cursor-default border border-teal-100">
                        <p className="font-bold text-teal-800 text-xl tracking-wide">{data?.launchOffer?.premiumServiceName}</p>
                        <p className="text-gray-600 mt-3 text-sm">Valorado en <span className="font-bold text-teal-600 text-lg ml-1">{data?.launchOffer?.premiumServiceValue} + IVA</span></p>
                    </div>
                </div>
            </AnimatedSection>
        </div>
        <AnimatedSection>
            <div className="relative group overflow-hidden rounded-lg shadow-2xl">
                {data?.callToAction?.image && (
                    <img 
                        src={data.callToAction.image} 
                        alt="Interior" 
                        className="w-full h-[600px] object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 className="text-4xl lg:text-5xl font-bold text-white text-center tracking-widest leading-tight drop-shadow-lg" dangerouslySetInnerHTML={{ __html: data?.callToAction?.text || '' }} />
                </div>
            </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SpecialOffers;
