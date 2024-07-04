import { JokeType } from "../enums/joke";

export const TypesBgColors: Map<string, string> = new Map([
  [JokeType.general, 'var(--blue)'],
  [JokeType.programming, 'var(--green)'],
  [JokeType.knock_knock, 'var(--orange)'],
  [JokeType.dad, 'var(--white)']
]);
