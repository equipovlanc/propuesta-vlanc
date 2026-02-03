
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
        plansDescription?: PlanDescription[];
        plans?: Plan[];
        featureLabels?: string[];
    }
}

const SectionHeader: React.FC<{ title?: string }> = ({ title }) => (
    <div className="relative mb-12">
      <h2 className="title-xl text-vlanc-black tracking-tighter uppercase">{title}</h2>
      <div className="w-16 h-[2px] bg-vlanc-primary mt-4"></div>
    </div>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-vlanc-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                            <SectionHeader title={data?.title} />
                            <div 
                                className="text-body text-vlanc-black/80 mb-6 whitespace-pre-line text-justify"
                                dangerouslySetInnerHTML={{ __html: data?.introduction || '' }}
                            />
                            <h4 className="subtitle-md italic text-vlanc-primary mb-8">{data?.subHeader}</h4>
                            
                            <div className="space-y-8">
                                {(data?.plansDescription ?? []).map((desc, i) => (
                                    <div key={i}>
                                        <p className="font-bold text-vlanc-black text-[11px] tracking-widest uppercase mb-2">{desc.name}</p>
                                        <div 
                                            className="text-body text-vlanc-black/70 whitespace-pre-line leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: desc.desc || '' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </AnimatedSection>
                    </div>

                    <div className="lg:col-span-7 flex flex-col pt-12">
                        <AnimatedSection>
                            <div className="hidden lg:flex flex-col overflow-hidden rounded-sm text-[11px] border border-vlanc-primary/10 shadow-sm bg-white/30">
                                <div className="grid grid-cols-[2fr_repeat(3,1fr)] bg-vlanc-primary/5">
                                    <div className="p-4"></div>
                                    {(data?.plans ?? []).map((plan, i) => (
                                        <div 
                                            key={i} 
                                            className={`p-4 text-center subtitle-md transition-colors duration-300 flex items-center justify-center uppercase tracking-tighter ${hoveredPlan === plan.name ? 'bg-vlanc-primary/10' : ''}`}
                                            onMouseEnter={() => setHoveredPlan(plan.name || null)}
                                            onMouseLeave={() => setHoveredPlan(null)}
                                        >
                                            {plan.name?.replace('PLAN ', '')}
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="divide-y divide-vlanc-primary/5">
                                    {(data?.featureLabels ?? []).map((label, featureIndex) => (
                                        <div key={featureIndex} className="grid grid-cols-[2fr_repeat(3,1fr)]">
                                            <div className="p-4 font-bold text-vlanc-black/60 flex items-center pl-6 border-r border-vlanc-primary/5 uppercase tracking-wide text-[10px]">{label}</div>
                                            {(data?.plans ?? []).map((plan, planIndex) => (
                                                <div 
                                                    key={planIndex} 
                                                    className={`p-4 flex justify-center items-center transition-colors duration-300 border-r border-vlanc-primary/5 last:border-none ${hoveredPlan === plan.name ? 'bg-vlanc-primary/5' : ''}`}
                                                    onMouseEnter={() => setHoveredPlan(plan.name || null)}
                                                    onMouseLeave={() => setHoveredPlan(null)}
                                                >
                                                    {plan.features?.[featureIndex] && <CheckIcon />}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-[2fr_repeat(3,1fr)] border-t border-vlanc-primary/10">
                                     <div className="bg-vlanc-primary/5 p-4"></div>
                                     {(data?.plans ?? []).map((plan, i) => (
                                        <div 
                                            key={i} 
                                            className="p-6 text-center font-serif font-bold text-vlanc-primary bg-vlanc-primary/5 flex flex-col justify-center"
                                        >
                                            <div className="text-[21px] tracking-tighter">{plan.price}</div>
                                            <div className="text-[9px] font-sans font-bold text-vlanc-black/40 uppercase tracking-widest">+ IVA</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Mobile Info */}
                            <div className="lg:hidden space-y-6">
                                {(data?.plans ?? []).map((plan, i) => (
                                    <div key={i} className="p-6 bg-white/40 rounded-sm border border-vlanc-primary/10">
                                        <h4 className="subtitle-md text-vlanc-primary mb-4">{plan.name}</h4>
                                        <p className="text-[18px] font-serif font-bold mb-4">{plan.price} + IVA</p>
                                        <ul className="space-y-2">
                                            {(data?.featureLabels ?? []).map((label, idx) => (
                                                plan.features?.[idx] && (
                                                    <li key={idx} className="text-[11px] flex items-center gap-2">
                                                        <CheckIcon /> {label}
                                                    </li>
                                                )
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Investment;
