import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from 'components/AppIcon';

const PerformanceAnalytics = () => {
  const [timeRange, setTimeRange] = useState('30days');
  const [chartType, setChartType] = useState('suppliers');

  // Mock data for supplier performance
  const supplierPerformanceData = [
    { name: 'ItaoBuy Premium', quality: 92, communication: 95, shipping: 88, value: 90, orders: 24 },
    { name: 'CNFans Streetwear', quality: 85, communication: 78, shipping: 75, value: 92, orders: 18 },
    { name: 'Vintage Finds', quality: 98, communication: 96, shipping: 94, value: 85, orders: 12 },
    { name: 'Hypebeast Supply', quality: 84, communication: 90, shipping: 92, value: 88, orders: 31 },
    { name: 'Luxury Replicas', quality: 90, communication: 82, shipping: 78, value: 85, orders: 15 }
  ];

  // Mock data for cost trends
  const costTrendData = [
    { month: 'Jan', avgItemCost: 35.2, avgShippingCost: 18.5, totalSpend: 1250 },
    { month: 'Feb', avgItemCost: 37.8, avgShippingCost: 19.2, totalSpend: 1420 },
    { month: 'Mar', avgItemCost: 36.5, avgShippingCost: 20.1, totalSpend: 1380 },
    { month: 'Apr', avgItemCost: 38.2, avgShippingCost: 21.5, totalSpend: 1520 },
    { month: 'May', avgItemCost: 39.5, avgShippingCost: 22.0, totalSpend: 1650 },
    { month: 'Jun', avgItemCost: 41.2, avgShippingCost: 21.8, totalSpend: 1720 },
    { month: 'Jul', avgItemCost: 40.8, avgShippingCost: 20.5, totalSpend: 1680 },
    { month: 'Aug', avgItemCost: 42.5, avgShippingCost: 19.8, totalSpend: 1750 },
    { month: 'Sep', avgItemCost: 43.2, avgShippingCost: 19.2, totalSpend: 1820 },
    { month: 'Oct', avgItemCost: 44.5, avgShippingCost: 18.5, totalSpend: 1890 },
    { month: 'Nov', avgItemCost: 45.8, avgShippingCost: 18.0, totalSpend: 1950 },
    { month: 'Dec', avgItemCost: 47.2, avgShippingCost: 17.5, totalSpend: 2050 }
  ];

  // Mock data for ROI by category
  const roiCategoryData = [
    { name: 'Vintage', value: 185, color: '#00D4FF' },
    { name: 'Streetwear', value: 165, color: '#8B5CF6' },
    { name: 'Luxury', value: 210, color: '#FF6B6B' },
    { name: 'Sneakers', value: 175, color: '#00FF88' },
    { name: 'Accessories', value: 145, color: '#FFB800' }
  ];

  // Mock data for platform distribution
  const platformDistributionData = [
    { name: 'ItaoBuy', value: 45, color: '#00D4FF' },
    { name: 'CNFans', value: 35, color: '#8B5CF6' },
    { name: 'Manual', value: 20, color: '#FF6B6B' }
  ];

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  const handleChartTypeChange = (type) => {
    setChartType(type);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm p-3 border border-subtle rounded-lg shadow-lg">
          <p className="font-medium text-text-primary">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.name.includes('Cost') || entry.name === 'totalSpend' ? '$' : ''}
              {entry.name === 'value' ? '% ROI' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface border border-subtle rounded-xl p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-xl font-semibold mb-4 md:mb-0">Sourcing Performance Analytics</h2>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="flex p-1 bg-background rounded-lg">
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-smooth ${timeRange === '30days' ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary'}`}
              onClick={() => handleTimeRangeChange('30days')}
            >
              30 Days
            </button>
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-smooth ${timeRange === '90days' ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary'}`}
              onClick={() => handleTimeRangeChange('90days')}
            >
              90 Days
            </button>
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-smooth ${timeRange === '1year' ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary'}`}
              onClick={() => handleTimeRangeChange('1year')}
            >
              1 Year
            </button>
          </div>
          
          <div className="flex p-1 bg-background rounded-lg">
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-smooth ${chartType === 'suppliers' ? 'bg-secondary text-white' : 'text-text-secondary hover:text-text-primary'}`}
              onClick={() => handleChartTypeChange('suppliers')}
            >
              Suppliers
            </button>
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-smooth ${chartType === 'costs' ? 'bg-secondary text-white' : 'text-text-secondary hover:text-text-primary'}`}
              onClick={() => handleChartTypeChange('costs')}
            >
              Costs
            </button>
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-smooth ${chartType === 'roi' ? 'bg-secondary text-white' : 'text-text-secondary hover:text-text-primary'}`}
              onClick={() => handleChartTypeChange('roi')}
            >
              ROI
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Chart Area */}
      <div className="mb-8">
        {chartType === 'suppliers' && (
          <div>
            <h3 className="text-lg font-medium mb-4">Supplier Performance Comparison</h3>
            <div className="w-full h-80" aria-label="Supplier Performance Comparison Chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={supplierPerformanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: 'var(--color-text-secondary)' }}
                    angle={-45}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis tick={{ fill: 'var(--color-text-secondary)' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: 20 }} />
                  <Bar dataKey="quality" name="Quality Score" fill="var(--color-primary)" />
                  <Bar dataKey="communication" name="Communication" fill="var(--color-secondary)" />
                  <Bar dataKey="shipping" name="Shipping Speed" fill="var(--color-success)" />
                  <Bar dataKey="value" name="Value for Money" fill="var(--color-warning)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        
        {chartType === 'costs' && (
          <div>
            <h3 className="text-lg font-medium mb-4">Cost Trends Over Time</h3>
            <div className="w-full h-80" aria-label="Cost Trends Chart">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={costTrendData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" tick={{ fill: 'var(--color-text-secondary)' }} />
                  <YAxis tick={{ fill: 'var(--color-text-secondary)' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: 20 }} />
                  <Line 
                    type="monotone" 
                    dataKey="avgItemCost" 
                    name="Avg Item Cost" 
                    stroke="var(--color-primary)" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="avgShippingCost" 
                    name="Avg Shipping Cost" 
                    stroke="var(--color-secondary)" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="totalSpend" 
                    name="Total Monthly Spend" 
                    stroke="var(--color-accent)" 
                    strokeDasharray="5 5" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        
        {chartType === 'roi' && (
          <div>
            <h3 className="text-lg font-medium mb-4">ROI Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-background p-4 rounded-xl">
                <h4 className="text-base font-medium mb-3">ROI by Category (%)</h4>
                <div className="w-full h-64" aria-label="ROI by Category Chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={roiCategoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {roiCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-background p-4 rounded-xl">
                <h4 className="text-base font-medium mb-3">Sourcing Platform Distribution</h4>
                <div className="w-full h-64" aria-label="Platform Distribution Chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={platformDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {platformDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Key Insights */}
      <div className="bg-background p-4 rounded-xl mb-6">
        <h3 className="text-lg font-medium mb-3">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface p-4 rounded-lg border border-subtle">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Icon name="TrendingUp" size={20} className="text-primary" />
              </div>
              <h4 className="font-medium">Top Performer</h4>
            </div>
            <p className="text-sm text-text-secondary">Vintage Finds Co. has the highest quality score (98/100) and best overall performance.</p>
          </div>
          
          <div className="bg-surface p-4 rounded-lg border border-subtle">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-warning" />
              </div>
              <h4 className="font-medium">Cost Alert</h4>
            </div>
            <p className="text-sm text-text-secondary">Average item costs have increased by 12% over the past 6 months. Consider negotiating with suppliers.</p>
          </div>
          
          <div className="bg-surface p-4 rounded-lg border border-subtle">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                <Icon name="DollarSign" size={20} className="text-success" />
              </div>
              <h4 className="font-medium">Best ROI</h4>
            </div>
            <p className="text-sm text-text-secondary">Luxury category items provide the highest ROI at 210%, followed by Vintage at 185%.</p>
          </div>
        </div>
      </div>
      
      {/* Recommendations */}
      <div className="bg-background p-4 rounded-xl">
        <h3 className="text-lg font-medium mb-3">Recommendations</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="mt-0.5">
              <Icon name="CheckCircle" size={18} className="text-success" />
            </div>
            <div>
              <h4 className="font-medium text-text-primary">Increase orders from Vintage Finds Co.</h4>
              <p className="text-sm text-text-secondary">Their high quality and reliability justify the premium pricing.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="mt-0.5">
              <Icon name="CheckCircle" size={18} className="text-success" />
            </div>
            <div>
              <h4 className="font-medium text-text-primary">Diversify shipping methods</h4>
              <p className="text-sm text-text-secondary">Using GD-EMS for higher value items and 4PX Economy for basics could optimize costs.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="mt-0.5">
              <Icon name="CheckCircle" size={18} className="text-success" />
            </div>
            <div>
              <h4 className="font-medium text-text-primary">Focus on Luxury and Vintage categories</h4>
              <p className="text-sm text-text-secondary">These categories consistently deliver the highest margins and ROI.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;