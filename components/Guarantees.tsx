
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface Guarantee {
    icon?: string;
    badgeContent?: string;
    title?: string;
    description?: string;
    note?: string;
}

interface GuaranteesProps {
    data?: {
        title?: string;
        items?: Guarantee[];
    };
}

const GuaranteeItem = ({ item }: { item: Guarantee }) => {
    const hasBadge = item.badgeContent && item.badgeContent.trim().length > 0;

    return (
        <AnimatedSection className="flex flex-col items-start w-full relative" hierarchy={2}>
            
            {/* 1. TÍTULO GARANTÍA */}
            <h3 className="subtitulo2 not-italic mb-6 leading-tight">
                / {item.title}
            </h3>
            
            {/* 2. DESCRIPCIÓN */}
            <div 
                className="cuerpo mb-12"
                dangerouslySetInnerHTML={{ __html: item.description || '' }}
            />

            {/* 3. CONJUNTO VISUAL */}
            {hasBadge && (
                <div className="relative ml-6 mb-2"> 
                    <div className="absolute -top-7 -left-7 w-[60px] h-[60px] z-10 flex items-center justify-center">
                        {item.icon ? (
                            <img 
                                src={item.icon} 
                                alt="Garantía" 
                                className="w-full h-full object-contain drop-shadow-sm" 
                            />
                        ) : (
                            <div className="w-[40px] h-[40px] bg-vlanc-bg border border-vlanc-black rounded-full flex items-center justify-center">
                                <span className="text-[6px] font-bold">ICON</span>
                            </div>
                        )}
                    </div>

                    <div className="border-2 border-vlanc-black bg-transparent px-6 py-6 min-w-[200px] relative z-0">
                        <div 
                            className="cuerpo !text-vlanc-black text-[14px] leading-snug"
                            dangerouslySetInnerHTML={{ __html: item.badgeContent || '' }}
                        />
                    </div>
                </div>
            )}
            
            {/* 4. NOTA AL PIE */}
            {item.note && (
                <div className="absolute top-full left-0 w-full mt-4">
                    <p className="text-[10px] text-vlanc-secondary/60 italic w-full">
                        {item.note}
                    </p>
                </div>
            )}
        </AnimatedSection>
    );
};

const Guarantees: React.FC<GuaranteesProps> = ({ data }) => {
    const formattedTitle = (data?.title || "nuestras garantías.").split(' ').map((word, i, arr) => (
        <React.Fragment key={i}>
            {word}
            {i < arr.length - 1 && <br />}
        </React.Fragment>
    ));

    const items = data?.items || [];
    const item1 = items[0];
    const item2 = items[1];
    const item3 = items[2];

    return (
        <section className="h-full w-full pt-[150px] pb-[140px] px-[120px] overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 h-full">
                
                {/* COLUMNA 1 */}
                <div className="flex flex-col justify-end h-full">
                    {item1 && <GuaranteeItem item={item1} />}
                </div>

                {/* COLUMNA 2 */}
                <div className="flex flex-col justify-end h-full">
                    {item2 && <GuaranteeItem item={item2} />}
                </div>

                {/* COLUMNA 3 */}
                <div className="flex flex-col h-full justify-between">
                    <div className="shrink-0">
                        <AnimatedSection hierarchy={1}>
                             <h2 className="subtitulo1 text-left">
                                {formattedTitle}
                            </h2>
                        </AnimatedSection>
                        <AnimatedSection mode="bar" className="w-[112px] h-[5px] bg-[#8f4933] mt-[27px]" />
                    </div>

                    <div className="mt-auto">
                        {item3 && <GuaranteeItem item={item3} />}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Guarantees;
