import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownComponent } from './dropdown.component';
import { UiModule } from '../ui.module';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UiModule],
      declarations: [DropdownComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close menu when clicking outside', () => {
    component.menuOpen = true;
    fixture.detectChanges();

    const event = new Event('click');
    document.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.menuOpen).toBeFalse();
  });
});
