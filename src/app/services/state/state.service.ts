import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private searchText: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private userJokesIds: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

  constructor() { }

  addUserJoke(jokeId: number): void {
    const jokes = this.userJokesIds.value;
    jokes.unshift(jokeId);
    this.userJokesSet = jokes;
    localStorage.setItem('my-jokes', JSON.stringify(jokes));
  }

  removeUserJoke(jokeId: number): void {
    const jokes = this.userJokesIds.value;
    const index = jokes.indexOf(jokeId);
    jokes.splice(index, 1);
    this.userJokesSet = jokes;
    localStorage.setItem('my-jokes', JSON.stringify(jokes));
  }

  get searchText$(): Observable<string> {
    return this.searchText.asObservable();
  }

  get userJokes$(): Observable<number[]> {
    const jokes = localStorage.getItem('my-jokes');
    if (jokes) {
      this.userJokesIds.next(JSON.parse(jokes));
    }
    return this.userJokesIds.asObservable();
  }

  set searchTextSet(value: string) {
    this.searchText.next(value);
  }

  set userJokesSet(value: number[]) {
    this.userJokesIds.next(value);
  }
}
