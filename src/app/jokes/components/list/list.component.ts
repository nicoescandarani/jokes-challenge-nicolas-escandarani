import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiResponse, CopyJoke, Joke } from '../../interfaces/joke';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
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
  @Input() likedJokes: number[] = [];

  @Output() getAllJokes: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteJoke: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteMultipleJokes: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Output() getMoreJokes: EventEmitter<number> = new EventEmitter<number>();
  @Output() onPageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() copyJoke: EventEmitter<CopyJoke> = new EventEmitter<CopyJoke>();
  @Output() likeJoke: EventEmitter<number> = new EventEmitter<number>();

  jokes: Joke[] = [];
  private _apiResponse?: ApiResponse;
  keys: string[] = [];
  paginationIterations: number[] = [];
  secondPaginationIterations: number[] = [];

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

  likeJokeEmit(id: number): void {
    this.likeJoke.emit(id);
  }

  getAllJokesEmit(): void {
    this.getAllJokes.emit();
  }

  get apiResponse(): ApiResponse {
    return this._apiResponse!;
  }
}
