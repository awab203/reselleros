import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from 'components/AppIcon';

const ProfitTrendsChart = ({ dateRange = 'month' }) => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comparisonMode, setComparisonMode] = useState(false);
  
  // Generate mock data based on date range
  useEffect(() => {
    setIsLoading(true);
    
    // Generate different data points based on selected range
    const generateData = () => {
      const data = [];
      let points = 0;
      let labelFormat = '';
      
      switch(dateRange) {
        case 'week':
          points = 7;
          labelFormat = 'day';
          break;
        case 'month':
          points = 30;
          labelFormat = 'day';
          break;
        case 'quarter':
          points = 12;
          labelFormat = 'week';
          break;
        case 'year':
          points = 12;
          labelFormat = 'month';
          break;
        case 'custom':
          points = 14;
          labelFormat = 'day';
          break;
        default:
          points = 30;
          labelFormat = 'day';
      }
      
      // Generate labels based on format
      for (let i = 0; i < points; i++) {
        let label = '';
        
        if (labelFormat === 'day') {
          const date = new Date();
          date.setDate(date.getDate() - (points - i - 1));
          label = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
        } else if (labelFormat === 'week') {
          label = `W${i + 1}`;
        } else if (labelFormat === 'month') {
          const date = new Date();
          date.setMonth(date.getMonth() - (points - i - 1));
          label = date.toLocaleDateString('en-US', { month: 'short' });
        }
        
        // Generate random profit values with an upward trend
        const baseValue = 100 + (i * 10);
        const randomFactor = Math.random() * 50 - 25;
        const profit = Math.max(0, baseValue + randomFactor);
        
        // Generate previous period data for comparison (slightly lower)
        const prevProfit = Math.max(0, profit * (0.7 + Math.random() * 0.4));
        
        data.push({
          name: label,
          profit: Math.round(profit),
          prevProfit: Math.round(prevProfit),
          expenses: Math.round(profit * (0.3 + Math.random() * 0.2)),
        });
      }
      
      return data;
    };
    
    // Simulate API delay
    setTimeout(() => {
      setChartData(generateData());
      setIsLoading(false);
    }, 800);
  }, [dateRange]);
  
  const toggleComparisonMode = () => {
    setComparisonMode(!comparisonMode);
  };
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm p-3 border border-subtle rounded-lg shadow-lg">
          <p className="font-medium text-text-primary mb-1">{label}</p>
          <div className="space-y-1">
            <p className="text-sm flex items-center">
              <span className="w-3 h-3 bg-primary rounded-full mr-2"></span>
              <span className="text-text-secondary mr-2">Profit:</span>
              <span className="font-medium text-primary">£{payload[0].value}</span>
            </p>
            
            {comparisonMode && (
              <p className="text-sm flex items-center">
                <span className="w-3 h-3 bg-secondary rounded-full mr-2"></span>
                <span className="text-text-secondary mr-2">Previous:</span>
                <span className="font-medium text-secondary">£{payload[1].value}</span>
              </p>
            )}
            
            <p className="text-sm flex items-center">
              <span className="w-3 h-3 bg-accent rounded-full mr-2"></span>
              <span className="text-text-secondary mr-2">Expenses:</span>
              <span className="font-medium text-accent">£{payload[2].value}</span>
            </p>
            
            <div className="pt-1 mt-1 border-t border-subtle">
              <p className="text-sm flex items-center">
                <span className="text-text-secondary mr-2">Margin:</span>
                <span className="font-medium text-success">
                  {Math.round((payload[0].value / (payload[0].value + payload[2].value)) * 100)}%
                </span>
              </p>
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="h-80">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-primary rounded-full"></span>
            <span className="text-sm text-text-secondary">Current</span>
          </div>
          
          {comparisonMode && (
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-secondary rounded-full"></span>
              <span className="text-sm text-text-secondary">Previous</span>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-accent rounded-full"></span>
            <span className="text-sm text-text-secondary">Expenses</span>
          </div>
        </div>
        
        <button 
          onClick={toggleComparisonMode}
          className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm transition-smooth ${
            comparisonMode 
              ? 'bg-secondary/10 text-secondary' :'bg-surface text-text-secondary hover:text-text-primary'
          }`}
        >
          <Icon name="GitCompare" size={16} />
          <span>Compare</span>
        </button>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPrevProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-secondary)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--color-secondary)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: 'var(--color-text-secondary)' }}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          />
          <YAxis 
            tick={{ fill: 'var(--color-text-secondary)' }}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            tickFormatter={(value) => `£${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="profit" 
            stroke="var(--color-primary)" 
            fillOpacity={1}
            fill="url(#colorProfit)" 
            strokeWidth={2}
          />
          {comparisonMode && (
            <Area 
              type="monotone" 
              dataKey="prevProfit" 
              stroke="var(--color-secondary)" 
              fillOpacity={1}
              fill="url(#colorPrevProfit)" 
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          )}
          <Area 
            type="monotone" 
            dataKey="expenses" 
            stroke="var(--color-accent)" 
            fillOpacity={1}
            fill="url(#colorExpenses)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProfitTrendsChart;