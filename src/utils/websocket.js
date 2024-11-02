import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client'; // Import SockJS

let stompClient = null;

export const connectWebSocket = (orderId, onMessageReceived) => {
  // Create a SockJS connection
  const token = localStorage.getItem('authToken');
  const socket = new SockJS(`http://localhost:8080/order/ws?token=${token}`); // Pass token as a query parameter

  stompClient = new Client({
    webSocketFactory: () => {
      return socket; // Use SockJS as the WebSocket factory
    },
    connectHeaders: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Include JWT token
    },
    debug: (str) => {
      console.log(str);
    },
    onConnect: () => {
      console.log('Connected to WebSocket');
      // Subscribe to the order updates
      console.log('Subscribing to order `/topic/orderDetails`');
      stompClient.subscribe(`/topic/orderDetails`, (message) => {
        onMessageReceived(JSON.parse(message.body));
      });
      
      console.log(`Subscribing to order /topic/orderDetails/${orderId}`);
      stompClient.subscribe(`/topic/orderDetails/${orderId}`, (message) => {
        onMessageReceived(JSON.parse(message.body));
      });
    },
    onStompError: (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    },
  });

  stompClient.activate();
};

export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
  }
}; 