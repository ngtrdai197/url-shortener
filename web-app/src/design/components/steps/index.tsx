import React, { useEffect, useRef } from 'react';
import { mapModifiers } from '../../libs/components';

export interface StepsProps {
  stepNames: React.ReactNode[];
  currentStep: number;
}

export const Steps: React.FC<StepsProps> = ({ stepNames, currentStep }) => {
  const olRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (olRef.current) {
      olRef.current.style.setProperty('--step-position', currentStep.toString());
      olRef.current.style.setProperty('--total-step', stepNames.length.toString());
    }
  }, [currentStep, stepNames.length]);

  return (
    <ol ref={olRef} className="c-steps">
      {React.Children.map(stepNames, (step, idx) => (
        <li className={mapModifiers('c-steps__step', idx === currentStep && 'current-step')}>{step}</li>
      ))}
    </ol>
  );
};
