import { Component } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { JokesService } from './services/jokes/jokes.service';
import { Joke } from './interfaces/joke';
import { ApiResponse } from './interfaces/api-response';
import { Sorting } from '../utils/types';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.scss']
})
export class JokesComponent {
  apiResponse!: ApiResponse;
  jokes: Joke[] = [];
  pagination: boolean = true;
  sort: Sorting = 'asc';
  private jokesSubscription?: Subscription;
  filters: string[] = ['id', 'rating'];

  constructor(private jokesService: JokesService) {}

  ngOnInit() {
    this.getAllJokes(1, 10, this.sort);
  }

  getAllJokes(page: number = 1, limit: number = 10, sort: Sorting = 'asc'): void {
    this.checkSubscriptions();
    // Create a new subscription.
    this.jokesSubscription = this.jokesService.getAllJokes(page, limit, sort).subscribe(res => {
      this.pagination = true;
      this.apiResponse = res;
      this.jokes = res.data;
    });
  }

  onPageChange(page: number): void {
    this.getAllJokes(page, 10, this.sort);
  }

  applyFilter(filter: string): void {
    // TODO: Implement the logic to apply the ratings filter.
    if (filter === 'id') {
      this.sort = this.sort === 'asc' ? 'desc' : 'asc';
      this.getAllJokes(1, 10, this.sort);
    }
  }

  getRandomJoke(): void {
    this.checkSubscriptions();
    // Create a new subscription.
    this.jokesSubscription = this.jokesService.getRandomJoke().subscribe(res => {
      this.pagination = false;
      this.apiResponse = res;
    });
  }

  checkSubscriptions(): void {
    // Unsubscribe from the previous subscription if it exists.
    if (this.jokesSubscription) {
      this.jokesSubscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    // Ensure to unsubscribe when the component is destroyed.
    if (this.jokesSubscription) {
      this.jokesSubscription.unsubscribe();
    }
  }
}
