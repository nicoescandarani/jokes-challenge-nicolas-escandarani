import { Component, Input } from '@angular/core';
import { AlertTypeOptions } from 'src/app/utils/types/types';

@Component({
  selector: 'ui-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() message: string = '';
  @Input() type: AlertTypeOptions = 'success';
  show: boolean = false;

  closeAlert(): void {
    this.show = false;
  }
}
