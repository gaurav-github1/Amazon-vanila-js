import { products ,getProduct } from "../../data/products.js";
import { cart ,updateQuantity, deleteFromCart,calculateCartQuantity,updateDeliveryOption} from "../../data/cart.js";
import { formatCurrency } from "../utils/money.js";

import { deliveryOptions ,getDeliveryOption , calculateDeliveryDate } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary(){

    let checkoutHTML = '';

    cart.forEach((cart)=>{
        let productId = cart.productId;

        let matchingproduct = getProduct(productId);

        let deliveryOptionId = cart.deliveryOptionId;

        let deliveryOption = getDeliveryOption(deliveryOptionId);

        let dateString = calculateDeliveryDate(deliveryOption);
        
        checkoutHTML += 
        `<div class="cart-item-container js-cart-item-container-${matchingproduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingproduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingproduct.name}
                </div>
                <div class="product-price">
                  ${matchingproduct.getPrice()}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-updated-quantity-label-${matchingproduct.id} js-quantity-label">${cart.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingproduct.id}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${matchingproduct.id}" onkeydown="handleEnterKey(event, '${matchingproduct.id}')">
                  <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingproduct.id}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingproduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionHtml(matchingproduct,cart)}
              </div>
            </div>
          </div>`;
          updateCartQuantity();
    });


    document.querySelector('.js-cart-item-container').innerHTML= checkoutHTML;

    function deliveryOptionHtml(matchingproduct,cartItem){
      let html='';

      deliveryOptions.forEach((deliveryOption)=>{
        let dateString = calculateDeliveryDate(deliveryOption);
        let priceString = deliveryOption.priceCents === 0 
        ? 'FREE'
        :`$${formatCurrency(deliveryOption.priceCents)} -`;

        let isChecked = deliveryOption.id===cartItem.deliveryOptionId;

        html+=`<div class="delivery-option js-delivery-option" data-product-id=${matchingproduct.id} data-delivery-option-id=${deliveryOption.id} >
          <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingproduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
        `
      })
      return html;
    }

    document.querySelectorAll('.js-delete-link').forEach((link)=>{
      link.addEventListener('click',()=>{
        let productId = link.dataset.productId;
        deleteFromCart(productId); 
        // let container = document.querySelector(`.js-cart-item-container-${productId}`);
        // container.remove();
        updateCartQuantity();
        renderOrderSummary();
        renderCheckoutHeader();
        renderPaymentSummary();
      })
    });


    function updateCartQuantity(){
      let cartQuantity = calculateCartQuantity();
      document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
    }

    document.querySelectorAll('.js-update-quantity-link').forEach((link)=>{
      link.addEventListener('click',()=>{
        let productId = link.dataset.productId;
        // productId.innerHTML = 'Update <input class="quantity-input"> <span class="save-quantity-link link-primary"> Save</span>';
        let container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.add('is-editing-quantity');
        container.classList.add('js-quantity-label');
        
      })
    })

    function saveLinkUpdate(productId){
      let container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');
      container.classList.remove('js-quantity-label');
      let quantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
      if(quantity>=0 && quantity<1000){
        document.querySelector(`.js-updated-quantity-label-${productId}`).textContent= quantity;
        updateQuantity(productId,quantity);
        updateCartQuantity();
      }
      else{
        alert("Please input a valid quantity: it can between 0-1000");
      }
    }

    document.querySelectorAll('.js-save-quantity-link').forEach((link)=>{
      link.addEventListener('click',()=>{
        let productId = link.dataset.productId;
        saveLinkUpdate(productId);
        renderPaymentSummary();
        renderCheckoutHeader();
      })
    })

    document.querySelectorAll('.js-delivery-option').forEach((element)=>{
      element.addEventListener('click',()=>{
        let {productId,deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId,deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      })
    })

    

  }


