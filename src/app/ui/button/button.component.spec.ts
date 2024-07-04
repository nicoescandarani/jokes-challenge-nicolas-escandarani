import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onClick event when button is clicked', () => {
    spyOn(component.onClick, 'emit');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    expect(component.onClick.emit).toHaveBeenCalled();
  });

  it('should apply correct class based on color input', () => {
    component.color = 'secondary';
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    expect(button.classes['button--secondary']).toBeTruthy();

    component.color = 'cta';
    fixture.detectChanges();

    expect(button.classes['button--cta']).toBeTruthy();
  });

  it('should apply correct styles based on textColor and backgroundColor inputs', () => {
    component.textColor = 'red';
    component.backgroundColor = 'blue';
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    expect(button.styles['color']).toBe('red');
    expect(button.styles['background-color']).toBe('blue');
  });

  it('should set button type correctly', () => {
    component.type = 'submit';
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    expect(button.attributes['type']).toBe('submit');
  });

  it('should disable the button when disabled input is true', () => {
    component.disabled = true;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    expect(button.properties['disabled']).toBeTruthy();
  });

  it('should set title attribute correctly', () => {
    component.title = 'Test Button';
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    expect(button.attributes['title']).toBe('Test Button');
  });

  it('should apply centered class when centered input is true', () => {
    component.centered = true;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    expect(button.classes['button--centered']).toBeTruthy();
  });
});
