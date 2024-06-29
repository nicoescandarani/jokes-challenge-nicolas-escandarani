import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sorting, SortingRule } from 'src/app/utils/types';

@Component({
  selector: 'app-jokes-header',
  templateUrl: './jokes-header.component.html',
  styleUrls: ['./jokes-header.component.scss']
})
export class JokesHeaderComponent {
  @Input() sort: Sorting = 'id_asc';

  @Output() sortChange: EventEmitter<Sorting> = new EventEmitter<Sorting>();
  @Output() getRandomJoke: EventEmitter<void> = new EventEmitter<void>();
  @Output() getAllJokes: EventEmitter<void> = new EventEmitter<void>();
  @Output() createJoke: EventEmitter<void> = new EventEmitter<void>();
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  sortingRules: SortingRule[] = [
    { value: 'id_asc', label: 'Id from Highest to Lowest' },
    { value: 'id_desc', label: 'Id from Lowest to Highest' },
    { value: 'likes_desc', label: 'First Most Liked' },
    { value: 'likes_asc', label: 'First Least Liked' }
  ];

  onSortChange(event: Event): void {
    const newSort = (event.target as HTMLSelectElement).value as Sorting;
    this.sort = newSort;
    this.sortChange.emit(this.sort);
  }

  getRandomJokeEmit(): void {
    this.getRandomJoke.emit();
  }

  getAllJokesEmit(): void {
    this.getAllJokes.emit();
  }

  createJokeEmit(): void {
    this.createJoke.emit();
  }

  searchJokesEmit(searchText: string): void {
    this.search.emit(searchText);
  }
}
