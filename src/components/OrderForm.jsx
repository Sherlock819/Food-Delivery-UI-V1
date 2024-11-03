import React, { useState, useEffect } from 'react';
import './OrderForm.css';
import { getAuthHeader } from '../utils/api';
import { connectWebSocket, disconnectWebSocket } from '../utils/websocket';

const OrderForm = ({ addNotification }) => {
  const [restaurantId, setRestaurantId] = useState('');
  const [orderItems, setOrderItems] = useState([{ itemId: '', name: '', quantity: 1, price: 0 }]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('PENDING');
  const [orderId, setOrderId] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleOrderItemChange = (index, field, value) => {
    const newOrderItems = [...orderItems];
    newOrderItems[index][field] = value;
    setOrderItems(newOrderItems);
  };

  const addOrderItem = () => {
    setOrderItems([...orderItems, { itemId: '', name: '', quantity: 1, price: 0 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const orderData = {
      restaurantId: parseInt(restaurantId),
      orderItems,
      status,
    };

    try {
      const response = await fetch('http://localhost:8080/order/api/orders', {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const data = await response.json();
        setOrderId(data.orderId);
        addNotification('Order placed successfully!');

        // Establish WebSocket connection and subscribe to order updates
        connectWebSocket(data.orderId, (message) => {
          console.log('Order update received:', message);
          addNotification(`Order Update: ${message.status}`);
        });

        setOrderSuccess(true);
        setTimeout(() => setOrderSuccess(false), 3000);
      } else {
        throw new Error('Failed to place order');
      }
    } catch (error) {
      addNotification(`Error placing order: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      disconnectWebSocket();
    };
  }, []);

  return (
    <div className={`order-container ${orderSuccess ? 'celebrate' : ''}`}>
      <form onSubmit={handleSubmit} className="order-form">
        <h2>Place Your Order</h2>
        <div className="form-group">
          <input
            type="number"
            value={restaurantId}
            onChange={(e) => setRestaurantId(e.target.value)}
            placeholder="Restaurant ID"
            required
          />
        </div>
        {orderItems.map((item, index) => (
          <div key={index} className="order-item">
            <input
              type="number"
              value={item.itemId}
              onChange={(e) => handleOrderItemChange(index, 'itemId', e.target.value)}
              placeholder="Item ID"
              required
            />
            <input
              type="text"
              value={item.name}
              onChange={(e) => handleOrderItemChange(index, 'name', e.target.value)}
              placeholder="Item Name"
              required
            />
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleOrderItemChange(index, 'quantity', e.target.value)}
              placeholder="Quantity"
              required
            />
            <input
              type="number"
              value={item.price}
              onChange={(e) => handleOrderItemChange(index, 'price', e.target.value)}
              placeholder="Price"
              required
            />
          </div>
        ))}
        <button type="button" onClick={addOrderItem}>
          Add Item
        </button>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
      {orderSuccess && <div className="celebration-animation">🎉</div>}
    </div>
  );
};

export default OrderForm; 