import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Route } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { homeComponent } from './home.component';
//import { DashboardComponent } from './dashboard/dashboard.component';
import { loginComponent } from './Login/login.component';
import { appComponent } from './app.component';
import { MODULE_COMPONENTS, MODULE_ROUTES } from './dashboard/dashboard.routes';
import { loginService } from './Login/login.service'
import { GoalService } from './dashboard/mygoals/mygoal.service';

//import { DashboardModule } from './dashboard/dashboard.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { MyGoalsComponent } from './dashboard/mygoals/mygoals.component'
import { UserComponent } from './dashboard/user/user.component';
//import { loginModule } from './Login/login.module';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const mainRouter: Route[] = [
    { path: 'login', component: loginComponent, canActivate: [loginService] },
    {
        path: 'home', component: homeComponent, canActivate: [loginService],
        children: MODULE_ROUTES
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
    imports: [
        BrowserModule,
        //      DashboardModule,
        SidebarModule,
        NavbarModule,
        FooterModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        //      loginModule,
        RouterModule.forRoot(mainRouter)
    ],
    declarations: [homeComponent, loginComponent, appComponent, MyGoalsComponent, UserComponent].concat(MODULE_COMPONENTS),
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, loginService, GoalService],
    bootstrap: [appComponent]
})
export class AppModule { }
