import { Component } from '@angular/core';

import { GoalService } from './mygoal.service';

@Component({
    selector: 'mygoal-cmp',
    templateUrl: 'mygoals.component.html'
})

export class MyGoalsComponent {
    newGoal: any = {
        goalType: 'daily'
    };
    showGoalPanel: boolean = false;
    goals: any = [];
    logActivity: any = {};
    showWeight: boolean = false;
    showProgress: boolean = false;

    constructor(private Goals: GoalService) {
        this.Goals.getAll()
            .then((result) => {
                this.goals = result;
            })
    }

    logMonthlyActivity (item, index) {
        let activity = Object.assign({}, this.logActivity);
        this.logActivity = {};
        activity.goalId = item._id;
        activity.status = 'done';

        this.Goals.saveActivity(activity)
            .then((data) => {
                (this.goals[index].activity).push(data);
                this.showWeight = this.showProgress = false;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getProgressPercentage(item) {
        if (item.isWeightLose) {
            let activity = item.activity;
            if (activity.length) {
                let diff = item.currentWeight - item.goalWeight;
                let log = activity[activity.length-1];
                let newWeight = item.currentWeight - log.weight;
                let percentage = (newWeight/diff) * 100;
                return (Math.floor(percentage)) + '%';
            } else {
                return '0%';
            }
        } else {
            let activity = item.activity;
            if (activity.length) {
                let record = activity[activity.length-1];
                return record.progress + '%';
            } else {
                return '0%';
            }
        }
    }

    isTodayActivity(input) {
        // Create date from input value
        var inputDate = new Date(input);

        // Get today's date
        var todaysDate = new Date();

        // call setHours to take the time out of the comparison
        if (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
            return true;
        } else {
            return false;
        }
    }

    isTodayActivityEnabled(activities: any = []) {
        if (activities.length) {
            let item = activities[activities.length-1];
            return !(this.isTodayActivity(item.createdAt));
        } else {
            return true;
        }
    }

    getGoalCardColor(goalType: string) {
        if (goalType === 'daily') {
            return 'blue';
        } else {
            return 'orange';
        }
    }

    doneDailyActivity(item: any, index: number) {
        let activity: any = {
            goalId: item._id,
            status: 'done'
        };
        this.Goals.saveActivity(activity)
            .then((data) => {
                (this.goals[index].activity).push(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    displayPanel(flag: boolean) {
        this.newGoal = {
            goalType: 'daily',
            disabled: false,
            isWeightLose: false,
            currentWeight: 0
        };
        this.showGoalPanel = flag;
    }

    saveGoal() {
        this.Goals.save(this.newGoal)
            .then((data) => {
                this.goals.push(data);
                this.displayPanel(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
