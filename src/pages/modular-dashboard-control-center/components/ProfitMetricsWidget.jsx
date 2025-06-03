import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const ProfitMetricsWidget = ({ totalProfit, profitChange, todayProfit }) => {
  const navigate = useNavigate();
  const [animatedProfit, setAnimatedProfit] = useState(0);
  const [animatedTodayProfit, setAnimatedTodayProfit] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      setAnimatedProfit(totalProfit * easeOut);
      setAnimatedTodayProfit(todayProfit * easeOut);
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);
    
    return () => clearInterval(timer);
  }, [totalProfit, todayProfit]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getProfitChangeColor = () => {
    if (profitChange > 0) return 'text-success';
    if (profitChange < 0) return 'text-error';
    return 'text-text-secondary';
  };

  const getProfitChangeIcon = () => {
    if (profitChange > 0) return 'TrendingUp';
    if (profitChange < 0) return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-surface/50 backdrop-blur-sm border border-subtle rounded-xl p-6 hover:bg-surface/70 transition-smooth elevation-base">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-success to-primary rounded-lg flex items-center justify-center glow-primary">
            <Icon name="DollarSign" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Profit Overview
            </h3>
            <p className="text-text-secondary text-sm">Real-time earnings</p>
          </div>
        </div>
        
        <button
          onClick={() => navigate('/profit-analytics-financial-dashboard')}
          className="p-2 text-text-secondary hover:text-primary transition-smooth"
          title="View detailed analytics"
        >
          <Icon name="ExternalLink" size={16} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <p className="text-text-secondary text-sm mb-2">Total Profit</p>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl md:text-4xl font-heading font-bold text-success">
                {formatCurrency(animatedProfit)}
              </span>
              <div className={`flex items-center space-x-1 ${getProfitChangeColor()}`}>
                <Icon name={getProfitChangeIcon()} size={16} />
                <span className="text-sm font-medium">
                  {Math.abs(profitChange)}%
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <p className="text-text-secondary text-sm mb-2">Today's Profit</p>
            <span className="text-xl font-heading font-semibold text-text-primary">
              {formatCurrency(animatedTodayProfit)}
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-background/50 rounded-lg p-4 border border-subtle">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-secondary text-sm">Profit Margin</span>
              <span className="text-success text-sm font-medium">68.5%</span>
            </div>
            <div className="w-full bg-surface rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-success to-primary h-2 rounded-full transition-smooth"
                style={{ width: '68.5%' }}
              ></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <p className="text-text-secondary text-xs mb-1">This Week</p>
              <p className="text-text-primary font-semibold">$892.30</p>
            </div>
            <div className="text-center">
              <p className="text-text-secondary text-xs mb-1">This Month</p>
              <p className="text-text-primary font-semibold">$3,247.80</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-subtle">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-text-secondary text-sm">Revenue</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <span className="text-text-secondary text-sm">Expenses</span>
            </div>
          </div>
          
          <button
            onClick={() => navigate('/profit-analytics-financial-dashboard')}
            className="text-primary hover:text-primary-400 text-sm font-medium transition-smooth"
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfitMetricsWidget;