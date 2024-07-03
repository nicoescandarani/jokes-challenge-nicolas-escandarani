import { JokeType } from "../enums/joke-type";

export interface Joke {
  id?: number;
  type: string;
  setup: JokeType;
  punchline: string;
  likes?: number;
}

export interface ApiResponse {
  currentPage: number;
  data: Joke[];
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export interface CopyJoke {
  setup: string;
  punchline: string;
}

export enum RandomJokesAmount {
  one = 1,
  ten = 10
}

export const typesBgColors: Map<string, string> = new Map([
  [JokeType.general, 'var(--blue)'],
  [JokeType.programming, 'var(--green)'],
  [JokeType.knock_knock, 'var(--orange)'],
  [JokeType.dad, 'var(--white)']
]);
