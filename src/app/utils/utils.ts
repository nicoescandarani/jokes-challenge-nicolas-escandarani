export type Sorting = 'id_asc' | 'id_desc' | 'likes_asc' | 'likes_desc';

export interface SortingRule {
  label: string;
  value: Sorting;
}

export interface DropdownItem {
  label: string;
  value: string;
}

export interface SortingDropdownItem {
  label: string;
  value: Sorting;
}
