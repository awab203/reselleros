import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';


const CategoryAnalysisChart = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [viewMode, setViewMode] = useState('profit'); // 'profit' or 'volume'
  
  // Mock data for category analysis
  const categoryData = {
    profit: [
      { name: 'Sneakers', value: 2850, color: 'var(--color-primary)' },
      { name: 'Clothing', value: 1750, color: 'var(--color-secondary)' },
      { name: 'Accessories', value: 950, color: 'var(--color-accent)' },
      { name: 'Electronics', value: 650, color: 'var(--color-success)' },
      { name: 'Other', value: 450, color: 'var(--color-warning)' }
    ],
    volume: [
      { name: 'Sneakers', value: 85, color: 'var(--color-primary)' },
      { name: 'Clothing', value: 120, color: 'var(--color-secondary)' },
      { name: 'Accessories', value: 65, color: 'var(--color-accent)' },
      { name: 'Electronics', value: 25, color: 'var(--color-success)' },
      { name: 'Other', value: 30, color: 'var(--color-warning)' }
    ]
  };
  
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
  
  const onPieLeave = () => {
    setActiveIndex(null);
  };
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background/95 backdrop-blur-sm p-3 border border-subtle rounded-lg shadow-lg">
          <p className="font-medium text-text-primary mb-1">{data.name}</p>
          <p className="text-sm flex items-center">
            <span 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: data.color }}
            ></span>
            <span className="text-text-secondary mr-2">
              {viewMode === 'profit' ? 'Profit:' : 'Units:'}
            </span>
            <span className="font-medium" style={{ color: data.color }}>
              {viewMode === 'profit' ? `£${data.value}` : data.value}
            </span>
          </p>
          <p className="text-xs text-text-secondary mt-1">
            {Math.round((data.value / categoryData[viewMode].reduce((sum, item) => sum + item.value, 0)) * 100)}% of total
          </p>
        </div>
      );
    }
    
    return null;
  };
  
  // Custom legend component
  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-col space-y-1.5 mt-2">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between text-xs">
            <div className="flex items-center">
              <span 
                className="w-2 h-2 rounded-full mr-2" 
                style={{ backgroundColor: entry.color }}
              ></span>
              <span className="text-text-secondary">{entry.value}</span>
            </div>
            <span className="font-medium text-text-primary">
              {viewMode === 'profit' 
                ? `£${categoryData.profit[index].value}` 
                : categoryData.volume[index].value}
            </span>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="h-80">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-text-secondary">
          By {viewMode === 'profit' ? 'Profit' : 'Volume'}
        </h3>
        
        <div className="flex items-center bg-surface rounded-lg p-1">
          <button
            onClick={() => setViewMode('profit')}
            className={`px-2 py-1 text-xs font-medium rounded-md transition-smooth ${
              viewMode === 'profit' ?'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            Profit
          </button>
          <button
            onClick={() => setViewMode('volume')}
            className={`px-2 py-1 text-xs font-medium rounded-md transition-smooth ${
              viewMode === 'volume' ?'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            Volume
          </button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-center h-64">
        <div className="w-full h-full max-w-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData[viewMode]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
              >
                {categoryData[viewMode].map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    stroke="transparent"
                    className={`transition-transform duration-300 ${activeIndex === index ? 'scale-105' : ''}`}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="w-full max-w-[200px] mt-4 md:mt-0">
          <CustomLegend payload={categoryData[viewMode].map(item => ({ value: item.name, color: item.color }))} />
          
          <div className="mt-4 pt-4 border-t border-subtle">
            <div className="text-center">
              <p className="text-xs text-text-secondary">Total {viewMode === 'profit' ? 'Profit' : 'Units'}</p>
              <p className="text-lg font-bold text-text-primary">
                {viewMode === 'profit' 
                  ? `£${categoryData.profit.reduce((sum, item) => sum + item.value, 0)}` 
                  : categoryData.volume.reduce((sum, item) => sum + item.value, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryAnalysisChart;