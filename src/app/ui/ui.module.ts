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
  ListItemComponent,
  AlertComponent
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
    ListItemComponent,
    AlertComponent
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
    ListItemComponent,
    AlertComponent
  ]
})
export class UiModule { }
