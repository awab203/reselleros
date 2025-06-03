import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const DailyBriefingWidget = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('updates');

  const mockBriefingData = {
    updates: [
      {
        id: 1,
        type: 'shipment',
        title: 'Package YW2024031501 cleared customs',
        description: 'Your Yanwen shipment has successfully cleared UK customs and is now in transit to the final destination.',
        timestamp: '2 hours ago',
        priority: 'medium',
        action: 'Track Package'
      },
      {
        id: 2,
        type: 'profit',
        title: 'Daily profit target achieved',
        description: 'Congratulations! You have reached your daily profit target of $150 with $156.75 earned today.',
        timestamp: '4 hours ago',
        priority: 'high',
        action: 'View Analytics'
      },
      {
        id: 3,
        type: 'inventory',
        title: 'Low stock alert for 3 items',
        description: 'Nike Air Force 1, Supreme Hoodie, and Jordan 1 are running low on stock. Consider restocking soon.',
        timestamp: '6 hours ago',
        priority: 'medium',
        action: 'Manage Stock'
      }
    ],
    recommendations: [
      {
        id: 1,
        type: 'pricing',
        title: 'Optimize pricing for Jordan 1 Retro',
        description: 'Market analysis suggests increasing price by 8% based on recent sales data and competitor pricing.',
        impact: '+$23.50 potential profit',
        confidence: 85
      },
      {
        id: 2,
        type: 'sourcing',
        title: 'New trending item detected',
        description: 'Yeezy Boost 350 V2 showing increased demand. Consider adding to your next sourcing haul.',
        impact: 'High demand trend',
        confidence: 92
      },
      {
        id: 3,
        type: 'platform',
        title: 'Cross-list to Depop',
        description: 'Your Supreme items perform well on Depop. Consider listing 5 pending items there.',
        impact: '+15% visibility',
        confidence: 78
      }
    ]
  };

  const getUpdateIcon = (type) => {
    switch (type) {
      case 'shipment': return 'Truck';
      case 'profit': return 'TrendingUp';
      case 'inventory': return 'Package';
      default: return 'Bell';
    }
  };

  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'pricing': return 'DollarSign';
      case 'sourcing': return 'ShoppingCart';
      case 'platform': return 'Share2';
      default: return 'Lightbulb';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-success';
      case 'medium': return 'text-warning';
      case 'low': return 'text-text-secondary';
      default: return 'text-text-secondary';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-success';
    if (confidence >= 60) return 'text-warning';
    return 'text-text-secondary';
  };

  const UpdateItem = ({ update }) => (
    <div className="p-4 bg-background/50 rounded-lg border border-subtle hover:bg-surface/30 transition-smooth">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name={getUpdateIcon(update.type)} size={16} className="text-primary" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-text-primary font-medium text-sm">
              {update.title}
            </h4>
            <span className="text-text-secondary text-xs">
              {update.timestamp}
            </span>
          </div>
          
          <p className="text-text-secondary text-sm mb-3">
            {update.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className={`text-xs font-medium ${getPriorityColor(update.priority)}`}>
              {update.priority.toUpperCase()} PRIORITY
            </span>
            <button className="text-primary hover:text-primary-400 text-sm font-medium transition-smooth">
              {update.action} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const RecommendationItem = ({ recommendation }) => (
    <div className="p-4 bg-background/50 rounded-lg border border-subtle hover:bg-surface/30 transition-smooth">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
          <Icon name={getRecommendationIcon(recommendation.type)} size={16} className="text-secondary" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-text-primary font-medium text-sm mb-1">
            {recommendation.title}
          </h4>
          
          <p className="text-text-secondary text-sm mb-3">
            {recommendation.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-success text-xs font-medium">
                {recommendation.impact}
              </span>
              <span className={`text-xs ${getConfidenceColor(recommendation.confidence)}`}>
                {recommendation.confidence}% confidence
              </span>
            </div>
            <button className="text-secondary hover:text-secondary-400 text-sm font-medium transition-smooth">
              Apply →
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-surface/50 backdrop-blur-sm border border-subtle rounded-xl p-6 hover:bg-surface/70 transition-smooth elevation-base">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center glow-secondary">
            <Icon name="Briefcase" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Daily Briefing
            </h3>
            <p className="text-text-secondary text-sm">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('updates')}
            className={`
              px-3 py-1 text-sm font-medium rounded transition-smooth
              ${activeTab === 'updates' ?'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
              }
            `}
          >
            Updates
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`
              px-3 py-1 text-sm font-medium rounded transition-smooth
              ${activeTab === 'recommendations' ?'bg-secondary text-white' :'text-text-secondary hover:text-text-primary'
              }
            `}
          >
            AI Insights
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        {activeTab === 'updates' && 
          mockBriefingData.updates.map((update) => (
            <UpdateItem key={update.id} update={update} />
          ))
        }
        
        {activeTab === 'recommendations' && 
          mockBriefingData.recommendations.map((recommendation) => (
            <RecommendationItem key={recommendation.id} recommendation={recommendation} />
          ))
        }
      </div>
      
      <div className="pt-4 mt-4 border-t border-subtle">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-text-secondary text-sm">System Status: Operational</span>
            </div>
          </div>
          
          <button
            onClick={() => navigate('/profit-analytics-financial-dashboard')}
            className="text-primary hover:text-primary-400 text-sm font-medium transition-smooth"
          >
            View Full Report →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyBriefingWidget;