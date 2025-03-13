import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export let deliveryOptions = [{
    id:'1',
    deliveryDays: 7,
    priceCents:0
},{
    id:'2',
    deliveryDays: 3,
    priceCents:499
},{
    id:'3',
    deliveryDays: 1,
    priceCents:999
}]

export function getDeliveryOption(deliveryOptionId){
    let deliveryOption;

    deliveryOptions.forEach((option)=>{
        if(option.id===deliveryOptionId){
        deliveryOption = option;
        }
    })

    return deliveryOption;
}

export function calculateDeliveryDate(deliveryOption){
    let today = dayjs();
    
    let toAddDeliveryDate = deliveryOption.deliveryDays;
    for(let i = 0; i < toAddDeliveryDate; i++){
        let checkDay = today.add(i, 'days');
        // Check if the day is Sunday (0) or Saturday (6)
        if(checkDay.day() === 0 || checkDay.day() === 6){
            toAddDeliveryDate++;
        }
    }
    let deliveryDate = today.add(toAddDeliveryDate, 'days');
    let dateString = deliveryDate.format('dddd, MMMM D');
    return dateString;
}