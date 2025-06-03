import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ShippingPreferencesStep = ({ setupData, updateSetupData, onNext, onPrev }) => {
  const [formData, setFormData] = useState(setupData.shippingPreferences);

  const couriers = [
    {
      id: 'yanwen',
      name: 'Yanwen',
      description: 'Reliable China Post partner with good tracking',
      icon: 'Truck',
      estimatedDays: '15-25 days',
      trackingQuality: 'Good',
      costLevel: 'Low',
      features: ['Reliable tracking', 'Good for small items', 'Cost effective']
    },
    {
      id: '4px',
      name: '4PX',
      description: 'Fast international shipping with excellent tracking',
      icon: 'Zap',
      estimatedDays: '10-18 days',
      trackingQuality: 'Excellent',
      costLevel: 'Medium',
      features: ['Fast delivery', 'Excellent tracking', 'Good for electronics']
    },
    {
      id: 'gd-ems',
      name: 'GD-EMS',
      description: 'Express service with premium tracking and speed',
      icon: 'Rocket',
      estimatedDays: '7-12 days',
      trackingQuality: 'Premium',
      costLevel: 'High',
      features: ['Express delivery', 'Premium tracking', 'Insurance included']
    },
    {
      id: 'china-post',
      name: 'China Post',
      description: 'Budget option with basic tracking',
      icon: 'Mail',
      estimatedDays: '20-35 days',
      trackingQuality: 'Basic',
      costLevel: 'Very Low',
      features: ['Very cheap', 'Basic tracking', 'Good for low-value items']
    },
    {
      id: 'sf-express',
      name: 'SF Express',
      description: 'Premium courier with fastest delivery',
      icon: 'Plane',
      estimatedDays: '5-10 days',
      trackingQuality: 'Premium',
      costLevel: 'Very High',
      features: ['Fastest delivery', 'Premium service', 'Best for urgent items']
    }
  ];

  const declarationRanges = [
    { id: 'low', label: '$1-5', description: 'Minimize customs risk', value: '1-5' },
    { id: 'medium', label: '$6-15', description: 'Balanced approach', value: '6-15' },
    { id: 'high', label: '$16-25', description: 'Higher value declarations', value: '16-25' },
    { id: 'actual', label: 'Actual Value', description: 'Declare real purchase price', value: 'actual' }
  ];

  const handleCourierToggle = (courierId) => {
    setFormData(prev => ({
      ...prev,
      preferredCouriers: prev.preferredCouriers.includes(courierId)
        ? prev.preferredCouriers.filter(id => id !== courierId)
        : [...prev.preferredCouriers, courierId]
    }));
  };

  const handleDeclarationChange = (value) => {
    setFormData(prev => ({
      ...prev,
      defaultDeclarationValue: value
    }));
  };

  const handleInsuranceToggle = () => {
    setFormData(prev => ({
      ...prev,
      insurancePreference: !prev.insurancePreference
    }));
  };

  const handleNext = () => {
    updateSetupData({ shippingPreferences: formData });
    onNext();
  };

  const hasSelectedCouriers = formData.preferredCouriers.length > 0;

  const CourierCard = ({ courier }) => {
    const isSelected = formData.preferredCouriers.includes(courier.id);
    
    const costColors = {
      'Very Low': 'text-success',
      'Low': 'text-success',
      'Medium': 'text-warning',
      'High': 'text-accent',
      'Very High': 'text-error'
    };

    const trackingColors = {
      'Basic': 'text-text-secondary',
      'Good': 'text-warning',
      'Excellent': 'text-primary',
      'Premium': 'text-secondary'
    };

    return (
      <div
        className={`
          relative p-6 rounded-xl border transition-smooth cursor-pointer
          ${isSelected 
            ? 'bg-primary/10 border-primary/30 glow-primary' :'bg-surface/50 border-subtle hover:bg-surface/70'
          }
        `}
        onClick={() => handleCourierToggle(courier.id)}
      >
        <div className="flex items-start space-x-4">
          <div className={`
            w-12 h-12 rounded-lg flex items-center justify-center transition-smooth
            ${isSelected ? 'bg-primary text-white' : 'bg-surface text-text-secondary'}
          `}>
            <Icon name={courier.icon} size={24} />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className={`font-semibold ${isSelected ? 'text-primary' : 'text-text-primary'}`}>
                {courier.name}
              </h3>
              {isSelected && (
                <Icon name="Check" size={16} className="text-primary" />
              )}
            </div>
            <p className="text-text-secondary text-sm mb-3">{courier.description}</p>
            
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div>
                <p className="text-xs text-text-secondary">Delivery</p>
                <p className="text-sm font-medium text-text-primary">{courier.estimatedDays}</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary">Tracking</p>
                <p className={`text-sm font-medium ${trackingColors[courier.trackingQuality]}`}>
                  {courier.trackingQuality}
                </p>
              </div>
              <div>
                <p className="text-xs text-text-secondary">Cost</p>
                <p className={`text-sm font-medium ${costColors[courier.costLevel]}`}>
                  {courier.costLevel}
                </p>
              </div>
            </div>
            
            <div className="space-y-1">
              {courier.features.map((feature, index) => (
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
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center glow-primary">
          <Icon name="Truck" size={32} className="text-white" />
        </div>
        <h2 className="text-3xl font-heading font-bold text-text-primary mb-2">
          Shipping Preferences
        </h2>
        <p className="text-text-secondary">
          Configure your preferred couriers, declaration values, and shipping options for optimal logistics management.
        </p>
      </div>

      <div className="space-y-8">
        {/* Preferred Couriers */}
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Preferred Couriers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {couriers.map((courier) => (
              <CourierCard key={courier.id} courier={courier} />
            ))}
          </div>
        </div>

        {/* Declaration Preferences */}
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Default Declaration Value
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {declarationRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => handleDeclarationChange(range.value)}
                className={`
                  p-4 rounded-xl border transition-smooth text-left
                  ${formData.defaultDeclarationValue === range.value
                    ? 'bg-primary/10 border-primary/30 text-primary glow-primary' :'bg-surface/50 border-subtle text-text-secondary hover:text-text-primary hover:bg-surface/70'
                  }
                `}
              >
                <h4 className="font-semibold mb-1">{range.label}</h4>
                <p className="text-xs opacity-70">{range.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Insurance Preference */}
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Insurance Options
          </h3>
          <div
            className={`
              p-6 rounded-xl border transition-smooth cursor-pointer
              ${formData.insurancePreference
                ? 'bg-primary/10 border-primary/30 glow-primary' :'bg-surface/50 border-subtle hover:bg-surface/70'
              }
            `}
            onClick={handleInsuranceToggle}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`
                  w-12 h-12 rounded-lg flex items-center justify-center transition-smooth
                  ${formData.insurancePreference ? 'bg-primary text-white' : 'bg-surface text-text-secondary'}
                `}>
                  <Icon name="Shield" size={24} />
                </div>
                <div>
                  <h4 className={`font-semibold ${formData.insurancePreference ? 'text-primary' : 'text-text-primary'}`}>
                    Enable Insurance by Default
                  </h4>
                  <p className="text-text-secondary text-sm">
                    Automatically add insurance to shipments for valuable items
                  </p>
                </div>
              </div>
              
              <div className={`
                relative w-12 h-6 rounded-full transition-smooth
                ${formData.insurancePreference ? 'bg-primary' : 'bg-surface border border-subtle'}
              `}>
                <div className={`
                  absolute top-1 w-4 h-4 rounded-full transition-smooth
                  ${formData.insurancePreference ? 'left-7 bg-white' : 'left-1 bg-text-secondary'}
                `} />
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        {hasSelectedCouriers && (
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6">
            <h3 className="font-semibold text-text-primary mb-3 flex items-center space-x-2">
              <Icon name="Eye" size={16} />
              <span>Shipping Configuration Preview</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-text-secondary mb-2">Selected Couriers:</p>
                <div className="space-y-1">
                  {formData.preferredCouriers.map(courierId => {
                    const courier = couriers.find(c => c.id === courierId);
                    return (
                      <div key={courierId} className="flex items-center space-x-2">
                        <Icon name={courier.icon} size={14} className="text-primary" />
                        <span className="text-text-primary">{courier.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <p className="text-text-secondary mb-2">Declaration Value:</p>
                <p className="text-text-primary font-medium">
                  {declarationRanges.find(r => r.value === formData.defaultDeclarationValue)?.label || 'Not set'}
                </p>
              </div>
              <div>
                <p className="text-text-secondary mb-2">Insurance:</p>
                <p className="text-text-primary font-medium">
                  {formData.insurancePreference ? 'Enabled by default' : 'Manual selection'}
                </p>
              </div>
            </div>
          </div>
        )}

        {!hasSelectedCouriers && (
          <div className="text-center py-8 border-2 border-dashed border-subtle rounded-xl">
            <Icon name="Truck" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary">
              Select at least one preferred courier to continue
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
          disabled={!hasSelectedCouriers}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed glow-primary"
        >
          <span>Continue</span>
          <Icon name="ChevronRight" size={16} />
        </button>
      </div>
    </div>
  );
};

export default ShippingPreferencesStep;