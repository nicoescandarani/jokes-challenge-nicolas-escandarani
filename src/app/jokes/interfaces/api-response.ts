import { Joke } from "./joke";

export interface ApiResponse {
  currentPage: number;
  data: Joke[];
  perPage: number;
  totalItems: number;
  totalPages: number;
}
