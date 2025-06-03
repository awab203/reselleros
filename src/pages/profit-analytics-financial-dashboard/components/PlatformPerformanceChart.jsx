import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const PlatformPerformanceChart = () => {
  const [timeFrame, setTimeFrame] = useState('month');
  
  // Mock data for platform performance
  const platformData = {
    week: [
      { name: 'Mon', ebay: 42, vinted: 28, depop: 15 },
      { name: 'Tue', ebay: 38, vinted: 32, depop: 18 },
      { name: 'Wed', ebay: 45, vinted: 35, depop: 22 },
      { name: 'Thu', ebay: 52, vinted: 30, depop: 25 },
      { name: 'Fri', ebay: 58, vinted: 36, depop: 30 },
      { name: 'Sat', ebay: 65, vinted: 42, depop: 35 },
      { name: 'Sun', ebay: 60, vinted: 38, depop: 28 }
    ],
    month: [
      { name: 'Week 1', ebay: 280, vinted: 180, depop: 120 },
      { name: 'Week 2', ebay: 320, vinted: 210, depop: 150 },
      { name: 'Week 3', ebay: 350, vinted: 230, depop: 170 },
      { name: 'Week 4', ebay: 380, vinted: 250, depop: 190 }
    ],
    quarter: [
      { name: 'Jan', ebay: 1200, vinted: 850, depop: 650 },
      { name: 'Feb', ebay: 1350, vinted: 920, depop: 720 },
      { name: 'Mar', ebay: 1480, vinted: 980, depop: 780 }
    ],
    year: [
      { name: 'Q1', ebay: 4030, vinted: 2750, depop: 2150 },
      { name: 'Q2', ebay: 4580, vinted: 3120, depop: 2480 },
      { name: 'Q3', ebay: 5120, vinted: 3580, depop: 2850 },
      { name: 'Q4', ebay: 5780, vinted: 4020, depop: 3250 }
    ]
  };
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm p-3 border border-subtle rounded-lg shadow-lg">
          <p className="font-medium text-text-primary mb-2">{label}</p>
          <div className="space-y-1.5">
            {payload.map((entry, index) => (
              <p key={index} className="text-sm flex items-center">
                <span 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: entry.color }}
                ></span>
                <span className="text-text-secondary mr-2">
                  {entry.name.charAt(0).toUpperCase() + entry.name.slice(1)}:
                </span>
                <span className="font-medium" style={{ color: entry.color }}>
                  £{entry.value}
                </span>
              </p>
            ))}
            
            <div className="pt-1.5 mt-1 border-t border-subtle">
              <p className="text-sm flex items-center">
                <span className="text-text-secondary mr-2">Total:</span>
                <span className="font-medium text-text-primary">
                  £{payload.reduce((sum, entry) => sum + entry.value, 0)}
                </span>
              </p>
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="h-80">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-primary rounded-full"></span>
            <span className="text-sm text-text-secondary">eBay</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-secondary rounded-full"></span>
            <span className="text-sm text-text-secondary">Vinted</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-accent rounded-full"></span>
            <span className="text-sm text-text-secondary">Depop</span>
          </div>
        </div>
        
        <div className="flex items-center bg-surface rounded-lg p-1">
          {['week', 'month', 'quarter', 'year'].map((period) => (
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
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={platformData[timeFrame]}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
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
          <Bar 
            dataKey="ebay" 
            name="ebay" 
            fill="var(--color-primary)" 
            radius={[4, 4, 0, 0]} 
          />
          <Bar 
            dataKey="vinted" 
            name="vinted" 
            fill="var(--color-secondary)" 
            radius={[4, 4, 0, 0]} 
          />
          <Bar 
            dataKey="depop" 
            name="depop" 
            fill="var(--color-accent)" 
            radius={[4, 4, 0, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlatformPerformanceChart;