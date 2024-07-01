import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private searchText: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  get searchText$(): Observable<string> {
    return this.searchText.asObservable();
  }

  set searchTextSet(value: string) {
    this.searchText.next(value);
  }
}
