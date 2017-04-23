import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MODULE_COMPONENTS, MODULE_ROUTES } from './dashboard.routes';
import { HttpModule } from '@angular/http';
import { GoalService } from './mygoals/mygoal.service';
import { MyGoalsComponent } from './mygoals/mygoals.component';
import { UserComponent } from './user/user.component';

@NgModule({
    imports: [
        RouterModule.forChild(MODULE_ROUTES),
        HttpModule
    ],
    declarations: [MyGoalsComponent, UserComponent, MODULE_COMPONENTS],
    providers: [GoalService]
})

export class DashboardModule { }
