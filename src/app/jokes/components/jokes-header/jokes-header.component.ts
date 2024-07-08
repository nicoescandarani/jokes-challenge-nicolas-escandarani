import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { JokeType, RandomJokesAmount } from '../../enums/joke';
import { TitleCasePipe } from '@angular/common';
import { TypesBgColors } from '../../types/types';
import { DropdownItem, SortingRule } from 'src/app/shared/interfaces/interfaces';
import { idSortingRules, likesSortingRules } from 'src/app/shared/constants';

type Menu = 'filters' | 'sort' | '';

@Component({
  selector: 'app-jokes-header',
  templateUrl: './jokes-header.component.html',
  styleUrls: ['./jokes-header.component.scss'],
  providers: [TitleCasePipe]
})
export class JokesHeaderComponent {

  randomJokesAmount = RandomJokesAmount;
  jokeTypes = JokeType;
  typesBgColors: Map<string, string> = TypesBgColors;
  selectedJokeType: DropdownItem = {} as DropdownItem;

  idSortingRules: SortingRule[] = idSortingRules;
  likesSortingRules: SortingRule[] = likesSortingRules;
  typesSortingRules: DropdownItem[] = [];
  openedMenu: Menu = '';

  @Output() sortChange: EventEmitter<DropdownItem> = new EventEmitter<DropdownItem>();
  @Output() getRandomJokes: EventEmitter<RandomJokesAmount> = new EventEmitter<RandomJokesAmount>();
  @Output() getJokesByType: EventEmitter<DropdownItem> = new EventEmitter<DropdownItem>();
  @Output() getAllJokes: EventEmitter<void> = new EventEmitter<void>();
  @Output() createJoke: EventEmitter<void> = new EventEmitter<void>();

  @Input() sort: DropdownItem = this.idSortingRules[0];
  @Input() amountOfItems: number = 0;

  constructor(private eRef: ElementRef, private titleCasePipe: TitleCasePipe) { }

  ngOnInit(): void {
    this.initTypesSortingRules();
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.openedMenu = '';
    }
  }

  initTypesSortingRules(): void {
    this.typesSortingRules = Object.values(JokeType).map(type => ({
      value: type,
      label: this.titleCasePipe.transform(type)
    }));
  }

  onSortChange(newSort: DropdownItem): void {
    this.sort = newSort;
    this.sortChange.emit(this.sort);
  }

  onTypeSortChange(type: DropdownItem): void {
    this.getJokesByType.emit(type);
    this.selectedJokeType = type;
    this.openedMenu = '';
  }

  isValidSort(sortingRules: SortingRule[]): boolean {
    return sortingRules.some(rule => rule.value === this.sort.value);
  }

  getRandomJokeEmit(amount: RandomJokesAmount): void {
    this.getRandomJokes.emit(amount);
    this.openedMenu = '';
  }

  getAllJokesEmit(): void {
    this.getAllJokes.emit();
    this.openedMenu = '';
  }

  createJokeEmit(): void {
    this.createJoke.emit();
  }

  openMenu(menu: Menu): void {
    this.openedMenu = this.openedMenu === menu ? '' : menu;
  }
}
