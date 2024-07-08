import { Sorting } from "./enums/enums";
import { SortingRule } from "./interfaces/interfaces";

export const idSortingRules: SortingRule[] = [
  { value: Sorting.id_desc, label: 'Newest to Latest' },
  { value: Sorting.id_asc, label: 'Latest to Newest' }
];
export const likesSortingRules: SortingRule[] = [
  { value: Sorting.likes_desc, label: 'Most Liked to Least Liked' },
  { value: Sorting.likes_asc, label: 'Least Liked to Most Liked' }
];
