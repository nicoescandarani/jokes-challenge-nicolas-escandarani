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
