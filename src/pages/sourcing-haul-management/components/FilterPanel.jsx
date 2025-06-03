import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FilterPanel = ({ filters, onFilterChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (name, value) => {
    onFilterChange({ [name]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      platform: 'all',
      status: 'all',
      dateRange: 'all',
      supplierRating: 'all'
    });
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-surface border border-subtle rounded-xl overflow-hidden">
      {/* Mobile Filter Button */}
      <div className="lg:hidden p-4 flex items-center justify-between">
        <h3 className="font-medium">Filters</h3>
        <button
          onClick={toggleExpand}
          className="p-2 text-text-secondary hover:text-text-primary transition-smooth"
        >
          <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={18} />
        </button>
      </div>
      
      {/* Filter Content - Always visible on desktop, toggleable on mobile */}
      <div className={`p-4 border-t border-subtle ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        <div className="space-y-6">
          {/* Platform Filter */}
          <div>
            <h4 className="text-sm font-medium mb-3">Platform</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="platform"
                  checked={filters.platform === 'all'}
                  onChange={() => handleFilterChange('platform', 'all')}
                  className="w-4 h-4 text-primary bg-surface border-subtle focus:ring-primary"
                />
                <span className="text-sm">All Platforms</span>
              </label>
              
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="platform"
                  checked={filters.platform === 'ItaoBuy'}
                  onChange={() => handleFilterChange('platform', 'ItaoBuy')}
                  className="w-4 h-4 text-primary bg-surface border-subtle focus:ring-primary"
                />
                <span className="text-sm">ItaoBuy</span>
              </label>
              
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="platform"
                  checked={filters.platform === 'CNFans'}
                  onChange={() => handleFilterChange('platform', 'CNFans')}
                  className="w-4 h-4 text-primary bg-surface border-subtle focus:ring-primary"
                />
                <span className="text-sm">CNFans</span>
              </label>
              
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="platform"
                  checked={filters.platform === 'Manual'}
                  onChange={() => handleFilterChange('platform', 'Manual')}
                  className="w-4 h-4 text-primary bg-surface border-subtle focus:ring-primary"
                />
                <span className="text-sm">Manual</span>
              </label>
            </div>
          </div>
          
          {/* Status Filter */}
          <div>
            <h4 className="text-sm font-medium mb-3">Status</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  checked={filters.status === 'all'}
                  onChange={() => handleFilterChange('status', 'all')}
                  className="w-4 h-4 text-primary bg-surface border-subtle focus:ring-primary"
                />
                <span className="text-sm">All Statuses</span>
              </label>
              
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  checked={filters.status === 'Ordered'}
                  onChange={() => handleFilterChange('status', 'Ordered')}
                  className="w-4 h-4 text-primary bg-surface border-subtle focus:ring-primary"
                />
                <span className="text-sm">Ordered</span>
              </label>
              
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  checked={filters.status === 'Shipped'}
                  onChange={() => handleFilterChange('status', 'Shipped')}
                  className="w-4 h-4 text-primary bg-surface border-subtle focus:ring-primary"
                />
                <span className="text-sm">Shipped</span>
              </label>
              
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  checked={filters.status === 'Received'}
                  onChange={() => handleFilterChange('status', 'Received')}
                  className="w-4 h-4 text-primary bg-surface border-subtle focus:ring-primary"
                />
                <span className="text-sm">Received</span>
              </label>
              
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  checked={filters.status === 'QC Complete'}
                  onChange={() => handleFilterChange('status', 'QC Complete')}
                  className="w-4 h-4 text-primary bg-surface border-subtle focus:ring-primary"
                />
                <span className="text-sm">QC Complete</span>
              </label>
            </div>
          </div>
          
          {/* Date Range Filter */}
          <div>
            <h4 className="text-sm font-medium mb-3">Date Range</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="dateRange"
                  checked={filters.dateRange === 'all'}
                  onChange={() => handleFilterChange('dateRange', 'all')}
                  className="w-4 h-4 text-primary bg-surface border-subtle focus:ring-primary"
                />
                <span className="text-sm">All Time</span>
              </label>
              
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="dateRange"
                  checked={filters.dateRange === 'last7days'}
                  onChange={() => handleFilterChange('dateRange', 'last7days')}
                  className="w-4 h-4 text-primary bg-surface border-subtle focus:ring-primary"
                />
                <span className="text-sm">Last 7 Days</span>
              </label>
              
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="dateRange"
                  checked={filters.dateRange === 'last30days'}
                  onChange={() => handleFilterChange('dateRange', 'last30days')}
                  className="w-4 h-4 text-primary bg-surface border-subtle focus:ring-primary"
                />
                <span className="text-sm">Last 30 Days</span>
              </label>
              
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="dateRange"
                  checked={filters.dateRange === 'last90days'}
                  onChange={() => handleFilterChange('dateRange', 'last90days')}
                  className="w-4 h-4 text-primary bg-surface border-subtle focus:ring-primary"
                />
                <span className="text-sm">Last 90 Days</span>
              </label>
            </div>
          </div>
          
          {/* Supplier Rating Filter */}
          <div>
            <h4 className="text-sm font-medium mb-3">Supplier Rating</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="supplierRating"
                  checked={filters.supplierRating === 'all'}
                  onChange={() => handleFilterChange('supplierRating', 'all')}
                  className="w-4 h-4 text-primary bg-surface border-subtle focus:ring-primary"
                />
                <span className="text-sm">All Ratings</span>
              </label>
              
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="supplierRating"
                  checked={filters.supplierRating === '4.5'}
                  onChange={() => handleFilterChange('supplierRating', '4.5')}
                  className="w-4 h-4 text-primary bg-surface border-subtle focus:ring-primary"
                />
                <div className="flex items-center text-sm">
                  <span className="mr-1">4.5+</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Icon 
                        key={star} 
                        name="Star" 
                        size={12} 
                        className={star <= 4.5 ? "text-warning" : "text-text-secondary opacity-30"} 
                      />
                    ))}
                  </div>
                </div>
              </label>
              
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="supplierRating"
                  checked={filters.supplierRating === '4.0'}
                  onChange={() => handleFilterChange('supplierRating', '4.0')}
                  className="w-4 h-4 text-primary bg-surface border-subtle focus:ring-primary"
                />
                <div className="flex items-center text-sm">
                  <span className="mr-1">4.0+</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Icon 
                        key={star} 
                        name="Star" 
                        size={12} 
                        className={star <= 4 ? "text-warning" : "text-text-secondary opacity-30"} 
                      />
                    ))}
                  </div>
                </div>
              </label>
              
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="supplierRating"
                  checked={filters.supplierRating === '3.5'}
                  onChange={() => handleFilterChange('supplierRating', '3.5')}
                  className="w-4 h-4 text-primary bg-surface border-subtle focus:ring-primary"
                />
                <div className="flex items-center text-sm">
                  <span className="mr-1">3.5+</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Icon 
                        key={star} 
                        name="Star" 
                        size={12} 
                        className={star <= 3.5 ? "text-warning" : "text-text-secondary opacity-30"} 
                      />
                    ))}
                  </div>
                </div>
              </label>
            </div>
          </div>
          
          {/* Clear Filters Button */}
          <button
            type="button"
            onClick={clearFilters}
            className="w-full py-2 border border-subtle text-text-secondary rounded-lg hover:bg-surface/70 transition-smooth flex items-center justify-center"
          >
            <Icon name="RefreshCw" size={14} className="mr-2" />
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;