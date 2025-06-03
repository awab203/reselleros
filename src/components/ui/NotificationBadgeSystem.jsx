import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const NotificationBadgeSystem = ({ 
  notifications = {}, 
  onNotificationClick, 
  className = "",
  showDetails = false 
}) => {
  const [animatingBadges, setAnimatingBadges] = useState(new Set());
  const [previousCounts, setPreviousCounts] = useState({});

  const notificationTypes = {
    dashboard: {
      icon: 'LayoutDashboard',
      label: 'Dashboard Alerts',
      color: 'primary',
      urgency: 'medium'
    },
    analytics: {
      icon: 'TrendingUp',
      label: 'Analytics Updates',
      color: 'secondary',
      urgency: 'low'
    },
    sourcing: {
      icon: 'Package',
      label: 'Sourcing Alerts',
      color: 'warning',
      urgency: 'high'
    },
    inventory: {
      icon: 'Archive',
      label: 'Inventory Alerts',
      color: 'accent',
      urgency: 'high'
    },
    shipping: {
      icon: 'Truck',
      label: 'Shipping Updates',
      color: 'success',
      urgency: 'medium'
    },
    system: {
      icon: 'Bell',
      label: 'System Notifications',
      color: 'error',
      urgency: 'critical'
    }
  };

  const urgencyStyles = {
    low: 'animate-pulse',
    medium: 'animate-bounce',
    high: 'animate-ping',
    critical: 'animate-pulse bg-error text-white'
  };

  const colorStyles = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    accent: 'bg-accent text-white',
    success: 'bg-success text-background',
    warning: 'bg-warning text-background',
    error: 'bg-error text-white'
  };

  useEffect(() => {
    Object.keys(notifications).forEach(key => {
      const currentCount = notifications[key] || 0;
      const previousCount = previousCounts[key] || 0;
      
      if (currentCount > previousCount) {
        setAnimatingBadges(prev => new Set([...prev, key]));
        setTimeout(() => {
          setAnimatingBadges(prev => {
            const newSet = new Set(prev);
            newSet.delete(key);
            return newSet;
          });
        }, 1000);
      }
    });
    
    setPreviousCounts(notifications);
  }, [notifications, previousCounts]);

  const getTotalNotifications = () => {
    return Object.values(notifications).reduce((total, count) => total + (count || 0), 0);
  };

  const getUrgencyLevel = (type, count) => {
    if (count === 0) return 'low';
    const config = notificationTypes[type];
    if (!config) return 'medium';
    
    if (config.urgency === 'critical' && count > 0) return 'critical';
    if (config.urgency === 'high' && count > 2) return 'high';
    if (config.urgency === 'medium' && count > 5) return 'high';
    
    return config.urgency;
  };

  const NotificationBadge = ({ type, count, size = 'sm', showIcon = false }) => {
    if (count === 0 && !showDetails) return null;
    
    const config = notificationTypes[type] || notificationTypes.system;
    const urgency = getUrgencyLevel(type, count);
    const isAnimating = animatingBadges.has(type);
    
    const sizeClasses = {
      xs: 'min-w-[14px] h-[14px] text-[10px]',
      sm: 'min-w-[18px] h-[18px] text-xs',
      md: 'min-w-[24px] h-[24px] text-sm',
      lg: 'min-w-[32px] h-[32px] text-base'
    };

    const handleClick = () => {
      if (onNotificationClick) {
        onNotificationClick(type, count);
      }
    };

    return (
      <div 
        className={`
          relative inline-flex items-center justify-center rounded-full font-bold transition-smooth cursor-pointer
          ${sizeClasses[size]}
          ${colorStyles[config.color]}
          ${isAnimating ? 'animate-bounce scale-110' : ''}
          ${urgency === 'critical' ? urgencyStyles.critical : ''}
          ${count > 0 ? 'opacity-100' : 'opacity-50'}
        `}
        onClick={handleClick}
        title={`${config.label}: ${count} notifications`}
      >
        {showIcon && (
          <Icon 
            name={config.icon} 
            size={size === 'xs' ? 8 : size === 'sm' ? 10 : size === 'md' ? 12 : 16} 
            className="mr-1" 
          />
        )}
        <span>{count > 99 ? '99+' : count}</span>
        
        {urgency === 'critical' && count > 0 && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping"></div>
        )}
        
        {urgency === 'high' && count > 0 && (
          <div className="absolute inset-0 rounded-full border-2 border-current animate-pulse opacity-50"></div>
        )}
      </div>
    );
  };

  const NotificationSummary = () => {
    const total = getTotalNotifications();
    const hasHighPriority = Object.keys(notifications).some(key => 
      getUrgencyLevel(key, notifications[key]) === 'high' || 
      getUrgencyLevel(key, notifications[key]) === 'critical'
    );

    return (
      <div className={`
        flex items-center space-x-2 px-3 py-2 rounded-lg transition-smooth
        ${hasHighPriority ? 'bg-error/10 border border-error/20' : 'bg-surface/50 border border-subtle'}
      `}>
        <Icon 
          name="Bell" 
          size={16} 
          className={hasHighPriority ? 'text-error' : 'text-text-secondary'} 
        />
        <span className={`text-sm font-medium ${hasHighPriority ? 'text-error' : 'text-text-secondary'}`}>
          {total} notifications
        </span>
        {hasHighPriority && (
          <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
        )}
      </div>
    );
  };

  const DetailedNotificationList = () => (
    <div className="space-y-2">
      {Object.entries(notifications).map(([type, count]) => {
        const config = notificationTypes[type];
        if (!config) return null;
        
        return (
          <div 
            key={type}
            className="flex items-center justify-between p-3 rounded-lg bg-surface/30 border border-subtle hover:bg-surface/50 transition-smooth cursor-pointer"
            onClick={() => onNotificationClick && onNotificationClick(type, count)}
          >
            <div className="flex items-center space-x-3">
              <Icon name={config.icon} size={18} className="text-text-secondary" />
              <span className="text-sm font-medium text-text-primary">{config.label}</span>
            </div>
            <NotificationBadge type={type} count={count} size="sm" />
          </div>
        );
      })}
    </div>
  );

  if (showDetails) {
    return (
      <div className={`space-y-4 ${className}`}>
        <NotificationSummary />
        <DetailedNotificationList />
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {Object.entries(notifications).map(([type, count]) => (
        <NotificationBadge key={type} type={type} count={count} />
      ))}
    </div>
  );
};

export default NotificationBadgeSystem;