# ng-bootstrap-growl - [Angular >= 2](http://angular.io/) service to show [Bootstrap 4](http://v4-alpha.getbootstrap.com/) growl (alert)

## Features
* add custom growl alerts somewhere in your application
* specify a maximum of alerts to show
* specify a timeout for the alerts
* display HTML in your alert
* specify whether an alert should be dismissable or not
* use all Bootstrap alert types

## Demo
TBD

## Dependencies
* [Angular >= 2](https://angular.io) (>= 2.4.5)
* [Bootstrap 4](https://v4-alpha.getbootstrap.com) (4.0.0-alpha.6)

## Installation
You need to install and configure the dependencies above, afterwards:
```shell
npm install --save ngx-bootstrap-growl
```
After installation, add the service and the component to your module:
```js
import {BootstrapGrowlComponent, BootstrapGrowlService} from "ngx-bootstrap-growl";
@NgModule({
    imports: [
        // ...
        BootstrapGrowlModule
    ],
    // ...
})
```
## Integration
Add the component somewhere in your root template:
```html
<bootstrap-growl [alertCount]="3" [autoClose]="10000"></bootstrap-growl>
```
**Parameters (optional)**
* `alertCount`: maximum number of alerts to show (defaults: `999`)
* `autoClose`: time in milliseconds (defaults: `-1` - never closed)

## Style
You can configure the display area of the alerts however you want. Just use the following selector:
```css
bootstrap-growl{
  position:absolute;
  right:8px;
  top:8px;
  z-index:10;
}
```

## Usage
```js
export class AnyComponent{
  constructor(private bootstrapGrowlService: BootstrapGrowlService) {
  }

  addGrowlAlert(){
    //general usage
    this.bootstrapGrowlService.addAlert([message: string], [type: BootstrapAlertType], [dismissable?: boolean]);
    //examples
    this.bootstrapGrowlService.addAlert("any custom message", BootstrapAlertType.SUCCESS);
    this.bootstrapGrowlService.addAlert("any custom message <b>with</b> HTML", BootstrapAlertType.INFO);
    this.bootstrapGrowlService.addAlert("any custom message", BootstrapAlertType.WARNING);
    this.bootstrapGrowlService.addAlert("any custom message", BootstrapAlertType.DANGER, false);
  }
}
```







