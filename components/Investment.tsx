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

const SectionHeader: React.FC<{ number?: string, title?: string }> = ({ number, title }) => (
    <div className="relative mb-8 md:mb-12 ml-8 md:ml-0">
      <h2 className="flex items-baseline text-6xl md:text-8xl font-bold text-gray-800">
        <span>{number}</span>
        <span className="font-light text-4xl md:text-5xl ml-4 tracking-wider">{title}</span>
      </h2>
      <span className="absolute -top-4 -left-4 w-1 h-24 bg-teal-400 transform -rotate-12"></span>
    </div>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
);

const Investment: React.FC<InvestmentProps> = ({ data }) => {
    const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
    return (
        <section className="h-full py-12 px-4 md:px-8 lg:px-16 bg-slate-50 flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 h-full">
                    {/* Left Column: Text */}
                    <div className="lg:col-span-5 space-y-6">
                        <AnimatedSection>
                            <SectionHeader number={data?.sectionNumber} title={data?.title} />
                            <div 
                                className="text-gray-600 leading-relaxed text-sm mb-4 whitespace-pre-line"
                                dangerouslySetInnerHTML={{ __html: data?.introduction || '' }}
                            />
                            <h4 className="font-bold text-teal-700 mb-6 text-lg">{data?.subHeader}</h4>
                            
                            <div className="space-y-6">
                                {(data?.plansDescription ?? []).map((desc, i) => (
                                    <div key={i}>
                                        <p className="font-bold text-gray-800 text-sm">{desc.name}</p>
                                        <div 
                                            className="text-xs text-gray-600 whitespace-pre-line leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: desc.desc || '' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </AnimatedSection>
                    </div>

                    {/* Right Column: Table - Maximized Height */}
                    <div className="lg:col-span-7 flex flex-col h-full pt-8 pb-4">
                        <AnimatedSection className="h-full">
                            {/* Desktop Table View */}
                            <div className="hidden lg:flex flex-col h-full overflow-hidden rounded-sm text-xs border border-gray-300 shadow-md">
                                <div className="grid grid-cols-[2fr_repeat(4,1fr)] bg-gray-200">
                                    <div className="p-3"></div>
                                    {(data?.plans ?? []).map((plan, i) => (
                                        <div 
                                            key={i} 
                                            className={`p-3 text-center font-bold transition-colors duration-300 flex items-center justify-center ${hoveredPlan === plan.name ? 'bg-teal-100' : 'bg-gray-100'}`}
                                            onMouseEnter={() => setHoveredPlan(plan.name || null)}
                                            onMouseLeave={() => setHoveredPlan(null)}
                                        >
                                            {plan.name?.replace('PLAN ', '')}
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="flex-grow overflow-y-auto grid grid-cols-[2fr_repeat(4,1fr)] divide-y divide-gray-200 bg-white">
                                    {(data?.featureLabels ?? []).map((label, featureIndex) => (
                                        <React.Fragment key={featureIndex}>
                                            <div className="p-3 font-semibold text-gray-700 flex items-center pl-4 bg-white border-r border-gray-100">{label}</div>
                                            {(data?.plans ?? []).map((plan, planIndex) => (
                                                <div 
                                                    key={planIndex} 
                                                    className={`p-3 flex justify-center items-center transition-colors duration-300 border-r border-gray-100 last:border-none ${hoveredPlan === plan.name ? 'bg-teal-50' : 'bg-white'}`}
                                                    onMouseEnter={() => setHoveredPlan(plan.name || null)}
                                                    onMouseLeave={() => setHoveredPlan(null)}
                                                >
                                                    {plan.features?.[featureIndex] && <CheckIcon />}
                                                </div>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </div>

                                <div className="grid grid-cols-[2fr_repeat(4,1fr)] border-t border-gray-300">
                                     <div className="bg-gray-100 p-3"></div>
                                     {(data?.plans ?? []).map((plan, i) => (
                                        <div 
                                            key={i} 
                                            className={`p-3 text-center font-bold text-teal-600 transition-colors duration-300 bg-gray-100 flex flex-col justify-center`}
                                        >
                                            <div className="text-sm">{plan.price}</div>
                                            <div className="text-[10px] font-normal text-gray-500">+ IVA</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                             {/* Mobile Card View */}
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden mt-8">
                                {(data?.plans ?? []).map((plan) => (
                                    <div key={plan.name} className="bg-white border border-gray-200 p-4 shadow-sm">
                                        <h3 className="text-center font-bold text-gray-800 mb-2">{plan.name}</h3>
                                        <div className="text-center font-bold text-lg text-teal-600 mb-4">{plan.price}</div>
                                        <ul className="space-y-2">
                                            {(data?.featureLabels ?? []).map((label, featureIndex) => (
                                                plan.features?.[featureIndex] && (
                                                    <li key={featureIndex} className="flex items-start text-xs text-gray-600">
                                                        <span className="mr-2 text-teal-500">✓</span> {label}
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