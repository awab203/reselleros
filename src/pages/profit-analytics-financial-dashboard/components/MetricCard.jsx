import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const MetricCard = ({ 
  title, 
  value, 
  prefix = '', 
  suffix = '', 
  currency = '', 
  icon, 
  color = 'primary', 
  subtitle,
  isPositive = null,
  showProgressBar = false
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  // Colors for different states
  const colorClasses = {
    primary: 'text-primary bg-primary/10',
    secondary: 'text-secondary bg-secondary/10',
    accent: 'text-accent bg-accent/10',
    success: 'text-success bg-success/10',
    warning: 'text-warning bg-warning/10',
    error: 'text-error bg-error/10'
  };
  
  // Trend indicator colors
  const trendColors = {
    positive: 'text-success',
    negative: 'text-error',
    neutral: 'text-text-secondary'
  };
  
  // Determine trend color
  const getTrendColor = () => {
    if (isPositive === true) return trendColors.positive;
    if (isPositive === false) return trendColors.negative;
    return trendColors.neutral;
  };
  
  // Animate value counting up
  useEffect(() => {
    const duration = 1500; // ms
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      // Easing function for smoother animation
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);
      setDisplayValue(Math.floor(value * easeOutQuad * 100) / 100);
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [value]);
  
  // Format the display value
  const formattedValue = () => {
    let formatted = displayValue.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    
    return `${prefix}${currency}${formatted}${suffix}`;
  };
  
  return (
    <div className="bg-surface rounded-xl p-4 border border-subtle hover:border-active transition-smooth">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon name={icon} size={18} />
        </div>
      </div>
      
      <div className={`text-2xl font-heading font-bold mb-1 ${getTrendColor()}`}>
        {formattedValue()}
      </div>
      
      <div className="text-xs text-text-secondary">{subtitle}</div>
      
      {showProgressBar && (
        <div className="mt-3 pt-2">
          <div className="h-2 w-full bg-background rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${color === 'primary' ? 'bg-primary' : `bg-${color}`}`}
              style={{ width: `${displayValue}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MetricCard;