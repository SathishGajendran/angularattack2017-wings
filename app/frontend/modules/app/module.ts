/**
 * @module app/frontend/app
 * @name app
 * @description Angular Module
 */

/** Modules */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

/** Components */
import { AppComponent } from './components/app';
import { HomeComponent } from './components/home';

/** Routes */
const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: []
    }
];

/** Angular Modules */
@NgModule({
    imports: [
        BrowserModule,
        MaterialModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes, { useHash: false }),
        HttpModule
    ],
    declarations: [
        AppComponent,
        HomeComponent
    ],
    entryComponents: [],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
