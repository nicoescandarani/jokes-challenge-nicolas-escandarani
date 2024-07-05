import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JokesRoutingModule } from './jokes-routing.module';
import { JokesComponent } from './jokes.component';
import { UiModule } from '../ui/ui.module';
import { ListComponent } from './components/list/list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CreateJokeDialogComponent } from './components/create-joke-dialog/create-joke-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JokesHeaderComponent } from './components/jokes-header/jokes-header.component';
import { ListItemComponent } from './components/list-item/list-item.component';

@NgModule({
  declarations: [
    JokesComponent,
    ListComponent,
    CreateJokeDialogComponent,
    JokesHeaderComponent,
    ListItemComponent
  ],
  imports: [
    CommonModule,
    JokesRoutingModule,
    UiModule,
    NgxPaginationModule,
    ClipboardModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class JokesModule { }
