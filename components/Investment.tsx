
import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';

interface Plan {
    name?: string;
    price?: string;
    features?: boolean[];
}

interface PlanDescription {
    name?: string;
    desc?: string;
}

interface InvestmentProps {
    data?: {
        sectionNumber?: string;
        title?: string;
        introduction?: string;
        subHeader?: string;
        specialConditions?: string;
        plansDescription?: PlanDescription[];
        plans?: Plan[];
        featureLabels?: string[];
    }
}

const SectionHeader: React.FC<{ title?: string }> = ({ title }) => (
    <div className="relative mb-12">
      <h2 className="title-xl text-vlanc-secondary tracking-tighter uppercase font-bold">{title}</h2>
      <div className="w-16 h-[2px] bg-vlanc-primary mt-4"></div>
    </div>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-vlanc-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
);

const Investment: React.FC<InvestmentProps> = ({ data }) => {
    const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
    return (
        <section className="min-h-screen py-32 px-12 md:px-24 bg-vlanc-bg flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    <div className="lg:col-span-5 space-y-8">
                        <AnimatedSection>
                            <SectionHeader title={data?.title || "la inversión."} />
                            <div 
                                className="text-body text-vlanc-black/80 mb-10 whitespace-pre-line text-justify leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: data?.introduction || '' }}
                            />
                            
                            <div className="space-y-12">
                                {(data?.plansDescription ?? []).map((desc, i) => (
                                    <div key={i}>
                                        <p className="font-bold text-vlanc-secondary text-[12px] tracking-widest uppercase mb-3">{desc.name}</p>
                                        <div 
                                            className="text-body text-vlanc-black/70 whitespace-pre-line leading-relaxed text-sm"
                                            dangerouslySetInnerHTML={{ __html: desc.desc || '' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </AnimatedSection>
                    </div>

                    <div className="lg:col-span-7 flex flex-col pt-12">
                        <AnimatedSection>
                            <div className="hidden lg:flex flex-col overflow-hidden rounded-sm text-[12px] border border-vlanc-primary/20 shadow-xl bg-white/50 backdrop-blur-sm">
                                <div className="grid grid-cols-[2fr_repeat(3,1fr)] bg-vlanc-primary/10">
                                    <div className="p-6"></div>
                                    {(data?.plans ?? []).map((plan, i) => (
                                        <div 
                                            key={i} 
                                            className={`p-6 text-center subtitle-md transition-colors duration-300 flex items-center justify-center uppercase tracking-tight font-bold ${hoveredPlan === plan.name ? 'bg-vlanc-primary/20' : ''}`}
                                            onMouseEnter={() => setHoveredPlan(plan.name || null)}
                                            onMouseLeave={() => setHoveredPlan(null)}
                                        >
                                            {plan.name}
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="divide-y divide-vlanc-primary/10">
                                    {(data?.featureLabels ?? []).map((label, featureIndex) => (
                                        <div key={featureIndex} className="grid grid-cols-[2fr_repeat(3,1fr)]">
                                            <div className="p-5 font-bold text-vlanc-black/70 flex items-center pl-8 border-r border-vlanc-primary/10 uppercase tracking-widest text-[10px]">{label}</div>
                                            {(data?.plans ?? []).map((plan, planIndex) => (
                                                <div 
                                                    key={planIndex} 
                                                    className={`p-5 flex justify-center items-center transition-colors duration-300 border-r border-vlanc-primary/10 last:border-none ${hoveredPlan === plan.name ? 'bg-vlanc-primary/5' : ''}`}
                                                    onMouseEnter={() => setHoveredPlan(plan.name || null)}
                                                    onMouseLeave={() => setHoveredPlan(null)}
                                                >
                                                    {plan.features?.[featureIndex] && <CheckIcon />}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-[2fr_repeat(3,1fr)] border-t border-vlanc-primary/20">
                                     <div className="bg-vlanc-primary/5 p-6 font-bold text-vlanc-primary tracking-widest flex items-center justify-center uppercase text-[10px]">Honorarios</div>
                                     {(data?.plans ?? []).map((plan, i) => (
                                        <div 
                                            key={i} 
                                            className="p-8 text-center font-serif font-bold text-vlanc-primary bg-vlanc-primary/10 flex flex-col justify-center"
                                        >
                                            <div className="text-[28px] tracking-tighter leading-none">{plan.price}</div>
                                            <div className="text-[10px] font-sans font-bold text-vlanc-black/50 uppercase tracking-widest mt-1">+ IVA</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {data?.specialConditions && (
                                <div className="mt-20 p-10 bg-vlanc-primary/5 border border-vlanc-primary/20 rounded-sm">
                                    <h4 className="subtitle-md text-vlanc-primary font-bold mb-6">Condiciones especiales</h4>
                                    <p className="text-[12px] text-vlanc-black/80 leading-relaxed text-justify">
                                        {data.specialConditions}
                                    </p>
                                </div>
                            )}
                        </AnimatedSection>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Investment;
