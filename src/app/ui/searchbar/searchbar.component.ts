import { Component, EventEmitter, OnDestroy, Output } from "@angular/core";
import { BehaviorSubject, Subscription, debounceTime, distinctUntilChanged } from "rxjs";
import { StateService } from "src/app/services/state/state.service";
import { AutoUnsubscribeComponent } from "src/app/utils/auto-unsubscribe.component";

@Component({
  selector: 'ui-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent extends AutoUnsubscribeComponent implements OnDestroy {
  searchText: string = '';
  private searchSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private firstEmit = false; // Flag to skip the initial emission of empty string.

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  constructor(private stateService: StateService) {
    super();
    const saerchSubscription$ = this.searchSubject.pipe(
      debounceTime(450),
      distinctUntilChanged()
    ).subscribe(searchText => {
      if (this.firstEmit || searchText !== '') {
        this.stateService.searchTextSet = searchText;
        this.firstEmit = true; // Set the flag to true after the first emission.
      }
    });
    this.subscriptions.push(saerchSubscription$);

    const searchTextSubsciption$ = this.stateService.searchText$.subscribe(searchText => {
      this.searchText = searchText;
    });
    this.subscriptions.push(searchTextSubsciption$);
  }

  onSearchChange(value: string): void {
    this.searchText = value;
    this.searchSubject.next(this.searchText);
  }
}
