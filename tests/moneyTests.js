import { formatCurrency } from "../scripts/utils/money.js";

console.log("convert cents into dollors")

if(formatCurrency(2045) === '20.45'){
    console.log('passed');
} else{
    console.log('failed');
}

console.log('working with 0');

if(formatCurrency(0)=== '0.00'){
    console.log('passed');
} else{
    console.log('failed');
}

console.log('round up to nearnest int');

if(formatCurrency(2000.5) === '20.01'){
    console.log('passed');
} else{
    console.log('failed');
}

// console.log(formatCurrency(20005));