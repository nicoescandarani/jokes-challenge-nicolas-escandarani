import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() title: string = '';
  @Input() color: 'primary' | 'secondary' | 'tertiary' | 'cta' | 'empty' = 'primary';
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() centered: boolean = false;
  @Input() backgroundColor: string = '';

  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  onClickEmit(): void {
    this.onClick.emit();
  }
}
