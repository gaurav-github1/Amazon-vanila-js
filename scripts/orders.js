import { getAllOrders, clearAllOrders } from "../data/order.js";
import { formatCurrency } from "./utils/money.js";
import { calculateCartQuantity } from "../data/cart.js";
import { initializeSearch } from "./shared/search.js";

function renderCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  const cartQuantityElement = document.querySelector('.js-cart-quantity');
  if (cartQuantityElement) {
    cartQuantityElement.innerHTML = cartQuantity;
  }
}

function renderOrders() {
  const orders = getAllOrders();
  const ordersGrid = document.querySelector('.js-orders-grid');
  
  if (!orders || orders.length === 0) {
    ordersGrid.innerHTML = `
      <div class="empty-orders-message">
        You have no orders yet. <a href="index.html">Continue shopping</a>
      </div>
    `;
    return;
  }
  
  let ordersHTML = '';
  
  orders.forEach(order => {
    // Skip any malformed orders
    if (!order || !order.id || !order.dateCreated) {
      return;
    }
    
    // Format the date
    let formattedDate = 'Unknown date';
    try {
      const dateObj = new Date(order.dateCreated);
      formattedDate = dateObj.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (error) {
      console.error('Error formatting date:', error);
    }
    
    // Get the order items (can be from the order.cart or order.cartItems depending on source)
    let items = [];
    if (order.cartItems && Array.isArray(order.cartItems)) {
      items = order.cartItems;
    } else if (order.cart && Array.isArray(order.cart)) {
      items = order.cart;
    }
    
    // Skip if no items found
    if (items.length === 0) {
      return;
    }
    
    // Calculate total if not already in the order
    let totalCents = 0;
    if (order.orderSummary && order.orderSummary.totalCents) {
      totalCents = order.orderSummary.totalCents;
    }
    
    // Create the order header
    let orderHTML = `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${formattedDate}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(totalCents)}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
        
        <div class="order-details-grid">
    `;
    
    // Add each item in the order
    items.forEach(item => {
      // Skip any malformed items
      if (!item) return;
      
      // Get product details
      const productName = item.productName || 'Product';
      const productImage = item.productImage || 'images/products/default.jpg';
      const quantity = item.quantity || 1;
      
      orderHTML += `
        <div class="product-image-container">
          <img src="${productImage}">
        </div>
        
        <div class="product-details">
          <div class="product-name">
            ${productName}
          </div>
          <div class="product-delivery-date">
            Order processed
          </div>
          <div class="product-quantity">
            Quantity: ${quantity}
          </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
        
        <div class="product-actions">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </div>
      `;
    });
    
    // Close the order container
    orderHTML += `
        </div>
      </div>
    `;
    
    ordersHTML += orderHTML;
  });
  
  // Add a "Clear Order History" button for testing/debugging
  ordersHTML += `
    <div class="clear-orders-container">
      <button class="clear-orders-button button-secondary js-clear-orders">
        Clear Order History
      </button>
    </div>
  `;
  
  ordersGrid.innerHTML = ordersHTML;
  
  // Add event listeners for buy again buttons
  document.querySelectorAll('.buy-again-button').forEach(button => {
    button.addEventListener('click', () => {
      // You could implement add to cart functionality here
      window.location.href = 'index.html';
    });
  });
  
  // Add event listeners for track package buttons
  document.querySelectorAll('.track-package-button').forEach(button => {
    button.addEventListener('click', () => {
      alert('Tracking information is not available at this time.');
    });
  });
  
  // Add event listener for clear orders button
  document.querySelector('.js-clear-orders').addEventListener('click', () => {
    if (confirm('Are you sure you want to clear your order history? This cannot be undone.')) {
      clearAllOrders();
      renderOrders(); // Re-render the page
    }
  });
}

// Initialize the page
renderOrders(); 
renderCartQuantity();
initializeSearch(); // Use the modular search functionality 