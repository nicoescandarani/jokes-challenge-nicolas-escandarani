import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  // ! If the desired icon has a viewbox other than 0 -960 960 960 it must be set with the viewbox input.

  @Input() name: string = '';
  @Input() size: number = 16;
  @Input() viewbox: string = '0 -960 960 960';
}
