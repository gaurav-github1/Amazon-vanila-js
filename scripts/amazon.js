// let products = [{
//     image : 'images/products/athletic-cotton-socks-6-pairs.jpg',
//     name : 'Black and Gray Athletic Cotton Socks - 6 Pairs',
//     rating : {
//         stars: 4.5,
//         count: 87
//     },
//     priceCents : 1090
// },{
//     image:'images/products/intermediate-composite-basketball.jpg',
//     name : 'Intermediate Size Basketball',
//     rating:{
//         stars : 4,
//         count : 127
//     },
//     priceCents:2095
// },{
//     image:'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
//     name : 'Intermediate Size Basketball',
//     rating:{
//         stars : 4,
//         count : 127
//     },
//     priceCents:2095
// }];

import {cart, addToCart, calculateCartQuantity} from '../data/cart.js';
import { formatCurrency } from './utils/money.js';  
import { products, loadProducts} from '../data/products.js';
import { initializeSearch, onAmazonSearch } from './shared/search.js';

// Store the original product list for filtering
let filteredProducts = [];
let searchTerm = '';

// Initialize the search functionality
initializeSearch();

// Listen for search events
onAmazonSearch((term) => {
  searchTerm = term ? term.toLowerCase() : '';
  filterAndRenderProducts();
});

// Load products and then render them
loadProducts(() => {
  // Initialize filtered products with all products
  filteredProducts = [...products];
  renderProductsGrid();
});

function filterAndRenderProducts() {
  if (!searchTerm) {
    // If search term is empty or null, show all products
    filteredProducts = [...products];
  } else {
    // Filter products based on search term, including keywords
    filteredProducts = products.filter(product => {
      // Check product name
      if (product.name.toLowerCase().includes(searchTerm)) {
        return true;
      }
      
      // Check product type
      if (product.type && product.type.toLowerCase().includes(searchTerm)) {
        return true;
      }
      
      // Check product keywords if available
      if (product.keywords && Array.isArray(product.keywords)) {
        return product.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchTerm)
        );
      }
      
      // Check product description if available
      if (product.description && product.description.toLowerCase().includes(searchTerm)) {
        return true;
      }
      
      return false;
    });
  }
  
  renderProductsGrid();
}

function renderProductsGrid(){
  let productHTML = '';

  if (filteredProducts.length === 0 && searchTerm) {
    // Show a message when no products match the search
    document.querySelector('.js-products-grid').innerHTML = `
      <div class="no-products-message">
        No products found matching "${searchTerm}". 
        <a href="#" class="clear-search">Clear search</a>
      </div>
    `;
    return;
  }

  // Add search results counter if searching
  if (searchTerm) {
    productHTML += `
      <div class="search-results-info">
        Showing ${filteredProducts.length} ${filteredProducts.length === 1 ? 'result' : 'results'} for "${searchTerm}"
        <a href="#" class="clear-search">Clear search</a>
      </div>
    `;
  }

  filteredProducts.forEach((product) =>{
      productHTML += `
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select class="js-select-quantity-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${product.extraInfoHtml()}

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
      `;
  });

  document.querySelector('.js-products-grid').innerHTML = productHTML;
  updateCartQuantity();
  attachAddToCartEvents();
}

function updateCartQuantity(){
  let cartQuantity = calculateCartQuantity();
  document.querySelector('.cart-quantity').innerHTML = cartQuantity;
}

let addedProductIds = {};

function addedMessage(productId){
  let addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
  if (!addedMessage) return;
  
  addedMessage.classList.add('added-to-cart-visible');

  let previousTimeoutId = addedProductIds[productId];
  if(previousTimeoutId){
    clearTimeout(previousTimeoutId);
  }

  let setTimeoutId = setTimeout(() => {
    addedMessage.classList.remove('added-to-cart-visible');
  }, 1500);

  addedProductIds[productId] = setTimeoutId;
}

function attachAddToCartEvents() {
  document.querySelectorAll('.js-add-to-cart').forEach((button) =>{
    button.addEventListener('click',()=>{
      let productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();
      addedMessage(productId);  
    });
  });
}