import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Joke } from '../../interfaces/joke';
import { environment } from 'src/environments/environment';
import { Sorting } from 'src/app/shared/enums/enums';

@Injectable({
  providedIn: 'root'
})
export class JokesService {
  constructor(private http: HttpClient) { }

  getAllJokes(page: number = 1, limit: number = 10, sort: string = Sorting.id_desc, searchText: string = '', jokeType: string = ''): Observable<ApiResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('sort', sort);

    if (searchText) {
      params = params.set('searchText', searchText);
    }

    if (jokeType) {
      params = params.set('jokeType', jokeType);
    }

    return this.http.get<ApiResponse>(`${environment.base_url}/${environment.jokes_sufix}`, { params });
  }

  getRandomJoke(searchText: string = ''): Observable<ApiResponse> {
    let params = new HttpParams();

    if (searchText) {
      params = params.set('searchText', searchText);
    }
    return this.http.get<ApiResponse>(`${environment.base_url}/${environment.jokes_sufix}/random`, { params });
  }

  getTenRandomJokes(searchText: string = ''): Observable<ApiResponse> {
    let params = new HttpParams();

    if (searchText) {
      params = params.set('searchText', searchText);
    }
    return this.http.get<ApiResponse>(`${environment.base_url}/${environment.jokes_sufix}/ten`, { params });
  }

  // For future implementations.
  getJokeById(id: number): Observable<Joke> {
    return this.http.get<Joke>(`${environment.base_url}/${environment.jokes_sufix}/${id}`);
  }

  createJoke(joke: Joke): Observable<Joke> {
    return this.http.post<Joke>(`${environment.base_url}/${environment.jokes_sufix}a`, joke);
  }

  addLike(jokeId: number): Observable<Joke> {
    return this.http.post<Joke>(`${environment.base_url}/${environment.jokes_sufix}/${jokeId}/like`, {});
  }

  dislike(jokeId: number): Observable<Joke> {
    return this.http.post<Joke>(`${environment.base_url}/${environment.jokes_sufix}/${jokeId}/dislike`, {});
  }

  deleteJoke(id: number): Observable<Joke> {
    return this.http.delete<Joke>(`${environment.base_url}/${environment.jokes_sufix}/${id}`);
  }

  // For future improvements.
  deleteMultipleJokes(ids: number[]): Observable<Joke[]> {
    return this.http.delete<Joke[]>(`${environment.base_url}/${environment.jokes_sufix}`, { body: { ids } });
  }
}
