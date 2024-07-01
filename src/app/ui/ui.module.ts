import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  ButtonComponent,
  InputComponent,
  SpinnerComponent,
  CardComponent,
  DialogComponent,
  SearchbarComponent,
  MenuComponent,
  DropdownComponent
} from './index';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    SpinnerComponent,
    CardComponent,
    DialogComponent,
    SearchbarComponent,
    MenuComponent,
    DropdownComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    ButtonComponent,
    InputComponent,
    SpinnerComponent,
    CardComponent,
    DialogComponent,
    SearchbarComponent,
    MenuComponent,
    DropdownComponent
  ]
})
export class UiModule { }
