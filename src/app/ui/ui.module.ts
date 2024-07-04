import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  ButtonComponent,
  SpinnerComponent,
  CardComponent,
  DialogComponent,
  SearchbarComponent,
  MenuComponent,
  DropdownComponent,
  AlertComponent,
  IconComponent
} from './index';

@NgModule({
  declarations: [
    ButtonComponent,
    SpinnerComponent,
    CardComponent,
    DialogComponent,
    SearchbarComponent,
    MenuComponent,
    DropdownComponent,
    AlertComponent,
    IconComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    ButtonComponent,
    SpinnerComponent,
    CardComponent,
    DialogComponent,
    SearchbarComponent,
    MenuComponent,
    DropdownComponent,
    AlertComponent,
    IconComponent
  ]
})
export class UiModule { }
