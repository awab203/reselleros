import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const ShipmentTrackerWidget = ({ activeShipments }) => {
  const navigate = useNavigate();
  const [selectedShipment, setSelectedShipment] = useState(0);

  const mockShipments = [
    {
      id: "YW2024031501",
      carrier: "Yanwen",
      status: "In Transit",
      progress: 65,
      estimatedDelivery: "Mar 22, 2024",
      currentLocation: "Shanghai Sorting Center",
      items: 3,
      value: "$127.50"
    },
    {
      id: "4PX2024031502",
      carrier: "4PX",
      status: "Customs Clearance",
      progress: 80,
      estimatedDelivery: "Mar 20, 2024",
      currentLocation: "UK Customs",
      items: 1,
      value: "$89.99"
    },
    {
      id: "GD2024031503",
      carrier: "GD-EMS",
      status: "Delivered",
      progress: 100,
      estimatedDelivery: "Mar 18, 2024",
      currentLocation: "Delivered",
      items: 2,
      value: "$156.75"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-success';
      case 'In Transit': return 'text-primary';
      case 'Customs Clearance': return 'text-warning';
      case 'Processing': return 'text-secondary';
      default: return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return 'CheckCircle';
      case 'In Transit': return 'Truck';
      case 'Customs Clearance': return 'Shield';
      case 'Processing': return 'Package';
      default: return 'Clock';
    }
  };

  const ShipmentCard = ({ shipment, isSelected, onClick }) => (
    <div 
      className={`
        p-4 rounded-lg border transition-smooth cursor-pointer
        ${isSelected 
          ? 'bg-primary/10 border-primary/30 glow-primary' :'bg-background/50 border-subtle hover:bg-surface/30'
        }
      `}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon 
            name={getStatusIcon(shipment.status)} 
            size={16} 
            className={getStatusColor(shipment.status)} 
          />
          <span className="text-text-primary font-medium text-sm">
            {shipment.id}
          </span>
        </div>
        <span className="text-text-secondary text-xs">
          {shipment.carrier}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${getStatusColor(shipment.status)}`}>
            {shipment.status}
          </span>
          <span className="text-text-secondary text-xs">
            {shipment.items} items
          </span>
        </div>
        
        <div className="w-full bg-surface rounded-full h-1.5">
          <div 
            className={`
              h-1.5 rounded-full transition-smooth
              ${shipment.status === 'Delivered' ?'bg-success' :'bg-gradient-to-r from-primary to-secondary'
              }
            `}
            style={{ width: `${shipment.progress}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-text-secondary text-xs">
            ETA: {shipment.estimatedDelivery}
          </span>
          <span className="text-text-primary text-xs font-medium">
            {shipment.value}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-surface/50 backdrop-blur-sm border border-subtle rounded-xl p-6 hover:bg-surface/70 transition-smooth elevation-base">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center glow-primary">
            <Icon name="Truck" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Shipment Tracker
            </h3>
            <p className="text-text-secondary text-sm">
              {activeShipments} active shipments
            </p>
          </div>
        </div>
        
        <button
          onClick={() => navigate('/shipment-tracking-logistics')}
          className="p-2 text-text-secondary hover:text-primary transition-smooth"
          title="View all shipments"
        >
          <Icon name="ExternalLink" size={16} />
        </button>
      </div>
      
      <div className="space-y-3 mb-4">
        {mockShipments.slice(0, 2).map((shipment, index) => (
          <ShipmentCard
            key={shipment.id}
            shipment={shipment}
            isSelected={selectedShipment === index}
            onClick={() => setSelectedShipment(index)}
          />
        ))}
      </div>
      
      <div className="pt-4 border-t border-subtle">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-text-secondary text-xs mb-1">In Transit</p>
            <p className="text-primary font-semibold">15</p>
          </div>
          <div>
            <p className="text-text-secondary text-xs mb-1">Customs</p>
            <p className="text-warning font-semibold">5</p>
          </div>
          <div>
            <p className="text-text-secondary text-xs mb-1">Delivered</p>
            <p className="text-success font-semibold">3</p>
          </div>
        </div>
        
        <button
          onClick={() => navigate('/shipment-tracking-logistics')}
          className="w-full mt-4 px-4 py-2 bg-primary/10 border border-primary/30 text-primary rounded-lg hover:bg-primary/20 transition-smooth"
        >
          Track All Shipments
        </button>
      </div>
    </div>
  );
};

export default ShipmentTrackerWidget;