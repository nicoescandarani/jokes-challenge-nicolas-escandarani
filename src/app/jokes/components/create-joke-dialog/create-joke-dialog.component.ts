import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JokeType } from '../../enums/joke-type';
import { DropdownItem, typesBgColors } from 'src/app/utils/utils';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-create-joke-dialog',
  templateUrl: './create-joke-dialog.component.html',
  styleUrls: ['./create-joke-dialog.component.scss'],
  providers: [TitleCasePipe]
})
export class CreateJokeDialogComponent {
  fg!: FormGroup;
  jokeTypes = JokeType;
  jokeTypesForDropdown: DropdownItem[] = [];
  selectedJokeType: DropdownItem = {} as DropdownItem;
  typesBgColors: Map<string, string> = typesBgColors;

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() save: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor(private fb: FormBuilder, private titleCasePipe: TitleCasePipe) {}

  ngOnInit() {
    this.initForm();
    this.initJokeTypesForDropdown();
  }

  initForm(): void {
    this.fg = this.fb.group({
      setup: ['', [Validators.required, Validators.maxLength(50)]],
      punchline: ['', [Validators.required, Validators.maxLength(50)]],
      type: ['general', [Validators.required]]
    });
  }

  initJokeTypesForDropdown(): void {
    this.jokeTypesForDropdown = Object.values(JokeType).map(type => ({
      value: type,
      label: this.titleCasePipe.transform(type)
    }));
    this.selectedJokeType = this.jokeTypesForDropdown.find(jokeType => jokeType.value === 'general') as DropdownItem;
  }

  cancelNewJoke(): void {
    this.fg.reset();
    this.fg.markAsPristine();
    this.fg.get('type')?.setValue('general');
    this.cancel.emit();
  }

  selectJokeType(jokeType: DropdownItem): void {
    this.selectedJokeType = jokeType;
    this.fg.get('type')?.setValue(jokeType.value);
  }

  saveNewJoke(): void {
    this.save.emit(this.fg);
  }
}
