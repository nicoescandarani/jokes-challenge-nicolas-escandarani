import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AlertTypeOptions } from 'src/app/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new Subject<{ message: string; type: AlertTypeOptions }>();
  alert$ = this.alertSubject.asObservable();

  showError(message: string, type: AlertTypeOptions = 'error') {
    this.alertSubject.next({ message, type });
  }
}
