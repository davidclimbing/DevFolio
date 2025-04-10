import React, { useEffect, useRef, ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

type AnimationType = 'fade-in-up' | 'fade-in-down' | 'fade-in-left' | 'fade-in-right' | 'fade-in-scale';
type DelayType = 'delay-100' | 'delay-200' | 'delay-300' | 'delay-400' | 'delay-500' | '';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  animationType?: AnimationType;
  delay?: DelayType;
  threshold?: number;
  triggerOnce?: boolean;
}

const ScrollAnimation = ({
  children,
  className = '',
  animationType = 'fade-in-up',
  delay = '',
  threshold = 0.1,
  triggerOnce = true
}: ScrollAnimationProps) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce
  });
  
  const animationClass = useRef(`${animationType} ${delay}`);

  return (
    <div
      ref={ref}
      className={`${animationClass.current} ${inView ? 'appear' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation; 