import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Icon from 'components/AppIcon';

import GlobalNavigationHeader from 'components/ui/GlobalNavigationHeader';
import NotificationBadgeSystem from 'components/ui/NotificationBadgeSystem';
import QuickActionFloatingButton from 'components/ui/QuickActionFloatingButton';
import HaulList from './components/HaulList';
import SupplierDirectory from './components/SupplierDirectory';
import PerformanceAnalytics from './components/PerformanceAnalytics';
import AddHaulForm from './components/AddHaulForm';
import FilterPanel from './components/FilterPanel';

const SourcingHaulManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('hauls');
  const [isAddHaulOpen, setIsAddHaulOpen] = useState(false);
  const [filters, setFilters] = useState({
    platform: 'all',
    status: 'all',
    dateRange: 'all',
    supplierRating: 'all',
    search: ''
  });
  const navigate = useNavigate();

  // Check if we should open the add haul form based on URL params
  useEffect(() => {
    const action = searchParams.get('action');
    if (action === 'create') {
      setIsAddHaulOpen(true);
      // Clear the action param to avoid reopening on refresh
      searchParams.delete('action');
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleAddHaul = () => {
    setIsAddHaulOpen(true);
  };

  const handleCloseAddHaul = () => {
    setIsAddHaulOpen(false);
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleSearch = (searchTerm) => {
    setFilters({ ...filters, search: searchTerm });
  };

  const notifications = {
    sourcing: 3,
    inventory: 1,
    shipping: 2
  };

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <GlobalNavigationHeader />
      
      {/* Page Header */}
      <div className="px-4 py-6 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-2">
              Sourcing & Haul Management
            </h1>
            <p className="text-text-secondary text-sm md:text-base">
              Track suppliers, manage hauls, and optimize your procurement workflow
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="Search" size={18} className="text-text-secondary" />
              </div>
              <input
                type="text"
                placeholder="Search hauls or suppliers..."
                className="w-full md:w-64 pl-10 pr-4 py-2 bg-surface border border-subtle rounded-lg focus:outline-none focus:border-primary text-text-primary"
                value={filters.search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            
            <button
              onClick={handleAddHaul}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-smooth glow-primary"
            >
              <Icon name="Plus" size={18} />
              <span className="hidden md:inline">Add Haul</span>
            </button>
          </div>
        </div>
        
        {/* Notification Summary */}
        <div className="mb-6">
          <NotificationBadgeSystem 
            notifications={notifications} 
            onNotificationClick={(type) => console.log(`Clicked ${type} notifications`)}
          />
        </div>
        
        {/* Tab Navigation */}
        <div className="flex border-b border-subtle mb-6">
          <button
            className={`px-4 py-3 font-medium text-sm transition-smooth relative ${
              activeTab === 'hauls' ?'text-primary border-b-2 border-primary' :'text-text-secondary hover:text-text-primary'
            }`}
            onClick={() => handleTabChange('hauls')}
          >
            Active Hauls
            <span className="ml-2 px-2 py-0.5 bg-surface rounded-full text-xs">
              12
            </span>
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm transition-smooth relative ${
              activeTab === 'suppliers' ?'text-primary border-b-2 border-primary' :'text-text-secondary hover:text-text-primary'
            }`}
            onClick={() => handleTabChange('suppliers')}
          >
            Supplier Directory
            <span className="ml-2 px-2 py-0.5 bg-surface rounded-full text-xs">
              8
            </span>
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm transition-smooth relative ${
              activeTab === 'analytics' ?'text-primary border-b-2 border-primary' :'text-text-secondary hover:text-text-primary'
            }`}
            onClick={() => handleTabChange('analytics')}
          >
            Performance Analytics
          </button>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="px-4 md:px-8 lg:px-12 pb-24">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters (Desktop Only) */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'hauls' && (
              <HaulList filters={filters} />
            )}
            
            {activeTab === 'suppliers' && (
              <SupplierDirectory filters={filters} />
            )}
            
            {activeTab === 'analytics' && (
              <PerformanceAnalytics />
            )}
          </div>
        </div>
      </div>
      
      {/* Add Haul Modal */}
      {isAddHaulOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-background/80 backdrop-blur-cinematic"></div>
            </div>
            
            <div className="inline-block align-bottom bg-surface rounded-xl border border-subtle text-left overflow-hidden shadow-cinematic transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl w-full">
              <AddHaulForm onClose={handleCloseAddHaul} />
            </div>
          </div>
        </div>
      )}
      
      {/* Quick Action Button */}
      <QuickActionFloatingButton />
    </div>
  );
};

export default SourcingHaulManagement;