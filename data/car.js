class Car{
    #brand;
    #model;
    speed = 0;
    isTrunkOpen = false;

    constructor(carDetail){
        this.#brand = carDetail.brand;
        this.#model = carDetail.model;
    }

    displayInfo(){
        console.log(`${this.#brand} ${this.#model} , Speed : ${this.speed} km/h, Trunk : ${this.isTrunkOpen ? 'Open' : 'Closed'}`);
    }

    go(){
        if(this.speed<=195 && this.isTrunkOpen!=true){
            this.speed+=5;
        }
    }

    brake(){
        if(this.speed>=5){
            this.speed-=5;
        }
    }

    openTrunk(){
        if(this.speed==0){
            this.isTrunkOpen = true;
        }
    }

    closeTrunk(){
        this.isTrunkOpen = false;
    }
}

class RaceCar extends Car{
    acceleration;

    constructor(carDetail){
        super(carDetail);
        this.acceleration = carDetail.acceleration;
    }

    go(){
        if(this.speed<=295 && this.isTrunkOpen!=true){
            this.speed+=this.acceleration;
        }
    }

    openTrunk(){
        if(this.speed==0){
            this.isTrunkOpen = false;
        }
    }

    closeTrunk(){
        this.isTrunkOpen = false;
    }
    // displayInfo() {
    //     super.displayInfo();
    // }
}

let car1 = new Car({
    brand: 'Tesla',
    model: 'model 3'
});

let car2 = new Car({
    brand: 'Toyato',
    model: 'corolla'
})

// console.log(car1,car2);

car1.go();
// car2.openTrunk();
car2.go();
car2.go();
car2.go();



car1.displayInfo();
car2.displayInfo();

let car3 = new RaceCar({
    brand : 'Mclaren',
    model : 'F1',
    acceleration : 20
})

car3.displayInfo();

car3.openTrunk();

for(let i=0;i<100;i++){
    car3.go();
}
car3.displayInfo();