import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { ApiResponse, CopyJoke, Joke } from '../../interfaces/joke';
import { StateService } from 'src/app/services/state/state.service';
import { Subscription } from 'rxjs';
import { JokesService } from '../../services/jokes/jokes.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnDestroy {
  @Input() sortBy: string = 'id';
  @Input()
  set apiResponse(value: ApiResponse) {
    if (value) {
      this._apiResponse = value;
      this.jokes = value.data;
      this.jokes.forEach(element => {
        this.keys = Object.keys(element);
      });
    }
  }
  userJokes: number[] = [];

  @Output() getAllJokes: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteMultipleJokes: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Output() getMoreJokes: EventEmitter<number> = new EventEmitter<number>();
  @Output() onPageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() copyJoke: EventEmitter<CopyJoke> = new EventEmitter<CopyJoke>();

  jokes: Joke[] = [];
  private _apiResponse?: ApiResponse;
  keys: string[] = [];
  paginationIterations: number[] = [];
  secondPaginationIterations: number[] = [];
  subscriptions: Subscription[] = [];
  likedJokes: number[] = [];

  constructor(private stateService: StateService, private jokesService: JokesService) {
    const userJokesSubscription$ = this.stateService.userJokes$.subscribe(userJokes => {
      this.userJokes = userJokes;
    });
    this.subscriptions.push(userJokesSubscription$);
  }

  ngOnInit() {
    this.likedJokes = JSON.parse(localStorage.getItem('likedJokes') || '[]');
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

  deleteJoke(id: number): void {
    const deleteJokeSubscription$ = this.jokesService.deleteJoke(id).subscribe(res => {
      this.jokes = this.jokes.filter(joke => joke.id !== id);
    });
    this.subscriptions.push(deleteJokeSubscription$);
  }

  getItemByKeyName(key: string, item: Joke, child?: boolean) {
    if (child && (key === 'id' || key === 'mode')) {
      return '';
    }
    return (item as any)[key];
  }

  avoidData(key: string) {
    return key === 'id';
  }

  onPaginationChange(event: any) {
    this.onPageChange.emit(event);
  }

  copyJokeEmit(setup: string, punchline: string): void {
    this.copyJoke.emit({setup, punchline});
  }

  getAllJokesEmit(): void {
    this.getAllJokes.emit();
  }

  get apiResponse(): ApiResponse {
    return this._apiResponse!;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
