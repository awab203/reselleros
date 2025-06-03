import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const DashboardPreviewStep = ({ setupData, onComplete, onPrev }) => {
  const navigate = useNavigate();
  const [animationPhase, setAnimationPhase] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);

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

  const handleComplete = () => {
    setIsCompleting(true);
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  const getDashboardModules = () => {
    const modules = [];
    
    // Always include core modules
    modules.push(
      { id: 'overview', name: 'Business Overview', icon: 'BarChart3', enabled: true },
      { id: 'profit', name: 'Profit Analytics', icon: 'TrendingUp', enabled: true }
    );

    // Add sourcing modules based on selections
    if (setupData.sourcingMethods?.itaoBuy) {
      modules.push({ id: 'itaobuy', name: 'ItaoBuy Integration', icon: 'ShoppingCart', enabled: true });
    }
    if (setupData.sourcingMethods?.cnFans) {
      modules.push({ id: 'cnfans', name: 'CNFans Integration', icon: 'Star', enabled: true });
    }
    if (setupData.sourcingMethods?.manualHauls) {
      modules.push({ id: 'manual', name: 'Manual Hauls', icon: 'Handshake', enabled: true });
    }

    // Add selling platform modules
    if (setupData.sellingPlatforms?.ebay?.enabled) {
      modules.push({ id: 'ebay', name: 'eBay Sales', icon: 'Globe', enabled: setupData.sellingPlatforms.ebay.authenticated });
    }
    if (setupData.sellingPlatforms?.vinted?.enabled) {
      modules.push({ id: 'vinted', name: 'Vinted Sales', icon: 'Shirt', enabled: setupData.sellingPlatforms.vinted.authenticated });
    }
    if (setupData.sellingPlatforms?.depop?.enabled) {
      modules.push({ id: 'depop', name: 'Depop Sales', icon: 'Heart', enabled: setupData.sellingPlatforms.depop.authenticated });
    }

    // Add shipping modules
    if (setupData.shippingPreferences?.preferredCouriers?.length > 0) {
      modules.push({ id: 'shipping', name: 'Shipment Tracking', icon: 'Truck', enabled: true });
    }

    return modules;
  };

  const getPersonalizedInsights = () => {
    const insights = [];
    
    const experienceLevel = setupData.businessProfile?.experienceLevel;
    const monthlyVolume = setupData.businessProfile?.monthlyVolume;
    const profitTarget = setupData.profitTargets?.monthlyTarget;
    const currency = setupData.profitTargets?.currency || 'USD';
    const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';

    if (experienceLevel === 'beginner') {
      insights.push({
        type: 'tip',
        title: 'Beginner-Friendly Features',
        description: 'Your dashboard includes extra tutorials and guided workflows to help you learn.',
        icon: 'BookOpen'
      });
    }

    if (monthlyVolume === 'high' || monthlyVolume === 'enterprise') {
      insights.push({
        type: 'feature',
        title: 'Bulk Operations',
        description: 'Advanced bulk editing and batch processing tools are enabled for your high-volume operation.',
        icon: 'Layers'
      });
    }

    if (profitTarget && parseFloat(profitTarget) > 2000) {
      insights.push({
        type: 'goal',
        title: 'Ambitious Targets',
        description: `Your ${currencySymbol}${profitTarget}/month target will unlock advanced analytics and performance tracking.`,
        icon: 'Target'
      });
    }

    const enabledPlatforms = Object.values(setupData.sellingPlatforms || {}).filter(p => p.enabled).length;
    if (enabledPlatforms > 1) {
      insights.push({
        type: 'integration',
        title: 'Multi-Platform Power',
        description: `Cross-platform analytics and unified inventory management across ${enabledPlatforms} platforms.`,
        icon: 'Zap'
      });
    }

    return insights;
  };

  const modules = getDashboardModules();
  const insights = getPersonalizedInsights();
  const selectedMode = setupData.resellMode || 'hustle';

  const modeConfig = {
    study: { name: 'Study Mode', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    chill: { name: 'Chill Mode', color: 'text-green-400', bg: 'bg-green-400/10' },
    hustle: { name: 'Hustle Mode', color: 'text-yellow-400', bg: 'bg-yellow-400/10' }
  };

  const currentMode = modeConfig[selectedMode];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className={`
          w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center glow-primary transition-all duration-1000
          ${animationPhase >= 1 ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-75'}
        `}>
          <Icon name="Sparkles" size={32} className="text-white" />
        </div>
        <h2 className={`
          text-3xl font-heading font-bold text-text-primary mb-2 transition-all duration-1000 delay-300
          ${animationPhase >= 2 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}
        `}>
          Your Personalized Dashboard
        </h2>
        <p className={`
          text-text-secondary transition-all duration-1000 delay-500
          ${animationPhase >= 3 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}
        `}>
          Here's a preview of your customized ResellerOS experience based on your preferences.
        </p>
      </div>

      <div className="space-y-8">
        {/* Business Summary */}
        <div className={`
          bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6 transition-all duration-1000 delay-700
          ${animationPhase >= 3 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}
        `}>
          <h3 className="font-semibold text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="Building" size={16} />
            <span>Business Profile</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-text-secondary">Business Name</p>
              <p className="text-text-primary font-medium">{setupData.businessProfile?.businessName || 'Your Business'}</p>
            </div>
            <div>
              <p className="text-text-secondary">Experience Level</p>
              <p className="text-text-primary font-medium capitalize">{setupData.businessProfile?.experienceLevel || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-text-secondary">Monthly Volume</p>
              <p className="text-text-primary font-medium capitalize">{setupData.businessProfile?.monthlyVolume || 'Not specified'}</p>
            </div>
          </div>
        </div>

        {/* Dashboard Modules */}
        <div className={`
          transition-all duration-1000 delay-900
          ${animationPhase >= 3 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}
        `}>
          <h3 className="font-semibold text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="Grid3x3" size={16} />
            <span>Enabled Dashboard Modules</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {modules.map((module, index) => (
              <div
                key={module.id}
                className={`
                  p-4 rounded-lg border transition-smooth
                  ${module.enabled 
                    ? 'bg-surface/50 border-subtle text-text-primary' :'bg-surface/20 border-subtle/50 text-text-secondary opacity-50'
                  }
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={module.icon} 
                    size={20} 
                    className={module.enabled ? 'text-primary' : 'text-text-secondary'} 
                  />
                  <div>
                    <h4 className="font-medium text-sm">{module.name}</h4>
                    <p className="text-xs opacity-70">
                      {module.enabled ? 'Active' : 'Requires setup'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personalized Insights */}
        {insights.length > 0 && (
          <div className={`
            transition-all duration-1000 delay-1100
            ${animationPhase >= 3 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}
          `}>
            <h3 className="font-semibold text-text-primary mb-4 flex items-center space-x-2">
              <Icon name="Lightbulb" size={16} />
              <span>Personalized Features</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className="p-4 bg-surface/50 border border-subtle rounded-lg"
                >
                  <div className="flex items-start space-x-3">
                    <Icon name={insight.icon} size={20} className="text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium text-text-primary mb-1">{insight.title}</h4>
                      <p className="text-text-secondary text-sm">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mode Configuration */}
        <div className={`
          transition-all duration-1000 delay-1300
          ${animationPhase >= 3 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}
        `}>
          <h3 className="font-semibold text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="Palette" size={16} />
            <span>Interface Mode</span>
          </h3>
          <div className={`p-6 rounded-xl border border-subtle ${currentMode.bg}`}>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={24} className="text-white" />
              </div>
              <div>
                <h4 className={`font-semibold ${currentMode.color}`}>{currentMode.name}</h4>
                <p className="text-text-secondary text-sm">
                  Your dashboard will adapt to provide the optimal experience for your selected mode.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Completion Section */}
        <div className={`
          text-center py-8 transition-all duration-1000 delay-1500
          ${animationPhase >= 3 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}
        `}>
          <div className="bg-gradient-to-r from-success/10 to-primary/10 border border-success/20 rounded-xl p-8">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
            <h3 className="text-2xl font-heading font-bold text-text-primary mb-4">
              Setup Complete!
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Your personalized ResellerOS dashboard is ready. All your preferences have been saved and your modules are configured. You can always adjust these settings later from your dashboard.
            </p>
            
            <button
              onClick={handleComplete}
              disabled={isCompleting}
              className={`
                inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-success to-primary text-white font-semibold rounded-lg transition-smooth glow-primary text-lg
                ${isCompleting ? 'opacity-50 cursor-not-allowed' : 'hover:from-success-600 hover:to-primary-600'}
              `}
            >
              {isCompleting ? (
                <>
                  <Icon name="Loader" size={20} className="animate-spin" />
                  <span>Launching Dashboard...</span>
                </>
              ) : (
                <>
                  <span>Launch Dashboard</span>
                  <Icon name="ArrowRight" size={20} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-12 pt-8 border-t border-subtle">
        <button
          onClick={onPrev}
          disabled={isCompleting}
          className="flex items-center space-x-2 px-6 py-3 bg-surface border border-subtle text-text-primary font-medium rounded-lg hover:bg-surface/70 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon name="ChevronLeft" size={16} />
          <span>Previous</span>
        </button>
        
        <div className="flex items-center space-x-2 text-text-secondary text-sm">
          <Icon name="Info" size={14} />
          <span>You can modify these settings anytime from your dashboard</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreviewStep;