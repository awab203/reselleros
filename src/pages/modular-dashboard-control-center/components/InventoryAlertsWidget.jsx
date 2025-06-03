import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const InventoryAlertsWidget = ({ pendingListings, lowStockItems }) => {
  const navigate = useNavigate();

  const mockAlerts = [
    {
      id: 1,
      type: 'low_stock',
      title: 'Nike Air Force 1 - White',
      message: 'Only 2 units remaining',
      priority: 'high',
      action: 'Restock',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'pending_listing',
      title: 'Supreme Box Logo Tee',
      message: 'Ready to list on eBay',
      priority: 'medium',
      action: 'List Now',
      timestamp: '4 hours ago'
    },
    {
      id: 3,
      type: 'price_drop',
      title: 'Jordan 1 Retro High',
      message: 'Market price dropped 15%',
      priority: 'medium',
      action: 'Adjust Price',
      timestamp: '6 hours ago'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const getPriorityIcon = (type) => {
    switch (type) {
      case 'low_stock': return 'AlertTriangle';
      case 'pending_listing': return 'Clock';
      case 'price_drop': return 'TrendingDown';
      default: return 'Bell';
    }
  };

  const getActionColor = (type) => {
    switch (type) {
      case 'low_stock': return 'bg-error/10 border-error/30 text-error hover:bg-error/20';
      case 'pending_listing': return 'bg-primary/10 border-primary/30 text-primary hover:bg-primary/20';
      case 'price_drop': return 'bg-warning/10 border-warning/30 text-warning hover:bg-warning/20';
      default: return 'bg-surface border-subtle text-text-secondary hover:bg-surface/70';
    }
  };

  const AlertItem = ({ alert }) => (
    <div className="p-4 bg-background/50 rounded-lg border border-subtle hover:bg-surface/30 transition-smooth">
      <div className="flex items-start space-x-3">
        <div className={`
          w-8 h-8 rounded-lg flex items-center justify-center
          ${alert.type === 'low_stock' ? 'bg-error/10' : 
            alert.type === 'pending_listing' ? 'bg-primary/10' : 'bg-warning/10'}
        `}>
          <Icon 
            name={getPriorityIcon(alert.type)} 
            size={16} 
            className={getPriorityColor(alert.priority)} 
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-text-primary font-medium text-sm truncate">
              {alert.title}
            </h4>
            <span className="text-text-secondary text-xs">
              {alert.timestamp}
            </span>
          </div>
          
          <p className="text-text-secondary text-sm mb-3">
            {alert.message}
          </p>
          
          <button className={`
            px-3 py-1 text-xs font-medium rounded border transition-smooth
            ${getActionColor(alert.type)}
          `}>
            {alert.action}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-surface/50 backdrop-blur-sm border border-subtle rounded-xl p-6 hover:bg-surface/70 transition-smooth elevation-base">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-warning to-accent rounded-lg flex items-center justify-center glow-secondary">
            <Icon name="AlertCircle" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Inventory Alerts
            </h3>
            <p className="text-text-secondary text-sm">
              {pendingListings + lowStockItems} items need attention
            </p>
          </div>
        </div>
        
        <button
          onClick={() => navigate('/inventory-listing-management')}
          className="p-2 text-text-secondary hover:text-primary transition-smooth"
          title="View inventory"
        >
          <Icon name="ExternalLink" size={16} />
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-background/50 rounded-lg border border-subtle">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Clock" size={20} className="text-primary" />
          </div>
          <p className="text-2xl font-heading font-bold text-primary">
            {pendingListings}
          </p>
          <p className="text-text-secondary text-sm">Pending Listings</p>
        </div>
        
        <div className="text-center p-3 bg-background/50 rounded-lg border border-subtle">
          <div className="flex items-center justify-center mb-2">
            <Icon name="AlertTriangle" size={20} className="text-error" />
          </div>
          <p className="text-2xl font-heading font-bold text-error">
            {lowStockItems}
          </p>
          <p className="text-text-secondary text-sm">Low Stock</p>
        </div>
      </div>
      
      <div className="space-y-3 mb-4">
        {mockAlerts.slice(0, 2).map((alert) => (
          <AlertItem key={alert.id} alert={alert} />
        ))}
      </div>
      
      <div className="pt-4 border-t border-subtle">
        <button
          onClick={() => navigate('/inventory-listing-management')}
          className="w-full px-4 py-2 bg-primary/10 border border-primary/30 text-primary rounded-lg hover:bg-primary/20 transition-smooth"
        >
          Manage Inventory
        </button>
      </div>
    </div>
  );
};

export default InventoryAlertsWidget;