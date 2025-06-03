import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const HaulList = ({ filters }) => {
  const [expandedHauls, setExpandedHauls] = useState(new Set());

  const toggleHaulExpansion = (haulId) => {
    const newExpanded = new Set(expandedHauls);
    if (newExpanded.has(haulId)) {
      newExpanded.delete(haulId);
    } else {
      newExpanded.add(haulId);
    }
    setExpandedHauls(newExpanded);
  };

  // Mock data for hauls
  const hauls = [
    {
      id: 1,
      supplier: {
        name: "ItaoBuy Premium Seller",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        platform: "ItaoBuy",
        rating: 4.8
      },
      orderDate: "2023-10-15",
      items: [
        { 
          id: 101, 
          name: "Vintage Denim Jacket", 
          cost: 28.50, 
          status: "QC Complete",
          qcPhotos: [
            "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1588099768523-f4e6a5679d88?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          ]
        },
        { 
          id: 102, 
          name: "Retro Sneakers", 
          cost: 42.75, 
          status: "QC Complete",
          qcPhotos: [
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          ]
        },
        { 
          id: 103, 
          name: "Graphic Tee", 
          cost: 15.99, 
          status: "QC Complete",
          qcPhotos: [
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          ]
        }
      ],
      shipping: {
        method: "4PX Standard",
        cost: 22.50,
        trackingNumber: "LX458721CN",
        estimatedDelivery: "2023-11-05"
      },
      status: "Shipped",
      totalCost: 109.74,
      declaration: {
        value: 35.00,
        description: "Used Clothing"
      }
    },
    {
      id: 2,
      supplier: {
        name: "CNFans Streetwear",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        platform: "CNFans",
        rating: 4.6
      },
      orderDate: "2023-10-22",
      items: [
        { 
          id: 201, 
          name: "Cargo Pants", 
          cost: 32.99, 
          status: "QC Complete",
          qcPhotos: [
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          ]
        },
        { 
          id: 202, 
          name: "Oversized Hoodie", 
          cost: 45.50, 
          status: "QC Complete",
          qcPhotos: [
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          ]
        }
      ],
      shipping: {
        method: "Yanwen Special Line",
        cost: 18.75,
        trackingNumber: "YW78945612",
        estimatedDelivery: "2023-11-12"
      },
      status: "Ordered",
      totalCost: 97.24,
      declaration: {
        value: 30.00,
        description: "Casual Apparel"
      }
    },
    {
      id: 3,
      supplier: {
        name: "Vintage Finds Co.",
        avatar: "https://randomuser.me/api/portraits/men/67.jpg",
        platform: "Manual",
        rating: 4.9
      },
      orderDate: "2023-10-05",
      items: [
        { 
          id: 301, 
          name: "90s Windbreaker", 
          cost: 55.00, 
          status: "QC Complete",
          qcPhotos: [
            "https://images.unsplash.com/photo-1601063476271-a159c71ab0b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1580682312385-e94d8de1cf3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          ]
        },
        { 
          id: 302, 
          name: "Retro Band Tee", 
          cost: 38.25, 
          status: "QC Complete",
          qcPhotos: [
            "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          ]
        },
        { 
          id: 303, 
          name: "Distressed Jeans", 
          cost: 49.99, 
          status: "QC Complete",
          qcPhotos: [
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          ]
        },
        { 
          id: 304, 
          name: "Leather Belt", 
          cost: 22.50, 
          status: "QC Complete",
          qcPhotos: [
            "https://images.unsplash.com/photo-1553704571-c32d20af8b7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          ]
        }
      ],
      shipping: {
        method: "GD-EMS",
        cost: 35.00,
        trackingNumber: "EV123456789CN",
        estimatedDelivery: "2023-10-28"
      },
      status: "Received",
      totalCost: 200.74,
      declaration: {
        value: 65.00,
        description: "Vintage Clothing"
      }
    },
    {
      id: 4,
      supplier: {
        name: "Hypebeast Supply",
        avatar: "https://randomuser.me/api/portraits/women/22.jpg",
        platform: "ItaoBuy",
        rating: 4.7
      },
      orderDate: "2023-10-18",
      items: [
        { 
          id: 401, 
          name: "Designer Replica Tee", 
          cost: 35.99, 
          status: "QC Complete",
          qcPhotos: [
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          ]
        },
        { 
          id: 402, 
          name: "Streetwear Shorts", 
          cost: 29.50, 
          status: "QC Complete",
          qcPhotos: [
            "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          ]
        }
      ],
      shipping: {
        method: "4PX Economy",
        cost: 19.99,
        trackingNumber: "LX987654CN",
        estimatedDelivery: "2023-11-15"
      },
      status: "Shipped",
      totalCost: 85.48,
      declaration: {
        value: 25.00,
        description: "Casual Clothing"
      }
    }
  ];

  // Filter hauls based on current filters
  const filteredHauls = hauls.filter(haul => {
    // Platform filter
    if (filters.platform !== 'all' && haul.supplier.platform !== filters.platform) {
      return false;
    }
    
    // Status filter
    if (filters.status !== 'all' && haul.status !== filters.status) {
      return false;
    }
    
    // Date range filter (simplified for mock)
    if (filters.dateRange === 'last7days') {
      // Simplified check - in real app would compare actual dates
      const orderDate = new Date(haul.orderDate);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      if (orderDate < sevenDaysAgo) {
        return false;
      }
    }
    
    // Supplier rating filter
    if (filters.supplierRating !== 'all') {
      const minRating = parseFloat(filters.supplierRating);
      if (haul.supplier.rating < minRating) {
        return false;
      }
    }
    
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const supplierNameMatch = haul.supplier.name.toLowerCase().includes(searchLower);
      const itemMatch = haul.items.some(item => item.name.toLowerCase().includes(searchLower));
      const trackingMatch = haul.shipping.trackingNumber.toLowerCase().includes(searchLower);
      
      if (!supplierNameMatch && !itemMatch && !trackingMatch) {
        return false;
      }
    }
    
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ordered':
        return 'text-warning';
      case 'Shipped':
        return 'text-primary';
      case 'Received':
        return 'text-success';
      case 'QC Complete':
        return 'text-secondary';
      default:
        return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Ordered':
        return 'ShoppingCart';
      case 'Shipped':
        return 'Package';
      case 'Received':
        return 'CheckCircle';
      case 'QC Complete':
        return 'Camera';
      default:
        return 'Circle';
    }
  };

  return (
    <div>
      {filteredHauls.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mb-4">
            <Icon name="Package" size={32} className="text-text-secondary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No hauls found</h3>
          <p className="text-text-secondary max-w-md mb-6">
            No hauls match your current filters. Try adjusting your search criteria or add a new haul.
          </p>
          <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-600 transition-smooth">
            Add New Haul
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredHauls.map(haul => (
            <div 
              key={haul.id}
              className="bg-surface border border-subtle rounded-xl overflow-hidden transition-smooth hover:border-active"
            >
              {/* Haul Header */}
              <div className="p-4 border-b border-subtle">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Image 
                        src={haul.supplier.avatar} 
                        alt={haul.supplier.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-background rounded-full flex items-center justify-center">
                        <Icon 
                          name={haul.supplier.platform === 'ItaoBuy' ? 'ShoppingBag' : haul.supplier.platform === 'CNFans' ? 'Globe' : 'User'} 
                          size={12} 
                          className="text-text-secondary"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary">{haul.supplier.name}</h3>
                      <div className="flex items-center text-xs text-text-secondary">
                        <span>{haul.supplier.platform}</span>
                        <span className="mx-1">•</span>
                        <div className="flex items-center">
                          <Icon name="Star" size={12} className="text-warning mr-1" />
                          <span>{haul.supplier.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(haul.status)}`}>
                    <Icon name={getStatusIcon(haul.status)} size={14} className="mr-1" />
                    {haul.status}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <div className="text-text-secondary text-xs">Order Date</div>
                    <div className="font-medium">{new Date(haul.orderDate).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="text-text-secondary text-xs">Items</div>
                    <div className="font-medium">{haul.items.length}</div>
                  </div>
                  <div>
                    <div className="text-text-secondary text-xs">Total Cost</div>
                    <div className="font-medium">${haul.totalCost.toFixed(2)}</div>
                  </div>
                </div>
              </div>
              
              {/* Haul Summary */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="Truck" size={16} className="text-text-secondary" />
                    <span className="text-sm">{haul.shipping.method}</span>
                  </div>
                  <div className="text-sm font-medium">
                    ${haul.shipping.cost.toFixed(2)}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="BarChart2" size={16} className="text-text-secondary" />
                    <span className="text-sm">Declaration</span>
                  </div>
                  <div className="text-sm">
                    ${haul.declaration.value.toFixed(2)} - {haul.declaration.description}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Package" size={16} className="text-text-secondary" />
                    <span className="text-sm">Tracking</span>
                  </div>
                  <div className="text-sm font-mono">{haul.shipping.trackingNumber}</div>
                </div>
                
                {/* Item Thumbnails */}
                <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
                  {haul.items.map(item => (
                    <div key={item.id} className="flex-shrink-0 w-12 h-12 rounded-md bg-background overflow-hidden">
                      {item.qcPhotos && item.qcPhotos.length > 0 ? (
                        <Image 
                          src={item.qcPhotos[0]} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Icon name="Image" size={16} className="text-text-secondary" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Expand/Collapse Button */}
              <button
                onClick={() => toggleHaulExpansion(haul.id)}
                className="w-full py-2 border-t border-subtle text-text-secondary hover:text-text-primary text-sm font-medium transition-smooth flex items-center justify-center"
              >
                <span>{expandedHauls.has(haul.id) ? 'Hide Details' : 'Show Details'}</span>
                <Icon 
                  name={expandedHauls.has(haul.id) ? 'ChevronUp' : 'ChevronDown'} 
                  size={16} 
                  className="ml-1" 
                />
              </button>
              
              {/* Expanded Details */}
              {expandedHauls.has(haul.id) && (
                <div className="border-t border-subtle p-4 bg-background/50">
                  <h4 className="font-medium mb-3">Item Details</h4>
                  <div className="space-y-4">
                    {haul.items.map(item => (
                      <div key={item.id} className="bg-surface p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">{item.name}</h5>
                          <span className="text-sm font-medium">${item.cost.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex items-center justify-between mb-3">
                          <span className={`text-xs ${getStatusColor(item.status)}`}>{item.status}</span>
                        </div>
                        
                        {/* QC Photos */}
                        {item.qcPhotos && item.qcPhotos.length > 0 && (
                          <div className="grid grid-cols-3 gap-2 mt-2">
                            {item.qcPhotos.map((photo, index) => (
                              <div key={index} className="aspect-square rounded-md overflow-hidden bg-background">
                                <Image 
                                  src={photo} 
                                  alt={`${item.name} QC Photo ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Shipping Timeline */}
                  <div className="mt-6">
                    <h4 className="font-medium mb-3">Shipping Timeline</h4>
                    <div className="relative pl-6 pb-2">
                      <div className="absolute top-0 bottom-0 left-2 w-0.5 bg-surface"></div>
                      
                      <div className="relative mb-4">
                        <div className="absolute left-[-24px] w-5 h-5 rounded-full bg-success flex items-center justify-center">
                          <Icon name="Check" size={12} className="text-background" />
                        </div>
                        <div className="bg-surface p-3 rounded-lg">
                          <div className="text-sm font-medium">Order Placed</div>
                          <div className="text-xs text-text-secondary">{new Date(haul.orderDate).toLocaleDateString()}</div>
                        </div>
                      </div>
                      
                      <div className="relative mb-4">
                        <div className={`absolute left-[-24px] w-5 h-5 rounded-full ${haul.status === 'Ordered' ? 'bg-background border border-warning' : 'bg-warning'} flex items-center justify-center`}>
                          {haul.status !== 'Ordered' && (
                            <Icon name="Check" size={12} className="text-background" />
                          )}
                        </div>
                        <div className="bg-surface p-3 rounded-lg">
                          <div className="text-sm font-medium">Processing</div>
                          <div className="text-xs text-text-secondary">Estimated 2-3 days</div>
                        </div>
                      </div>
                      
                      <div className="relative mb-4">
                        <div className={`absolute left-[-24px] w-5 h-5 rounded-full ${haul.status === 'Shipped' || haul.status === 'Received' ? 'bg-primary' : 'bg-background border border-subtle'} flex items-center justify-center`}>
                          {(haul.status === 'Shipped' || haul.status === 'Received') && (
                            <Icon name="Check" size={12} className="text-background" />
                          )}
                        </div>
                        <div className="bg-surface p-3 rounded-lg">
                          <div className="text-sm font-medium">Shipped</div>
                          <div className="text-xs text-text-secondary">
                            {haul.status === 'Shipped' || haul.status === 'Received' 
                              ? `Tracking: ${haul.shipping.trackingNumber}` 
                              : 'Pending'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className={`absolute left-[-24px] w-5 h-5 rounded-full ${haul.status === 'Received' ? 'bg-success' : 'bg-background border border-subtle'} flex items-center justify-center`}>
                          {haul.status === 'Received' && (
                            <Icon name="Check" size={12} className="text-background" />
                          )}
                        </div>
                        <div className="bg-surface p-3 rounded-lg">
                          <div className="text-sm font-medium">Delivery</div>
                          <div className="text-xs text-text-secondary">
                            {haul.status === 'Received' ?'Delivered' 
                              : `Est. ${new Date(haul.shipping.estimatedDelivery).toLocaleDateString()}`}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="mt-4 flex space-x-3">
                    <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-600 transition-smooth flex items-center justify-center">
                      <Icon name="Edit" size={16} className="mr-2" />
                      Edit Haul
                    </button>
                    <button className="flex-1 px-4 py-2 bg-surface border border-subtle text-text-primary rounded-lg font-medium hover:bg-surface/70 transition-smooth flex items-center justify-center">
                      <Icon name="ExternalLink" size={16} className="mr-2" />
                      Track Package
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

export default HaulList;