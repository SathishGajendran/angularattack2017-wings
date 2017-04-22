/**
 * @module app/frontend/app/components
 * @name app
 * @description Application Component
 */

/** Modules */
import {Component} from '@angular/core';
import {Router} from '@angular/router';

/** Component */
@Component({
    selector: 'app-root',
    template: `
    <div>
        <router-outlet></router-outlet>
    </div>
    `
})

/**
 * @class App
 */
export class AppComponent {
    /**
     * constuctor
     * @class App
     */
    constructor() {
        /** Code */
    }
}