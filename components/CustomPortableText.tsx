import React from 'react';
import { PortableText } from '@portabletext/react';

interface CustomPortableTextProps {
    value: any;
    className?: string;
    paragraphClassName?: string;
}

const CustomPortableText: React.FC<CustomPortableTextProps> = ({ 
    value, 
    className = "", 
    paragraphClassName = "" 
}) => {
    if (!value) return null;

    // Si es un string (formato antiguo), lo renderizamos con dangerouslySetInnerHTML
    if (typeof value === 'string') {
        const formatted = value.replace(/\n/g, '<br />');
        return (
            <div 
                className={className} 
                dangerouslySetInnerHTML={{ __html: formatted }} 
            />
        );
    }

    // Si es un array, comprobar qué tipo de elementos tiene
    if (Array.isArray(value)) {
        // Si el primer elemento es un string, asumimos que es un array de párrafos (formato antiguo de Situation)
        if (typeof value[0] === 'string') {
            return (
                <div className={className}>
                    {value.map((p: string, i: number) => (
                        <p key={i} className={`mb-4 min-h-[1.4em] ${paragraphClassName}`} dangerouslySetInnerHTML={{ __html: p }} />
                    ))}
                </div>
            );
        }

        // Si es un array de bloques (formato nuevo), usamos PortableText
        return (
            <div className={className}>
                <PortableText 
                    value={value} 
                    components={{
                        block: {
                            normal: ({ children }: any) => (
                                <p className={`mb-0 min-h-[1.4em] ${paragraphClassName}`}>
                                    {children}
                                </p>
                            )
                        },
                        list: {
                            bullet: ({ children }: any) => <ul className="list-disc pl-5 mb-0">{children}</ul>,
                            number: ({ children }: any) => <ol className="list-decimal pl-5 mb-0">{children}</ol>,
                        },
                        listItem: {
                            bullet: ({ children }: any) => (
                                <li className={`mb-0 min-h-[1.4em] ${paragraphClassName}`}>
                                    {children}
                                </li>
                            ),
                            number: ({ children }: any) => (
                                <li className={`mb-0 min-h-[1.4em] ${paragraphClassName}`}>
                                    {children}
                                </li>
                            ),
                        }
                    }}
                />
            </div>
        );
    }

    return null;
};

export default CustomPortableText;
