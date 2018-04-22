'use strict';
const EventEmitter = require('events');
const util = require('util');

class Student extends EventEmitter{
    constructor(name, surname, age){
        super();
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.lesson = [];

        // emit fact of creating the instance
        process.nextTick( () => {
            this.emit('create');
        });

        // show instance age
        this.once('userAge', console.log);

        // get lesson info
        this.on('getPresent', () => {
            console.log('Lessons Info:');
            for(let i=0; i<this.lesson.length;i++){
                console.log(this.lesson[i]);
            }
        });

        // set lesson info - presence fact + mark inside the object (if exist and number of lessons is less than 12)
        this.on('setPresentMark', (presentParam, pointParam) => {
            if(presentParam && pointParam && this.lesson.length<12){
                this.lesson.push({present: presentParam, point: pointParam});
            } else{
                console.log('Number of lessons is exceded. Go rest.');
            }
        });

        // get instance av point
        this.on('averagePoint', () => {
            if(this.lesson){
                let sum = 0;
                for(let i=0;i<this.lesson.length;i++){
                    sum += parseInt(this.lesson[i].point);
                }
                console.log('Average mark: ', Math.round((sum/this.lesson.length*10))/10);
            } else {
                console.log('No lesson taken.');
            }
        });

        //get instance max point
        this.on('maxPoint', () => {
            let maxMark = 0;
            if(this.lesson){
                for(let i=0;i<this.lesson.length;i++){
                    if(this.lesson[i].point > maxMark){
                        maxMark = this.lesson[i].point;
                    };
                }

                
                console.log('Max mark: ', maxMark);
            } else {
                console.log('No lesson taken.');
            }
        });

        // check event
        this.on('check', () => {
            console.log('Check me!!1');
        });
    }
}

// creating instance
const Vasea = new Student('Dima', 'D', 25);

// echo instance status
Vasea.on('create', () => {
    console.log('instance created');
});

// check age once!
Vasea.emit('userAge', Vasea.age);
Vasea.emit('userAge', Vasea.age);

// setting and getting instance present and mark info
Vasea.emit('setPresentMark', true, 10);
Vasea.emit('setPresentMark', true, 9);
Vasea.emit('setPresentMark', true, 10);
Vasea.emit('setPresentMark', true, 8);
Vasea.emit('setPresentMark', true, 6);
Vasea.emit('setPresentMark', true, 12);
Vasea.emit('setPresentMark', true, 10);
Vasea.emit('setPresentMark', true, 10);
Vasea.emit('setPresentMark', true, 1);
Vasea.emit('setPresentMark', true, 10);
Vasea.emit('setPresentMark', true, 10);
Vasea.emit('setPresentMark', true, 10);
Vasea.emit('setPresentMark', true, 10); // will not be added
Vasea.emit('setPresentMark', true, 5);  // will not be added

Vasea.emit('getPresent');

// get average point
Vasea.emit('averagePoint');

// get max point
Vasea.emit('maxPoint');

// check event emition
let checkTimer = setInterval(() => {
    if(!Vasea.listenerCount()){
        Vasea.emit('check');
    }
}, 10000);
