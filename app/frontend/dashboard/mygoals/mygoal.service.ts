import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GoalService {

    constructor(private http: Http) {
    }


    getAll(): Promise<any> {
        return this
            .http
            .get('/goals')
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

    save(data: Object): Promise<any> {
        return this
            .http
            .post('/goals', data)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    saveActivity(data: Object): Promise<any> {
        return this
            .http
            .post('/goals/activity', data)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
}
