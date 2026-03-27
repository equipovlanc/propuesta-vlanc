import React from 'react';
import { PortableText } from '@portabletext/react';

interface CustomPortableTextProps {
    value: any;
    className?: string;
    paragraphClassName?: string;
    isInline?: boolean;
}

const CustomPortableText: React.FC<CustomPortableTextProps> = ({ 
    value, 
    className = "", 
    paragraphClassName = "",
    isInline = false
}) => {
    if (!value) return null;

    // Helper para renderizar el contenido sin un div envoltorio si es inline
    const renderContent = () => {
        // 1. Si es un string (formato antiguo)
        if (typeof value === 'string') {
            const formatted = value.replace(/\n/g, '<br />');
            return (
                <span 
                    className={paragraphClassName || className} 
                    dangerouslySetInnerHTML={{ __html: formatted }} 
                />
            );
        }

        // 2. Si es un array
        if (Array.isArray(value)) {
            // Caso A: Array de strings (formato antiguo de Situation)
            if (typeof value[0] === 'string') {
                return (
                    <>
                        {value.map((p: string, i: number) => {
                            const Tag = isInline ? 'span' : 'p';
                            return <Tag key={i} className={`mb-0 min-h-[1.4em] ${paragraphClassName || className}`} dangerouslySetInnerHTML={{ __html: p }} />;
                        })}
                    </>
                );
            }

            // Caso B: Array de bloques (PortableText)
            return (
                <PortableText 
                    value={value} 
                    components={{
                        block: {
                            normal: ({ children }: any) => {
                                const Tag = isInline ? 'span' : 'p';
                                return (
                                    <Tag className={`mb-0 min-h-[1.4em] ${paragraphClassName || className}`}>
                                        {children}
                                    </Tag>
                                );
                            }
                        },
                        list: {
                            bullet: ({ children }: any) => {
                                if (isInline) return <span className="list-disc pl-5 mb-0">{children}</span>;
                                return <ul className="list-disc pl-5 mb-0">{children}</ul>;
                            },
                            number: ({ children }: any) => {
                                if (isInline) return <span className="list-decimal pl-5 mb-0">{children}</span>;
                                return <ol className="list-decimal pl-5 mb-0">{children}</ol>;
                            },
                        },
                        listItem: {
                            bullet: ({ children }: any) => {
                                const Tag = isInline ? 'span' : 'li';
                                return (
                                    <Tag className={`mb-0 min-h-[1.4em] ${paragraphClassName || className}`}>
                                        {children}
                                    </Tag>
                                );
                            },
                            number: ({ children }: any) => {
                                const Tag = isInline ? 'span' : 'li';
                                return (
                                    <Tag className={`mb-0 min-h-[1.4em] ${paragraphClassName || className}`}>
                                        {children}
                                    </Tag>
                                );
                            },
                        }
                    }}
                />
            );
        }
        return null;
    };

    if (isInline) {
        return renderContent();
    }

    return (
        <div className={className}>
            {renderContent()}
        </div>
    );
};

export default CustomPortableText;
