import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { JokesService } from './services/jokes/jokes.service';
import { ApiResponse, CopyJoke, Joke } from './interfaces/joke';
import { Sorting } from '../utils/types';
import { Clipboard } from '@angular/cdk/clipboard';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.scss']
})
export class JokesComponent {
  apiResponse!: ApiResponse;
  jokes: Joke[] = [];
  sort: Sorting = 'id_asc';
  private jokesSubscription?: Subscription;
  openNewJokeDialog: boolean = false;
  likedJokes: number[] = [];

  constructor(private jokesService: JokesService, private clipboard: Clipboard) {}

  ngOnInit() {
    this.getAllJokes(1, 10, this.sort);
    this.likedJokes = JSON.parse(localStorage.getItem('likedJokes') || '[]');
  }

  getAllJokes(page: number = 1, limit: number = 10, sort: Sorting = 'id_asc'): void {
    this.checkSubscriptions();
    // Create a new subscription.
    this.jokesSubscription = this.jokesService.getAllJokes(page, limit, sort).subscribe(res => {
      this.apiResponse = res;
      this.jokes = res.data;
    });
  }

  onPageChange(page: number): void {
    this.getAllJokes(page, 10, this.sort);
  }

  onSortChange(sort: Sorting): void {
    this.sort = sort;
    this.getAllJokes(1, 10, this.sort);
  }

  orderById(): void {
    this.sort = this.sort === 'id_asc' ? 'id_desc' : 'id_asc';
    this.getAllJokes(1, 10, this.sort);
  }

  orderByLikes(): void {
    this.sort = this.sort === 'likes_asc' ? 'likes_desc' : 'likes_asc';
    this.getAllJokes(1, 10, this.sort);
  }

  getRandomJoke(): void {
    this.checkSubscriptions();
    // Create a new subscription.
    this.jokesSubscription = this.jokesService.getRandomJoke().subscribe(res => {
      this.apiResponse = res;
      this.jokes = res.data;
    });
  }

  searchJokes(searchText: string): void {
    this.jokesService.getAllJokes(1, 10, this.sort, searchText).subscribe(res => {
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
    console.log(joke);
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
          console.log(joke);

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
    }
  }
}
