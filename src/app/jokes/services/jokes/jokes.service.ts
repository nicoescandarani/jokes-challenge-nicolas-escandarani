import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Joke } from '../../interfaces/joke';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../../interfaces/api-response';
import { Sorting } from 'src/app/utils/types';

@Injectable({
  providedIn: 'root'
})
export class JokesService {

  constructor(private http: HttpClient) { }

  getAllJokes(page: number, limit: number, sort: Sorting): Observable<ApiResponse> {
    let params = new HttpParams();
    params = params.append('page', page ? page.toString() : '1');
    params = params.append('limit', limit ? limit.toString() : '10');
    if (sort) {
      params = params.set('sort', sort);
    }
    return this.http.get<ApiResponse>(`${environment.base_url}/${environment.jokes_sufix}/all`, { params });
  }

  getRandomJoke(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${environment.base_url}/${environment.jokes_sufix}/random`);
  }

  getTenRandomJokes(): Observable<ApiResponse[]> {
    return this.http.get<ApiResponse[]>(`${environment.base_url}/${environment.jokes_sufix}/ten`);
  }

  getJokeById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${environment.base_url}/${environment.jokes_sufix}/${id}`);
  }

  getJokesByType(type: string, count: number): Observable<ApiResponse[]> {
    return this.http.get<ApiResponse[]>(`${environment.base_url}/${environment.jokes_sufix}/${type}/${count === 10 ? 'ten' : 'random'}`);
  }

  createJoke(joke: { type: string, setup: string, punchline: string }): Observable<Joke> {
    return this.http.post<Joke>(`${environment.base_url}/${environment.jokes_sufix}`, joke);
  }

  deleteJoke(id: number): Observable<Joke> {
    return this.http.delete<Joke>(`${environment.base_url}/${environment.jokes_sufix}/${id}`);
  }

  deleteMultipleJokes(ids: number[]): Observable<Joke[]> {
    return this.http.delete<Joke[]>(`${environment.base_url}/${environment.jokes_sufix}`, { body: { ids } });
  }
}
