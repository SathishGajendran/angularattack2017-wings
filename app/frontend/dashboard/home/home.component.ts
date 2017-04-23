import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import initDemo = require('../../assets/js/charts.js');

declare var $: any;

@Component({
    selector: 'home-cmp',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    bmiHeight: number;
    bmiWeight: number;
    bmi: any = {
        info: {}
    };

    ngOnInit() {

    }

    getBMIStatus(value) { console.log(value);
        if (value < 18.5) {
            return {
                className: 'warning',
                name: 'Underweight'
            };
        } else if ((18.5 <= value) && (value <= 24.9)) {
            return {
                className: 'primary',
                name: 'Normal'
            };
        } else if ((25 <= value) && (value <= 29.9)) {
            return {
                className: 'warning',
                name: 'Overweight'
            };
        } else {
            return {
                className: 'danger',
                name: 'Obesity'
            };
        }
    }

    displayBmiShow() {
        if (this.bmiHeight && this.bmiWeight) {
            let data: number = ((this.bmiWeight / this.bmiHeight / this.bmiHeight) * 10000);
            console.log(data);
            this.bmi.value = data.toFixed(2);
            this.bmi.info = this.getBMIStatus(data.toFixed(2));
            console.log(this.getBMIStatus(data.toFixed(2)));
            console.log('--:')
            return true;
        } else {
            return false;
        }
    }
}
