
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface ProcessStep {
    title?: string;
    description?: string;
}

interface ProcessProps {
    data?: {
        sectionNumber?: string;
        title?: string;
        steps?: ProcessStep[];
    }
}

const Process: React.FC<ProcessProps> = ({ data }) => {
    return (
        <section className="min-h-screen py-32 px-12 md:px-24 bg-vlanc-bg flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full">
                <AnimatedSection>
                    <h2 className="title-xl text-vlanc-black mb-4 tracking-tighter">{data?.title}</h2>
                    <div className="w-16 h-[2px] bg-vlanc-primary mb-20"></div>
                </AnimatedSection>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
                    {(data?.steps ?? []).map((step, index) => (
                        <AnimatedSection key={index}>
                            <div className="space-y-6">
                                <h3 className="subtitle-md text-vlanc-black flex items-center">
                                    <span className="text-vlanc-primary font-bold mr-3">{`0${index + 1}`} /</span>
                                    {step.title}
                                </h3>
                                <p className="text-vlanc-black/60 text-[12px] font-sans leading-relaxed text-justify">
                                    {step.description}
                                </p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
