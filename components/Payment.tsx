
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
            invoiceInfo?: string;
        }
    }
}

const SectionHeader: React.FC<{ number?: string, title?: string }> = ({ number, title }) => (
    <div className="relative mb-8 md:mb-12 ml-8 md:ml-0">
      <h2 className="flex items-baseline text-5xl md:text-7xl font-bold text-gray-800">
        <span>{number}</span>
        <span className="font-light text-3xl md:text-5xl ml-4 tracking-wider">{title}</span>
      </h2>
      <span className="absolute -top-4 -left-4 w-1 h-24 bg-teal-400 transform -rotate-12"></span>
    </div>
);

const PaymentPlanCard: React.FC<{ title?: string, payments?: PaymentStep[] }> = ({ title, payments }) => (
    <div className="mb-6 last:mb-0">
        <h4 className="font-bold text-sm md:text-base border-l-4 border-teal-400 pl-2 mb-2">{title}</h4>
        <div className="space-y-1">
            {(payments ?? []).map((p, i) => (
                <div key={i} className="flex items-start text-gray-600 text-xs md:text-sm">
                    <span className="font-bold w-10 shrink-0 bg-gray-100 text-center mr-2">{p.percent}</span>
                    <span>&gt; {p.description}</span>
                </div>
            ))}
        </div>
    </div>
);

const Payment: React.FC<PaymentProps> = ({ data }) => {
    return (
        <section className="h-full py-12 px-4 md:px-8 lg:px-16 bg-slate-50 flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full">
                 <AnimatedSection>
                    <SectionHeader number={data?.sectionNumber} title={data?.title} />
                </AnimatedSection>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    <AnimatedSection>
                        <h3 className="text-xl font-semibold text-teal-600 mb-6">&gt; {data?.paymentMethods?.title}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                           {/* Plan Proyecta & Control in col 1 */}
                           <div>
                               {(data?.paymentMethods?.plans ?? []).slice(0, 2).map((plan, i) => (
                                    <PaymentPlanCard key={i} title={plan.title} payments={plan.payments} />
                               ))}
                           </div>
                           {/* Plan Vive & Vlanc in col 2 */}
                           <div>
                               {(data?.paymentMethods?.plans ?? []).slice(2, 4).map((plan, i) => (
                                    <PaymentPlanCard key={i} title={plan.title} payments={plan.payments} />
                               ))}
                           </div>
                        </div>
                    </AnimatedSection>
                     <AnimatedSection>
                         <h3 className="text-xl font-semibold text-teal-600 mb-6">&gt; {data?.finePrint?.title}</h3>
                         <div className="space-y-2 text-xs text-gray-500 text-justify">
                            {(data?.finePrint?.points ?? []).map((point, i) => (
                                <p key={i}>{point}</p>
                            ))}
                         </div>
                         {data?.finePrint?.invoiceInfo && (
                             <p className="mt-8 text-xs font-semibold text-gray-600 border-t pt-4">
                                 {data?.finePrint?.invoiceInfo}
                             </p>
                         )}
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
};

export default Payment;
