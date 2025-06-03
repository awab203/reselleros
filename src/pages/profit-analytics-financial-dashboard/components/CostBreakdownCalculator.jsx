import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';


const CostBreakdownCalculator = () => {
  const [productCost, setProductCost] = useState(65);
  const [shippingCost, setShippingCost] = useState(12);
  const [platformFee, setPlatformFee] = useState(8.5);
  const [taxRate, setTaxRate] = useState(20);
  const [sellingPrice, setSellingPrice] = useState(120);
  const [breakdown, setBreakdown] = useState([]);
  
  // Calculate cost breakdown
  useEffect(() => {
    const calculateBreakdown = () => {
      // Calculate values
      const platformFeeAmount = (sellingPrice * platformFee) / 100;
      const taxAmount = (sellingPrice * taxRate) / 100;
      const totalCosts = productCost + shippingCost + platformFeeAmount + taxAmount;
      const profit = sellingPrice - totalCosts;
      const profitMargin = (profit / sellingPrice) * 100;
      
      // Create data for chart
      return [
        { name: 'Product Cost', value: productCost, color: 'var(--color-primary)' },
        { name: 'Shipping', value: shippingCost, color: 'var(--color-secondary)' },
        { name: 'Platform Fee', value: platformFeeAmount, color: 'var(--color-accent)' },
        { name: 'Tax', value: taxAmount, color: 'var(--color-warning)' },
        { name: 'Profit', value: profit, color: 'var(--color-success)' }
      ];
    };
    
    setBreakdown(calculateBreakdown());
  }, [productCost, shippingCost, platformFee, taxRate, sellingPrice]);
  
  // Calculate totals
  const totalCosts = breakdown.reduce((sum, item) => 
    item.name !== 'Profit' ? sum + item.value : sum, 0);
  const profit = breakdown.find(item => item.name === 'Profit')?.value || 0;
  const profitMargin = (profit / sellingPrice) * 100;
  
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
            <span className="text-text-secondary mr-2">Amount:</span>
            <span className="font-medium" style={{ color: data.color }}>
              £{data.value.toFixed(2)}
            </span>
          </p>
          <p className="text-xs text-text-secondary mt-1">
            {Math.round((data.value / sellingPrice) * 100)}% of selling price
          </p>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Selling Price (£)
            </label>
            <input
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full px-3 py-2 bg-background border border-subtle rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-smooth"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Product Cost (£)
            </label>
            <input
              type="number"
              value={productCost}
              onChange={(e) => setProductCost(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full px-3 py-2 bg-background border border-subtle rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-smooth"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Shipping Cost (£)
            </label>
            <input
              type="number"
              value={shippingCost}
              onChange={(e) => setShippingCost(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full px-3 py-2 bg-background border border-subtle rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-smooth"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Platform Fee (%)
            </label>
            <input
              type="number"
              value={platformFee}
              onChange={(e) => setPlatformFee(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full px-3 py-2 bg-background border border-subtle rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-smooth"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Tax Rate (%)
            </label>
            <input
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full px-3 py-2 bg-background border border-subtle rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-smooth"
            />
          </div>
        </div>
      </div>
      
      <div className="lg:col-span-1 flex items-center justify-center">
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={breakdown}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {breakdown.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    stroke="transparent"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="lg:col-span-1">
        <div className="bg-background rounded-lg border border-subtle p-4">
          <h3 className="text-lg font-semibold mb-4">Breakdown Summary</h3>
          
          <div className="space-y-3">
            {breakdown.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center">
                  <span 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span className="text-sm text-text-secondary">{item.name}</span>
                </div>
                <span className="font-medium">£{item.value.toFixed(2)}</span>
              </div>
            ))}
            
            <div className="pt-3 mt-1 border-t border-subtle">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Selling Price</span>
                <span className="font-bold">£{sellingPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm font-medium">Total Costs</span>
                <span className="font-bold text-accent">£{totalCosts.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm font-medium">Profit Margin</span>
                <span className={`font-bold ${profitMargin >= 30 ? 'text-success' : profitMargin >= 15 ? 'text-warning' : 'text-error'}`}>
                  {profitMargin.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-subtle">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">ROI</span>
              <span className="font-bold text-primary">
                {((profit / (productCost + shippingCost)) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostBreakdownCalculator;