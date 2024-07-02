import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { DropdownItem } from 'src/app/utils/utils';

@Component({
  selector: 'ui-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  constructor(private eRef: ElementRef) { }

  @Input() selectedItem?: DropdownItem;
  @Input() label: string = 'Select an Option';
  @Input() bgColors!: Map<string, string>;
  @Input()
  set items(value: DropdownItem[]) {
    if (value) {
      this._items = value;
    }
  }

  @Output() selectItem: EventEmitter<DropdownItem> = new EventEmitter<DropdownItem>();

  menuOpen: boolean = false;
  private _items: DropdownItem[] = [];

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      if (this.menuOpen) {
        this.menuOpen = false;
      }
    }
  }

  selectItemEmit(item: DropdownItem): void {
    this.selectItem.emit(item);
    this.selectedItem = item;
    this.menuOpen = false;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  get selectedItemExistsInItems(): boolean {
    return this._items.some(item => item.value === this.selectedItem?.value);
  }

  get unselectedItems(): DropdownItem[] {
    return this._items.filter(item => item.value !== this.selectedItem?.value);
  }

  get items(): DropdownItem[] {
    return this._items;
  }
}
