import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListItemComponent } from './list-item.component';
import { UiModule } from '../ui.module';
import { By } from '@angular/platform-browser';
import { Joke } from 'src/app/jokes/interfaces/joke';
import { JokeType } from 'src/app/jokes/enums/joke-type';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiModule],
      declarations: [ListItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit copyJoke event when copy button is clicked', () => {
    spyOn(component.copyJoke, 'emit');

    component.joke = { setup: 'Why did the chicken cross the road?', punchline: 'To get to the other side!', type: JokeType.general } as Joke;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.item__header__copy-button')).nativeElement;
    button.click();
    fixture.detectChanges();

    expect(component.copyJoke.emit).toHaveBeenCalledWith({ setup: 'Why did the chicken cross the road?', punchline: 'To get to the other side!' });
  });

  it('should close mini menu when clicking outside', () => {
    component.miniMenuOpened = true;
    fixture.detectChanges();

    const event = new Event('click');
    document.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.miniMenuOpened).toBeFalse();
  });
});
