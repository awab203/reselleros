import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const GoalTrackingSection = ({ goals }) => {
  const [activeTab, setActiveTab] = useState('daily');
  
  // Goal periods
  const periods = [
    { id: 'daily', label: 'Daily', icon: 'Calendar' },
    { id: 'weekly', label: 'Weekly', icon: 'CalendarDays' },
    { id: 'monthly', label: 'Monthly', icon: 'CalendarRange' },
    { id: 'quarterly', label: 'Quarterly', icon: 'CalendarClock' },
    { id: 'yearly', label: 'Yearly', icon: 'CalendarCheck' }
  ];
  
  // Calculate progress percentage
  const calculateProgress = (current, target) => {
    return Math.min(100, (current / target) * 100);
  };
  
  // Get progress color
  const getProgressColor = (progress) => {
    if (progress >= 100) return 'bg-success';
    if (progress >= 75) return 'bg-primary';
    if (progress >= 50) return 'bg-warning';
    return 'bg-error';
  };
  
  // Get status text and icon
  const getStatus = (progress) => {
    if (progress >= 100) {
      return { text: 'Achieved', icon: 'CheckCircle', color: 'text-success' };
    }
    if (progress >= 75) {
      return { text: 'On Track', icon: 'ThumbsUp', color: 'text-primary' };
    }
    if (progress >= 50) {
      return { text: 'In Progress', icon: 'Clock', color: 'text-warning' };
    }
    return { text: 'Needs Attention', icon: 'AlertCircle', color: 'text-error' };
  };
  
  // Get current goal data
  const getCurrentGoalData = () => {
    const target = goals[activeTab];
    const current = goals[`current${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`];
    const progress = calculateProgress(current, target);
    const status = getStatus(progress);
    
    return { target, current, progress, status };
  };
  
  const goalData = getCurrentGoalData();
  
  return (
    <div>
      <div className="flex overflow-x-auto pb-2 mb-4 -mx-1">
        {periods.map((period) => (
          <button
            key={period.id}
            onClick={() => setActiveTab(period.id)}
            className={`flex items-center space-x-2 px-4 py-2 mx-1 rounded-lg transition-smooth whitespace-nowrap ${
              activeTab === period.id 
                ? 'bg-primary text-white' :'bg-surface text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name={period.icon} size={16} />
            <span>{period.label}</span>
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-background rounded-lg border border-subtle p-4">
          <h3 className="text-lg font-semibold mb-3">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Goal
          </h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-text-secondary mb-1">Target</p>
              <p className="text-2xl font-bold">£{goalData.target}</p>
            </div>
            
            <div>
              <p className="text-sm text-text-secondary mb-1">Current</p>
              <p className="text-2xl font-bold text-primary">£{goalData.current.toFixed(2)}</p>
            </div>
            
            <div>
              <p className="text-sm text-text-secondary mb-1">Remaining</p>
              <p className="text-2xl font-bold text-accent">
                £{Math.max(0, (goalData.target - goalData.current)).toFixed(2)}
              </p>
            </div>
            
            <div className="pt-3 border-t border-subtle">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-text-secondary">Progress</span>
                <span className="font-medium">{goalData.progress.toFixed(1)}%</span>
              </div>
              <div className="h-2 bg-surface rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${getProgressColor(goalData.progress)}`}
                  style={{ width: `${goalData.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2 bg-background rounded-lg border border-subtle p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Status</h3>
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
              goalData.status.color === 'text-success' ? 'bg-success/10' : 
              goalData.status.color === 'text-primary' ? 'bg-primary/10' : 
              goalData.status.color === 'text-warning'? 'bg-warning/10' : 'bg-error/10'
            }`}>
              <Icon name={goalData.status.icon} size={16} className={goalData.status.color} />
              <span className={`text-sm font-medium ${goalData.status.color}`}>
                {goalData.status.text}
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-surface p-3 rounded-lg">
                <p className="text-xs text-text-secondary mb-1">Daily Average Needed</p>
                <p className="text-lg font-bold">
                  £{(Math.max(0, (goalData.target - goalData.current)) / getDaysRemaining(activeTab)).toFixed(2)}
                </p>
              </div>
              
              <div className="bg-surface p-3 rounded-lg">
                <p className="text-xs text-text-secondary mb-1">Current Pace</p>
                <p className={`text-lg font-bold ${
                  goalData.progress >= 75 ? 'text-success' : 
                  goalData.progress >= 50 ? 'text-warning': 'text-error'
                }`}>
                  {getPaceText(goalData.progress)}
                </p>
              </div>
              
              <div className="bg-surface p-3 rounded-lg">
                <p className="text-xs text-text-secondary mb-1">Time Remaining</p>
                <p className="text-lg font-bold">
                  {getTimeRemaining(activeTab)}
                </p>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-primary/10">
              <div className="flex items-start space-x-3">
                <Icon name="Lightbulb" size={20} className="text-primary mt-0.5" />
                <div>
                  <p className="text-sm mb-1">
                    <span className="font-medium text-primary">Goal Insight:</span> {getGoalInsight(activeTab, goalData.progress)}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {getGoalRecommendation(activeTab, goalData.progress)}
                  </p>
                </div>
              </div>
            </div>
            
            {goalData.progress >= 100 && (
              <div className="p-4 rounded-lg bg-success/10 border border-success/20 text-center">
                <div className="flex flex-col items-center">
                  <Icon name="Award" size={32} className="text-success mb-2" />
                  <p className="text-lg font-bold text-success mb-1">Goal Achieved!</p>
                  <p className="text-sm text-text-secondary">
                    Congratulations! You've reached your {activeTab} profit target.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions
const getDaysRemaining = (period) => {
  switch (period) {
    case 'daily':
      return 1;
    case 'weekly':
      return 7;
    case 'monthly':
      return 30;
    case 'quarterly':
      return 90;
    case 'yearly':
      return 365;
    default:
      return 1;
  }
};

const getTimeRemaining = (period) => {
  switch (period) {
    case 'daily':
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      const hoursRemaining = Math.floor((endOfDay - now) / (1000 * 60 * 60));
      return `${hoursRemaining} hours`;
    case 'weekly':
      return '3 days';
    case 'monthly':
      return '12 days';
    case 'quarterly':
      return '42 days';
    case 'yearly':
      return '185 days';
    default:
      return 'N/A';
  }
};

const getPaceText = (progress) => {
  if (progress >= 100) return 'Completed';
  if (progress >= 90) return 'Ahead';
  if (progress >= 75) return 'On Track';
  if (progress >= 50) return 'Moderate';
  if (progress >= 25) return 'Behind';
  return 'Far Behind';
};

const getGoalInsight = (period, progress) => {
  if (progress >= 100) {
    return `You've already achieved your ${period} goal! Consider setting a more ambitious target.`;
  }
  
  if (progress >= 75) {
    return `You're making excellent progress toward your ${period} goal.`;
  }
  
  if (progress >= 50) {
    return `You're halfway to your ${period} goal and need to maintain this pace.`;
  }
  
  if (progress >= 25) {
    return `You're making progress but need to increase your sales to meet your ${period} goal.`;
  }
  
  return `You're significantly behind on your ${period} goal and need to take action.`;
};

const getGoalRecommendation = (period, progress) => {
  if (progress >= 100) {
    return 'Try increasing your goal by 15-20% to push your business growth further.';
  }
  
  if (progress >= 75) {
    return 'Focus on your best-performing products and platforms to exceed your target.';
  }
  
  if (progress >= 50) {
    return 'Consider running promotions or listing more high-margin items to accelerate progress.';
  }
  
  if (progress >= 25) {
    return 'Review your pricing strategy and consider increasing your listing volume.';
  }
  
  return 'Focus on quick-selling items and consider temporary price reductions to boost sales volume.';
};

export default GoalTrackingSection;