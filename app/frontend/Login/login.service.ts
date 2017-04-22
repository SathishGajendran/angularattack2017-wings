import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class loginService implements CanActivate{
     
     private user :Object

     constructor(private router: Router, private http: Http){

     }

    getUserDetails(): Promise<{}>{
         let self = this;
         return new Promise((resolve, reject) => {
              self.http.get('userdetails')
                .toPromise()
                .then(function(result :any){
                    console.log(result);
                    if(result.status == 200){
                         self.user = JSON.parse(result._body).user;
                        resolve(self.user);
                    }
                    else{
                        reject();
                    }
                },function(result){
                    reject(result);
                });
         });
        
     };

      canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        
        if((<any>window).isAuthenticatedUser){
            if(state.url != '/login'){
                return true;
            }
            else{
                this.router.navigate(['home'])
            }
        }
        else{
            if(state.url == '/login'){
                return true;
            }
            else{
                this.router.navigate(['login'])
            }
        }

    };
}