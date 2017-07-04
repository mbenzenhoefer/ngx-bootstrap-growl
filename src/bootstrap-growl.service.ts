import { Injectable } from "@angular/core";
import { BootstrapAlertType } from "./bootstrap-alert-type.enum";
import { BootstrapAlert } from "./bootstrap-alert.model";
import {
    Subject,
    Observable
} from "rxjs";

@Injectable()
export class BootstrapGrowlService {
    public alerts: Subject<BootstrapAlert[]> = new Subject<BootstrapAlert[]>();

    public alertHolder: BootstrapAlert[] = new Array<BootstrapAlert>();

    alertCount = 999;
    autoClose = -1;

    constructor() {
    }

    public configure(alertCount: number, autoClose: number): void {
        if (typeof alertCount !== "undefined" && alertCount !== null) {
            if (!isNaN(alertCount) && alertCount > 0) {
                this.alertCount = alertCount;
            } else {
                console.error("parameter alertCount must be a valid number > 0, to leave default, do not provide this parameter");
            }
        }
        if (typeof autoClose !== "undefined" && autoClose !== null) {
            if (!isNaN(autoClose) && autoClose > 0) {
                this.autoClose = autoClose;
            } else {
                console.error("parameter autoClose must be a valid number > 0, to leave default, do not provide this parameter");
            }
        }
    }

    public addAlert(message: string, type: BootstrapAlertType, autoClose?: number, dismissable?: boolean): void {
        if (this.alertHolder.length >= this.alertCount) {
            // remove the oldest alert
            this._removeAlertById(0, this.alertHolder, this.alerts);
        }
        if (typeof dismissable === "undefined" || dismissable === null) {
            dismissable = true;
        }
        let cssType = this._convertTypeToCssClass(type);
        let alert = {message: message, type: cssType, dismissable: dismissable};
        this.alertHolder.push(alert);
        this.alerts.next(this.alertHolder);
        if (autoClose && autoClose > -1) {
            this._scheduleAlertHide(autoClose, alert);
        } else if (this.autoClose > -1) {
            this._scheduleAlertHide(this.autoClose, alert);
        }
    }

    public removeAlert(alert: BootstrapAlert): void {
        this._removeAlert(alert, this.alertHolder, this.alerts);
    }

    private _removeAlert(alert: BootstrapAlert, alertHolder: BootstrapAlert[], alerts: Subject<BootstrapAlert[]>): void {
        let index: number = alertHolder.indexOf(alert);
        this._removeAlertById(index, alertHolder, alerts);
    }

    private _scheduleAlertHide(timeout: number, alert: BootstrapAlert) {
        let displayTimeout = Observable.timer(timeout);
        displayTimeout.subscribe(() => {
            this._removeAlert(alert, this.alertHolder, this.alerts);
        });
    }

    private _convertTypeToCssClass(type: BootstrapAlertType): string {
        if (type === BootstrapAlertType.SUCCESS) {
            return "success";
        } else if (type === BootstrapAlertType.INFO) {
            return "info";
        } else if (type === BootstrapAlertType.WARNING) {
            return "warning";
        } else if (type === BootstrapAlertType.DANGER) {
            return "danger";
        }
    }

    private _removeAlertById(id: number, alertHolder: BootstrapAlert[], alerts: Subject<BootstrapAlert[]>): void {
        alertHolder.splice(id, 1);
        alerts.next(alertHolder);
    }

}
