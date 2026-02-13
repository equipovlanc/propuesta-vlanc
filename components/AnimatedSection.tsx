import React, { useRef, useState, useEffect, ReactNode, CSSProperties } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * AnimatedSection Component
 * 
 * This is a wrapper component that makes its children fade in and slide up
 * when they scroll into the user's view. It's a great way to make the page
 * feel more dynamic and guide the user's attention.
 * 
 * It will re-trigger the animation every time the component enters the viewport.
 */
const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className, style }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set visibility based on whether the component is intersecting with the viewport.
        // This allows the animation to re-trigger on scroll.
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`${className} transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={style}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;