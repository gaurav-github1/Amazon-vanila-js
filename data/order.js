export let orders = [];

// Load valid orders from localStorage
function loadValidOrders() {
  try {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    // Filter out any invalid orders (must have id, dateCreated, and either cartItems or cart)
    orders = savedOrders.filter(order => 
      order && 
      order.id && 
      order.dateCreated && 
      (order.cartItems || order.cart)
    );
  } catch (error) {
    console.error('Error loading orders from localStorage:', error);
    orders = [];
  }
  
  // If orders is not an array for any reason, reset it
  if (!Array.isArray(orders)) {
    orders = [];
  }
}

// Initialize orders
loadValidOrders();

export function addToOrder(order){
  // Generate a unique order ID (using timestamp and random number)
  const orderId = `ORDER-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  
  // Create a new order object with ID and timestamp
  const newOrder = {
    id: orderId,
    dateCreated: new Date().toISOString(),
    ...order
  };
  
  // Add to the beginning of orders array
  orders.unshift(newOrder);
  saveToStorage();
}

export function saveToStorage(){
  localStorage.setItem('orders',JSON.stringify(orders));
}

// Get order by ID
export function getOrder(orderId) {
  return orders.find(order => order.id === orderId);
}

// Get all orders
export function getAllOrders() {
  return orders;
}

// Clear all orders (for testing/debugging)
export function clearAllOrders() {
  orders = [];
  saveToStorage();
}