import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class ShardService {
    user: any = {
        name: {}
    };

    constructor(private http: Http) {
        
    }

    getUser() {
        return this
            .http
            .get('/users/me')
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

     private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }


}