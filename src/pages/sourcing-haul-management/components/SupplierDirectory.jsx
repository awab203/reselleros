import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const SupplierDirectory = ({ filters }) => {
  const [expandedSupplier, setExpandedSupplier] = useState(null);

  const toggleSupplierExpansion = (supplierId) => {
    if (expandedSupplier === supplierId) {
      setExpandedSupplier(null);
    } else {
      setExpandedSupplier(supplierId);
    }
  };

  // Mock data for suppliers
  const suppliers = [
    {
      id: 1,
      name: "ItaoBuy Premium Seller",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      platform: "ItaoBuy",
      rating: 4.8,
      totalOrders: 24,
      averageShippingTime: "4 days",
      returnRate: "2.1%",
      specialties: ["Vintage", "Streetwear", "Denim"],
      lastOrderDate: "2023-10-15",
      notes: "Excellent quality control. Responds quickly to messages. Provides detailed measurements upon request.",
      performance: {
        qualityScore: 92,
        communicationScore: 95,
        shippingScore: 88,
        valueScore: 90
      },
      recentItems: [
        {
          name: "Vintage Denim Jacket",
          price: 28.50,
          image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Retro Sneakers",
          price: 42.75,
          image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      id: 2,
      name: "CNFans Streetwear",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      platform: "CNFans",
      rating: 4.6,
      totalOrders: 18,
      averageShippingTime: "5 days",
      returnRate: "3.5%",
      specialties: ["Streetwear", "Replica", "Accessories"],
      lastOrderDate: "2023-10-22",
      notes: "Good quality replicas. Occasionally slow to ship. Packaging is always secure and discreet.",
      performance: {
        qualityScore: 85,
        communicationScore: 78,
        shippingScore: 75,
        valueScore: 92
      },
      recentItems: [
        {
          name: "Cargo Pants",
          price: 32.99,
          image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Oversized Hoodie",
          price: 45.50,
          image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      id: 3,
      name: "Vintage Finds Co.",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      platform: "Manual",
      rating: 4.9,
      totalOrders: 12,
      averageShippingTime: "3 days",
      returnRate: "0.8%",
      specialties: ["Vintage", "Rare", "Collectible"],
      lastOrderDate: "2023-10-05",
      notes: "Exceptional curation of rare vintage pieces. Premium prices but excellent ROI. Very reliable shipping.",
      performance: {
        qualityScore: 98,
        communicationScore: 96,
        shippingScore: 94,
        valueScore: 85
      },
      recentItems: [
        {
          name: "90s Windbreaker",
          price: 55.00,
          image: "https://images.unsplash.com/photo-1601063476271-a159c71ab0b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Retro Band Tee",
          price: 38.25,
          image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      id: 4,
      name: "Hypebeast Supply",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      platform: "ItaoBuy",
      rating: 4.7,
      totalOrders: 31,
      averageShippingTime: "4 days",
      returnRate: "2.8%",
      specialties: ["Streetwear", "Hype", "Limited Edition"],
      lastOrderDate: "2023-10-18",
      notes: "Good source for hype items. Quality can be inconsistent but generally good. Fast shipping.",
      performance: {
        qualityScore: 84,
        communicationScore: 90,
        shippingScore: 92,
        valueScore: 88
      },
      recentItems: [
        {
          name: "Designer Replica Tee",
          price: 35.99,
          image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Streetwear Shorts",
          price: 29.50,
          image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      id: 5,
      name: "Luxury Replicas",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg",
      platform: "CNFans",
      rating: 4.5,
      totalOrders: 15,
      averageShippingTime: "6 days",
      returnRate: "4.2%",
      specialties: ["Luxury", "Replica", "Accessories"],
      lastOrderDate: "2023-09-28",
      notes: "High-quality luxury replicas. Slightly higher prices but excellent craftsmanship. Discreet packaging.",
      performance: {
        qualityScore: 90,
        communicationScore: 82,
        shippingScore: 78,
        valueScore: 85
      },
      recentItems: [
        {
          name: "Designer Wallet",
          price: 65.00,
          image: "https://images.unsplash.com/photo-1606503825008-909a67e63c3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Luxury Watch",
          price: 120.50,
          image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      id: 6,
      name: "Sneaker Connect",
      avatar: "https://randomuser.me/api/portraits/women/56.jpg",
      platform: "ItaoBuy",
      rating: 4.8,
      totalOrders: 27,
      averageShippingTime: "5 days",
      returnRate: "1.9%",
      specialties: ["Sneakers", "Footwear", "Sportswear"],
      lastOrderDate: "2023-10-10",
      notes: "Excellent sneaker replicas. Very close to retail quality. Good communication and QC photos.",
      performance: {
        qualityScore: 93,
        communicationScore: 88,
        shippingScore: 85,
        valueScore: 91
      },
      recentItems: [
        {
          name: "Running Shoes",
          price: 48.75,
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Basketball Sneakers",
          price: 55.25,
          image: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      id: 7,
      name: "Vintage Treasures",
      avatar: "https://randomuser.me/api/portraits/men/92.jpg",
      platform: "Manual",
      rating: 4.9,
      totalOrders: 9,
      averageShippingTime: "3 days",
      returnRate: "0.5%",
      specialties: ["Vintage", "Rare", "Collectible"],
      lastOrderDate: "2023-09-15",
      notes: "Exceptional vintage finds. Premium prices but items sell quickly with high margins. Very reliable.",
      performance: {
        qualityScore: 97,
        communicationScore: 95,
        shippingScore: 96,
        valueScore: 88
      },
      recentItems: [
        {
          name: "80s Denim Jacket",
          price: 68.00,
          image: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Vintage Leather Bag",
          price: 75.50,
          image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      id: 8,
      name: "Streetwear Essentials",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      platform: "CNFans",
      rating: 4.6,
      totalOrders: 22,
      averageShippingTime: "4 days",
      returnRate: "2.5%",
      specialties: ["Streetwear", "Basics", "Accessories"],
      lastOrderDate: "2023-10-08",
      notes: "Good quality basics and streetwear essentials. Consistent sizing and reasonable prices.",
      performance: {
        qualityScore: 86,
        communicationScore: 84,
        shippingScore: 88,
        valueScore: 92
      },
      recentItems: [
        {
          name: "Basic Tee Pack",
          price: 45.00,
          image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Cargo Joggers",
          price: 38.50,
          image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
      ]
    }
  ];

  // Filter suppliers based on current filters
  const filteredSuppliers = suppliers.filter(supplier => {
    // Platform filter
    if (filters.platform !== 'all' && supplier.platform !== filters.platform) {
      return false;
    }
    
    // Supplier rating filter
    if (filters.supplierRating !== 'all') {
      const minRating = parseFloat(filters.supplierRating);
      if (supplier.rating < minRating) {
        return false;
      }
    }
    
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const nameMatch = supplier.name.toLowerCase().includes(searchLower);
      const specialtiesMatch = supplier.specialties.some(specialty => 
        specialty.toLowerCase().includes(searchLower)
      );
      
      if (!nameMatch && !specialtiesMatch) {
        return false;
      }
    }
    
    return true;
  });

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'ItaoBuy':
        return 'ShoppingBag';
      case 'CNFans':
        return 'Globe';
      case 'Manual':
        return 'User';
      default:
        return 'Store';
    }
  };

  const getPerformanceColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-primary';
    if (score >= 70) return 'text-warning';
    return 'text-accent';
  };

  return (
    <div>
      {filteredSuppliers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mb-4">
            <Icon name="Users" size={32} className="text-text-secondary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No suppliers found</h3>
          <p className="text-text-secondary max-w-md mb-6">
            No suppliers match your current filters. Try adjusting your search criteria or add a new supplier.
          </p>
          <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-600 transition-smooth">
            Add New Supplier
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSuppliers.map(supplier => (
            <div 
              key={supplier.id}
              className="bg-surface border border-subtle rounded-xl overflow-hidden transition-smooth hover:border-active"
            >
              {/* Supplier Header */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Image 
                        src={supplier.avatar} 
                        alt={supplier.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-background rounded-full flex items-center justify-center">
                        <Icon 
                          name={getPlatformIcon(supplier.platform)} 
                          size={14} 
                          className="text-text-secondary"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary">{supplier.name}</h3>
                      <div className="flex items-center text-xs text-text-secondary">
                        <span>{supplier.platform}</span>
                        <span className="mx-1">•</span>
                        <div className="flex items-center">
                          <Icon name="Star" size={12} className="text-warning mr-1" />
                          <span>{supplier.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-smooth">
                      <Icon name="MessageSquare" size={16} />
                    </button>
                    <button className="p-2 bg-secondary/10 text-secondary rounded-lg hover:bg-secondary/20 transition-smooth">
                      <Icon name="ShoppingCart" size={16} />
                    </button>
                  </div>
                </div>
                
                {/* Supplier Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-background p-2 rounded-lg text-center">
                    <div className="text-xs text-text-secondary mb-1">Orders</div>
                    <div className="font-semibold">{supplier.totalOrders}</div>
                  </div>
                  <div className="bg-background p-2 rounded-lg text-center">
                    <div className="text-xs text-text-secondary mb-1">Avg. Ship</div>
                    <div className="font-semibold">{supplier.averageShippingTime}</div>
                  </div>
                  <div className="bg-background p-2 rounded-lg text-center">
                    <div className="text-xs text-text-secondary mb-1">Return Rate</div>
                    <div className="font-semibold">{supplier.returnRate}</div>
                  </div>
                </div>
                
                {/* Specialties */}
                <div className="mb-4">
                  <div className="text-xs text-text-secondary mb-2">Specialties</div>
                  <div className="flex flex-wrap gap-2">
                    {supplier.specialties.map((specialty, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-background text-text-primary text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Recent Items */}
                <div>
                  <div className="text-xs text-text-secondary mb-2">Recent Items</div>
                  <div className="flex space-x-3 overflow-x-auto pb-2">
                    {supplier.recentItems.map((item, index) => (
                      <div key={index} className="flex-shrink-0 w-20">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-background mb-1">
                          <Image 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-xs truncate">{item.name}</div>
                        <div className="text-xs font-medium">${item.price.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Expand/Collapse Button */}
              <button
                onClick={() => toggleSupplierExpansion(supplier.id)}
                className="w-full py-2 border-t border-subtle text-text-secondary hover:text-text-primary text-sm font-medium transition-smooth flex items-center justify-center"
              >
                <span>{expandedSupplier === supplier.id ? 'Hide Details' : 'Show Details'}</span>
                <Icon 
                  name={expandedSupplier === supplier.id ? 'ChevronUp' : 'ChevronDown'} 
                  size={16} 
                  className="ml-1" 
                />
              </button>
              
              {/* Expanded Details */}
              {expandedSupplier === supplier.id && (
                <div className="border-t border-subtle p-4 bg-background/50">
                  {/* Performance Metrics */}
                  <h4 className="font-medium mb-3">Performance Metrics</h4>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-surface p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-text-secondary">Quality</span>
                        <span className={`text-sm font-medium ${getPerformanceColor(supplier.performance.qualityScore)}`}>
                          {supplier.performance.qualityScore}/100
                        </span>
                      </div>
                      <div className="w-full bg-background rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full ${supplier.performance.qualityScore >= 90 ? 'bg-success' : supplier.performance.qualityScore >= 80 ? 'bg-primary' : supplier.performance.qualityScore >= 70 ? 'bg-warning' : 'bg-accent'}`}
                          style={{ width: `${supplier.performance.qualityScore}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="bg-surface p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-text-secondary">Communication</span>
                        <span className={`text-sm font-medium ${getPerformanceColor(supplier.performance.communicationScore)}`}>
                          {supplier.performance.communicationScore}/100
                        </span>
                      </div>
                      <div className="w-full bg-background rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full ${supplier.performance.communicationScore >= 90 ? 'bg-success' : supplier.performance.communicationScore >= 80 ? 'bg-primary' : supplier.performance.communicationScore >= 70 ? 'bg-warning' : 'bg-accent'}`}
                          style={{ width: `${supplier.performance.communicationScore}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="bg-surface p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-text-secondary">Shipping</span>
                        <span className={`text-sm font-medium ${getPerformanceColor(supplier.performance.shippingScore)}`}>
                          {supplier.performance.shippingScore}/100
                        </span>
                      </div>
                      <div className="w-full bg-background rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full ${supplier.performance.shippingScore >= 90 ? 'bg-success' : supplier.performance.shippingScore >= 80 ? 'bg-primary' : supplier.performance.shippingScore >= 70 ? 'bg-warning' : 'bg-accent'}`}
                          style={{ width: `${supplier.performance.shippingScore}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="bg-surface p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-text-secondary">Value</span>
                        <span className={`text-sm font-medium ${getPerformanceColor(supplier.performance.valueScore)}`}>
                          {supplier.performance.valueScore}/100
                        </span>
                      </div>
                      <div className="w-full bg-background rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full ${supplier.performance.valueScore >= 90 ? 'bg-success' : supplier.performance.valueScore >= 80 ? 'bg-primary' : supplier.performance.valueScore >= 70 ? 'bg-warning' : 'bg-accent'}`}
                          style={{ width: `${supplier.performance.valueScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Notes */}
                  <h4 className="font-medium mb-2">Notes</h4>
                  <div className="bg-surface p-3 rounded-lg mb-6">
                    <p className="text-sm">{supplier.notes}</p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-600 transition-smooth flex items-center justify-center">
                      <Icon name="ShoppingCart" size={16} className="mr-2" />
                      New Order
                    </button>
                    <button className="flex-1 px-4 py-2 bg-surface border border-subtle text-text-primary rounded-lg font-medium hover:bg-surface/70 transition-smooth flex items-center justify-center">
                      <Icon name="BarChart2" size={16} className="mr-2" />
                      View History
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SupplierDirectory;