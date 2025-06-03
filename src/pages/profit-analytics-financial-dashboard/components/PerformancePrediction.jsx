import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from 'components/AppIcon';

const PerformancePrediction = () => {
  const [predictionRange, setPredictionRange] = useState('month');
  const [confidenceLevel, setConfidenceLevel] = useState('medium');
  
  // Mock data for performance prediction
  const predictionData = {
    week: [
      { name: 'Mon', actual: 85, predicted: 90, min: 75, max: 105 },
      { name: 'Tue', actual: 92, predicted: 95, min: 80, max: 110 },
      { name: 'Wed', actual: 98, predicted: 100, min: 85, max: 115 },
      { name: 'Thu', actual: 105, predicted: 110, min: 95, max: 125 },
      { name: 'Fri', actual: null, predicted: 115, min: 100, max: 130 },
      { name: 'Sat', actual: null, predicted: 125, min: 110, max: 140 },
      { name: 'Sun', actual: null, predicted: 120, min: 105, max: 135 }
    ],
    month: [
      { name: 'Week 1', actual: 580, predicted: 600, min: 520, max: 680 },
      { name: 'Week 2', actual: 620, predicted: 650, min: 570, max: 730 },
      { name: 'Week 3', actual: 680, predicted: 700, min: 620, max: 780 },
      { name: 'Week 4', actual: null, predicted: 750, min: 670, max: 830 }
    ],
    quarter: [
      { name: 'Month 1', actual: 2500, predicted: 2600, min: 2300, max: 2900 },
      { name: 'Month 2', actual: 2800, predicted: 2900, min: 2600, max: 3200 },
      { name: 'Month 3', actual: null, predicted: 3200, min: 2900, max: 3500 }
    ]
  };
  
  // Calculate prediction accuracy
  const calculateAccuracy = () => {
    const data = predictionData[predictionRange];
    let totalDiff = 0;
    let count = 0;
    
    data.forEach(item => {
      if (item.actual !== null) {
        totalDiff += Math.abs(item.predicted - item.actual) / item.actual;
        count++;
      }
    });
    
    return count > 0 ? 100 - (totalDiff / count) * 100 : 0;
  };
  
  const accuracy = calculateAccuracy();
  
  // Calculate total predicted profit
  const calculateTotalPredicted = () => {
    const data = predictionData[predictionRange];
    return data.reduce((sum, item) => sum + item.predicted, 0);
  };
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm p-3 border border-subtle rounded-lg shadow-lg">
          <p className="font-medium text-text-primary mb-2">{label}</p>
          <div className="space-y-1.5">
            {payload[0].payload.actual !== null && (
              <p className="text-sm flex items-center">
                <span className="w-3 h-3 bg-primary rounded-full mr-2"></span>
                <span className="text-text-secondary mr-2">Actual:</span>
                <span className="font-medium text-primary">£{payload[0].payload.actual}</span>
              </p>
            )}
            
            <p className="text-sm flex items-center">
              <span className="w-3 h-3 bg-secondary rounded-full mr-2"></span>
              <span className="text-text-secondary mr-2">Predicted:</span>
              <span className="font-medium text-secondary">£{payload[0].payload.predicted}</span>
            </p>
            
            <p className="text-sm flex items-center">
              <span className="text-text-secondary mr-2">Range:</span>
              <span className="font-medium text-text-primary">
                £{payload[0].payload.min} - £{payload[0].payload.max}
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
            <span className="w-3 h-3 bg-primary rounded-full"></span>
            <span className="text-sm text-text-secondary">Actual</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-secondary rounded-full"></span>
            <span className="text-sm text-text-secondary">Predicted</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-secondary/20 rounded-full"></span>
            <span className="text-sm text-text-secondary">Range</span>
          </div>
        </div>
        
        <div className="flex items-center bg-surface rounded-lg p-1">
          {['week', 'month', 'quarter'].map((range) => (
            <button
              key={range}
              onClick={() => setPredictionRange(range)}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-smooth ${
                predictionRange === range 
                  ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={predictionData[predictionRange]}
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
                
                {/* Prediction range area */}
                <Line
                  type="monotone"
                  dataKey="min"
                  stroke="transparent"
                  fill="transparent"
                />
                <Line
                  type="monotone"
                  dataKey="max"
                  stroke="transparent"
                  fill="transparent"
                />
                
                {/* Actual line */}
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={{ r: 4, fill: 'var(--color-primary)' }}
                  activeDot={{ r: 6 }}
                />
                
                {/* Predicted line */}
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="var(--color-secondary)"
                  strokeWidth={2}
                  strokeDasharray={confidenceLevel === 'high' ? '0' : '5 5'}
                  dot={{ r: 4, fill: 'var(--color-secondary)' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <div className="bg-background rounded-lg border border-subtle p-4 h-full">
            <h3 className="text-lg font-semibold mb-4">Prediction Insights</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-text-secondary mb-1">Prediction Accuracy</p>
                <div className="flex items-center">
                  <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        accuracy >= 90 ? 'bg-success' : 
                        accuracy >= 75 ? 'bg-warning': 'bg-error'
                      }`}
                      style={{ width: `${accuracy}%` }}
                    ></div>
                  </div>
                  <span className="ml-3 font-medium">{accuracy.toFixed(1)}%</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-text-secondary mb-1">Confidence Level</p>
                <div className="flex items-center bg-surface rounded-lg p-1">
                  {['low', 'medium', 'high'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setConfidenceLevel(level)}
                      className={`flex-1 px-2 py-1 text-xs font-medium rounded-md transition-smooth ${
                        confidenceLevel === level 
                          ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t border-subtle">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-text-secondary">Total Predicted</span>
                  <span className="font-bold text-secondary">£{calculateTotalPredicted()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Trend</span>
                  <span className="font-medium text-success flex items-center">
                    <Icon name="TrendingUp" size={16} className="mr-1" />
                    Increasing
                  </span>
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-secondary/10 mt-2">
                <p className="text-sm">
                  <span className="font-medium text-secondary">AI Insight:</span> Based on your current performance, you're on track to exceed your monthly target by 12%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformancePrediction;