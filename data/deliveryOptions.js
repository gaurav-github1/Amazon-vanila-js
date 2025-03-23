// import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

// Create a simple date utility without external dependencies
function getNextBusinessDays(days) {
  const date = new Date();
  let businessDays = 0;
  while (businessDays < days) {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();
    if (day !== 0 && day !== 6) { // Skip weekends (0=Sunday, 6=Saturday)
      businessDays++;
    }
  }
  return date;
}

// Format a date as "Weekday, Month Day"
function formatDate(date) {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const weekday = weekdays[date.getDay()];
  const month = months[date.getMonth()];
  const day = date.getDate();
  
  return `${weekday}, ${month} ${day}`;
}

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

export function calculateDeliveryDate(deliveryOption) {
  const deliveryDate = getNextBusinessDays(deliveryOption.deliveryDays);
  return formatDate(deliveryDate);
}