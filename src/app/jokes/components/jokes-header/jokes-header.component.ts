import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { DropdownItem, SortingDropdownItem, SortingRule } from 'src/app/utils/utils';
import { JokeType } from '../../enums/joke-type';
import { TitleCasePipe } from '@angular/common';

type Menu = 'filters' | 'sort' | '';

@Component({
  selector: 'app-jokes-header',
  templateUrl: './jokes-header.component.html',
  styleUrls: ['./jokes-header.component.scss'],
  providers: [TitleCasePipe]
})
export class JokesHeaderComponent {
  constructor(private eRef: ElementRef, private titleCasePipe: TitleCasePipe) { }

  jokeTypes = JokeType;

  idSortingRules: SortingRule[] = [
    { value: 'id_asc', label: 'Newest to Latest' },
    { value: 'id_desc', label: 'Latest to Newest' }
  ];
  likesSortingRules: SortingRule[] = [
    { value: 'likes_desc', label: 'Likes from Highest to Lowest' },
    { value: 'likes_asc', label: 'Likes from Lowest to Highest' }
  ];
  typesSortingRules: DropdownItem[] = [];
  openedMenu: Menu = '';

  @Output() sortChange: EventEmitter<SortingDropdownItem> = new EventEmitter<SortingDropdownItem>();
  @Output() getRandomJoke: EventEmitter<void> = new EventEmitter<void>();
  @Output() getAllJokes: EventEmitter<void> = new EventEmitter<void>();
  @Output() createJoke: EventEmitter<void> = new EventEmitter<void>();

  @Input() sort: SortingDropdownItem = this.idSortingRules[0];

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
      value: `type_${type}`,
      label: this.titleCasePipe.transform(type)
    }));
  }

  onSortChange(newSort: SortingDropdownItem): void {
    this.sort = newSort;
    this.sortChange.emit(this.sort);
  }

  isValidSort(sortingRules: SortingRule[]): boolean {
    return sortingRules.some(rule => rule.value === this.sort.value);
  }

  getRandomJokeEmit(): void {
    this.getRandomJoke.emit();
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
