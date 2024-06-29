import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Joke } from '../../interfaces/joke';
import { environment } from 'src/environments/environment';
import { Sorting } from 'src/app/utils/types';

@Injectable({
  providedIn: 'root'
})
export class JokesService {

  constructor(private http: HttpClient) { }

  getAllJokes(page: number = 1, limit: number = 10, sort: string = 'id_asc', searchText: string = ''): Observable<ApiResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('sort', sort);

    if (searchText) {
      params = params.set('searchText', searchText);
    }

    return this.http.get<ApiResponse>(`${environment.base_url}/${environment.jokes_sufix}`, { params });
  }

  searchJokes(searchText: string, page: number = 1, limit: number = 10, sort: string = 'id_asc'): Observable<ApiResponse> {
    const params = new HttpParams()
      .set('searchText', searchText)
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('sort', sort);

    return this.http.get<ApiResponse>(`${environment.base_url}/${environment.jokes_sufix}/search`, { params });
  }

  getRandomJoke(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${environment.base_url}/${environment.jokes_sufix}/random`);
  }

  getTenRandomJokes(): Observable<ApiResponse[]> {
    return this.http.get<ApiResponse[]>(`${environment.base_url}/${environment.jokes_sufix}/ten`);
  }

  getJokeById(id: number): Observable<Joke> {
    return this.http.get<Joke>(`${environment.base_url}/${environment.jokes_sufix}/${id}`);
  }

  getJokesByType(type: string, count: number): Observable<ApiResponse[]> {
    return this.http.get<ApiResponse[]>(`${environment.base_url}/${environment.jokes_sufix}/${type}/${count === 10 ? 'ten' : 'random'}`);
  }

  createJoke(joke: Joke): Observable<Joke> {
    return this.http.post<Joke>(`${environment.base_url}/${environment.jokes_sufix}`, joke);
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

  deleteMultipleJokes(ids: number[]): Observable<Joke[]> {
    return this.http.delete<Joke[]>(`${environment.base_url}/${environment.jokes_sufix}`, { body: { ids } });
  }
}
