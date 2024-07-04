import { JokeType } from "../enums/joke";

export interface Joke {
  id?: number;
  type: JokeType;
  setup: string;
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
