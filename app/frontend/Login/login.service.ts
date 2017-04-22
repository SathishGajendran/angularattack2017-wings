import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';

@Injectable()
export class loginService implements CanActivate{
     
     constructor(private router: Router){

     }

      canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        // let routesneedAuthentication = ['/home'],
        //     routesNoneedAuthentication=['/login'];
        // if (routesneedAuthentication.indexOf(state.url) > -1){
        //     if ((<any>window).isAuthenticatedUser){
        //         return true;
        //     } else {
        //         this.router.navigate(['login']);
        //         return false;
        //     }
        // } else {
        //     if ((<any>window).isAuthenticatedUser){
        //         this.router.navigate(['']);
        //         return false;
        //     } else{
        //         return true;
        //     }
        // }

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