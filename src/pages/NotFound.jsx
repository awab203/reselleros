import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center glow-primary">
            <Icon name="AlertTriangle" size={48} className="text-white" />
          </div>
          <h1 className="text-6xl font-heading font-bold text-text-primary mb-4">404</h1>
          <h2 className="text-2xl font-heading font-semibold text-text-primary mb-4">Page Not Found</h2>
          <p className="text-text-secondary mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => navigate('/cinematic-onboarding-setup')}
            className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-smooth glow-primary"
          >
            Go to Onboarding
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="w-full px-6 py-3 bg-surface border border-subtle text-text-primary font-semibold rounded-lg hover:bg-surface/70 transition-smooth"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;