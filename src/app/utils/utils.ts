export type AlertTypeOptions = 'success' | 'error' | 'warning';

export enum Sorting {
  id_asc = 'id_asc',
  id_desc = 'id_desc',
  likes_asc = 'likes_asc',
  likes_desc = 'likes_desc'
}

export interface SortingRule {
  label: string;
  value: Sorting;
}

export interface DropdownItem {
  label: string;
  value: string;
}
