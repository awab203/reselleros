import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SellingPlatformStep = ({ setupData, updateSetupData, onNext, onPrev }) => {
  const [formData, setFormData] = useState(setupData.sellingPlatforms);
  const [showAuthModal, setShowAuthModal] = useState(null);

  const sellingPlatforms = [
    {
      id: 'ebay',
      name: 'eBay',
      description: 'Global marketplace with auction and fixed-price listings',
      icon: 'Globe',
      color: 'primary',
      features: ['Global reach', 'Auction format', 'Best Offer system', 'Promoted listings'],
      fees: '10-13% final value fee',
      mockCredentials: { username: 'demo_seller', password: 'ebay123' }
    },
    {
      id: 'vinted',
      name: 'Vinted',
      description: 'European fashion marketplace with no selling fees',
      icon: 'Shirt',
      color: 'success',
      features: ['No selling fees', 'Fashion focused', 'European market', 'Buyer protection'],
      fees: 'No selling fees (buyer pays)',
      mockCredentials: { email: 'demo@vinted.com', password: 'vinted123' }
    },
    {
      id: 'depop',
      name: 'Depop',
      description: 'Social marketplace for unique fashion and vintage items',
      icon: 'Heart',
      color: 'secondary',
      features: ['Social features', 'Young audience', 'Vintage focus', 'Mobile-first'],
      fees: '10% selling fee + payment processing',
      mockCredentials: { username: '@demo_depop', password: 'depop123' }
    }
  ];

  const handleToggle = (platformId) => {
    setFormData(prev => ({
      ...prev,
      [platformId]: {
        ...prev[platformId],
        enabled: !prev[platformId].enabled,
        authenticated: false
      }
    }));
  };

  const handleAuthenticate = (platformId) => {
    setShowAuthModal(platformId);
  };

  const completeAuthentication = (platformId, credentials) => {
    const platform = sellingPlatforms.find(p => p.id === platformId);
    const isValid = Object.entries(platform.mockCredentials).every(([key, value]) => 
      credentials[key] === value
    );

    if (isValid) {
      setFormData(prev => ({
        ...prev,
        [platformId]: {
          ...prev[platformId],
          authenticated: true
        }
      }));
      setShowAuthModal(null);
    } else {
      alert('Invalid credentials. Please use the demo credentials provided.');
    }
  };

  const handleNext = () => {
    updateSetupData({ sellingPlatforms: formData });
    onNext();
  };

  const hasEnabledPlatforms = Object.values(formData).some(platform => platform.enabled);

  const PlatformCard = ({ platform }) => {
    const isEnabled = formData[platform.id].enabled;
    const isAuthenticated = formData[platform.id].authenticated;
    
    const colorStyles = {
      primary: 'from-primary to-primary-600',
      success: 'from-success to-success-600',
      secondary: 'from-secondary to-secondary-600'
    };

    return (
      <div
        className={`
          relative p-6 rounded-xl border transition-smooth
          ${isEnabled 
            ? 'bg-primary/10 border-primary/30 glow-primary' :'bg-surface/50 border-subtle hover:bg-surface/70'
          }
        `}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`
              w-12 h-12 rounded-lg flex items-center justify-center transition-smooth
              ${isEnabled ? `bg-gradient-to-br ${colorStyles[platform.color]} text-white` : 'bg-surface text-text-secondary'}
            `}>
              <Icon name={platform.icon} size={24} />
            </div>
            <div>
              <h3 className={`font-semibold ${isEnabled ? 'text-primary' : 'text-text-primary'}`}>
                {platform.name}
              </h3>
              <p className="text-text-secondary text-sm">{platform.description}</p>
            </div>
          </div>
          
          <button
            onClick={() => handleToggle(platform.id)}
            className={`
              relative w-12 h-6 rounded-full transition-smooth
              ${isEnabled ? 'bg-primary' : 'bg-surface border border-subtle'}
            `}
          >
            <div className={`
              absolute top-1 w-4 h-4 rounded-full transition-smooth
              ${isEnabled ? 'left-7 bg-white' : 'left-1 bg-text-secondary'}
            `} />
          </button>
        </div>

        {isEnabled && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {platform.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={12} className="text-success" />
                  <span className="text-xs text-text-secondary">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="p-3 bg-surface/50 rounded-lg">
              <p className="text-xs text-text-secondary">
                <strong>Fees:</strong> {platform.fees}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={isAuthenticated ? "CheckCircle" : "AlertCircle"} 
                  size={16} 
                  className={isAuthenticated ? "text-success" : "text-warning"} 
                />
                <span className={`text-sm ${isAuthenticated ? "text-success" : "text-warning"}`}>
                  {isAuthenticated ? "Connected" : "Not connected"}
                </span>
              </div>
              
              <button
                onClick={() => handleAuthenticate(platform.id)}
                className={`
                  px-4 py-2 text-sm font-medium rounded-lg transition-smooth
                  ${isAuthenticated 
                    ? 'bg-success/20 text-success border border-success/30' :'bg-warning/20 text-warning border border-warning/30 hover:bg-warning/30'
                  }
                `}
              >
                {isAuthenticated ? "Reconnect" : "Connect"}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const AuthModal = ({ platform }) => {
    const [credentials, setCredentials] = useState({});
    
    if (!platform) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100 flex items-center justify-center p-4">
        <div className="bg-background border border-subtle rounded-xl p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-text-primary">
              Connect {platform.name}
            </h3>
            <button
              onClick={() => setShowAuthModal(null)}
              className="text-text-secondary hover:text-text-primary transition-smooth"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          <div className="space-y-4 mb-6">
            {Object.entries(platform.mockCredentials).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-text-primary mb-2 capitalize">
                  {key}
                </label>
                <input
                  type={key === 'password' ? 'password' : 'text'}
                  value={credentials[key] || ''}
                  onChange={(e) => setCredentials(prev => ({ ...prev, [key]: e.target.value }))}
                  placeholder={`Enter your ${key}`}
                  className="w-full px-4 py-3 bg-surface border border-subtle rounded-lg text-text-primary placeholder-text-secondary focus:border-primary transition-smooth"
                />
              </div>
            ))}
          </div>

          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-warning mb-2">Demo Credentials</h4>
            <div className="space-y-1 text-sm text-text-secondary">
              {Object.entries(platform.mockCredentials).map(([key, value]) => (
                <div key={key}>
                  <strong className="capitalize">{key}:</strong> {value}
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => setShowAuthModal(null)}
              className="flex-1 px-4 py-3 bg-surface border border-subtle text-text-primary font-medium rounded-lg hover:bg-surface/70 transition-smooth"
            >
              Cancel
            </button>
            <button
              onClick={() => completeAuthentication(platform.id, credentials)}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-smooth"
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center glow-primary">
          <Icon name="Store" size={32} className="text-white" />
        </div>
        <h2 className="text-3xl font-heading font-bold text-text-primary mb-2">
          Connect Selling Platforms
        </h2>
        <p className="text-text-secondary">
          Link your marketplace accounts to sync listings, track sales, and manage inventory across platforms.
        </p>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sellingPlatforms.map((platform) => (
            <PlatformCard key={platform.id} platform={platform} />
          ))}
        </div>

        {hasEnabledPlatforms && (
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6">
            <h3 className="font-semibold text-text-primary mb-3 flex items-center space-x-2">
              <Icon name="Zap" size={16} />
              <span>Multi-Platform Benefits</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-text-secondary">
              <div className="flex items-center space-x-2">
                <Icon name="BarChart3" size={16} className="text-primary" />
                <span>Unified sales analytics</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="RefreshCw" size={16} className="text-primary" />
                <span>Cross-platform relisting</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={16} className="text-primary" />
                <span>Price optimization</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Package" size={16} className="text-primary" />
                <span>Inventory synchronization</span>
              </div>
            </div>
          </div>
        )}

        {!hasEnabledPlatforms && (
          <div className="text-center py-8 border-2 border-dashed border-subtle rounded-xl">
            <Icon name="Store" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary">
              Enable at least one selling platform to continue
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
          disabled={!hasEnabledPlatforms}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed glow-primary"
        >
          <span>Continue</span>
          <Icon name="ChevronRight" size={16} />
        </button>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal platform={sellingPlatforms.find(p => p.id === showAuthModal)} />
      )}
    </div>
  );
};

export default SellingPlatformStep;