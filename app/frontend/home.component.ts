import { Component, OnInit } from '@angular/core';
import {LocationStrategy, PlatformLocation, Location} from '@angular/common';
import { loginService } from './Login/login.service';

declare var $:any;

@Component({
    selector: 'home-root',
    templateUrl: 'home.component.html'
})

export class homeComponent implements OnInit{
    location: Location;
    constructor(location:Location, private login: loginService) {
        this.location = location;
    }
    ngOnInit(){
        $.getScript('../assets/js/material-dashboard.js');
        $.getScript('../assets/js/initMenu.js');

        if((<any>window).isAuthenticatedUser){
            this.login.getUserDetails();
        }
    }
    public isMaps(path){
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice( 1 );
        if(path == titlee){
            return false;
        }
        else {
            return true;
        }
    }
}
