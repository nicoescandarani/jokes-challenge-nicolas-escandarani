import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  ButtonComponent,
  InputComponent,
  SpinnerComponent
} from './index';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ButtonComponent,
    InputComponent,
    SpinnerComponent
  ]
})
export class UiModule { }
