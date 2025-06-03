import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SupplierROIAnalysis = () => {
  const [sortBy, setSortBy] = useState('roi');
  const [sortOrder, setSortOrder] = useState('desc');
  
  // Mock data for supplier ROI analysis
  const supplierData = [
    { 
      id: 1,
      name: 'ItaoBuy',
      investment: 1850,
      revenue: 3750,
      profit: 1900,
      roi: 102.7,
      items: 28,
      avgProfitPerItem: 67.86,
      trend: 'up',
      category: 'Sneakers'
    },
    { 
      id: 2,
      name: 'CNFans',
      investment: 1250,
      revenue: 2450,
      profit: 1200,
      roi: 96.0,
      items: 22,
      avgProfitPerItem: 54.55,
      trend: 'up',
      category: 'Clothing'
    },
    { 
      id: 3,
      name: 'Local Market',
      investment: 750,
      revenue: 1350,
      profit: 600,
      roi: 80.0,
      items: 15,
      avgProfitPerItem: 40.00,
      trend: 'stable',
      category: 'Accessories'
    },
    { 
      id: 4,
      name: 'Clearance Store',
      investment: 550,
      revenue: 920,
      profit: 370,
      roi: 67.3,
      items: 12,
      avgProfitPerItem: 30.83,
      trend: 'down',
      category: 'Mixed'
    },
    { 
      id: 5,
      name: 'Wholesale Connect',
      investment: 2200,
      revenue: 3850,
      profit: 1650,
      roi: 75.0,
      items: 35,
      avgProfitPerItem: 47.14,
      trend: 'up',
      category: 'Electronics'
    }
  ];
  
  // Sort suppliers
  const sortedSuppliers = [...supplierData].sort((a, b) => {
    const factor = sortOrder === 'asc' ? 1 : -1;
    
    switch (sortBy) {
      case 'name':
        return factor * a.name.localeCompare(b.name);
      case 'investment':
        return factor * (a.investment - b.investment);
      case 'revenue':
        return factor * (a.revenue - b.revenue);
      case 'profit':
        return factor * (a.profit - b.profit);
      case 'roi':
        return factor * (a.roi - b.roi);
      case 'items':
        return factor * (a.items - b.items);
      case 'avgProfitPerItem':
        return factor * (a.avgProfitPerItem - b.avgProfitPerItem);
      default:
        return 0;
    }
  });
  
  // Handle sort
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };
  
  // Get trend icon
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <Icon name="TrendingUp" size={16} className="text-success" />;
      case 'down':
        return <Icon name="TrendingDown" size={16} className="text-error" />;
      case 'stable':
        return <Icon name="Minus" size={16} className="text-warning" />;
      default:
        return null;
    }
  };
  
  // Calculate totals
  const totals = {
    investment: supplierData.reduce((sum, supplier) => sum + supplier.investment, 0),
    revenue: supplierData.reduce((sum, supplier) => sum + supplier.revenue, 0),
    profit: supplierData.reduce((sum, supplier) => sum + supplier.profit, 0),
    items: supplierData.reduce((sum, supplier) => sum + supplier.items, 0)
  };
  
  totals.roi = (totals.profit / totals.investment) * 100;
  totals.avgProfitPerItem = totals.profit / totals.items;
  
  // Sort header
  const SortHeader = ({ column, label }) => (
    <th 
      className="px-4 py-2 text-left text-xs font-medium text-text-secondary cursor-pointer hover:text-text-primary transition-smooth"
      onClick={() => handleSort(column)}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        {sortBy === column && (
          <Icon 
            name={sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
            size={14} 
            className="text-primary"
          />
        )}
      </div>
    </th>
  );
  
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface border-b border-subtle">
            <tr>
              <SortHeader column="name" label="Supplier" />
              <SortHeader column="investment" label="Investment" />
              <SortHeader column="revenue" label="Revenue" />
              <SortHeader column="profit" label="Profit" />
              <SortHeader column="roi" label="ROI %" />
              <SortHeader column="items" label="Items" />
              <SortHeader column="avgProfitPerItem" label="Avg Profit/Item" />
              <th className="px-4 py-2 text-left text-xs font-medium text-text-secondary">
                Trend
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedSuppliers.map((supplier) => (
              <tr 
                key={supplier.id} 
                className="border-b border-subtle hover:bg-surface/50 transition-smooth"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="font-medium">{supplier.name}</span>
                  </div>
                  <span className="text-xs text-text-secondary">{supplier.category}</span>
                </td>
                <td className="px-4 py-3 font-medium">£{supplier.investment}</td>
                <td className="px-4 py-3 font-medium">£{supplier.revenue}</td>
                <td className="px-4 py-3 font-medium text-success">£{supplier.profit}</td>
                <td className="px-4 py-3">
                  <span className={`font-medium ${
                    supplier.roi >= 100 ? 'text-success' : 
                    supplier.roi >= 50 ? 'text-warning': 'text-error'
                  }`}>
                    {supplier.roi.toFixed(1)}%
                  </span>
                </td>
                <td className="px-4 py-3 font-medium">{supplier.items}</td>
                <td className="px-4 py-3 font-medium">£{supplier.avgProfitPerItem.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    {getTrendIcon(supplier.trend)}
                  </div>
                </td>
              </tr>
            ))}
            
            {/* Totals row */}
            <tr className="bg-surface/70">
              <td className="px-4 py-3 font-medium">Totals</td>
              <td className="px-4 py-3 font-medium">£{totals.investment}</td>
              <td className="px-4 py-3 font-medium">£{totals.revenue}</td>
              <td className="px-4 py-3 font-medium text-success">£{totals.profit}</td>
              <td className="px-4 py-3 font-medium text-primary">{totals.roi.toFixed(1)}%</td>
              <td className="px-4 py-3 font-medium">{totals.items}</td>
              <td className="px-4 py-3 font-medium">£{totals.avgProfitPerItem.toFixed(2)}</td>
              <td className="px-4 py-3"></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 p-3 rounded-lg bg-primary/10">
        <div className="flex items-start space-x-3">
          <Icon name="LightbulbIcon" size={18} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm mb-1">
              <span className="font-medium text-primary">Supplier Insight:</span> ItaoBuy provides the highest ROI at 102.7%, while Wholesale Connect offers the highest volume of items.
            </p>
            <p className="text-xs text-text-secondary">
              Consider increasing orders from ItaoBuy for better profit margins.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierROIAnalysis;