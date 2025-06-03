import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const BusinessProfileStep = ({ setupData, updateSetupData, onNext, onPrev }) => {
  const [formData, setFormData] = useState(setupData.businessProfile);
  const [errors, setErrors] = useState({});

  const experienceLevels = [
    { id: 'beginner', label: 'Beginner', description: 'Just starting out', icon: 'Seedling' },
    { id: 'intermediate', label: 'Intermediate', description: '6 months - 2 years', icon: 'TrendingUp' },
    { id: 'advanced', label: 'Advanced', description: '2+ years experience', icon: 'Crown' },
    { id: 'expert', label: 'Expert', description: 'Seasoned professional', icon: 'Award' }
  ];

  const monthlyVolumes = [
    { id: 'low', label: '1-50 items', description: 'Small scale operation', icon: 'Package' },
    { id: 'medium', label: '51-200 items', description: 'Growing business', icon: 'Packages' },
    { id: 'high', label: '201-500 items', description: 'Established operation', icon: 'Warehouse' },
    { id: 'enterprise', label: '500+ items', description: 'Large scale business', icon: 'Building' }
  ];

  const primaryFocuses = [
    { id: 'fashion', label: 'Fashion & Clothing', icon: 'Shirt' },
    { id: 'electronics', label: 'Electronics', icon: 'Smartphone' },
    { id: 'collectibles', label: 'Collectibles', icon: 'Star' },
    { id: 'home', label: 'Home & Garden', icon: 'Home' },
    { id: 'sports', label: 'Sports & Outdoors', icon: 'Dumbbell' },
    { id: 'mixed', label: 'Mixed Categories', icon: 'Grid3x3' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }
    
    if (!formData.experienceLevel) {
      newErrors.experienceLevel = 'Please select your experience level';
    }
    
    if (!formData.monthlyVolume) {
      newErrors.monthlyVolume = 'Please select your monthly volume';
    }
    
    if (!formData.primaryFocus) {
      newErrors.primaryFocus = 'Please select your primary focus';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      updateSetupData({ businessProfile: formData });
      onNext();
    }
  };

  const SelectionCard = ({ item, isSelected, onClick, type }) => (
    <button
      onClick={() => onClick(item.id)}
      className={`
        w-full p-4 rounded-xl border transition-smooth text-left
        ${isSelected 
          ? 'bg-primary/10 border-primary/30 text-primary glow-primary' :'bg-surface/50 border-subtle text-text-secondary hover:text-text-primary hover:bg-surface/70'
        }
      `}
    >
      <div className="flex items-center space-x-3">
        <div className={`
          w-10 h-10 rounded-lg flex items-center justify-center
          ${isSelected ? 'bg-primary text-white' : 'bg-surface text-text-secondary'}
        `}>
          <Icon name={item.icon} size={20} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm">{item.label}</h3>
          {item.description && (
            <p className="text-xs opacity-70 mt-1">{item.description}</p>
          )}
        </div>
        {isSelected && (
          <Icon name="Check" size={16} className="text-primary" />
        )}
      </div>
    </button>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center glow-primary">
          <Icon name="User" size={32} className="text-white" />
        </div>
        <h2 className="text-3xl font-heading font-bold text-text-primary mb-2">
          Tell Us About Your Business
        </h2>
        <p className="text-text-secondary">
          Help us personalize your ResellerOS experience based on your business profile.
        </p>
      </div>

      <div className="space-y-8">
        {/* Business Name */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Business Name
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.businessName}
              onChange={(e) => handleInputChange('businessName', e.target.value)}
              placeholder="Enter your business or brand name"
              className={`
                w-full px-4 py-3 bg-surface border rounded-lg text-text-primary placeholder-text-secondary transition-smooth
                ${errors.businessName ? 'border-error' : 'border-subtle focus:border-primary'}
              `}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Icon name="Building" size={16} className="text-text-secondary" />
            </div>
          </div>
          {errors.businessName && (
            <p className="text-error text-sm mt-2">{errors.businessName}</p>
          )}
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Experience Level
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {experienceLevels.map((level) => (
              <SelectionCard
                key={level.id}
                item={level}
                isSelected={formData.experienceLevel === level.id}
                onClick={(id) => handleInputChange('experienceLevel', id)}
              />
            ))}
          </div>
          {errors.experienceLevel && (
            <p className="text-error text-sm mt-2">{errors.experienceLevel}</p>
          )}
        </div>

        {/* Monthly Volume */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Monthly Volume
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {monthlyVolumes.map((volume) => (
              <SelectionCard
                key={volume.id}
                item={volume}
                isSelected={formData.monthlyVolume === volume.id}
                onClick={(id) => handleInputChange('monthlyVolume', id)}
              />
            ))}
          </div>
          {errors.monthlyVolume && (
            <p className="text-error text-sm mt-2">{errors.monthlyVolume}</p>
          )}
        </div>

        {/* Primary Focus */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Primary Focus
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {primaryFocuses.map((focus) => (
              <SelectionCard
                key={focus.id}
                item={focus}
                isSelected={formData.primaryFocus === focus.id}
                onClick={(id) => handleInputChange('primaryFocus', id)}
              />
            ))}
          </div>
          {errors.primaryFocus && (
            <p className="text-error text-sm mt-2">{errors.primaryFocus}</p>
          )}
        </div>

        {/* Preview Card */}
        {formData.businessName && formData.experienceLevel && (
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6">
            <h3 className="font-semibold text-text-primary mb-3 flex items-center space-x-2">
              <Icon name="Eye" size={16} />
              <span>Dashboard Preview</span>
            </h3>
            <p className="text-text-secondary text-sm">
              Your dashboard will be customized for <strong>{formData.businessName}</strong> as an{' '}
              <strong>{experienceLevels.find(l => l.id === formData.experienceLevel)?.label.toLowerCase()}</strong>{' '}
              reseller focusing on{' '}
              <strong>{primaryFocuses.find(f => f.id === formData.primaryFocus)?.label.toLowerCase()}</strong>.
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
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-smooth glow-primary"
        >
          <span>Continue</span>
          <Icon name="ChevronRight" size={16} />
        </button>
      </div>
    </div>
  );
};

export default BusinessProfileStep;