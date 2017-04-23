import { Component, OnInit } from '@angular/core';
import { ShardService } from '../../shared/shared.service';

@Component({
    selector: 'user-cmp',
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
    user:object;
    
    constructor(shardService:ShardService){
        this.user = shardService.user;
    }
    ngOnInit(){
        // $.getScript('../../../assets/js/material-dashboard.js');

    }


}
