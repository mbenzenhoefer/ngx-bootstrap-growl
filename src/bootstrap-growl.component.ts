import {Component, OnInit, Input} from "@angular/core";
import {BootstrapGrowlService} from "./bootstrap-growl.service";
import {BootstrapAlert} from "./bootstrap-alert.model";

@Component({
    selector: "bootstrap-growl",
    template: `<div *ngFor="let alert of alerts">
        <div class="alert alert-{{alert.type}}" [ngClass]="{'alert-dismissible': alert.dismissable}" role="alert">
          <button type="button" class="close" data-dismiss="alert" (click)="closeAlert(alert)" *ngIf="alert.dismissable">
            <span aria-hidden="true">&times;</span>
          </button>
          <span [innerHtml]="alert.message"></span>
        </div>
    </div>`
})
export class BootstrapGrowlComponent implements OnInit {
    @Input() alertCount: number;
    @Input() autoClose: number;

    public alerts: BootstrapAlert[];

    constructor(private growlService: BootstrapGrowlService) {

    }

    ngOnInit() {
        this.growlService.configure(this.alertCount, this.autoClose);
        this.growlService.alerts.subscribe((alerts: BootstrapAlert[]) => {
            this.alerts = alerts;
        });
    }

    public closeAlert(alert: BootstrapAlert): void {
        // service is automatically notified!
        if (alert.dismissable) {
            this.growlService.removeAlert(alert);
        }
    }

}
