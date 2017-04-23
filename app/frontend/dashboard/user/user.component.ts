import { Component, OnInit } from '@angular/core';
import { ShardService } from '../../shared/shared.service';

@Component({
    selector: 'user-cmp',
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {
    user: any = {
        name: {}
    };

    constructor(private shardService: ShardService) {
        this.shardService.getUser()
            .then((response) => {
                this.user = response;
            });        
    }
    ngOnInit() {
        // $.getScript('../../../assets/js/material-dashboard.js');

    }
}
