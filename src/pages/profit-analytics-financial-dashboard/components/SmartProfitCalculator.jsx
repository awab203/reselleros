import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const SmartProfitCalculator = () => {
  const [platform, setPlatform] = useState('ebay');
  const [purchasePrice, setPurchasePrice] = useState(45);
  const [sellingPrice, setSellingPrice] = useState(85);
  const [shippingCost, setShippingCost] = useState(5.99);
  const [shippingCharge, setShippingCharge] = useState(8.99);
  const [quantity, setQuantity] = useState(1);
  const [results, setResults] = useState({
    platformFee: 0,
    paymentFee: 0,
    tax: 0,
    profit: 0,
    profitMargin: 0,
    roi: 0
  });
  
  // Platform fee structures (mock data)
  const platformFees = {
    ebay: {
      baseFee: 12.8,
      paymentFee: 0.30,
      paymentPercentage: 2.5,
      name: 'eBay',
      color: 'primary'
    },
    vinted: {
      baseFee: 5,
      paymentFee: 0.70,
      paymentPercentage: 3,
      name: 'Vinted',
      color: 'secondary'
    },
    depop: {
      baseFee: 10,
      paymentFee: 0.20,
      paymentPercentage: 2.9,
      name: 'Depop',
      color: 'accent'
    }
  };
  
  // Calculate profit
  useEffect(() => {
    const calculateProfit = () => {
      const platformConfig = platformFees[platform];
      const totalSellingPrice = sellingPrice + shippingCharge;
      
      // Calculate fees
      const platformFeeAmount = (totalSellingPrice * platformConfig.baseFee) / 100;
      const paymentFeeAmount = platformConfig.paymentFee + (totalSellingPrice * platformConfig.paymentPercentage) / 100;
      
      // Calculate tax (VAT) - assuming standard UK rate of 20%
      const taxRate = 20;
      const taxAmount = (totalSellingPrice * taxRate) / 100;
      
      // Calculate total costs
      const totalCosts = (purchasePrice * quantity) + shippingCost + platformFeeAmount + paymentFeeAmount;
      
      // Calculate profit
      const profit = (totalSellingPrice * quantity) - totalCosts;
      const profitMargin = (profit / (totalSellingPrice * quantity)) * 100;
      const roi = (profit / (purchasePrice * quantity)) * 100;
      
      return {
        platformFee: platformFeeAmount,
        paymentFee: paymentFeeAmount,
        tax: taxAmount,
        profit: profit,
        profitMargin: profitMargin,
        roi: roi
      };
    };
    
    setResults(calculateProfit());
  }, [platform, purchasePrice, sellingPrice, shippingCost, shippingCharge, quantity]);
  
  // Get recommendation based on profit margin
  const getRecommendation = () => {
    if (results.profitMargin < 10) {
      return {
        message: 'Consider increasing your selling price or finding a cheaper supplier.',
        icon: 'AlertTriangle',
        color: 'text-error'
      };
    } else if (results.profitMargin < 20) {
      return {
        message: 'Your profit margin is acceptable but could be improved.',
        icon: 'Info',
        color: 'text-warning'
      };
    } else if (results.profitMargin < 30) {
      return {
        message: 'Good profit margin! Consider selling in higher quantities.',
        icon: 'ThumbsUp',
        color: 'text-success'
      };
    } else {
      return {
        message: 'Excellent profit margin! This is a high-performing product.',
        icon: 'Award',
        color: 'text-success'
      };
    }
  };
  
  const recommendation = getRecommendation();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Selling Platform
          </label>
          <div className="grid grid-cols-3 gap-2">
            {Object.keys(platformFees).map((key) => (
              <button
                key={key}
                onClick={() => setPlatform(key)}
                className={`
                  flex items-center justify-center px-4 py-2 rounded-lg border transition-smooth
                  ${platform === key 
                    ? `bg-${platformFees[key].color}/10 border-${platformFees[key].color}/30 text-${platformFees[key].color}` 
                    : 'bg-background border-subtle text-text-secondary hover:text-text-primary'
                  }
                `}
              >
                {platformFees[key].name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Purchase Price (£)
            </label>
            <input
              type="number"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full px-3 py-2 bg-background border border-subtle rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-smooth"
            />
          </div>
          
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
        </div>
        
        <div className="grid grid-cols-2 gap-4">
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
              Shipping Charge (£)
            </label>
            <input
              type="number"
              value={shippingCharge}
              onChange={(e) => setShippingCharge(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full px-3 py-2 bg-background border border-subtle rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-smooth"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            Quantity
          </label>
          <div className="flex items-center">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-2 bg-background border border-subtle rounded-l-lg text-text-secondary hover:text-text-primary transition-smooth"
            >
              <Icon name="Minus" size={16} />
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-3 py-2 bg-background border-y border-subtle text-center focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-smooth"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-2 bg-background border border-subtle rounded-r-lg text-text-secondary hover:text-text-primary transition-smooth"
            >
              <Icon name="Plus" size={16} />
            </button>
          </div>
        </div>
      </div>
      
      <div>
        <div className="bg-background rounded-lg border border-subtle p-4 h-full">
          <h3 className="text-lg font-semibold mb-4">Profit Calculation</h3>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Platform Fee ({platformFees[platform].baseFee}%)</span>
              <span className="font-medium">-£{results.platformFee.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Payment Processing</span>
              <span className="font-medium">-£{results.paymentFee.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Shipping Cost</span>
              <span className="font-medium">-£{shippingCost.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Purchase Price (x{quantity})</span>
              <span className="font-medium">-£{(purchasePrice * quantity).toFixed(2)}</span>
            </div>
          </div>
          
          <div className="pt-3 border-t border-subtle mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Revenue</span>
              <span className="font-bold">£{((sellingPrice + shippingCharge) * quantity).toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-medium">Net Profit</span>
              <span className={`font-bold ${results.profit >= 0 ? 'text-success' : 'text-error'}`}>
                £{results.profit.toFixed(2)}
              </span>
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-medium">Profit Margin</span>
              <span className={`font-bold ${
                results.profitMargin >= 30 ? 'text-success' : 
                results.profitMargin >= 15 ? 'text-warning': 'text-error'
              }`}>
                {results.profitMargin.toFixed(1)}%
              </span>
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-medium">ROI</span>
              <span className={`font-bold ${
                results.roi >= 100 ? 'text-success' : 
                results.roi >= 50 ? 'text-warning': 'text-error'
              }`}>
                {results.roi.toFixed(1)}%
              </span>
            </div>
          </div>
          
          <div className={`p-3 rounded-lg bg-${recommendation.color.split('-')[1]}/10 flex items-start space-x-3`}>
            <Icon name={recommendation.icon} className={recommendation.color} size={18} />
            <p className="text-sm">{recommendation.message}</p>
          </div>
          
          <div className="mt-4">
            <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-smooth">
              Save Calculation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartProfitCalculator;