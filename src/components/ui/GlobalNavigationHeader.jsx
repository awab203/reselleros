import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const GlobalNavigationHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState({
    dashboard: 0,
    analytics: 2,
    sourcing: 1,
    inventory: 3,
    shipping: 0
  });

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/modular-dashboard-control-center',
      icon: 'LayoutDashboard',
      description: 'Central command hub'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      path: '/profit-analytics-financial-dashboard',
      icon: 'TrendingUp',
      description: 'Profit analysis and insights'
    },
    {
      id: 'sourcing',
      label: 'Sourcing',
      path: '/sourcing-haul-management',
      icon: 'Package',
      description: 'Supplier and haul management'
    },
    {
      id: 'inventory',
      label: 'Inventory',
      path: '/inventory-listing-management',
      icon: 'Archive',
      description: 'Product catalog management'
    },
    {
      id: 'shipping',
      label: 'Shipping',
      path: '/shipment-tracking-logistics',
      icon: 'Truck',
      description: 'Parcel tracking and logistics'
    }
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const Logo = () => (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center glow-primary">
          <Icon name="Zap" size={24} className="text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse"></div>
      </div>
      <div className="hidden sm:block">
        <h1 className="text-xl font-heading font-bold text-text-primary tracking-tight">
          ResellPro
        </h1>
        <p className="text-xs text-text-secondary font-caption">
          Command Center
        </p>
      </div>
    </div>
  );

  const NotificationBadge = ({ count }) => {
    if (count === 0) return null;
    
    return (
      <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
        {count > 99 ? '99+' : count}
      </div>
    );
  };

  const NavigationItem = ({ item, isMobile = false }) => {
    const isActive = isActiveRoute(item.path);
    
    return (
      <button
        onClick={() => handleNavigation(item.path)}
        className={`
          relative group flex items-center space-x-3 px-4 py-3 rounded-lg transition-smooth
          ${isActive 
            ? 'bg-primary/10 text-primary border-active glow-primary' :'text-text-secondary hover:text-text-primary hover:bg-surface/50'
          }
          ${isMobile ? 'w-full justify-start' : 'justify-center md:justify-start'}
        `}
        title={item.description}
      >
        <div className="relative">
          <Icon 
            name={item.icon} 
            size={20} 
            className={`transition-smooth ${isActive ? 'text-primary' : 'group-hover:text-primary'}`}
          />
          <NotificationBadge count={notifications[item.id]} />
        </div>
        <span className={`font-medium ${isMobile ? 'block' : 'hidden md:block'}`}>
          {item.label}
        </span>
        {isActive && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"></div>
        )}
      </button>
    );
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block fixed top-0 left-0 right-0 z-100 bg-background/95 backdrop-blur-cinematic border-b border-subtle">
        <div className="flex items-center justify-between px-6 py-4">
          <Logo />
          
          <nav className="flex items-center space-x-2">
            {navigationItems.map((item) => (
              <NavigationItem key={item.id} item={item} />
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-text-secondary hover:text-text-primary transition-smooth">
              <Icon name="Bell" size={20} />
              <NotificationBadge count={6} />
            </button>
            <button className="relative p-2 text-text-secondary hover:text-text-primary transition-smooth">
              <Icon name="Settings" size={20} />
            </button>
            <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
              <Icon name="User" size={16} className="text-white" />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-100 bg-background/95 backdrop-blur-cinematic border-b border-subtle">
        <div className="flex items-center justify-between px-4 py-3">
          <Logo />
          
          <div className="flex items-center space-x-3">
            <button className="relative p-2 text-text-secondary hover:text-text-primary transition-smooth">
              <Icon name="Bell" size={20} />
              <NotificationBadge count={6} />
            </button>
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-text-secondary hover:text-text-primary transition-smooth"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background/98 backdrop-blur-cinematic border-b border-subtle">
            <nav className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <NavigationItem key={item.id} item={item} isMobile={true} />
              ))}
              <div className="pt-4 mt-4 border-t border-subtle flex items-center justify-between">
                <button className="flex items-center space-x-3 px-4 py-3 text-text-secondary hover:text-text-primary transition-smooth">
                  <Icon name="Settings" size={20} />
                  <span>Settings</span>
                </button>
                <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} className="text-white" />
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-100 bg-background/95 backdrop-blur-cinematic border-t border-subtle">
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems.map((item) => {
            const isActive = isActiveRoute(item.path);
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`
                  relative flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-smooth
                  ${isActive 
                    ? 'text-primary' :'text-text-secondary hover:text-text-primary'
                  }
                `}
              >
                <div className="relative">
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    className={`transition-smooth ${isActive ? 'text-primary' : ''}`}
                  />
                  <NotificationBadge count={notifications[item.id]} />
                </div>
                <span className="text-xs font-medium">{item.label}</span>
                {isActive && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-1 h-1 bg-primary rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Spacer for fixed positioning */}
      <div className="h-20 md:h-24"></div>
      <div className="md:hidden h-16"></div>
    </>
  );
};

export default GlobalNavigationHeader;