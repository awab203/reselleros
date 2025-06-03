import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ProfitTargetsStep = ({ setupData, updateSetupData, onNext, onPrev }) => {
  const [formData, setFormData] = useState(setupData.profitTargets);
  const [errors, setErrors] = useState({});

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
    { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
    { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺' }
  ];

  const targetPresets = [
    { id: 'conservative', label: 'Conservative', monthly: 500, margin: 25, reinvest: 20 },
    { id: 'moderate', label: 'Moderate', monthly: 1500, margin: 35, reinvest: 30 },
    { id: 'aggressive', label: 'Aggressive', monthly: 3000, margin: 50, reinvest: 40 },
    { id: 'custom', label: 'Custom', monthly: '', margin: '', reinvest: '' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handlePresetSelect = (preset) => {
    if (preset.id === 'custom') {
      setFormData(prev => ({ ...prev, monthlyTarget: '', profitMarginTarget: '', reinvestmentPercentage: '' }));
    } else {
      setFormData(prev => ({
        ...prev,
        monthlyTarget: preset.monthly.toString(),
        profitMarginTarget: preset.margin.toString(),
        reinvestmentPercentage: preset.reinvest.toString()
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.currency) {
      newErrors.currency = 'Please select a currency';
    }
    
    if (!formData.monthlyTarget || parseFloat(formData.monthlyTarget) <= 0) {
      newErrors.monthlyTarget = 'Please enter a valid monthly target';
    }
    
    if (!formData.profitMarginTarget || parseFloat(formData.profitMarginTarget) <= 0 || parseFloat(formData.profitMarginTarget) > 100) {
      newErrors.profitMarginTarget = 'Please enter a valid profit margin (1-100%)';
    }
    
    if (!formData.reinvestmentPercentage || parseFloat(formData.reinvestmentPercentage) < 0 || parseFloat(formData.reinvestmentPercentage) > 100) {
      newErrors.reinvestmentPercentage = 'Please enter a valid reinvestment percentage (0-100%)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      updateSetupData({ profitTargets: formData });
      onNext();
    }
  };

  const calculateProjections = () => {
    const monthly = parseFloat(formData.monthlyTarget) || 0;
    const margin = parseFloat(formData.profitMarginTarget) || 0;
    const reinvest = parseFloat(formData.reinvestmentPercentage) || 0;
    
    const revenue = monthly / (margin / 100);
    const reinvestAmount = monthly * (reinvest / 100);
    const takeHome = monthly - reinvestAmount;
    
    return { revenue, reinvestAmount, takeHome };
  };

  const projections = calculateProjections();
  const selectedCurrency = currencies.find(c => c.code === formData.currency) || currencies[0];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center glow-primary">
          <Icon name="Target" size={32} className="text-white" />
        </div>
        <h2 className="text-3xl font-heading font-bold text-text-primary mb-2">
          Set Your Profit Targets
        </h2>
        <p className="text-text-secondary">
          Define your financial goals to help ResellerOS track your progress and provide personalized insights.
        </p>
      </div>

      <div className="space-y-8">
        {/* Currency Selection */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Primary Currency
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {currencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => handleInputChange('currency', currency.code)}
                className={`
                  p-4 rounded-xl border transition-smooth text-center
                  ${formData.currency === currency.code
                    ? 'bg-primary/10 border-primary/30 text-primary glow-primary' :'bg-surface/50 border-subtle text-text-secondary hover:text-text-primary hover:bg-surface/70'
                  }
                `}
              >
                <div className="text-2xl mb-2">{currency.flag}</div>
                <div className="font-semibold text-sm">{currency.code}</div>
                <div className="text-xs opacity-70">{currency.symbol}</div>
              </button>
            ))}
          </div>
          {errors.currency && (
            <p className="text-error text-sm mt-2">{errors.currency}</p>
          )}
        </div>

        {/* Target Presets */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Quick Presets
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {targetPresets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handlePresetSelect(preset)}
                className="p-4 rounded-xl border border-subtle bg-surface/50 hover:bg-surface/70 transition-smooth text-left"
              >
                <h4 className="font-semibold text-text-primary mb-2">{preset.label}</h4>
                {preset.id !== 'custom' && (
                  <div className="space-y-1 text-xs text-text-secondary">
                    <div>{selectedCurrency.symbol}{preset.monthly}/month</div>
                    <div>{preset.margin}% margin</div>
                    <div>{preset.reinvest}% reinvest</div>
                  </div>
                )}
                {preset.id === 'custom' && (
                  <p className="text-xs text-text-secondary">Set your own targets</p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Target Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Monthly Profit Target
            </label>
            <div className="relative">
              <input
                type="number"
                value={formData.monthlyTarget}
                onChange={(e) => handleInputChange('monthlyTarget', e.target.value)}
                placeholder="1000"
                className={`
                  w-full px-4 py-3 pl-8 bg-surface border rounded-lg text-text-primary placeholder-text-secondary transition-smooth
                  ${errors.monthlyTarget ? 'border-error' : 'border-subtle focus:border-primary'}
                `}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
                {selectedCurrency.symbol}
              </div>
            </div>
            {errors.monthlyTarget && (
              <p className="text-error text-sm mt-2">{errors.monthlyTarget}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Target Profit Margin
            </label>
            <div className="relative">
              <input
                type="number"
                value={formData.profitMarginTarget}
                onChange={(e) => handleInputChange('profitMarginTarget', e.target.value)}
                placeholder="35"
                min="1"
                max="100"
                className={`
                  w-full px-4 py-3 pr-8 bg-surface border rounded-lg text-text-primary placeholder-text-secondary transition-smooth
                  ${errors.profitMarginTarget ? 'border-error' : 'border-subtle focus:border-primary'}
                `}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
                %
              </div>
            </div>
            {errors.profitMarginTarget && (
              <p className="text-error text-sm mt-2">{errors.profitMarginTarget}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Reinvestment Rate
            </label>
            <div className="relative">
              <input
                type="number"
                value={formData.reinvestmentPercentage}
                onChange={(e) => handleInputChange('reinvestmentPercentage', e.target.value)}
                placeholder="30"
                min="0"
                max="100"
                className={`
                  w-full px-4 py-3 pr-8 bg-surface border rounded-lg text-text-primary placeholder-text-secondary transition-smooth
                  ${errors.reinvestmentPercentage ? 'border-error' : 'border-subtle focus:border-primary'}
                `}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
                %
              </div>
            </div>
            {errors.reinvestmentPercentage && (
              <p className="text-error text-sm mt-2">{errors.reinvestmentPercentage}</p>
            )}
          </div>
        </div>

        {/* Projections */}
        {formData.monthlyTarget && formData.profitMarginTarget && formData.reinvestmentPercentage && (
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6">
            <h3 className="font-semibold text-text-primary mb-4 flex items-center space-x-2">
              <Icon name="Calculator" size={16} />
              <span>Monthly Projections</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-surface/50 rounded-lg">
                <Icon name="TrendingUp" size={24} className="text-primary mx-auto mb-2" />
                <p className="text-text-secondary text-sm">Revenue Needed</p>
                <p className="text-text-primary font-bold text-lg">
                  {selectedCurrency.symbol}{projections.revenue.toLocaleString()}
                </p>
              </div>
              
              <div className="text-center p-4 bg-surface/50 rounded-lg">
                <Icon name="Target" size={24} className="text-success mx-auto mb-2" />
                <p className="text-text-secondary text-sm">Profit Target</p>
                <p className="text-success font-bold text-lg">
                  {selectedCurrency.symbol}{formData.monthlyTarget}
                </p>
              </div>
              
              <div className="text-center p-4 bg-surface/50 rounded-lg">
                <Icon name="RefreshCw" size={24} className="text-warning mx-auto mb-2" />
                <p className="text-text-secondary text-sm">Reinvestment</p>
                <p className="text-warning font-bold text-lg">
                  {selectedCurrency.symbol}{projections.reinvestAmount.toLocaleString()}
                </p>
              </div>
              
              <div className="text-center p-4 bg-surface/50 rounded-lg">
                <Icon name="DollarSign" size={24} className="text-accent mx-auto mb-2" />
                <p className="text-text-secondary text-sm">Take Home</p>
                <p className="text-accent font-bold text-lg">
                  {selectedCurrency.symbol}{projections.takeHome.toLocaleString()}
                </p>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-background/50 rounded-lg">
              <p className="text-text-secondary text-sm">
                <strong>Annual Projection:</strong> Based on your targets, you could earn{' '}
                <span className="text-success font-semibold">
                  {selectedCurrency.symbol}{(projections.takeHome * 12).toLocaleString()}
                </span>{' '}
                take-home profit per year while reinvesting{' '}
                <span className="text-warning font-semibold">
                  {selectedCurrency.symbol}{(projections.reinvestAmount * 12).toLocaleString()}
                </span>{' '}
                for business growth.
              </p>
            </div>
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

export default ProfitTargetsStep;