import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const QuickActionsWidget = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'addHaul',
      title: 'Add New Haul',
      description: 'Start a new sourcing haul',
      icon: 'Plus',
      color: 'primary',
      route: '/sourcing-haul-management?action=create'
    },
    {
      id: 'createListing',
      title: 'Create Listing',
      description: 'List a new product',
      icon: 'Package',
      color: 'secondary',
      route: '/inventory-listing-management?action=create'
    },
    {
      id: 'trackPackage',
      title: 'Track Package',
      description: 'Add tracking number',
      icon: 'Truck',
      color: 'success',
      route: '/shipment-tracking-logistics?action=track'
    },
    {
      id: 'quickScan',
      title: 'Quick Scan',
      description: 'Scan product barcode',
      icon: 'Scan',
      color: 'warning',
      action: () => console.log('Quick scan initiated')
    }
  ];

  const getColorStyles = (color) => {
    switch (color) {
      case 'primary':
        return 'bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 glow-primary';
      case 'secondary':
        return 'bg-secondary/10 border-secondary/30 text-secondary hover:bg-secondary/20 glow-secondary';
      case 'success':
        return 'bg-success/10 border-success/30 text-success hover:bg-success/20';
      case 'warning':
        return 'bg-warning/10 border-warning/30 text-warning hover:bg-warning/20';
      case 'accent':
        return 'bg-accent/10 border-accent/30 text-accent hover:bg-accent/20';
      default:
        return 'bg-surface/50 border-subtle text-text-secondary hover:bg-surface/70';
    }
  };

  const handleActionClick = (action) => {
    if (action.route) {
      navigate(action.route);
    } else if (action.action) {
      action.action();
    }
  };

  return (
    <div className="bg-surface/50 backdrop-blur-sm border border-subtle rounded-xl p-6 hover:bg-surface/70 transition-smooth elevation-base">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-warning rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Quick Actions
            </h3>
            <p className="text-text-secondary text-sm">Fast access to core functions</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleActionClick(action)}
            className={`
              p-4 rounded-lg border transition-smooth text-left group
              ${getColorStyles(action.color)}
            `}
          >
            <div className="flex items-center space-x-3 mb-2">
              <Icon 
                name={action.icon} 
                size={20} 
                className="group-hover:scale-110 transition-smooth" 
              />
              <h4 className="font-medium text-sm">{action.title}</h4>
            </div>
            <p className="text-xs opacity-70">{action.description}</p>
          </button>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-subtle">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-text-secondary text-xs mb-1">Today</p>
            <p className="text-text-primary font-semibold">12</p>
            <p className="text-text-secondary text-xs">Actions</p>
          </div>
          <div>
            <p className="text-text-secondary text-xs mb-1">This Week</p>
            <p className="text-text-primary font-semibold">89</p>
            <p className="text-text-secondary text-xs">Actions</p>
          </div>
          <div>
            <p className="text-text-secondary text-xs mb-1">Efficiency</p>
            <p className="text-success font-semibold">94%</p>
            <p className="text-text-secondary text-xs">Score</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsWidget;