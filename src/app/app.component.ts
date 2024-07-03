import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SpinnerService } from './services/spinner/spinner.service';
import { AlertService } from './services/alert/alert.service';
import { AlertTypeOptions } from './utils/utils';
import { AutoUnsubscribeComponent } from './utils/auto-unsubscribe.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends AutoUnsubscribeComponent {
  isLoading$: Observable<boolean>;
  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: AlertTypeOptions = 'success';

  constructor(private spinnerService: SpinnerService, private alertService: AlertService) {
    super();
    this.isLoading$ = this.spinnerService.isLoading$;
    const alertSubscription$ = this.alertService.alert$.subscribe(alert => {
      this.alertMessage = alert.message;
      this.alertType = alert.type;
      this.showAlert = true;
      setTimeout(() => this.showAlert = false, 8000); // Hide after 8 seconds.
    });
    this.subscriptions.push(alertSubscription$);
  }
}
