import { Component, EventEmitter, Input, OnDestroy, Output } from "@angular/core";

@Component({
  selector: 'ui-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {
  @Input() searchText: string = '';
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  onSearchChange(value: string): void {
    this.search.emit(value);
  }
}
