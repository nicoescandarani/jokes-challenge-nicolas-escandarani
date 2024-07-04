import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';
import { By } from '@angular/platform-browser';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpinnerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the spinner', () => {
    const spinnerOverlay = fixture.debugElement.query(By.css('.spinner-overlay'));
    expect(spinnerOverlay).toBeTruthy();

    const spinner = fixture.debugElement.query(By.css('.spinner'));
    expect(spinner).toBeTruthy();

    const svg = fixture.debugElement.query(By.css('svg.circular'));
    expect(svg).toBeTruthy();

    const circle = fixture.debugElement.query(By.css('circle.path'));
    expect(circle).toBeTruthy();
  });
});
