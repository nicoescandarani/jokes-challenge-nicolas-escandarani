import { Component, EventEmitter, OnDestroy, Output } from "@angular/core";
import { BehaviorSubject, Subscription, debounceTime, distinctUntilChanged } from "rxjs";

@Component({
  selector: 'ui-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnDestroy {
  searchText: string = '';
  private subscription: Subscription = new Subscription();
  private searchSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private firstEmit = false; // Flag to skip the initial emission of empty string

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    this.subscription.add(
      this.searchSubject.pipe(
        debounceTime(450),
        distinctUntilChanged()
      ).subscribe(searchText => {
        if (this.firstEmit || searchText !== '') {
          this.search.emit(searchText);
          this.firstEmit = true; // Set the flag to true after the first emission
        }
      })
    );
  }

  onSearchChange(value: string): void {
    this.searchText = value;
    this.searchSubject.next(this.searchText);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
