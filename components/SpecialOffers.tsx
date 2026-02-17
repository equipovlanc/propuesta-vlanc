
import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';

interface DescriptionBlock {
    text: string;
    style: 'normal' | 'title';
    isNumbered?: boolean;
    number?: string;
    hasSeparator?: boolean;
}

interface PremiumService {
    title?: string;
    subtitle?: string;
    price?: string;
    description?: DescriptionBlock[];
    note?: string;
}

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
            image?: { src: string; opacity?: number };
        };
    };
    investmentTitle?: string;
    locationDate?: string;
    premiumService?: PremiumService;
}

const SpecialOffers: React.FC<SpecialOffersProps> = ({ data, investmentTitle, locationDate, premiumService }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const plans = data?.conditionalOffer?.discountedPlans || [];
  const imageSrc = data?.callToAction?.image?.src;
  const imageOpacity = data?.callToAction?.image?.opacity ?? 15;

  const openModal = () => { if (premiumService) setIsModalOpen(true); };
  const closeModal = () => setIsModalOpen(false);

  const renderDescriptionBlock = (block: DescriptionBlock, key: number, allBlocks: DescriptionBlock[]) => {
    const isTitle = block.style === 'title';
    const nextBlock = allBlocks[key + 1];
    const isConsecutiveNumbered = block.isNumbered && nextBlock?.isNumbered;
    const marginBottomClass = isConsecutiveNumbered ? "h-[5px]" : "h-5";

    return (
        <div key={key} className="w-full">
            {isTitle ? (
                <h4 className="subtitulo4 mb-0 text-vlanc-black">
                    <span dangerouslySetInnerHTML={{ __html: block.text }} />
                </h4>
            ) : (
                <div className="flex flex-row items-start gap-4">
                    {block.isNumbered && block.number && (
                        <div className="shrink-0 w-[35px] h-[20px] bg-[#8f4933] text-white flex items-center justify-center rounded-[1px] mt-0.5">
                            <span className="text-[14px] font-bold tracking-widest leading-none">{block.number}</span>
                        </div>
                    )}
                    <p className="cuerpo" dangerouslySetInnerHTML={{ __html: block.text }} />
                </div>
            )}
            {block.hasSeparator && <div className="w-full h-[1px] bg-[#8f4933] mt-3 mb-3 opacity-30"></div>}
            {!block.hasSeparator && <div className={marginBottomClass}></div>}
        </div>
    );
  };
  
  return (
    <section id="special-offers" className="h-full w-full flex flex-row pt-[150px] pb-[140px] px-[120px] overflow-hidden">
      <div className="w-1/2 h-full flex flex-col pr-[69.5px] relative">
          <div className="shrink-0 mb-6">
                <AnimatedSection hierarchy={1}>
                    <h2 className="subtitulo1">{investmentTitle || "la inversión."}</h2>
                </AnimatedSection>
                <AnimatedSection mode="bar" className="w-[112px] h-[5px] bg-[#8f4933] mt-[27px]" />
          </div>
          <AnimatedSection className="flex-grow flex flex-col justify-center overflow-y-auto no-scrollbar" hierarchy={2}>
                {data?.conditionalOffer && (
                    <div className="mb-6">
                        <h3 className="subtitulo2 mb-3 text-vlanc-black">{data.conditionalOffer.title}</h3>
                        <div className="cuerpo leading-relaxed" dangerouslySetInnerHTML={{ __html: data.conditionalOffer.description || '' }} />
                    </div>
                )}
                <div className="flex flex-row justify-between gap-2 mb-8 w-full flex-wrap xl:flex-nowrap shrink-0">
                    {plans.map((plan, i) => (
                        <div key={i} className="w-[250px] h-[108px] border border-[#8f4933] flex flex-col items-center justify-center gap-2 bg-transparent hover:bg-[#8f4933]/5 shrink-0">
                            <span className="tabla1 text-[#8f4933]">{plan.name}</span>
                            <span className="tabla2 text-[#8f4933]">{plan.discountedPrice}</span>
                        </div>
                    ))}
                </div>
                {data?.launchOffer && (
                    <div className="mb-6">
                        <h3 className="subtitulo2 mb-2 text-vlanc-black">{data.launchOffer.title}</h3>
                        <div className="cuerpo leading-relaxed" dangerouslySetInnerHTML={{ __html: data.launchOffer.description || '' }} />
                    </div>
                )}
                <button className="w-full h-[41px] border border-[#8f4933] flex items-center justify-center cursor-pointer transition-all duration-300 bg-[#8f4933] hover:bg-transparent group mb-6 shrink-0" onClick={openModal}>
                    <span className="tabla1 text-white group-hover:text-[#8f4933] transition-colors">TU HOGAR COMO NUNCA LO IMAGINASTE</span>
                </button>
                {data?.offerFooterText && <div className="cuerpo text-sm" dangerouslySetInnerHTML={{ __html: data.offerFooterText }} />}
                <div className="w-full shrink-0">
                    <div className="w-full flex flex-col border-t border-[#8f4933] mt-[50px] pt-1">
                        <div className="flex justify-between items-start">
                            <span className="tabla1">VIVE VLANC SL</span>
                            <span className="tabla1 text-right">ACEPTA PRESUPUESTO_FIRMA</span>
                        </div>
                    </div>
                </div>
          </AnimatedSection>
          
          {/* Fecha ahora animada con J2 */}
          <AnimatedSection className="absolute -bottom-[70px] right-[69.5px] translate-y-1/2 z-20" hierarchy={2}>
                <p className="cuerpo font-bold text-right">{locationDate || "En Alcoi a XX de mes de 2025"}</p>
          </AnimatedSection>
      </div>

      <div className="w-1/2 h-full pl-[69.5px]">
          <AnimatedSection className="w-full h-full relative overflow-hidden" hierarchy={0}>
                {imageSrc && (
                    <div className="w-full h-full relative">
                        <img src={imageSrc} alt="Special Offer" className="w-full h-full object-cover" />
                         <div 
                            className="absolute inset-0 bg-[#8f4933] pointer-events-none" 
                            style={{ opacity: imageOpacity / 100 }}
                        />
                        <div className="absolute bottom-[85px] left-0 w-full flex justify-center z-10 px-8">
                            <h2 className="especial1">{data?.callToAction?.text}</h2>
                        </div>
                    </div>
                )}
          </AnimatedSection>
      </div>

      {/* MODAL SERVICIO PREMIUM */}
      {isModalOpen && premiumService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-vlanc-bg/80 backdrop-blur-sm px-10" onClick={closeModal}>
            <AnimatedSection className="bg-vlanc-bg border border-vlanc-primary/10 shadow-2xl p-12 max-w-[672px] w-full relative max-h-[90vh] overflow-y-auto no-scrollbar" onClick={(e) => e.stopPropagation()} hierarchy={2}>
                <button onClick={closeModal} className="absolute top-6 right-6 text-vlanc-black hover:text-vlanc-primary transition-colors text-3xl leading-none">&times;</button>
                <div className="flex flex-col items-start w-full relative">
                    <h3 className="subtitulo2 not-italic font-bold mb-8 text-vlanc-black">/ {premiumService.subtitle}</h3>
                    <h4 className="subtitulo4 mb-5 text-vlanc-black">{premiumService.title}</h4>
                    <div className="w-full">{(premiumService.description ?? []).map((block, i, arr) => renderDescriptionBlock(block, i, arr))}</div>
                    {premiumService.note && <div className="mt-4"><p className="text-[10px] text-vlanc-secondary/60 italic tracking-wider w-full whitespace-pre-line" dangerouslySetInnerHTML={{ __html: premiumService.note }} /></div>}
                    {premiumService.price && <div className="mt-8 bg-[#8f4933] text-white px-8 py-3 rounded-[1px] flex items-center justify-center cursor-default"><span className="boton1 text-white tracking-[0.1em]">{premiumService.price}</span></div>}
                </div>
            </AnimatedSection>
        </div>
      )}
    </section>
  );
};

export default SpecialOffers;
