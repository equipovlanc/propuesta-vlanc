import React from 'react';
import AnimatedSection from './AnimatedSection';

interface PaymentStep {
    percent?: string;
    description?: string;
}

interface PlanPayments {
    title?: string;
    payments?: PaymentStep[];
}

interface PaymentProps {
    data?: {
        sectionNumber?: string;
        title?: string;
        paymentMethods?: {
            title?: string;
            plans?: PlanPayments[];
        };
        finePrint?: {
            title?: string;
            points?: string[];
        }
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

const PaymentPlanCard: React.FC<{ title?: string, payments?: PaymentStep[] }> = ({ title, payments }) => (
    <div className="border border-gray-200 p-6">
        <h4 className="font-bold text-lg mb-4">{title}</h4>
        <div className="space-y-2">
            {(payments ?? []).map((p, i) => (
                <div key={i} className="flex items-center text-gray-600">
                    <span className="font-semibold w-12">{p.percent}</span>
                    <span>&gt; {p.description}</span>
                </div>
            ))}
        </div>
    </div>
);

const Payment: React.FC<PaymentProps> = ({ data }) => {
    return (
        <section className="py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                 <AnimatedSection>
                    <SectionHeader number={data?.sectionNumber} title={data?.title} />
                </AnimatedSection>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <AnimatedSection>
                        <h3 className="text-xl font-semibold text-teal-600 mb-6">&gt; {data?.paymentMethods?.title}</h3>
                        <div className="space-y-6">
                           {(data?.paymentMethods?.plans ?? []).map((plan, i) => (
                                <PaymentPlanCard key={i} title={plan.title} payments={plan.payments} />
                           ))}
                        </div>
                    </AnimatedSection>
                     <AnimatedSection>
                         <h3 className="text-xl font-semibold text-teal-600 mb-6">&gt; {data?.finePrint?.title}</h3>
                         <div className="space-y-3 text-sm text-gray-600">
                            {(data?.finePrint?.points ?? []).map((point, i) => (
                                <p key={i}>_ {point}</p>
                            ))}
                         </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
};

export default Payment;
