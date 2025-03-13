import { cart, calculateCartQuantity, saveToStorage } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption} from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addToOrder } from "../../data/order.js";

// Function to calculate order totals and create detailed cart items
function calculateOrderDetails() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  
  // Create a deep copy of cart items with product details
  const cartItems = cart.map(cartItem => {
    const product = getProduct(cartItem.productId);
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    
    productPriceCents += product.priceCents * cartItem.quantity;
    shippingPriceCents += deliveryOption.priceCents;
    
    return {
      ...cartItem,
      productName: product.name,
      productImage: product.image,
      priceCents: product.priceCents,
      deliveryOptionName: deliveryOption.deliveryDays
    };
  });
  
  const totalBeforeTax = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTax * 0.1;
  const totalCents = totalBeforeTax + taxCents;
  
  return {
    cartItems,
    productPriceCents,
    shippingPriceCents,
    totalBeforeTaxCents: totalBeforeTax,
    taxCents,
    totalCents
  };
}

export function renderPaymentSummary(){
    // Use the common calculation function
    const orderDetails = calculateOrderDetails();
    const {
      productPriceCents,
      shippingPriceCents,
      totalBeforeTaxCents: totalBeforeTax,
      taxCents,
      totalCents: totalPriceCents
    } = orderDetails;

    let paymentSummaryHtml = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div class ="js-payment-summary-row-items"></div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalPriceCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order-button">
            Place your order
          </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;
    let quantity = calculateCartQuantity(); 
    document.querySelector('.js-payment-summary-row-items').innerHTML = `Items (${quantity}):`;

    document.querySelector('.js-place-order-button').addEventListener('click', async ()=>{
      try{
        // Use the same calculation result instead of recalculating
        const orderDetails = calculateOrderDetails();
        
        // Create order object
        const orderData = {
          cartItems: orderDetails.cartItems,
          orderSummary: {
            productPriceCents: orderDetails.productPriceCents,
            shippingPriceCents: orderDetails.shippingPriceCents,
            totalBeforeTaxCents: orderDetails.totalBeforeTaxCents,
            taxCents: orderDetails.taxCents,
            totalCents: orderDetails.totalCents
          }
        };
        
        // Try to send to backend if available
        let response = await fetch('https://supersimplebackend.dev/orders',{
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({
            cart : cart
          })
        });
  
        // If backend request succeeds, use that response
        let backendOrder = await response.json();
        addToOrder({
          ...backendOrder,
          ...orderData
        });
      } catch(error) {
        console.log('Backend error. Saving order locally instead.');
        // If backend fails, still save the order locally with the latest calculations
        const orderDetails = calculateOrderDetails();
        addToOrder({
          cartItems: orderDetails.cartItems,
          orderSummary: {
            productPriceCents: orderDetails.productPriceCents,
            shippingPriceCents: orderDetails.shippingPriceCents,
            totalBeforeTaxCents: orderDetails.totalBeforeTaxCents,
            taxCents: orderDetails.taxCents,
            totalCents: orderDetails.totalCents
          }
        });
      }
      
      // Clear the cart
      cart.length = 0;
      saveToStorage();
      
      // Redirect to orders page
      window.location.href = 'orders.html';
    });
}


