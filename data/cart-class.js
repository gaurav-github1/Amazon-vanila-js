class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage(){   
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [{
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
    saveToStorage(){
        localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
    }
    addToCart(productId){
        let matchingitem;
        this.cartItems.forEach((cartItem)=>{
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
            this.cartItems.push({
                productId : productId,
                quantity : selectQuantity,
                deliveryOptionId : '1'
            });
        }
    
        this.saveToStorage();
    }
    deleteFromCart(productId){
        let newCart = [];
        this.cartItems.forEach((cartItem)=>{
            if(productId!==cartItem.productId){
                newCart.push(cartItem);
            }
        })
        this.cartItems = newCart;
        this.saveToStorage();
    }
    calculateCartQuantity(){
        let cartQuantity =0;
        this.cartItems.forEach((matchingitem)=>{
            cartQuantity+= matchingitem.quantity; 
        });
        return cartQuantity;
    }
    updateQuantity(productId, newQuantity) {
        let matchingItem;
      
        this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.productId) {
            matchingItem = cartItem;
          }
        });
      
        matchingItem.quantity = newQuantity;
      
        this.saveToStorage();
    }
    updateDeliveryOption(productId,deliveryOptionId){
        let matchingitem;
        this.cartItems.forEach((cartItem)=>{
            if(cartItem.productId===productId){
                matchingitem=cartItem;
            }
        });
        matchingitem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }
}

let cart =new Cart('cart-oop');
let bussinessCart =new Cart('cart-business');

console.log(cart);
console.log(bussinessCart);