import { addToCart, cart ,loadFromStorage } from "../../data/cart.js";


describe('test suite : addToCart', () => {
    it('adding existing product to cart', () => {
        spyOn(localStorage,'setItem');

        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity:1,
                deliveryOptionId:'1'}]);
        })

        loadFromStorage(); 
        spyOn(document, 'querySelector').and.returnValue({ value: '1' });
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');


        expect(cart.length).toEqual(1);
        expect(cart[0].quantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
    it('adding new product to cart', () => {
        spyOn(localStorage,'setItem');

        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        })

        loadFromStorage(); 

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
});