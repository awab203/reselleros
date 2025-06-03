import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const PerformanceMetricsWidget = ({ xpPoints, currentStreak, level }) => {
  const navigate = useNavigate();
  const [animatedXP, setAnimatedXP] = useState(0);
  const [animatedLevel, setAnimatedLevel] = useState(0);

  const xpToNextLevel = 2500;
  const xpProgress = (xpPoints / xpToNextLevel) * 100;

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      setAnimatedXP(xpPoints * easeOut);
      setAnimatedLevel(level * easeOut);
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);
    
    return () => clearInterval(timer);
  }, [xpPoints, level]);

  const achievements = [
    {
      id: 1,
      title: 'Profit Master',
      description: 'Earned $1000+ in a single day',
      icon: 'Trophy',
      unlocked: true,
      rarity: 'gold'
    },
    {
      id: 2,
      title: 'Speed Seller',
      description: 'Listed 10 items in one hour',
      icon: 'Zap',
      unlocked: true,
      rarity: 'silver'
    },
    {
      id: 3,
      title: 'Streak Legend',
      description: 'Maintain 30-day profit streak',
      icon: 'Flame',
      unlocked: false,
      rarity: 'platinum'
    }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'platinum': return 'text-primary';
      case 'gold': return 'text-warning';
      case 'silver': return 'text-text-secondary';
      default: return 'text-text-secondary';
    }
  };

  const getRarityBg = (rarity) => {
    switch (rarity) {
      case 'platinum': return 'bg-primary/10';
      case 'gold': return 'bg-warning/10';
      case 'silver': return 'bg-surface/50';
      default: return 'bg-surface/30';
    }
  };

  return (
    <div className="bg-surface/50 backdrop-blur-sm border border-subtle rounded-xl p-6 hover:bg-surface/70 transition-smooth elevation-base">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center glow-secondary">
            <Icon name="Award" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Performance
            </h3>
            <p className="text-text-secondary text-sm">Level {Math.floor(animatedLevel)}</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-text-secondary text-xs">Current Streak</p>
          <div className="flex items-center space-x-1">
            <Icon name="Flame" size={16} className="text-accent" />
            <span className="text-accent font-bold">{currentStreak}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4 mb-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-secondary text-sm">XP Progress</span>
            <span className="text-text-primary text-sm font-medium">
              {Math.floor(animatedXP)} / {xpToNextLevel}
            </span>
          </div>
          <div className="w-full bg-surface rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-secondary to-primary h-2 rounded-full transition-smooth"
              style={{ width: `${xpProgress}%` }}
            ></div>
          </div>
          <p className="text-text-secondary text-xs mt-1">
            {xpToNextLevel - xpPoints} XP to Level {level + 1}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-background/50 rounded-lg border border-subtle">
            <Icon name="Target" size={20} className="text-success mx-auto mb-1" />
            <p className="text-success font-bold">98%</p>
            <p className="text-text-secondary text-xs">Goal Achievement</p>
          </div>
          
          <div className="text-center p-3 bg-background/50 rounded-lg border border-subtle">
            <Icon name="TrendingUp" size={20} className="text-primary mx-auto mb-1" />
            <p className="text-primary font-bold">+24%</p>
            <p className="text-text-secondary text-xs">This Week</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-3 mb-4">
        <h4 className="text-text-primary font-medium text-sm">Recent Achievements</h4>
        {achievements.slice(0, 2).map((achievement) => (
          <div 
            key={achievement.id}
            className={`
              flex items-center space-x-3 p-3 rounded-lg border transition-smooth
              ${achievement.unlocked 
                ? `${getRarityBg(achievement.rarity)} border-subtle` 
                : 'bg-surface/20 border-subtle opacity-50'
              }
            `}
          >
            <div className={`
              w-8 h-8 rounded-lg flex items-center justify-center
              ${achievement.unlocked ? getRarityBg(achievement.rarity) : 'bg-surface/30'}
            `}>
              <Icon 
                name={achievement.icon} 
                size={16} 
                className={achievement.unlocked ? getRarityColor(achievement.rarity) : 'text-text-secondary'} 
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h5 className={`
                text-sm font-medium
                ${achievement.unlocked ? 'text-text-primary' : 'text-text-secondary'}
              `}>
                {achievement.title}
              </h5>
              <p className="text-text-secondary text-xs">
                {achievement.description}
              </p>
            </div>
            
            {achievement.unlocked && (
              <Icon name="Check" size={16} className={getRarityColor(achievement.rarity)} />
            )}
          </div>
        ))}
      </div>
      
      <div className="pt-4 border-t border-subtle">
        <button
          onClick={() => navigate('/profit-analytics-financial-dashboard')}
          className="w-full px-4 py-2 bg-secondary/10 border border-secondary/30 text-secondary rounded-lg hover:bg-secondary/20 transition-smooth"
        >
          View All Achievements
        </button>
      </div>
    </div>
  );
};

export default PerformanceMetricsWidget;