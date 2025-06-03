import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const AddHaulForm = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    supplier: '',
    platform: 'ItaoBuy',
    items: [{ name: '', cost: '', quantity: 1, qcPhotos: [] }],
    shipping: {
      method: '',
      cost: '',
      trackingNumber: '',
      estimatedDelivery: ''
    },
    declaration: {
      value: '',
      description: '',
      strategy: 'accurate'
    },
    notes: ''
  });
  const [dragActive, setDragActive] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  // Mock data for suppliers
  const suppliers = [
    {
      id: 1,
      name: "ItaoBuy Premium Seller",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      platform: "ItaoBuy",
      rating: 4.8
    },
    {
      id: 2,
      name: "CNFans Streetwear",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      platform: "CNFans",
      rating: 4.6
    },
    {
      id: 3,
      name: "Vintage Finds Co.",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      platform: "Manual",
      rating: 4.9
    },
    {
      id: 4,
      name: "Hypebeast Supply",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      platform: "ItaoBuy",
      rating: 4.7
    },
    {
      id: 5,
      name: "Luxury Replicas",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg",
      platform: "CNFans",
      rating: 4.5
    }
  ];

  // Mock data for shipping methods
  const shippingMethods = [
    { id: 'yanwen', name: 'Yanwen Special Line', estimatedDays: '10-15 days', baseCost: 18.75 },
    { id: '4px-standard', name: '4PX Standard', estimatedDays: '12-18 days', baseCost: 22.50 },
    { id: '4px-economy', name: '4PX Economy', estimatedDays: '15-25 days', baseCost: 19.99 },
    { id: 'gd-ems', name: 'GD-EMS', estimatedDays: '7-12 days', baseCost: 35.00 },
    { id: 'china-post', name: 'China Post', estimatedDays: '20-40 days', baseCost: 15.50 }
  ];

  // Mock data for declaration strategies
  const declarationStrategies = [
    { 
      id: 'accurate', 
      name: 'Accurate Declaration', 
      description: 'Declare close to actual value with proper description',
      risk: 'Low',
      recommended: true
    },
    { 
      id: 'reduced', 
      name: 'Reduced Value', 
      description: 'Declare at 60-70% of actual value',
      risk: 'Medium',
      recommended: false
    },
    { 
      id: 'minimal', 
      name: 'Minimal Value', 
      description: 'Declare at minimum acceptable value',
      risk: 'High',
      recommended: false
    }
  ];

  const handleInputChange = (e, index = null) => {
    const { name, value } = e.target;
    
    if (index !== null) {
      // Handle item array fields
      const newItems = [...formData.items];
      newItems[index][name] = value;
      setFormData({ ...formData, items: newItems });
    } else if (name.includes('.')) {
      // Handle nested fields (shipping, declaration)
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      // Handle top-level fields
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: '', cost: '', quantity: 1, qcPhotos: [] }]
    });
  };

  const handleRemoveItem = (index) => {
    const newItems = [...formData.items];
    newItems.splice(index, 1);
    setFormData({ ...formData, items: newItems });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files, index);
    }
  };

  const handleFileUpload = (files, index) => {
    // In a real app, you would upload these files to a server
    // For this mock, we'll create object URLs for preview
    const newItems = [...formData.items];
    const newPhotos = [...newItems[index].qcPhotos];
    
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        newPhotos.push(URL.createObjectURL(file));
      }
    });
    
    newItems[index].qcPhotos = newPhotos;
    setFormData({ ...formData, items: newItems });
  };

  const handleFileInput = (e, index) => {
    handleFileUpload(e.target.files, index);
  };

  const handleRemovePhoto = (itemIndex, photoIndex) => {
    const newItems = [...formData.items];
    newItems[itemIndex].qcPhotos.splice(photoIndex, 1);
    setFormData({ ...formData, items: newItems });
  };

  const handleSelectSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setFormData({
      ...formData,
      supplier: supplier.id,
      platform: supplier.platform
    });
  };

  const handleSelectShippingMethod = (method) => {
    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + parseInt(method.estimatedDays.split('-')[1]));
    
    setFormData({
      ...formData,
      shipping: {
        ...formData.shipping,
        method: method.id,
        cost: method.baseCost.toString(),
        estimatedDelivery: estimatedDate.toISOString().split('T')[0]
      }
    });
  };

  const handleSelectDeclarationStrategy = (strategy) => {
    // Calculate a suggested declaration value based on strategy
    let suggestedValue = 0;
    const totalItemCost = formData.items.reduce((sum, item) => {
      return sum + (parseFloat(item.cost) || 0) * (parseInt(item.quantity) || 1);
    }, 0);
    
    switch (strategy.id) {
      case 'accurate':
        suggestedValue = totalItemCost;
        break;
      case 'reduced':
        suggestedValue = totalItemCost * 0.65;
        break;
      case 'minimal':
        suggestedValue = totalItemCost * 0.3;
        break;
      default:
        suggestedValue = totalItemCost;
    }
    
    setFormData({
      ...formData,
      declaration: {
        ...formData.declaration,
        strategy: strategy.id,
        value: Math.max(10, Math.round(suggestedValue)).toString()
      }
    });
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would submit this data to your backend
    console.log('Form submitted:', formData);
    onClose();
  };

  const calculateTotalCost = () => {
    const itemsCost = formData.items.reduce((sum, item) => {
      return sum + (parseFloat(item.cost) || 0) * (parseInt(item.quantity) || 1);
    }, 0);
    
    const shippingCost = parseFloat(formData.shipping.cost) || 0;
    
    return (itemsCost + shippingCost).toFixed(2);
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center w-full max-w-xs">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-surface text-text-secondary'}`}>
            1
          </div>
          <div className={`flex-1 h-1 ${currentStep >= 2 ? 'bg-primary' : 'bg-surface'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-surface text-text-secondary'}`}>
            2
          </div>
          <div className={`flex-1 h-1 ${currentStep >= 3 ? 'bg-primary' : 'bg-surface'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-primary text-white' : 'bg-surface text-text-secondary'}`}>
            3
          </div>
          <div className={`flex-1 h-1 ${currentStep >= 4 ? 'bg-primary' : 'bg-surface'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 4 ? 'bg-primary text-white' : 'bg-surface text-text-secondary'}`}>
            4
          </div>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Select Supplier</h3>
            <div className="mb-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="Search" size={18} className="text-text-secondary" />
                </div>
                <input
                  type="text"
                  placeholder="Search suppliers..."
                  className="w-full pl-10 pr-4 py-2 bg-background border border-subtle rounded-lg focus:outline-none focus:border-primary text-text-primary"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-3 mb-6 max-h-[400px] overflow-y-auto pr-2">
              {suppliers.map(supplier => (
                <div
                  key={supplier.id}
                  className={`p-3 rounded-lg cursor-pointer transition-smooth ${
                    selectedSupplier?.id === supplier.id
                      ? 'bg-primary/10 border border-primary/30' :'bg-background border border-subtle hover:border-primary/20'
                  }`}
                  onClick={() => handleSelectSupplier(supplier)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Image 
                        src={supplier.avatar} 
                        alt={supplier.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-surface rounded-full flex items-center justify-center">
                        <Icon 
                          name={supplier.platform === 'ItaoBuy' ? 'ShoppingBag' : supplier.platform === 'CNFans' ? 'Globe' : 'User'} 
                          size={12} 
                          className="text-text-secondary"
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">{supplier.name}</h4>
                      <div className="flex items-center text-xs text-text-secondary">
                        <span>{supplier.platform}</span>
                        <span className="mx-1">•</span>
                        <div className="flex items-center">
                          <Icon name="Star" size={12} className="text-warning mr-1" />
                          <span>{supplier.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    {selectedSupplier?.id === supplier.id && (
                      <div className="ml-auto">
                        <Icon name="Check" size={18} className="text-primary" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-subtle">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-text-secondary hover:text-text-primary transition-smooth"
              >
                Cancel
              </button>
              
              <button
                type="button"
                onClick={nextStep}
                disabled={!selectedSupplier}
                className={`px-6 py-2 rounded-lg font-medium transition-smooth ${
                  selectedSupplier
                    ? 'bg-primary text-white hover:bg-primary-600' :'bg-surface text-text-secondary cursor-not-allowed'
                }`}
              >
                Next
                <Icon name="ArrowRight" size={16} className="ml-2 inline" />
              </button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Item Details</h3>
            
            <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
              {formData.items.map((item, index) => (
                <div key={index} className="p-4 bg-background border border-subtle rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Item {index + 1}</h4>
                    {formData.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        className="p-1 text-text-secondary hover:text-accent transition-smooth"
                      >
                        <Icon name="Trash2" size={16} />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-text-secondary mb-1">Item Name</label>
                      <input
                        type="text"
                        name="name"
                        value={item.name}
                        onChange={(e) => handleInputChange(e, index)}
                        placeholder="e.g. Vintage Denim Jacket"
                        className="w-full px-3 py-2 bg-surface border border-subtle rounded-lg focus:outline-none focus:border-primary text-text-primary"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm text-text-secondary mb-1">Cost ($)</label>
                        <input
                          type="number"
                          name="cost"
                          value={item.cost}
                          onChange={(e) => handleInputChange(e, index)}
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          className="w-full px-3 py-2 bg-surface border border-subtle rounded-lg focus:outline-none focus:border-primary text-text-primary"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm text-text-secondary mb-1">Quantity</label>
                        <input
                          type="number"
                          name="quantity"
                          value={item.quantity}
                          onChange={(e) => handleInputChange(e, index)}
                          min="1"
                          className="w-full px-3 py-2 bg-surface border border-subtle rounded-lg focus:outline-none focus:border-primary text-text-primary"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* QC Photos Upload */}
                  <div>
                    <label className="block text-sm text-text-secondary mb-1">QC Photos</label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-4 transition-colors ${
                        dragActive ? 'border-primary bg-primary/5' : 'border-subtle'
                      }`}
                      onDragEnter={(e) => handleDrag(e)}
                      onDragOver={(e) => handleDrag(e)}
                      onDragLeave={(e) => handleDrag(e)}
                      onDrop={(e) => handleDrop(e, index)}
                    >
                      <div className="flex flex-col items-center justify-center py-4">
                        <Icon name="Upload" size={24} className="text-text-secondary mb-2" />
                        <p className="text-sm text-text-secondary mb-1">Drag & drop photos here</p>
                        <p className="text-xs text-text-secondary mb-3">or</p>
                        <label className="px-4 py-2 bg-surface hover:bg-surface/70 text-text-primary rounded-lg cursor-pointer transition-smooth">
                          Browse Files
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => handleFileInput(e, index)}
                          />
                        </label>
                      </div>
                    </div>
                    
                    {/* Photo Previews */}
                    {item.qcPhotos.length > 0 && (
                      <div className="grid grid-cols-4 gap-2 mt-3">
                        {item.qcPhotos.map((photo, photoIndex) => (
                          <div key={photoIndex} className="relative group">
                            <div className="aspect-square rounded-md overflow-hidden bg-background">
                              <Image 
                                src={photo} 
                                alt={`QC Photo ${photoIndex + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemovePhoto(index, photoIndex)}
                              className="absolute top-1 right-1 w-6 h-6 rounded-full bg-background/80 text-accent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Icon name="X" size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <button
              type="button"
              onClick={handleAddItem}
              className="w-full py-2 border border-dashed border-primary text-primary rounded-lg hover:bg-primary/5 transition-smooth mb-6"
            >
              <Icon name="Plus" size={16} className="mr-2 inline" />
              Add Another Item
            </button>
            
            <div className="flex items-center justify-between pt-4 border-t border-subtle">
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 text-text-secondary hover:text-text-primary transition-smooth"
              >
                <Icon name="ArrowLeft" size={16} className="mr-2 inline" />
                Back
              </button>
              
              <button
                type="button"
                onClick={nextStep}
                disabled={formData.items.some(item => !item.name || !item.cost)}
                className={`px-6 py-2 rounded-lg font-medium transition-smooth ${
                  formData.items.some(item => !item.name || !item.cost)
                    ? 'bg-surface text-text-secondary cursor-not-allowed' :'bg-primary text-white hover:bg-primary-600'
                }`}
              >
                Next
                <Icon name="ArrowRight" size={16} className="ml-2 inline" />
              </button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Shipping Details</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-text-secondary mb-2">Shipping Method</label>
                <div className="grid grid-cols-1 gap-3 max-h-[250px] overflow-y-auto pr-2">
                  {shippingMethods.map(method => (
                    <div
                      key={method.id}
                      className={`p-3 rounded-lg cursor-pointer transition-smooth ${
                        formData.shipping.method === method.id
                          ? 'bg-primary/10 border border-primary/30' :'bg-background border border-subtle hover:border-primary/20'
                      }`}
                      onClick={() => handleSelectShippingMethod(method)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{method.name}</h4>
                          <div className="text-xs text-text-secondary">
                            Estimated delivery: {method.estimatedDays}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-3">${method.baseCost.toFixed(2)}</span>
                          {formData.shipping.method === method.id && (
                            <Icon name="Check" size={18} className="text-primary" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Tracking Number (Optional)</label>
                  <input
                    type="text"
                    name="shipping.trackingNumber"
                    value={formData.shipping.trackingNumber}
                    onChange={handleInputChange}
                    placeholder="e.g. LX458721CN"
                    className="w-full px-3 py-2 bg-surface border border-subtle rounded-lg focus:outline-none focus:border-primary text-text-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Shipping Cost ($)</label>
                  <input
                    type="number"
                    name="shipping.cost"
                    value={formData.shipping.cost}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 bg-surface border border-subtle rounded-lg focus:outline-none focus:border-primary text-text-primary"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-text-secondary mb-1">Estimated Delivery Date</label>
                <input
                  type="date"
                  name="shipping.estimatedDelivery"
                  value={formData.shipping.estimatedDelivery}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-surface border border-subtle rounded-lg focus:outline-none focus:border-primary text-text-primary"
                />
              </div>
            </div>
            
            <div className="bg-background p-4 rounded-lg mb-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Order Summary</h4>
                <span className="text-xs text-text-secondary">{formData.items.length} items</span>
              </div>
              
              <div className="space-y-2 mb-3">
                {formData.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span>{item.name || `Item ${index + 1}`} {item.quantity > 1 ? `(x${item.quantity})` : ''}</span>
                    <span>${((parseFloat(item.cost) || 0) * (parseInt(item.quantity) || 1)).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-subtle pt-2 mb-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Shipping ({formData.shipping.method ? shippingMethods.find(m => m.id === formData.shipping.method)?.name : 'Not selected'})</span>
                  <span>${parseFloat(formData.shipping.cost || 0).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="border-t border-subtle pt-2">
                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span>${calculateTotalCost()}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-subtle">
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 text-text-secondary hover:text-text-primary transition-smooth"
              >
                <Icon name="ArrowLeft" size={16} className="mr-2 inline" />
                Back
              </button>
              
              <button
                type="button"
                onClick={nextStep}
                disabled={!formData.shipping.method || !formData.shipping.cost}
                className={`px-6 py-2 rounded-lg font-medium transition-smooth ${
                  !formData.shipping.method || !formData.shipping.cost
                    ? 'bg-surface text-text-secondary cursor-not-allowed' :'bg-primary text-white hover:bg-primary-600'
                }`}
              >
                Next
                <Icon name="ArrowRight" size={16} className="ml-2 inline" />
              </button>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Declaration & Finalize</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-text-secondary mb-2">Declaration Strategy</label>
                <div className="grid grid-cols-1 gap-3 mb-4">
                  {declarationStrategies.map(strategy => (
                    <div
                      key={strategy.id}
                      className={`p-3 rounded-lg cursor-pointer transition-smooth ${
                        formData.declaration.strategy === strategy.id
                          ? 'bg-primary/10 border border-primary/30' :'bg-background border border-subtle hover:border-primary/20'
                      }`}
                      onClick={() => handleSelectDeclarationStrategy(strategy)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">{strategy.name}</h4>
                        <div className={`px-2 py-0.5 rounded text-xs font-medium ${
                          strategy.risk === 'Low' ? 'bg-success/20 text-success' :
                          strategy.risk === 'Medium'? 'bg-warning/20 text-warning' : 'bg-accent/20 text-accent'
                        }`}>
                          {strategy.risk} Risk
                        </div>
                      </div>
                      <p className="text-xs text-text-secondary mb-1">{strategy.description}</p>
                      {strategy.recommended && (
                        <div className="flex items-center text-xs text-primary">
                          <Icon name="ThumbsUp" size={12} className="mr-1" />
                          Recommended
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Declaration Value ($)</label>
                  <input
                    type="number"
                    name="declaration.value"
                    value={formData.declaration.value}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 bg-surface border border-subtle rounded-lg focus:outline-none focus:border-primary text-text-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Declaration Description</label>
                  <input
                    type="text"
                    name="declaration.description"
                    value={formData.declaration.description}
                    onChange={handleInputChange}
                    placeholder="e.g. Used Clothing"
                    className="w-full px-3 py-2 bg-surface border border-subtle rounded-lg focus:outline-none focus:border-primary text-text-primary"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-text-secondary mb-1">Additional Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Any additional information about this haul..."
                  rows="3"
                  className="w-full px-3 py-2 bg-surface border border-subtle rounded-lg focus:outline-none focus:border-primary text-text-primary resize-none"
                ></textarea>
              </div>
            </div>
            
            <div className="bg-background p-4 rounded-lg mb-6">
              <h4 className="font-medium mb-3">Haul Summary</h4>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <div className="w-32 text-text-secondary">Supplier:</div>
                  <div className="flex-1 font-medium">
                    {selectedSupplier?.name} ({selectedSupplier?.platform})
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-32 text-text-secondary">Items:</div>
                  <div className="flex-1">
                    {formData.items.map((item, index) => (
                      <div key={index} className="mb-1">
                        {item.name} {item.quantity > 1 ? `(x${item.quantity})` : ''} - ${((parseFloat(item.cost) || 0) * (parseInt(item.quantity) || 1)).toFixed(2)}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-32 text-text-secondary">Shipping:</div>
                  <div className="flex-1">
                    {formData.shipping.method ? shippingMethods.find(m => m.id === formData.shipping.method)?.name : 'Not selected'} - ${parseFloat(formData.shipping.cost || 0).toFixed(2)}
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-32 text-text-secondary">Declaration:</div>
                  <div className="flex-1">
                    ${parseFloat(formData.declaration.value || 0).toFixed(2)} - {formData.declaration.description || 'Not specified'}
                  </div>
                </div>
                
                <div className="flex items-start font-medium">
                  <div className="w-32 text-text-secondary">Total Cost:</div>
                  <div className="flex-1">${calculateTotalCost()}</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-subtle">
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 text-text-secondary hover:text-text-primary transition-smooth"
              >
                <Icon name="ArrowLeft" size={16} className="mr-2 inline" />
                Back
              </button>
              
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={!formData.declaration.value || !formData.declaration.description}
                className={`px-6 py-2 rounded-lg font-medium transition-smooth ${
                  !formData.declaration.value || !formData.declaration.description
                    ? 'bg-surface text-text-secondary cursor-not-allowed' :'bg-primary text-white hover:bg-primary-600'
                }`}
              >
                Create Haul
                <Icon name="Check" size={16} className="ml-2 inline" />
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold">Add New Haul</h2>
        <button
          type="button"
          onClick={onClose}
          className="p-2 text-text-secondary hover:text-text-primary transition-smooth"
        >
          <Icon name="X" size={20} />
        </button>
      </div>
      
      {renderStepIndicator()}
      
      <form onSubmit={handleSubmit}>
        {renderStepContent()}
      </form>
    </div>
  );
};

export default AddHaulForm;