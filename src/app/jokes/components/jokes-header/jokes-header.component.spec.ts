import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokesHeaderComponent } from './jokes-header.component';

describe('JokesHeaderComponent', () => {
  let component: JokesHeaderComponent;
  let fixture: ComponentFixture<JokesHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JokesHeaderComponent]
    });
    fixture = TestBed.createComponent(JokesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
