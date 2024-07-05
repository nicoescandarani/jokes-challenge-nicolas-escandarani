import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <ui-card>
      <p>Test Content</p>
    </ui-card>
  `
})
class TestHostComponent {}

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent, TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display projected content', () => {
    const testFixture = TestBed.createComponent(TestHostComponent);
    testFixture.detectChanges();

    const cardElement = testFixture.debugElement.query(By.css('ui-card'));
    const projectedContent = cardElement.nativeElement.querySelector('p').textContent;
    expect(projectedContent).toBe('Test Content');
  });
});
