import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJokeDialogComponent } from './create-joke-dialog.component';
import { UiModule } from 'src/app/ui/ui.module';

describe('CreateJokeDialogComponent', () => {
  let component: CreateJokeDialogComponent;
  let fixture: ComponentFixture<CreateJokeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UiModule]
    });
    fixture = TestBed.createComponent(CreateJokeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
