import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JokesRoutingModule } from './jokes-routing.module';
import { JokesComponent } from './jokes.component';
import { UiModule } from '../ui/ui.module';
import { ListComponent } from './components/list/list.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    JokesComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    JokesRoutingModule,
    UiModule,
    NgxPaginationModule
  ]
})
export class JokesModule { }
