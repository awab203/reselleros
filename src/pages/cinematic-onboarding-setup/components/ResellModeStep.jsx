import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ResellModeStep = ({ setupData, updateSetupData, onNext, onPrev }) => {
  const [selectedMode, setSelectedMode] = useState(setupData.resellMode);
  const [previewMode, setPreviewMode] = useState(null);

  const resellModes = [
    {
      id: 'study',
      name: 'Study Mode',
      icon: 'BookOpen',
      tagline: 'Learn & Analyze',
      description: 'Perfect for beginners and learning-focused sessions. Emphasizes educational content, tutorials, and detailed analytics to help you understand the reselling business.',
      features: [
        'Detailed tutorials and guides',
        'Extended analytics explanations',
        'Learning-focused dashboard layout',
        'Reduced visual distractions',
        'Progress tracking for skills',
        'Educational notifications'
      ],
      uiCharacteristics: {
        animations: 'Minimal, smooth transitions',
        colors: 'Softer, muted palette',
        density: 'Spacious layout for readability',
        notifications: 'Educational and informative'
      },
      bestFor: 'New resellers, research sessions, skill development',
      colorScheme: {
        primary: '#00D4FF',
        accent: '#8B5CF6',
        intensity: 'Calm'
      }
    },
    {
      id: 'chill',
      name: 'Chill Mode',
      icon: 'Coffee',
      tagline: 'Relaxed & Balanced',
      description: 'Balanced interface for casual browsing and steady workflow. Combines productivity with a relaxed atmosphere for sustainable long-term use.',
      features: [
        'Balanced information density',
        'Comfortable visual spacing',
        'Standard notification frequency',
        'Moderate animation effects',
        'Flexible dashboard layout',
        'Work-life balance reminders'
      ],
      uiCharacteristics: {
        animations: 'Smooth, pleasant transitions',
        colors: 'Balanced, comfortable palette',
        density: 'Comfortable spacing',
        notifications: 'Balanced frequency'
      },
      bestFor: 'Daily operations, steady workflow, balanced approach',
      colorScheme: {
        primary: '#00D4FF',
        accent: '#00FF88',
        intensity: 'Balanced'
      }
    },
    {
      id: 'hustle',
      name: 'Hustle Mode',
      icon: 'Zap',
      tagline: 'High-Energy Productivity',
      description: 'Maximum productivity interface for peak performance sessions. Fast-paced, information-dense layout designed for experienced resellers who want to maximize efficiency.',
      features: [
        'High-density information display',
        'Rapid-fire notifications',
        'Quick action shortcuts',
        'Performance-focused metrics',
        'Streamlined workflows',
        'Competitive elements'
      ],
      uiCharacteristics: {
        animations: 'Fast, energetic transitions',
        colors: 'Vibrant, high-contrast palette',
        density: 'Compact, information-dense',
        notifications: 'Frequent, action-oriented'
      },
      bestFor: 'Power users, peak productivity, competitive sessions',
      colorScheme: {
        primary: '#00D4FF',
        accent: '#FFB800',
        intensity: 'High-energy'
      }
    }
  ];

  const handleModeSelect = (modeId) => {
    setSelectedMode(modeId);
    updateSetupData({ resellMode: modeId });
  };

  const handleNext = () => {
    onNext();
  };

  const ModeCard = ({ mode }) => {
    const isSelected = selectedMode === mode.id;
    const isPreviewing = previewMode === mode.id;
    
    return (
      <div
        className={`
          relative p-6 rounded-xl border transition-smooth cursor-pointer
          ${isSelected 
            ? 'bg-primary/10 border-primary/30 glow-primary transform scale-105' 
            : 'bg-surface/50 border-subtle hover:bg-surface/70 hover:transform hover:scale-102'
          }
          ${isPreviewing ? 'ring-2 ring-secondary/50' : ''}
        `}
        onClick={() => handleModeSelect(mode.id)}
        onMouseEnter={() => setPreviewMode(mode.id)}
        onMouseLeave={() => setPreviewMode(null)}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`
              w-12 h-12 rounded-lg flex items-center justify-center transition-smooth
              ${isSelected ? 'bg-primary text-white' : 'bg-surface text-text-secondary'}
            `}>
              <Icon name={mode.icon} size={24} />
            </div>
            <div>
              <h3 className={`font-semibold text-lg ${isSelected ? 'text-primary' : 'text-text-primary'}`}>
                {mode.name}
              </h3>
              <p className="text-text-secondary text-sm">{mode.tagline}</p>
            </div>
          </div>
          
          <div className={`
            w-6 h-6 rounded-full border-2 transition-smooth
            ${isSelected 
              ? 'bg-primary border-primary' :'border-subtle'
            }
          `}>
            {isSelected && (
              <Icon name="Check" size={12} className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-text-secondary text-sm mb-4 leading-relaxed">
          {mode.description}
        </p>

        {/* Features */}
        <div className="mb-4">
          <h4 className="font-medium text-text-primary mb-2 text-sm">Key Features:</h4>
          <div className="grid grid-cols-1 gap-1">
            {mode.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon name="Check" size={12} className="text-success flex-shrink-0" />
                <span className="text-xs text-text-secondary">{feature}</span>
              </div>
            ))}
            {mode.features.length > 3 && (
              <div className="text-xs text-text-secondary opacity-70 mt-1">
                +{mode.features.length - 3} more features
              </div>
            )}
          </div>
        </div>

        {/* UI Characteristics */}
        <div className="p-3 bg-background/50 rounded-lg">
          <h4 className="font-medium text-text-primary mb-2 text-sm">UI Style:</h4>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-text-secondary">Animations:</span>
              <span className="text-text-primary">{mode.uiCharacteristics.animations}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-secondary">Density:</span>
              <span className="text-text-primary">{mode.uiCharacteristics.density}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-secondary">Intensity:</span>
              <span className="text-text-primary">{mode.colorScheme.intensity}</span>
            </div>
          </div>
        </div>

        {/* Best For */}
        <div className="mt-4 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg">
          <p className="text-xs text-text-secondary">
            <strong>Best for:</strong> {mode.bestFor}
          </p>
        </div>

        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <Icon name="Zap" size={12} className="text-white" />
          </div>
        )}
      </div>
    );
  };

  const selectedModeData = resellModes.find(mode => mode.id === selectedMode);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center glow-primary">
          <Icon name="Palette" size={32} className="text-white" />
        </div>
        <h2 className="text-3xl font-heading font-bold text-text-primary mb-2">
          Choose Your Resell Mode
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Select the interface style that matches your workflow and energy level. You can change this anytime from your dashboard settings.
        </p>
      </div>

      <div className="space-y-8">
        {/* Mode Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {resellModes.map((mode) => (
            <ModeCard key={mode.id} mode={mode} />
          ))}
        </div>

        {/* Selected Mode Preview */}
        {selectedModeData && (
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6">
            <h3 className="font-semibold text-text-primary mb-4 flex items-center space-x-2">
              <Icon name="Eye" size={16} />
              <span>Your Selected Mode: {selectedModeData.name}</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-text-primary mb-3">Complete Feature Set:</h4>
                <div className="space-y-2">
                  {selectedModeData.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="Check" size={14} className="text-success" />
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-text-primary mb-3">Dashboard Adaptation:</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-surface/50 rounded-lg">
                    <p className="text-sm text-text-secondary">
                      Your dashboard will be optimized for <strong>{selectedModeData.tagline.toLowerCase()}</strong> with{' '}
                      <strong>{selectedModeData.uiCharacteristics.density.toLowerCase()}</strong> and{' '}
                      <strong>{selectedModeData.uiCharacteristics.animations.toLowerCase()}</strong>.
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="text-text-secondary">Primary</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-secondary rounded-full"></div>
                      <span className="text-text-secondary">Accent</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <span className="text-text-secondary">Success</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mode Switching Info */}
        <div className="text-center p-6 bg-surface/30 border border-subtle rounded-xl">
          <Icon name="RefreshCw" size={24} className="text-text-secondary mx-auto mb-3" />
          <h4 className="font-medium text-text-primary mb-2">Flexible Mode Switching</h4>
          <p className="text-text-secondary text-sm">
            You can switch between modes anytime based on your current workflow needs. Many users prefer{' '}
            <strong>Study Mode</strong> for research, <strong>Chill Mode</strong> for daily operations, and{' '}
            <strong>Hustle Mode</strong> for peak productivity sessions.
          </p>
        </div>
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

export default ResellModeStep;