import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SourcingMethodStep = ({ setupData, updateSetupData, onNext, onPrev }) => {
  const [formData, setFormData] = useState(setupData.sourcingMethods);
  const [customPlatform, setCustomPlatform] = useState('');

  const sourcingPlatforms = [
    {
      id: 'itaoBuy',
      name: 'ItaoBuy',
      description: 'Professional Taobao/1688 sourcing agent',
      icon: 'ShoppingCart',
      features: ['Bulk ordering', 'Quality inspection', 'Consolidated shipping'],
      popular: true
    },
    {
      id: 'cnFans',
      name: 'CNFans',
      description: 'Replica and designer item sourcing',
      icon: 'Star',
      features: ['Designer replicas', 'QC photos', 'Fast shipping'],
      popular: true
    },
    {
      id: 'manualHauls',
      name: 'Manual Hauls',
      description: 'Direct supplier relationships',
      icon: 'Handshake',
      features: ['Custom negotiations', 'Direct contact', 'Flexible terms'],
      popular: false
    }
  ];

  const handleToggle = (platformId) => {
    setFormData(prev => ({
      ...prev,
      [platformId]: !prev[platformId]
    }));
  };

  const addCustomPlatform = () => {
    if (customPlatform.trim() && !formData.otherPlatforms.includes(customPlatform.trim())) {
      setFormData(prev => ({
        ...prev,
        otherPlatforms: [...prev.otherPlatforms, customPlatform.trim()]
      }));
      setCustomPlatform('');
    }
  };

  const removeCustomPlatform = (platform) => {
    setFormData(prev => ({
      ...prev,
      otherPlatforms: prev.otherPlatforms.filter(p => p !== platform)
    }));
  };

  const handleNext = () => {
    updateSetupData({ sourcingMethods: formData });
    onNext();
  };

  const hasSelectedMethods = formData.itaoBuy || formData.cnFans || formData.manualHauls || formData.otherPlatforms.length > 0;

  const PlatformCard = ({ platform }) => {
    const isSelected = formData[platform.id];
    
    return (
      <div
        className={`
          relative p-6 rounded-xl border transition-smooth cursor-pointer
          ${isSelected 
            ? 'bg-primary/10 border-primary/30 glow-primary' :'bg-surface/50 border-subtle hover:bg-surface/70'
          }
        `}
        onClick={() => handleToggle(platform.id)}
      >
        {platform.popular && (
          <div className="absolute -top-2 -right-2 px-2 py-1 bg-gradient-to-r from-accent to-warning text-white text-xs font-bold rounded-full">
            Popular
          </div>
        )}
        
        <div className="flex items-start space-x-4">
          <div className={`
            w-12 h-12 rounded-lg flex items-center justify-center transition-smooth
            ${isSelected ? 'bg-primary text-white' : 'bg-surface text-text-secondary'}
          `}>
            <Icon name={platform.icon} size={24} />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className={`font-semibold ${isSelected ? 'text-primary' : 'text-text-primary'}`}>
                {platform.name}
              </h3>
              {isSelected && (
                <Icon name="Check" size={16} className="text-primary" />
              )}
            </div>
            <p className="text-text-secondary text-sm mb-3">{platform.description}</p>
            
            <div className="space-y-1">
              {platform.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={12} className="text-success" />
                  <span className="text-xs text-text-secondary">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className={`
          absolute top-4 right-4 w-6 h-6 rounded-full border-2 transition-smooth
          ${isSelected 
            ? 'bg-primary border-primary' :'border-subtle'
          }
        `}>
          {isSelected && (
            <Icon name="Check" size={12} className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center glow-primary">
          <Icon name="Package" size={32} className="text-white" />
        </div>
        <h2 className="text-3xl font-heading font-bold text-text-primary mb-2">
          Configure Sourcing Methods
        </h2>
        <p className="text-text-secondary">
          Select the platforms and methods you use to source products for reselling.
        </p>
      </div>

      <div className="space-y-8">
        {/* Main Platforms */}
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Primary Sourcing Platforms
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sourcingPlatforms.map((platform) => (
              <PlatformCard key={platform.id} platform={platform} />
            ))}
          </div>
        </div>

        {/* Custom Platforms */}
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Other Platforms
          </h3>
          
          <div className="flex space-x-3 mb-4">
            <input
              type="text"
              value={customPlatform}
              onChange={(e) => setCustomPlatform(e.target.value)}
              placeholder="Add custom sourcing platform"
              className="flex-1 px-4 py-3 bg-surface border border-subtle rounded-lg text-text-primary placeholder-text-secondary focus:border-primary transition-smooth"
              onKeyPress={(e) => e.key === 'Enter' && addCustomPlatform()}
            />
            <button
              onClick={addCustomPlatform}
              disabled={!customPlatform.trim()}
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="Plus" size={16} />
            </button>
          </div>

          {formData.otherPlatforms.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.otherPlatforms.map((platform, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 px-3 py-2 bg-surface border border-subtle rounded-lg"
                >
                  <span className="text-text-primary text-sm">{platform}</span>
                  <button
                    onClick={() => removeCustomPlatform(platform)}
                    className="text-text-secondary hover:text-error transition-smooth"
                  >
                    <Icon name="X" size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Integration Preview */}
        {hasSelectedMethods && (
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6">
            <h3 className="font-semibold text-text-primary mb-3 flex items-center space-x-2">
              <Icon name="Zap" size={16} />
              <span>Integration Preview</span>
            </h3>
            <p className="text-text-secondary text-sm mb-4">
              Your dashboard will include dedicated modules for tracking orders, managing inventory, and analyzing performance across your selected platforms.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(formData).map(([key, value]) => {
                if (key === 'otherPlatforms') return null;
                if (!value) return null;
                
                const platform = sourcingPlatforms.find(p => p.id === key);
                if (!platform) return null;
                
                return (
                  <div key={key} className="flex items-center space-x-2 p-3 bg-surface/50 rounded-lg">
                    <Icon name={platform.icon} size={16} className="text-primary" />
                    <span className="text-text-primary text-sm font-medium">{platform.name}</span>
                  </div>
                );
              })}
              
              {formData.otherPlatforms.map((platform, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 bg-surface/50 rounded-lg">
                  <Icon name="ExternalLink" size={16} className="text-primary" />
                  <span className="text-text-primary text-sm font-medium">{platform}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!hasSelectedMethods && (
          <div className="text-center py-8 border-2 border-dashed border-subtle rounded-xl">
            <Icon name="Package" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary">
              Select at least one sourcing method to continue
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-12 pt-8 border-t border-subtle">
        <button
          onClick={onPrev}
          className="flex items-center space-x-2 px-6 py-3 bg-surface border border-subtle text-text-primary font-medium rounded-lg hover:bg-surface/70 transition-smooth"
        >
          <Icon name="ChevronLeft" size={16} />
          <span>Previous</span>
        </button>
        
        <button
          onClick={handleNext}
          disabled={!hasSelectedMethods}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed glow-primary"
        >
          <span>Continue</span>
          <Icon name="ChevronRight" size={16} />
        </button>
      </div>
    </div>
  );
};

export default SourcingMethodStep;