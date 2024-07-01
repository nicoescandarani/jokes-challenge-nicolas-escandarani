import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent<T extends { label: string; value: any }> {
  constructor(private eRef: ElementRef) { }

  @Input() selectedItem?: T;
  @Input()
  set items(value: T[]) {
    if (value) {
      this._items = value;
    }
  }

  @Output() selectItem: EventEmitter<T> = new EventEmitter<T>();

  menuOpen: boolean = false;
  private _items: T[] = [];

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      if (this.menuOpen) {
        this.menuOpen = false;
      }
    }
  }

  selectItemEmit(item: T): void {
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

  get unselectedItems(): T[] {
    return this._items.filter(item => item.value !== this.selectedItem?.value);
  }

  get items(): T[] {
    return this._items;
  }
}
