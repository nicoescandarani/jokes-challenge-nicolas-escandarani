import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SearchbarComponent } from './searchbar.component';
import { StateService } from 'src/app/services/state/state.service';
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';

class MockStateService {
  private searchTextSubject = new BehaviorSubject<string>('');
  searchText$ = this.searchTextSubject.asObservable();

  set searchTextSet(value: string) {
    this.searchTextSubject.next(value);
  }

  get searchTextSetValue() {
    return this.searchTextSubject.getValue();
  }
}

describe('SearchbarComponent', () => {
  let component: SearchbarComponent;
  let fixture: ComponentFixture<SearchbarComponent>;
  let mockStateService: MockStateService;

  beforeEach(async () => {
    mockStateService = new MockStateService();

    await TestBed.configureTestingModule({
      declarations: [SearchbarComponent],
      imports: [FormsModule],
      providers: [{ provide: StateService, useValue: mockStateService }]
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

  it('should not emit search text immediately', fakeAsync(() => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;

    input.value = 'immediate search text';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    tick(200); // Less than debounce time

    expect(mockStateService.searchTextSetValue).not.toBe('immediate search text');
  }));

  it('should update searchText from StateService', () => {
    mockStateService.searchTextSet = 'updated search text';
    fixture.detectChanges();

    expect(component.searchText).toBe('updated search text');
  });
});
