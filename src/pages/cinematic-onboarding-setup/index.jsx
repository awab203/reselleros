import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

import WelcomeStep from './components/WelcomeStep';
import BusinessProfileStep from './components/BusinessProfileStep';
import SourcingMethodStep from './components/SourcingMethodStep';
import SellingPlatformStep from './components/SellingPlatformStep';
import ShippingPreferencesStep from './components/ShippingPreferencesStep';
import ProfitTargetsStep from './components/ProfitTargetsStep';
import ResellModeStep from './components/ResellModeStep';
import DashboardPreviewStep from './components/DashboardPreviewStep';

const CinematicOnboardingSetup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [setupData, setSetupData] = useState({
    businessProfile: {
      businessName: '',
      experienceLevel: '',
      monthlyVolume: '',
      primaryFocus: ''
    },
    sourcingMethods: {
      itaoBuy: false,
      cnFans: false,
      manualHauls: false,
      otherPlatforms: []
    },
    sellingPlatforms: {
      ebay: { enabled: false, authenticated: false },
      vinted: { enabled: false, authenticated: false },
      depop: { enabled: false, authenticated: false }
    },
    shippingPreferences: {
      preferredCouriers: [],
      defaultDeclarationValue: '',
      insurancePreference: false
    },
    profitTargets: {
      currency: 'USD',
      monthlyTarget: '',
      profitMarginTarget: '',
      reinvestmentPercentage: ''
    },
    resellMode: 'hustle'
  });

  const steps = [
    { id: 'welcome', title: 'Welcome', component: WelcomeStep },
    { id: 'business', title: 'Business Profile', component: BusinessProfileStep },
    { id: 'sourcing', title: 'Sourcing Methods', component: SourcingMethodStep },
    { id: 'selling', title: 'Selling Platforms', component: SellingPlatformStep },
    { id: 'shipping', title: 'Shipping Preferences', component: ShippingPreferencesStep },
    { id: 'targets', title: 'Profit Targets', component: ProfitTargetsStep },
    { id: 'mode', title: 'Resell Mode', component: ResellModeStep },
    { id: 'preview', title: 'Dashboard Preview', component: DashboardPreviewStep }
  ];

  const updateSetupData = (stepData) => {
    setSetupData(prev => ({ ...prev, ...stepData }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const skipToEnd = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(steps.length - 1);
      setIsTransitioning(false);
    }, 300);
  };

  const completeSetup = () => {
    localStorage.setItem('resellerOSSetup', JSON.stringify(setupData));
    navigate('/modular-dashboard-control-center');
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;
  const CurrentStepComponent = steps[currentStep].component;

  useEffect(() => {
    // Particle effect initialization
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`;
          ctx.fill();
        });
        
        requestAnimationFrame(animate);
      };
      
      animate();
    }
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Particle Background */}
      <canvas
        id="particles-canvas"
        className="absolute inset-0 pointer-events-none opacity-30"
      />
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-subtle">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={16} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-heading font-bold text-text-primary">ResellerOS Setup</h1>
                <p className="text-xs text-text-secondary">Step {currentStep + 1} of {steps.length}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {currentStep > 0 && (
                <button
                  onClick={skipToEnd}
                  className="px-3 py-1 text-xs text-text-secondary hover:text-text-primary transition-smooth"
                >
                  Skip to End
                </button>
              )}
              <span className="text-sm font-medium text-text-primary">
                {Math.round(progressPercentage)}%
              </span>
            </div>
          </div>
          
          <div className="w-full bg-surface rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out glow-primary"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-8 px-4 min-h-screen flex items-center justify-center">
        <div className={`
          w-full max-w-4xl mx-auto transition-all duration-300 ease-in-out
          ${isTransitioning ? 'opacity-0 transform translate-x-8' : 'opacity-100 transform translate-x-0'}
        `}>
          <CurrentStepComponent
            setupData={setupData}
            updateSetupData={updateSetupData}
            onNext={nextStep}
            onPrev={prevStep}
            onComplete={completeSetup}
            isFirstStep={currentStep === 0}
            isLastStep={currentStep === steps.length - 1}
            stepNumber={currentStep + 1}
            totalSteps={steps.length}
          />
        </div>
      </div>

      {/* Navigation Controls */}
      {currentStep > 0 && (
        <div className="fixed bottom-6 left-0 right-0 z-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <button
                onClick={prevStep}
                className="flex items-center space-x-2 px-6 py-3 bg-surface border border-subtle text-text-primary font-medium rounded-lg hover:bg-surface/70 transition-smooth"
              >
                <Icon name="ChevronLeft" size={16} />
                <span>Previous</span>
              </button>
              
              <div className="flex items-center space-x-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`
                      w-2 h-2 rounded-full transition-smooth
                      ${index <= currentStep ? 'bg-primary glow-primary' : 'bg-surface'}
                    `}
                  />
                ))}
              </div>
              
              {currentStep < steps.length - 1 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-smooth glow-primary"
                >
                  <span>Next</span>
                  <Icon name="ChevronRight" size={16} />
                </button>
              ) : (
                <button
                  onClick={completeSetup}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-success to-primary text-white font-medium rounded-lg hover:from-success-600 hover:to-primary-600 transition-smooth glow-primary"
                >
                  <span>Complete Setup</span>
                  <Icon name="Check" size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CinematicOnboardingSetup;