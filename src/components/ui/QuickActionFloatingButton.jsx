import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const QuickActionFloatingButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contextualActions, setContextualActions] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const allActions = {
    addHaul: {
      id: 'addHaul',
      label: 'Add Haul',
      icon: 'Plus',
      color: 'primary',
      description: 'Create new sourcing haul',
      action: () => navigate('/sourcing-haul-management?action=create'),
      contexts: ['/sourcing-haul-management', '/modular-dashboard-control-center']
    },
    createListing: {
      id: 'createListing',
      label: 'Create Listing',
      icon: 'Package',
      color: 'secondary',
      description: 'Add new product listing',
      action: () => navigate('/inventory-listing-management?action=create'),
      contexts: ['/inventory-listing-management', '/modular-dashboard-control-center']
    },
    trackPackage: {
      id: 'trackPackage',
      label: 'Track Package',
      icon: 'Truck',
      color: 'success',
      description: 'Add tracking number',
      action: () => navigate('/shipment-tracking-logistics?action=track'),
      contexts: ['/shipment-tracking-logistics', '/modular-dashboard-control-center']
    },
    quickScan: {
      id: 'quickScan',
      label: 'Quick Scan',
      icon: 'Scan',
      color: 'warning',
      description: 'Scan product barcode',
      action: () => console.log('Quick scan initiated'),
      contexts: ['/inventory-listing-management', '/sourcing-haul-management']
    },
    priceCheck: {
      id: 'priceCheck',
      label: 'Price Check',
      icon: 'DollarSign',
      color: 'accent',
      description: 'Check market prices',
      action: () => navigate('/profit-analytics-financial-dashboard?action=price-check'),
      contexts: ['/profit-analytics-financial-dashboard', '/inventory-listing-management']
    },
    bulkUpdate: {
      id: 'bulkUpdate',
      label: 'Bulk Update',
      icon: 'Edit3',
      color: 'secondary',
      description: 'Update multiple items',
      action: () => console.log('Bulk update initiated'),
      contexts: ['/inventory-listing-management']
    }
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const relevantActions = Object.values(allActions).filter(action => 
      action.contexts.includes(currentPath)
    );
    
    // Prioritize actions based on current context
    const prioritizedActions = relevantActions.sort((a, b) => {
      const aIndex = a.contexts.indexOf(currentPath);
      const bIndex = b.contexts.indexOf(currentPath);
      return aIndex - bIndex;
    }).slice(0, 4); // Limit to 4 actions
    
    setContextualActions(prioritizedActions);
  }, [location.pathname]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleActionClick = (action) => {
    action.action();
    setIsExpanded(false);
  };

  const colorStyles = {
    primary: 'bg-primary hover:bg-primary-600 text-white',
    secondary: 'bg-secondary hover:bg-secondary-600 text-white',
    accent: 'bg-accent hover:bg-accent-600 text-white',
    success: 'bg-success hover:bg-success-600 text-background',
    warning: 'bg-warning hover:bg-warning-600 text-background',
    error: 'bg-error hover:bg-error-600 text-white'
  };

  const ActionButton = ({ action, index, isMain = false }) => {
    const delay = isMain ? 0 : index * 50;
    
    return (
      <button
        onClick={isMain ? toggleExpanded : () => handleActionClick(action)}
        className={`
          relative group flex items-center justify-center rounded-full shadow-lg transition-smooth
          ${isMain 
            ? 'w-14 h-14 bg-gradient-to-br from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 glow-primary' 
            : `w-12 h-12 ${colorStyles[action.color]} elevation-base`
          }
          ${isExpanded && !isMain ? 'animate-scale-in' : ''}
          hover:scale-110 active:scale-95
        `}
        style={!isMain ? { animationDelay: `${delay}ms` } : {}}
        title={isMain ? 'Quick Actions' : action.description}
      >
        <Icon 
          name={isMain ? (isExpanded ? 'X' : 'Zap') : action.icon} 
          size={isMain ? 24 : 18} 
          className={`transition-smooth ${isMain ? 'text-white' : ''}`}
        />
        
        {!isMain && (
          <div className="absolute right-full mr-3 px-3 py-1 bg-background/90 backdrop-blur-sm text-text-primary text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-smooth whitespace-nowrap border border-subtle">
            {action.label}
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-background/90 border-y-4 border-y-transparent"></div>
          </div>
        )}
        
        {isMain && isExpanded && (
          <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping"></div>
        )}
      </button>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-90 flex flex-col-reverse items-end space-y-reverse space-y-3">
      {/* Main Action Button */}
      <ActionButton action={null} isMain={true} />
      
      {/* Contextual Action Buttons */}
      {isExpanded && contextualActions.map((action, index) => (
        <ActionButton 
          key={action.id} 
          action={action} 
          index={index}
        />
      ))}
      
      {/* Mobile Adaptation */}
      <style jsx>{`
        @media (max-width: 768px) {
          .fixed.bottom-6.right-6 {
            bottom: 5rem;
            right: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default QuickActionFloatingButton;