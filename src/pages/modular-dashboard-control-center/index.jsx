import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalNavigationHeader from 'components/ui/GlobalNavigationHeader';
import QuickActionFloatingButton from 'components/ui/QuickActionFloatingButton';
import ModeThemeController from 'components/ui/ModeThemeController';
import ProfitMetricsWidget from './components/ProfitMetricsWidget';
import ShipmentTrackerWidget from './components/ShipmentTrackerWidget';
import InventoryAlertsWidget from './components/InventoryAlertsWidget';
import DailyBriefingWidget from './components/DailyBriefingWidget';
import PerformanceMetricsWidget from './components/PerformanceMetricsWidget';
import QuickActionsWidget from './components/QuickActionsWidget';
import Icon from 'components/AppIcon';

const ModularDashboardControlCenter = () => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [widgetLayout, setWidgetLayout] = useState([
    { id: 'profit', position: 1, visible: true },
    { id: 'shipments', position: 2, visible: true },
    { id: 'inventory', position: 3, visible: true },
    { id: 'briefing', position: 4, visible: true },
    { id: 'performance', position: 5, visible: true },
    { id: 'quickActions', position: 6, visible: true }
  ]);

  const mockDashboardData = {
    totalProfit: 2847.50,
    profitChange: 12.5,
    todayProfit: 156.75,
    activeShipments: 23,
    pendingListings: 8,
    lowStockItems: 5,
    xpPoints: 2450,
    currentStreak: 7,
    level: 12
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  const handlePullToRefresh = (e) => {
    const startY = e.touches[0].clientY;
    let currentY = startY;
    
    const handleTouchMove = (e) => {
      currentY = e.touches[0].clientY;
      const pullDistance = currentY - startY;
      
      if (pullDistance > 100 && window.scrollY === 0) {
        handleRefresh();
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      }
    };
    
    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  useEffect(() => {
    document.addEventListener('touchstart', handlePullToRefresh);
    return () => document.removeEventListener('touchstart', handlePullToRefresh);
  }, []);

  const DashboardHeader = () => (
    <div className="bg-background/95 backdrop-blur-cinematic border-b border-subtle sticky top-20 md:top-24 z-50">
      <div className="px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-text-primary">
              Command Center
            </h1>
            <p className="text-text-secondary text-sm">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center space-x-2 px-4 py-2 bg-surface border border-subtle rounded-lg text-text-secondary hover:text-text-primary transition-smooth"
            >
              <Icon 
                name="RefreshCw" 
                size={16} 
                className={isRefreshing ? 'animate-spin' : ''} 
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            
            <button
              onClick={() => navigate('/profit-analytics-financial-dashboard')}
              className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-smooth glow-primary"
            >
              <span className="hidden sm:inline">View Analytics</span>
              <Icon name="TrendingUp" size={16} className="sm:hidden" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const RefreshIndicator = () => (
    <div className={`
      fixed top-24 md:top-28 left-1/2 transform -translate-x-1/2 z-60 transition-smooth
      ${isRefreshing ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
    `}>
      <div className="bg-primary/90 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center space-x-2">
        <Icon name="RefreshCw" size={16} className="animate-spin" />
        <span className="text-sm font-medium">Updating data...</span>
      </div>
    </div>
  );

  const WidgetGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="md:col-span-2 lg:col-span-2">
        <ProfitMetricsWidget 
          totalProfit={mockDashboardData.totalProfit}
          profitChange={mockDashboardData.profitChange}
          todayProfit={mockDashboardData.todayProfit}
        />
      </div>
      
      <div className="lg:col-span-1">
        <PerformanceMetricsWidget 
          xpPoints={mockDashboardData.xpPoints}
          currentStreak={mockDashboardData.currentStreak}
          level={mockDashboardData.level}
        />
      </div>
      
      <div className="md:col-span-1">
        <ShipmentTrackerWidget 
          activeShipments={mockDashboardData.activeShipments}
        />
      </div>
      
      <div className="md:col-span-1">
        <InventoryAlertsWidget 
          pendingListings={mockDashboardData.pendingListings}
          lowStockItems={mockDashboardData.lowStockItems}
        />
      </div>
      
      <div className="md:col-span-2 lg:col-span-1">
        <QuickActionsWidget />
      </div>
      
      <div className="md:col-span-2 lg:col-span-3">
        <DailyBriefingWidget />
      </div>
    </div>
  );

  return (
    <ModeThemeController>
      <div className="min-h-screen bg-background">
        <GlobalNavigationHeader />
        <DashboardHeader />
        <RefreshIndicator />
        
        <main className="px-4 md:px-6 py-6 pb-24 md:pb-6">
          <WidgetGrid />
        </main>
        
        <QuickActionFloatingButton />
      </div>
    </ModeThemeController>
  );
};

export default ModularDashboardControlCenter;