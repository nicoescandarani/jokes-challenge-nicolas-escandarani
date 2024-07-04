import { Sorting } from "../enums/enums";

export interface SortingRule {
  label: string;
  value: Sorting;
}

export interface DropdownItem {
  label: string;
  value: string;
}
