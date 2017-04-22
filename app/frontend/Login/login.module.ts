import {router} from './login.routes';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
    imports:[
        RouterModule.forRoot(router)
    ]
})
export class loginModule{

}
