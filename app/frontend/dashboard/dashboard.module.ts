import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MODULE_COMPONENTS, MODULE_ROUTES } from './dashboard.routes';
import { HttpModule } from '@angular/http';
import { GoalService } from './mygoals/mygoal.service';
import { MyGoalsComponent } from './mygoals/mygoals.component';

@NgModule({
    imports: [
        RouterModule.forChild(MODULE_ROUTES),
        HttpModule
    ],
    declarations: [MyGoalsComponent, MODULE_COMPONENTS],
    providers: [GoalService]
})

export class DashboardModule { }
