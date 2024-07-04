import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from './icon.component';
import { By } from '@angular/platform-browser';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct icon path based on name input', () => {
    component.name = 'copy';
    fixture.detectChanges();

    const path = fixture.debugElement.query(By.css('path')).nativeElement;
    expect(path.getAttribute('d')).toBe('M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z');
  });

  it('should apply the correct viewBox attribute', () => {
    component.viewbox = '0 0 100 100';
    fixture.detectChanges();

    const svg = fixture.debugElement.query(By.css('svg')).nativeElement;
    expect(svg.getAttribute('viewBox')).toBe('0 0 100 100');
  });

  it('should apply the correct size attribute', () => {
    component.size = 24;
    fixture.detectChanges();

    const svg = fixture.debugElement.query(By.css('svg')).nativeElement;
    expect(svg.getAttribute('width')).toBe('24');
  });
});
