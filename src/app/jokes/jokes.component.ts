import { Component } from '@angular/core';
import { Subscription, catchError, skip, take } from 'rxjs';
import { JokesService } from './services/jokes/jokes.service';
import { ApiResponse, CopyJoke, Joke } from './interfaces/joke';
import { FormGroup } from '@angular/forms';
import { StateService } from '../services/state/state.service';
import { AutoUnsubscribeComponent } from '../utils/auto-unsubscribe.component';
import { RandomJokesAmount } from './enums/joke';
import { DropdownItem } from '../utils/interfaces/interfaces';
import { Sorting } from '../utils/enums/enums';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.scss']
})
export class JokesComponent extends AutoUnsubscribeComponent {
  apiResponse!: ApiResponse;
  jokes: Joke[] = [];
  sort: DropdownItem = { value: Sorting.id_desc, label: 'Newest to Latest' };
  openNewJokeDialog: boolean = false;
  userJokes: number[] = [];
  hideData: boolean = false;
  searchText: string = '';
  selectedJokeType: DropdownItem = {} as DropdownItem;
  sortings = Sorting;

  private suppressSearch: boolean = true;
  private jokesSubscription?: Subscription;

  constructor(private jokesService: JokesService, private stateService: StateService) {
    super();
    const searchTextSubscription$ = this.stateService.searchText$
    .pipe(skip(1))
      .subscribe(searchText => {
        this.searchText = searchText;
        if (!this.suppressSearch) {
          this.getAllJokes(1, 10, this.sort.value as Sorting);
        }
      });
    this.subscriptions.push(searchTextSubscription$);
    const userJokesSubscription$ = this.stateService.userJokes$.subscribe(userJokes => {
      this.userJokes = userJokes;
    });
    this.subscriptions.push(userJokesSubscription$);
  }

  ngOnInit() {
    this.getAllJokes(1, 10, this.sort.value as Sorting);
  }

  getAllJokes(page: number = 1, limit: number = 10, sort: Sorting = Sorting.id_desc, resetSearchAndType?: boolean): void {
    this.suppressSearch = true; // Set the flag to suppress search.
    if (resetSearchAndType) {
      this.stateService.searchTextSet = '';
      this.selectedJokeType = {} as DropdownItem;
    }
    this.checkSubscriptions();
    // Create a new subscription.
    this.jokesSubscription = this.jokesService.getAllJokes(page, limit, sort, this.searchText || '', this.selectedJokeType.value)
      .pipe(
        take(1), // Take only the first emission and complete
        catchError(err => {
          this.hideData = true;
          return [];
        })
      )
      .subscribe(res => {
        this.apiResponse = res;
        this.jokes = res.data;
        this.suppressSearch = false; // Reset the flag after the data is fetched.
      });
  }

  onPageChange(page: number): void {
    this.suppressSearch = true;
    this.getAllJokes(page, 10, this.sort.value as Sorting);
  }

  onSortChange(sort: DropdownItem): void {
    this.suppressSearch = true;
    this.sort = sort;
    this.getAllJokes(1, 10, this.sort.value as Sorting);
  }

  orderById(): void {
    this.suppressSearch = true;
    this.sort.value = this.sort.value === Sorting.id_asc ? Sorting.id_desc : Sorting.id_asc;
    this.getAllJokes(1, 10, this.sort.value as Sorting);
  }

  orderByLikes(): void {
    this.suppressSearch = true;
    this.sort.value = this.sort.value === Sorting.likes_asc ? Sorting.likes_desc : Sorting.likes_asc;
    this.getAllJokes(1, 10, this.sort.value as Sorting);
  }

  getRandomJokes(amount: RandomJokesAmount): void {
    this.suppressSearch = true;
    if (amount === RandomJokesAmount.one) {
      this.jokesSubscription = this.jokesService.getRandomJoke(this.searchText).subscribe(res => {
        this.apiResponse = res;
        this.jokes = res.data;
        this.suppressSearch = false;
      });
    } else {
      this.jokesSubscription = this.jokesService.getTenRandomJokes(this.searchText).subscribe(res => {
        this.apiResponse = res;
        this.jokes = res.data;
        this.suppressSearch = false;
      });
    }
  }

  getJokesByType(type: DropdownItem): void {
    this.selectedJokeType = type;
    this.suppressSearch = true;
    this.checkSubscriptions();
    // Create a new subscription.
    this.jokesSubscription = this.jokesService.getAllJokes(1, 10, this.sort.value, this.searchText, this.selectedJokeType.value).subscribe(res => {
      this.apiResponse = res;
      this.jokes = res.data;
      this.suppressSearch = false;
    });
  }

  searchJokes(): void {
    this.jokesService.getAllJokes(1, 10, this.sort.value, this.searchText).subscribe(res => {
      this.apiResponse = res;
      this.jokes = res.data;
    });
  }

  checkSubscriptions(): void {
    // Unsubscribe from the previous subscription if it exists.
    if (this.jokesSubscription) {
      this.jokesSubscription.unsubscribe();
    }
  }

  createJoke(): void {
    this.openNewJokeDialog = true;
  }

  saveNewJoke(fg: FormGroup): void {
    const joke: Joke = {
      setup: fg.get('setup')?.value,
      punchline: fg.get('punchline')?.value,
      type: fg.get('type')?.value
    };
    this.jokesService.createJoke(joke)
      .pipe(take(1)) // Take only the first emission and complete
      .subscribe(res => {
        this.jokes.unshift(res);
        this.stateService.addUserJoke(res.id!!);
      });
    this.openNewJokeDialog = false;
  }

  cancelNewJoke(): void {
    this.openNewJokeDialog = false;
  }
}
