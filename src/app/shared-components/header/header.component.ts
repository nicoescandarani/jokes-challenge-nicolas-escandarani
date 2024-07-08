import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UiModule } from 'src/app/ui/ui.module';
import { BehaviorSubject, debounceTime, distinctUntilChanged } from 'rxjs';
import { AutoUnsubscribeComponent } from 'src/app/shared/base-clases/auto-unsubscribe.component';
import { StateService } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, UiModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends AutoUnsubscribeComponent {
  searchText: string = '';
  private searchSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private firstEmit = false; // Flag to skip the initial emission of empty string.

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
