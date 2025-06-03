import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from 'components/AppIcon';

const PlatformProfitAnalysis = () => {
  const [timeFrame, setTimeFrame] = useState('month');
  const [showFees, setShowFees] = useState(true);
  
  // Mock data for platform profit analysis
  const platformData = {
    week: [
      { name: 'eBay', revenue: 580, fees: 75, profit: 505, items: 8, color: 'var(--color-primary)' },
      { name: 'Vinted', revenue: 420, fees: 42, profit: 378, items: 12, color: 'var(--color-secondary)' },
      { name: 'Depop', revenue: 350, fees: 45, profit: 305, items: 7, color: 'var(--color-accent)' }
    ],
    month: [
      { name: 'eBay', revenue: 2450, fees: 315, profit: 2135, items: 32, color: 'var(--color-primary)' },
      { name: 'Vinted', revenue: 1850, fees: 185, profit: 1665, items: 45, color: 'var(--color-secondary)' },
      { name: 'Depop', revenue: 1450, fees: 188, profit: 1262, items: 28, color: 'var(--color-accent)' }
    ],
    quarter: [
      { name: 'eBay', revenue: 7250, fees: 935, profit: 6315, items: 95, color: 'var(--color-primary)' },
      { name: 'Vinted', revenue: 5480, fees: 548, profit: 4932, items: 135, color: 'var(--color-secondary)' },
      { name: 'Depop', revenue: 4320, fees: 562, profit: 3758, items: 84, color: 'var(--color-accent)' }
    ]
  };
  
  // Calculate totals
  const calculateTotals = () => {
    const data = platformData[timeFrame];
    return {
      revenue: data.reduce((sum, item) => sum + item.revenue, 0),
      fees: data.reduce((sum, item) => sum + item.fees, 0),
      profit: data.reduce((sum, item) => sum + item.profit, 0),
      items: data.reduce((sum, item) => sum + item.items, 0)
    };
  };
  
  const totals = calculateTotals();
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background/95 backdrop-blur-sm p-3 border border-subtle rounded-lg shadow-lg">
          <p className="font-medium text-text-primary mb-2">{data.name}</p>
          <div className="space-y-1.5">
            <p className="text-sm flex items-center">
              <span className="text-text-secondary mr-2">Revenue:</span>
              <span className="font-medium" style={{ color: data.color }}>£{data.revenue}</span>
            </p>
            
            {showFees && (
              <p className="text-sm flex items-center">
                <span className="text-text-secondary mr-2">Fees:</span>
                <span className="font-medium text-error">-£{data.fees}</span>
              </p>
            )}
            
            <p className="text-sm flex items-center">
              <span className="text-text-secondary mr-2">Profit:</span>
              <span className="font-medium text-success">£{data.profit}</span>
            </p>
            
            <p className="text-sm flex items-center">
              <span className="text-text-secondary mr-2">Items Sold:</span>
              <span className="font-medium text-text-primary">{data.items}</span>
            </p>
            
            <p className="text-sm flex items-center">
              <span className="text-text-secondary mr-2">Fee Rate:</span>
              <span className="font-medium text-warning">
                {((data.fees / data.revenue) * 100).toFixed(1)}%
              </span>
            </p>
          </div>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-success rounded-full"></span>
            <span className="text-sm text-text-secondary">Profit</span>
          </div>
          
          {showFees && (
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-error rounded-full"></span>
              <span className="text-sm text-text-secondary">Fees</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-surface rounded-lg p-1">
            {['week', 'month', 'quarter'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeFrame(period)}
                className={`px-2 py-1 text-xs font-medium rounded-md transition-smooth ${
                  timeFrame === period 
                    ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setShowFees(!showFees)}
            className={`p-2 rounded-lg transition-smooth ${
              showFees 
                ? 'bg-error/10 text-error' :'bg-surface text-text-secondary hover:text-text-primary'
            }`}
            title={showFees ? 'Hide Fees' : 'Show Fees'}
          >
            <Icon name={showFees ? 'EyeOff' : 'Eye'} size={16} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={platformData[timeFrame]}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                barGap={0}
                barCategoryGap={30}
              >
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
                
                {showFees && (
                  <Bar 
                    dataKey="fees" 
                    stackId="a" 
                    fill="var(--color-error)" 
                    radius={[4, 4, 0, 0]} 
                  />
                )}
                
                <Bar 
                  dataKey="profit" 
                  stackId="a" 
                  fill="var(--color-success)" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <div className="bg-background rounded-lg border border-subtle p-4 h-full">
            <h3 className="text-lg font-semibold mb-4">Platform Summary</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-surface p-3 rounded-lg">
                  <p className="text-xs text-text-secondary mb-1">Total Revenue</p>
                  <p className="text-lg font-bold">£{totals.revenue}</p>
                </div>
                
                <div className="bg-surface p-3 rounded-lg">
                  <p className="text-xs text-text-secondary mb-1">Total Profit</p>
                  <p className="text-lg font-bold text-success">£{totals.profit}</p>
                </div>
                
                <div className="bg-surface p-3 rounded-lg">
                  <p className="text-xs text-text-secondary mb-1">Total Fees</p>
                  <p className="text-lg font-bold text-error">£{totals.fees}</p>
                </div>
                
                <div className="bg-surface p-3 rounded-lg">
                  <p className="text-xs text-text-secondary mb-1">Items Sold</p>
                  <p className="text-lg font-bold">{totals.items}</p>
                </div>
              </div>
              
              <div className="pt-3 border-t border-subtle">
                <p className="text-sm font-medium mb-2">Fee Comparison</p>
                
                {platformData[timeFrame].map((platform, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-text-secondary">{platform.name}</span>
                      <span className="font-medium">
                        {((platform.fees / platform.revenue) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full"
                        style={{ 
                          width: `${(platform.fees / platform.revenue) * 100}%`,
                          backgroundColor: platform.color
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-3 rounded-lg bg-primary/10 mt-2">
                <p className="text-sm">
                  <span className="font-medium text-primary">Insight:</span> Vinted has the lowest fee rate but eBay generates the highest profit per item.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformProfitAnalysis;