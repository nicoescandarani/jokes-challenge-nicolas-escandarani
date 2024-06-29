import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JokeType } from '../../enums/joke-type';

@Component({
  selector: 'app-create-joke-dialog',
  templateUrl: './create-joke-dialog.component.html',
  styleUrls: ['./create-joke-dialog.component.scss']
})
export class CreateJokeDialogComponent {
  fg!: FormGroup;
  jokeTypes = JokeType;

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() save: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.fg = this.fb.group({
      setup: ['', [Validators.required, Validators.maxLength(50)]],
      punchline: ['', [Validators.required, Validators.maxLength(50)]],
      type: ['general', [Validators.required]]
    });
  }

  cancelNewJoke(): void {
    this.fg.reset();
    this.fg.markAsPristine();
    this.fg.get('type')?.setValue('general');
    this.cancel.emit();
  }

  saveNewJoke(): void {
    this.save.emit(this.fg);
  }
}
