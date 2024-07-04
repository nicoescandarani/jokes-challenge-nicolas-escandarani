import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert.component';
import { By } from '@angular/platform-browser';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct message', () => {
    component.message = 'Test Alert Message';
    fixture.detectChanges();

    const alertMessage = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(alertMessage.textContent).toBe('Test Alert Message');
  });

  it('should apply the correct class based on type input', () => {
    component.type = 'error';
    fixture.detectChanges();

    const alertDiv = fixture.debugElement.query(By.css('.alert'));
    expect(alertDiv.classes['alert--error']).toBeTruthy();

    component.type = 'success';
    fixture.detectChanges();

    expect(alertDiv.classes['alert--success']).toBeTruthy();
  });

  it('should set show to false when closeAlert is called', () => {
    component.show = true;
    component.closeAlert();
    expect(component.show).toBeFalse();
  });
});
