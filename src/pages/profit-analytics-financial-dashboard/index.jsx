import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Icon from 'components/AppIcon';
import GlobalNavigationHeader from 'components/ui/GlobalNavigationHeader';
import QuickActionFloatingButton from 'components/ui/QuickActionFloatingButton';
import ModeThemeController from 'components/ui/ModeThemeController';
import NotificationBadgeSystem from 'components/ui/NotificationBadgeSystem';
import MetricCard from './components/MetricCard';
import ProfitTrendsChart from './components/ProfitTrendsChart';
import PlatformPerformanceChart from './components/PlatformPerformanceChart';
import CategoryAnalysisChart from './components/CategoryAnalysisChart';
import CostBreakdownCalculator from './components/CostBreakdownCalculator';
import SmartProfitCalculator from './components/SmartProfitCalculator';
import PerformancePrediction from './components/PerformancePrediction';
import PlatformProfitAnalysis from './components/PlatformProfitAnalysis';
import SupplierROIAnalysis from './components/SupplierROIAnalysis';
import GoalTrackingSection from './components/GoalTrackingSection';

const ProfitAnalyticsDashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [dateRange, setDateRange] = useState('month');
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState({
    analytics: 2,
    inventory: 1,
    sourcing: 0,
    shipping: 0
  });
  
  // Check if we need to show the price check modal
  const showPriceCheck = searchParams.get('action') === 'price-check';
  const [isPriceCheckModalOpen, setIsPriceCheckModalOpen] = useState(showPriceCheck);

  // Mock data for metrics
  const metrics = {
    totalProfit: 4872.35,
    profitMargin: 42.8,
    monthlyTrend: 18.7,
    targetProgress: 78.4,
    lastUpdated: new Date(),
    currency: '£'
  };

  // Mock data for profit goals
  const profitGoals = {
    daily: 75,
    weekly: 500,
    monthly: 2000,
    quarterly: 6000,
    yearly: 24000,
    currentDaily: 68.42,
    currentWeekly: 478.91,
    currentMonthly: 1568.35,
    currentQuarterly: 4872.35,
    currentYearly: 18745.22
  };

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Update price check modal state based on URL parameter
    setIsPriceCheckModalOpen(showPriceCheck);
  }, [showPriceCheck]);

  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  const handleExportData = (format) => {
    // Mock export functionality
    console.log(`Exporting data in ${format} format`);
    
    // Show success notification
    setNotifications(prev => ({
      ...prev,
      analytics: prev.analytics + 1
    }));
  };

  const handlePriceCheckClose = () => {
    setIsPriceCheckModalOpen(false);
    // Remove the action parameter from URL
    navigate('/profit-analytics-financial-dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <GlobalNavigationHeader />
      <ModeThemeController />
      <QuickActionFloatingButton />
      
      <main className="container mx-auto px-4 py-6 lg:px-8 lg:py-8 mb-16 md:mb-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold mb-2">Profit Analytics</h1>
            <p className="text-text-secondary text-sm md:text-base">
              Financial insights and performance tracking
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center bg-surface rounded-lg p-1">
              {['week', 'month', 'quarter', 'year', 'custom'].map((range) => (
                <button
                  key={range}
                  onClick={() => handleDateRangeChange(range)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-smooth ${
                    dateRange === range 
                      ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="relative">
              <button 
                className="p-2 rounded-lg bg-surface text-text-secondary hover:text-text-primary transition-smooth"
                onClick={() => {}}
              >
                <Icon name="Download" size={20} />
              </button>
              <NotificationBadgeSystem notifications={{ analytics: notifications.analytics }} />
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-96">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-text-secondary">Loading financial data...</p>
          </div>
        ) : (
          <>
            {/* Key Metrics Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <MetricCard 
                title="Total Profit" 
                value={metrics.totalProfit} 
                currency={metrics.currency}
                icon="TrendingUp"
                color="primary"
                subtitle="This quarter"
              />
              <MetricCard 
                title="Profit Margin" 
                value={metrics.profitMargin} 
                suffix="%"
                icon="PieChart"
                color="secondary"
                subtitle="Average across platforms"
              />
              <MetricCard 
                title="Monthly Trend" 
                value={metrics.monthlyTrend} 
                prefix="+"
                suffix="%"
                icon="ArrowUpRight"
                color="success"
                subtitle="vs. previous month"
                isPositive={true}
              />
              <MetricCard 
                title="Target Progress" 
                value={metrics.targetProgress} 
                suffix="%"
                icon="Target"
                color="warning"
                subtitle="Quarterly goal"
                showProgressBar={true}
              />
            </div>
            
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-surface rounded-xl p-4 border border-subtle">
                <h2 className="text-lg font-heading font-semibold mb-4">Profit Trends</h2>
                <ProfitTrendsChart dateRange={dateRange} />
              </div>
              
              <div className="bg-surface rounded-xl p-4 border border-subtle">
                <h2 className="text-lg font-heading font-semibold mb-4">Platform Performance</h2>
                <PlatformPerformanceChart />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-surface rounded-xl p-4 border border-subtle lg:col-span-1">
                <h2 className="text-lg font-heading font-semibold mb-4">Category Analysis</h2>
                <CategoryAnalysisChart />
              </div>
              
              <div className="bg-surface rounded-xl p-4 border border-subtle lg:col-span-2">
                <h2 className="text-lg font-heading font-semibold mb-4">Cost Breakdown</h2>
                <CostBreakdownCalculator />
              </div>
            </div>
            
            {/* Calculators and Predictions Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-surface rounded-xl p-4 border border-subtle">
                <h2 className="text-lg font-heading font-semibold mb-4">Smart Profit Calculator</h2>
                <SmartProfitCalculator />
              </div>
              
              <div className="bg-surface rounded-xl p-4 border border-subtle">
                <h2 className="text-lg font-heading font-semibold mb-4">Performance Prediction</h2>
                <PerformancePrediction />
              </div>
            </div>
            
            {/* Platform and Supplier Analysis Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-surface rounded-xl p-4 border border-subtle">
                <h2 className="text-lg font-heading font-semibold mb-4">Platform Profit Analysis</h2>
                <PlatformProfitAnalysis />
              </div>
              
              <div className="bg-surface rounded-xl p-4 border border-subtle">
                <h2 className="text-lg font-heading font-semibold mb-4">Supplier ROI Analysis</h2>
                <SupplierROIAnalysis />
              </div>
            </div>
            
            {/* Goal Tracking Section */}
            <div className="bg-surface rounded-xl p-4 border border-subtle mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-heading font-semibold">Goal Tracking</h2>
                <button className="text-primary hover:text-primary-600 text-sm font-medium flex items-center">
                  <Icon name="Edit" size={16} className="mr-1" />
                  Edit Goals
                </button>
              </div>
              <GoalTrackingSection goals={profitGoals} />
            </div>
            
            {/* Export Section */}
            <div className="bg-surface rounded-xl p-4 border border-subtle">
              <h2 className="text-lg font-heading font-semibold mb-4">Export & Reports</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => handleExportData('excel')}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-smooth"
                >
                  <Icon name="FileSpreadsheet" size={20} />
                  <span>Excel Export</span>
                </button>
                <button 
                  onClick={() => handleExportData('pdf')}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-secondary/10 text-secondary rounded-lg hover:bg-secondary/20 transition-smooth"
                >
                  <Icon name="FileText" size={20} />
                  <span>PDF Report</span>
                </button>
                <button 
                  onClick={() => handleExportData('csv')}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-smooth"
                >
                  <Icon name="FileDown" size={20} />
                  <span>CSV Download</span>
                </button>
              </div>
            </div>
          </>
        )}
      </main>
      
      {/* Price Check Modal */}
      {isPriceCheckModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-xl border border-subtle w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-heading font-bold">Market Price Check</h2>
                <button 
                  onClick={handlePriceCheckClose}
                  className="p-2 text-text-secondary hover:text-text-primary transition-smooth"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Enter product name or SKU" 
                      className="w-full px-4 py-3 bg-background border border-subtle rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-smooth"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Icon name="Search" size={18} className="text-text-secondary" />
                    </div>
                  </div>
                  <button className="px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-smooth">
                    Check
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Nike Dunk</span>
                  <span className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full">Jordan 4</span>
                  <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">Yeezy 350</span>
                  <span className="px-3 py-1 bg-success/10 text-success text-sm rounded-full">Tech Fleece</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-background rounded-lg border border-subtle">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">Nike Tech Fleece Joggers - Black</h3>
                    <span className="text-success font-bold">£85 - £110</span>
                  </div>
                  <div className="flex justify-between text-sm text-text-secondary">
                    <span>Average selling price across platforms</span>
                    <span>Last updated: Today</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-subtle">
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-center p-2 bg-primary/5 rounded">
                        <div className="font-semibold">eBay</div>
                        <div className="text-primary">£95.50</div>
                      </div>
                      <div className="text-center p-2 bg-secondary/5 rounded">
                        <div className="font-semibold">Vinted</div>
                        <div className="text-secondary">£87.25</div>
                      </div>
                      <div className="text-center p-2 bg-accent/5 rounded">
                        <div className="font-semibold">Depop</div>
                        <div className="text-accent">£102.75</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-background rounded-lg border border-subtle">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">Nike Tech Fleece Hoodie - Black</h3>
                    <span className="text-success font-bold">£90 - £120</span>
                  </div>
                  <div className="flex justify-between text-sm text-text-secondary">
                    <span>Average selling price across platforms</span>
                    <span>Last updated: Yesterday</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-subtle">
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-center p-2 bg-primary/5 rounded">
                        <div className="font-semibold">eBay</div>
                        <div className="text-primary">£105.50</div>
                      </div>
                      <div className="text-center p-2 bg-secondary/5 rounded">
                        <div className="font-semibold">Vinted</div>
                        <div className="text-secondary">£92.75</div>
                      </div>
                      <div className="text-center p-2 bg-accent/5 rounded">
                        <div className="font-semibold">Depop</div>
                        <div className="text-accent">£112.25</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-subtle">
                <button 
                  onClick={handlePriceCheckClose}
                  className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-smooth"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Footer with last updated info */}
      <footer className="bg-surface border-t border-subtle py-4 px-6 text-center text-text-secondary text-sm">
        <p>Last data update: {metrics.lastUpdated.toLocaleString()}</p>
        <p className="mt-1">© {new Date().getFullYear()} ResellerOS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ProfitAnalyticsDashboard;