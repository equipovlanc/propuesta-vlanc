import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';

interface Plan {
    name?: string;
    price?: string;
    features?: boolean[];
}

interface InvestmentProps {
    data?: {
        sectionNumber?: string;
        title?: string;
        introduction?: string;
        plans?: Plan[];
        featureLabels?: string[];
    }
}

const SectionHeader: React.FC<{ number?: string, title?: string }> = ({ number, title }) => (
    <div className="relative mb-12 ml-8 md:ml-0">
      <h2 className="flex items-baseline text-6xl md:text-8xl font-bold text-gray-800">
        <span>{number}</span>
        <span className="font-light text-4xl md:text-5xl ml-4 tracking-wider">{title}</span>
      </h2>
      <span className="absolute -top-4 -left-4 w-1 h-24 bg-teal-400 transform -rotate-12"></span>
    </div>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const Investment: React.FC<InvestmentProps> = ({ data }) => {
    const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
    return (
        <section className="py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <AnimatedSection>
                    <SectionHeader number={data?.sectionNumber} title={data?.title} />
                </AnimatedSection>
                <AnimatedSection>
                    <p className="max-w-3xl text-gray-600 mb-12 leading-relaxed">
                        {data?.introduction}
                    </p>
                </AnimatedSection>
                <AnimatedSection>
                    {/* Desktop Table View */}
                    <div className="hidden lg:block">
                        <div className="grid grid-cols-[2fr_repeat(4,1fr)] gap-px bg-gray-200 border border-gray-200">
                            {/* Header Row */}
                            <div className="bg-white p-4"></div>
                            {(data?.plans ?? []).map((plan, i) => (
                                <div 
                                    key={i} 
                                    className={`p-4 text-center font-bold transition-colors duration-300 ${hoveredPlan === plan.name ? 'bg-teal-100' : 'bg-white'}`}
                                    onMouseEnter={() => setHoveredPlan(plan.name || null)}
                                    onMouseLeave={() => setHoveredPlan(null)}
                                >
                                    {plan.name}
                                </div>
                            ))}
                            
                            {/* Feature Rows */}
                            {(data?.featureLabels ?? []).map((label, featureIndex) => (
                                <React.Fragment key={featureIndex}>
                                    <div className="bg-white p-4 font-semibold text-gray-700 text-sm flex items-center">{label}</div>
                                    {(data?.plans ?? []).map((plan, planIndex) => (
                                        <div 
                                            key={planIndex} 
                                            className={`p-4 flex justify-center items-center transition-colors duration-300 ${hoveredPlan === plan.name ? 'bg-teal-50' : 'bg-white'}`}
                                            onMouseEnter={() => setHoveredPlan(plan.name || null)}
                                            onMouseLeave={() => setHoveredPlan(null)}
                                        >
                                            {plan.features?.[featureIndex] && <CheckIcon />}
                                        </div>
                                    ))}
                                </React.Fragment>
                            ))}

                             {/* Price Row */}
                             <div className="bg-white p-4"></div>
                             {(data?.plans ?? []).map((plan, i) => (
                                <div 
                                    key={i} 
                                    className={`p-4 text-center font-bold text-lg text-teal-600 transition-colors duration-300 ${hoveredPlan === plan.name ? 'bg-teal-100' : 'bg-white'}`}
                                    onMouseEnter={() => setHoveredPlan(plan.name || null)}
                                    onMouseLeave={() => setHoveredPlan(null)}
                                >
                                    {plan.price} <span className="text-sm font-normal text-gray-500">+ IVA</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile & Tablet Card View */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
                        {(data?.plans ?? []).map((plan) => (
                            <div key={plan.name} className="bg-white border border-gray-200 p-6 flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                                <h3 className="text-center text-lg font-bold text-gray-800">{plan.name}</h3>
                                
                                <ul className="my-6 space-y-4">
                                    {(data?.featureLabels ?? []).map((label, featureIndex) => (
                                        <li key={featureIndex} className="flex items-start text-sm">
                                            <div className="w-6 pt-1 shrink-0">
                                                {plan.features?.[featureIndex] ? <CheckIcon /> : <span className="text-gray-400 font-bold ml-2">-</span>}
                                            </div>
                                            <span className="flex-1 text-gray-600 ml-2">{label}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-auto text-center font-bold text-xl text-teal-600">
                                    {plan.price} <span className="text-sm font-normal text-gray-500">+ IVA</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default Investment;