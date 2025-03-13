import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProductsFetch } from "../data/products.js";
import { initializeSearch } from "./shared/search.js";
// import '../data/cart-class.js';
// import '../data/car.js';
// import '../data/backend-practice.js';

async function loadPage(){
    try{
        await loadProductsFetch();
    }catch(error){
        console.log("Unexpected error occur, Please try later.");
    }

    // Initialize search functionality
    initializeSearch();
    
    // Render checkout components
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();




// loadProductsFetch().then(()=>{
    // renderCheckoutHeader();
    // renderOrderSummary();
    // renderPaymentSummary();
// })

// Promise.all([
//     new Promise((resolve)=>{
//         loadProducts(()=>{
//             resolve('value1');
//         })
//     }),
//     new Promise((resolve)=>{
//         loadCart(()=>{
//             resolve();
//         })
//     })
// ]).then((values)=>{
//     console.log(values);
//     renderCheckoutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
// })

// loadProducts(()=>{
//     renderCheckoutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
// })


