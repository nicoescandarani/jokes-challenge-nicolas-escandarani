import { Component } from '@angular/core';
import { Subscription, skip } from 'rxjs';
import { JokesService } from './services/jokes/jokes.service';
import { ApiResponse, CopyJoke, Joke } from './interfaces/joke';
import { RandomJokesAmount, DropdownItem, Sorting } from '../utils/utils';
import { Clipboard } from '@angular/cdk/clipboard';
import { FormGroup } from '@angular/forms';
import { StateService } from '../services/state/state.service';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.scss']
})
export class JokesComponent {
  apiResponse!: ApiResponse;
  jokes: Joke[] = [];
  sort: DropdownItem = { value: Sorting.id_desc, label: 'Newest to Latest' };
  openNewJokeDialog: boolean = false;
  likedJokes: number[] = [];

  private subscriptions: Subscription[] = [];
  private jokesSubscription?: Subscription;

  constructor(private jokesService: JokesService, private clipboard: Clipboard, private stateService: StateService) {
    const searchTextSubscription$ = this.stateService.searchText$
      .pipe(skip(1)) // Ignore the first value emitted by the observable.
      .subscribe(searchText => {
        this.searchJokes(searchText);
      });
    this.subscriptions.push(searchTextSubscription$);
  }

  ngOnInit() {
    this.getAllJokes(1, 10, this.sort.value as Sorting);
    this.likedJokes = JSON.parse(localStorage.getItem('likedJokes') || '[]');
  }

  getAllJokes(page: number = 1, limit: number = 10, sort: Sorting = Sorting.id_desc): void {
    this.checkSubscriptions();
    // Create a new subscription.
    this.jokesSubscription = this.jokesService.getAllJokes(page, limit, sort).subscribe(res => {
      this.apiResponse = res;
      this.jokes = res.data;
      this.stateService.searchTextSet = '';
    });
  }

  onPageChange(page: number): void {
    this.getAllJokes(page, 10, this.sort.value as Sorting);
  }

  onSortChange(sort: DropdownItem): void {
    this.sort  = sort;
    this.getAllJokes(1, 10, this.sort.value as Sorting);
  }

  orderById(): void {
    this.sort.value = this.sort.value === Sorting.id_asc ? Sorting.id_desc : Sorting.id_asc;
    this.getAllJokes(1, 10, this.sort.value as Sorting);
  }

  orderByLikes(): void {
    this.sort.value = this.sort.value === Sorting.likes_asc ? Sorting.likes_desc : Sorting.likes_asc;
    this.getAllJokes(1, 10, this.sort.value as Sorting);
  }

  getRandomJokes(amount: RandomJokesAmount): void {
    this.checkSubscriptions();
    // Create a new subscription.
    if (amount === RandomJokesAmount.one) {
      this.jokesSubscription = this.jokesService.getRandomJoke().subscribe(res => {
        this.apiResponse = res;
        this.jokes = res.data;
      });
    } else {
      this.jokesSubscription = this.jokesService.getTenRandomJokes().subscribe(res => {
        this.apiResponse = res;
        this.jokes = res.data;
      });
    }
  }

  getJokesByType(type: DropdownItem): void {
    this.checkSubscriptions();
    // Create a new subscription.
    this.jokesSubscription = this.jokesService.getJokesByType(type.value, 10).subscribe(res => {
      this.apiResponse = res;
      this.jokes = res.data;
    });
  }

  searchJokes(searchText: string): void {
    this.jokesService.getAllJokes(1, 10, this.sort.value, searchText).subscribe(res => {
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

  copyJoke(copyJoke: CopyJoke): void {
    this.clipboard.copy(`Setup: ${copyJoke.setup}\nPunchline: ${copyJoke.punchline}`);
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
    const createJokeSubscription$ = this.jokesService.createJoke(joke).subscribe(res => {
      this.jokes.unshift(res);
    });
    this.subscriptions.push(createJokeSubscription$);
    this.openNewJokeDialog = false;
  }

  cancelNewJoke(): void {
    this.openNewJokeDialog = false;
  }

  likeJoke(id: number): void {
    if (!this.likedJokes.includes(id)) {
      this.jokesService.addLike(id).subscribe(res => {
        this.likedJokes.push(id);
        localStorage.setItem('likedJokes', JSON.stringify(this.likedJokes));
        const joke = this.jokes.find(joke => joke.id === id);
        if (joke) {
          joke.likes = (joke.likes ?? 0) + 1;
        }
      });
    } else {
      this.jokesService.dislike(id).subscribe(res => {
        this.likedJokes = this.likedJokes.filter(jokeId => jokeId !== id);
        localStorage.setItem('likedJokes', JSON.stringify(this.likedJokes));
        const joke = this.jokes.find(joke => joke.id === id);
        if (joke) {
          joke.likes = (joke.likes ?? 0) - 1;
        }
      });
    }
  }

  ngOnDestroy() {
    // Ensure to unsubscribe when the component is destroyed.
    if (this.jokesSubscription) {
      this.jokesSubscription.unsubscribe();
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
  }
}
