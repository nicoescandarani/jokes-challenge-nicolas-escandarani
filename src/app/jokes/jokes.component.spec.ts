import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JokesComponent } from './jokes.component';
import { JokesService } from './services/jokes/jokes.service';
import { StateService } from '../services/state/state.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { of, BehaviorSubject, Subscription } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiResponse } from './interfaces/joke';

describe('JokesComponent', () => {
  let component: JokesComponent;
  let fixture: ComponentFixture<JokesComponent>;
  let jokesService: jasmine.SpyObj<JokesService>;
  let stateService: StateService;
  let clipboard: jasmine.SpyObj<Clipboard>;

  // Create Subject to emit simulated values.
  const searchTextSubject = new BehaviorSubject<string>('');
  const userJokesSubject = new BehaviorSubject<number[]>([]);

  beforeEach(() => {
    // Create spies for services.
    const jokesServiceSpy = jasmine.createSpyObj('JokesService', ['getAllJokes', 'getRandomJoke', 'getTenRandomJokes', 'getJokesByType', 'createJoke']);
    const clipboardSpy = jasmine.createSpyObj('Clipboard', ['copy']);

    // Provide spies and Subjects.
    TestBed.configureTestingModule({
      declarations: [JokesComponent],
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule to simulate HTTP requests.
      providers: [
        { provide: JokesService, useValue: jokesServiceSpy },
        {
          provide: StateService, useValue: {
            searchText$: searchTextSubject.asObservable(),
            userJokes$: userJokesSubject.asObservable(),
            searchTextSet: jasmine.createSpy('searchTextSet'),
            addUserJoke: jasmine.createSpy('addUserJoke')
          }
        },
        { provide: Clipboard, useValue: clipboardSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignore unrecognized Angular elements.
    });

    fixture = TestBed.createComponent(JokesComponent);
    component = fixture.componentInstance;
    jokesService = TestBed.inject(JokesService) as jasmine.SpyObj<JokesService>;
    stateService = TestBed.inject(StateService);
    clipboard = TestBed.inject(Clipboard) as jasmine.SpyObj<Clipboard>;

    fixture.detectChanges();
  });

  // Test to verify if the component is created correctly.
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test to verify the getAllJokes method.
  it('should get all jokes on init', () => {
    const mockResponse: ApiResponse = {
      currentPage: 1,
      perPage: 10,
      totalItems: 0,
      totalPages: 1,
      data: []
    };
    jokesService.getAllJokes.and.returnValue(of(mockResponse));
    component.ngOnInit();
    expect(jokesService.getAllJokes).toHaveBeenCalledWith(1, 10, 'id_desc');
  });

  // Test to verify the search functionality.
  it('should search jokes based on search text', () => {
    const mockResponse: ApiResponse = {
      currentPage: 1,
      perPage: 10,
      totalItems: 0,
      totalPages: 1,
      data: []
    };
    jokesService.getAllJokes.and.returnValue(of(mockResponse));
    component.searchJokes('test');
    expect(jokesService.getAllJokes).toHaveBeenCalledWith(1, 10, 'id_desc', 'test');
  });

  // Test to verify the cleanup of subscriptions.
  it('should unsubscribe from previous subscriptions on new requests', () => {
    const subscription = new Subscription();
    component['jokesSubscription'] = subscription;
    spyOn(subscription, 'unsubscribe');

    component.checkSubscriptions();
    expect(subscription.unsubscribe).toHaveBeenCalled();
  });

  // Test to verify copying a joke to clipboard.
  it('should copy the joke to clipboard', () => {
    const joke = { setup: 'Why did the chicken cross the road?', punchline: 'To get to the other side!' };
    component.copyJoke(joke);
    expect(clipboard.copy).toHaveBeenCalledWith(`Setup: ${joke.setup}\nPunchline: ${joke.punchline}`);
  });
});
