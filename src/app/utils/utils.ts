import { JokeType } from "../jokes/enums/joke-type";

export enum Sorting {
  id_asc = 'id_asc',
  id_desc = 'id_desc',
  likes_asc = 'likes_asc',
  likes_desc = 'likes_desc'
}

export enum RandomJokesAmount {
  one = 1,
  ten = 10
}

export interface SortingRule {
  label: string;
  value: Sorting;
}

export interface DropdownItem {
  label: string;
  value: string;
}

export const typesBgColors: Map<string, string> = new Map([
  [JokeType.general, 'var(--blue)'],
  [JokeType.programming, 'var(--green)'],
  [JokeType.knock_knock, 'var(--orange)'],
  [JokeType.dad, 'var(--white)']
]);
