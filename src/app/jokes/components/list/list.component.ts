import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Joke } from '../../interfaces/joke';
import { ApiResponse } from '../../interfaces/api-response';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() sortBy: string = 'id';
  @Input() pagination: boolean = true;
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

  @Output() deleteJoke: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteMultipleJokes: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Output() getMoreJokes: EventEmitter<number> = new EventEmitter<number>();
  @Output() onPageChange: EventEmitter<number> = new EventEmitter<number>();

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

  get apiResponse(): ApiResponse {
    return this._apiResponse!;
  }
}
