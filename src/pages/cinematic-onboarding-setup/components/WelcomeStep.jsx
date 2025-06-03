import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';


const WelcomeStep = ({ onNext }) => {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationPhase(1), 500);
    const timer2 = setTimeout(() => setAnimationPhase(2), 1000);
    const timer3 = setTimeout(() => setAnimationPhase(3), 1500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const features = [
    {
      icon: 'TrendingUp',
      title: 'Smart Profit Tracking',
      description: 'Real-time profit calculations with fee deductions'
    },
    {
      icon: 'Package',
      title: 'Multi-Platform Integration',
      description: 'Connect eBay, Vinted, Depop, and sourcing platforms'
    },
    {
      icon: 'Truck',
      title: 'Advanced Logistics',
      description: '17TRACK-style parcel tracking with China logistics'
    },
    {
      icon: 'BarChart3',
      title: 'Business Analytics',
      description: 'Performance insights and optimization recommendations'
    }
  ];

  return (
    <div className="text-center max-w-3xl mx-auto">
      {/* Logo Animation */}
      <div className={`
        mb-8 transition-all duration-1000 ease-out
        ${animationPhase >= 1 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}
      `}>
        <div className="relative inline-block">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center glow-primary">
            <Icon name="Zap" size={48} className="text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full animate-pulse flex items-center justify-center">
            <Icon name="Sparkles" size={12} className="text-background" />
          </div>
        </div>
      </div>

      {/* Welcome Text */}
      <div className={`
        mb-12 transition-all duration-1000 ease-out delay-300
        ${animationPhase >= 2 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}
      `}>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ResellerOS
          </span>
        </h1>
        <p className="text-xl text-text-secondary mb-6 max-w-2xl mx-auto leading-relaxed">
          Your comprehensive reselling business management platform. Transform your workflow from sourcing to profit tracking with intelligent automation and stunning visuals.
        </p>
        <div className="flex items-center justify-center space-x-2 text-text-secondary">
          <Icon name="Clock" size={16} />
          <span className="text-sm">Setup takes 3-5 minutes</span>
        </div>
      </div>

      {/* Features Grid */}
      <div className={`
        grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 transition-all duration-1000 ease-out delay-500
        ${animationPhase >= 3 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}
      `}>
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className={`
              p-6 bg-surface/50 border border-subtle rounded-xl hover:bg-surface/70 transition-smooth
              ${animationPhase >= 3 ? 'animate-scale-in' : ''}
            `}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={feature.icon} size={24} className="text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-text-primary mb-2">{feature.title}</h3>
                <p className="text-sm text-text-secondary">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className={`
        transition-all duration-1000 ease-out delay-700
        ${animationPhase >= 3 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}
      `}>
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-heading font-semibold text-text-primary mb-4">
            Ready to Scale Your Reselling Business?
          </h2>
          <p className="text-text-secondary mb-6">
            Let's configure your personalized dashboard and connect your platforms to get started.
          </p>
          
          <button
            onClick={onNext}
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-smooth glow-primary text-lg"
          >
            <span>Start Setup</span>
            <Icon name="ArrowRight" size={20} />
          </button>
        </div>

        <div className="flex items-center justify-center space-x-6 text-text-secondary text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span>Secure Setup</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={16} className="text-warning" />
            <span>Quick Configuration</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Sparkles" size={16} className="text-secondary" />
            <span>Personalized Experience</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeStep;