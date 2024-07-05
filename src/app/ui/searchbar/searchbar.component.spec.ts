import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SearchbarComponent } from './searchbar.component';
import { By } from '@angular/platform-browser';

describe('SearchbarComponent', () => {
  let component: SearchbarComponent;
  let fixture: ComponentFixture<SearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchbarComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update searchText when input value changes', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;

    input.value = 'new search text';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.searchText).toBe('new search text');
  });

  it('should emit search text when input value changes', () => {
    spyOn(component.search, 'emit');

    const input = fixture.debugElement.query(By.css('input')).nativeElement;

    input.value = 'search text';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.search.emit).toHaveBeenCalledWith('search text');
  });
});
