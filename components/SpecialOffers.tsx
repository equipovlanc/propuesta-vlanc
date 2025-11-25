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
    <section id="special-offers" className="py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-12 print:space-y-6">
            <AnimatedSection>
                <div className="border-l-4 border-teal-400 pl-6 print:border-l-2">
                    <h3 className="text-2xl font-bold mb-4">{data?.conditionalOffer?.title}</h3>
                    <p className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: data?.conditionalOffer?.description || '' }} />
                    <div className="grid grid-cols-2 gap-4 text-center">
                        {(data?.conditionalOffer?.discountedPlans ?? []).map((plan, i) => (
                            <div key={i} className="p-4 bg-slate-50 print:border print:border-gray-200">
                                <p className="font-bold">{plan.name}</p>
                                <p className="line-through text-gray-400">{plan.originalPrice}</p>
                                <p className="font-bold text-teal-600 text-lg">{plan.discountedPrice} + IVA</p>
                            </div>
                        ))}
                    </div>
                </div>
            </AnimatedSection>
            <AnimatedSection>
                 <div className="border-l-4 border-teal-400 pl-6 print:border-l-2">
                    <h3 className="text-2xl font-bold mb-4">{data?.launchOffer?.title}</h3>
                    <p className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: data?.launchOffer?.description || '' }} />
                    <div className="p-6 bg-teal-50 text-center print:border print:border-teal-100">
                        <p className="font-bold text-teal-700 text-lg">{data?.launchOffer?.premiumServiceName}</p>
                        <p className="text-gray-600 mt-2">Nuestra experiencia de visualización en realidad virtual del hogar diseñado para ti valorado en <span className="font-bold">{data?.launchOffer?.premiumServiceValue} + IVA.</span></p>
                    </div>
                </div>
            </AnimatedSection>
        </div>
        <AnimatedSection>
            <div className="relative">
                {data?.callToAction?.image && <img src={data.callToAction.image} alt="Modern bedroom interior" className="rounded-lg shadow-2xl print:shadow-none" />}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg print:hidden">
                    <h3 className="text-4xl font-bold text-white text-center tracking-wider" dangerouslySetInnerHTML={{ __html: data?.callToAction?.text || '' }} />
                </div>
            </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SpecialOffers;