export let cart ;

loadFromStorage();

export function loadFromStorage(){
    cart = JSON.parse(localStorage.getItem('cart')) || [{
        productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity : 2,
        deliveryOptionId : '1'
    },
    {
        productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity : 1,
        deliveryOptionId : '2'
    }];
}

function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export { saveToStorage };

export function addToCart(productId){
    let matchingitem;
    cart.forEach((cartItem)=>{
        if(cartItem.productId===productId){
            matchingitem=cartItem;
        }
    });

    let element = document.querySelector(`.js-select-quantity-${productId}`);
    let selectQuantity = element ? Number(element.value) : 0;


    if(matchingitem){
        matchingitem.quantity+= selectQuantity;
    }
    else{
        cart.push({
            productId : productId,
            quantity : selectQuantity,
            deliveryOptionId : '1'
        });
    }

    saveToStorage();
}

export function deleteFromCart(productId){
    let newCart = [];
    cart.forEach((cartItem)=>{
        if(productId!==cartItem.productId){
            newCart.push(cartItem);
        }
    })
    cart = newCart;
    saveToStorage();
}

export function calculateCartQuantity(){
    let cartQuantity =0;
    cart.forEach((matchingitem)=>{
        cartQuantity+= matchingitem.quantity; 
    });
    return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
    let matchingItem;
  
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    matchingItem.quantity = newQuantity;
  
    saveToStorage();
  }

  export function updateDeliveryOption(productId,deliveryOptionId){
    let matchingitem;
    cart.forEach((cartItem)=>{
        if(cartItem.productId===productId){
            matchingitem=cartItem;
        }
    });
    matchingitem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
  }

//   export function loadCart(fun){
//     let xhr = new XMLHttpRequest();
  
//     xhr.addEventListener('load',()=>{
//       products = JSON.parse(xhr.response).map((productDetails)=>{
//         if(productDetails.type==='clothing'){
//           return new Clothing(productDetails);
//         }
//         if(productDetails.type==='appliances'){
//           return new Appliances(productDetails);
//         }
//         return new Product(productDetails);
//       });
  
//       fun();
//       console.log("load products");
//     })
  
//     xhr.open('GET','https://supersimplebackend.dev/products');
//     xhr.send();
//   }