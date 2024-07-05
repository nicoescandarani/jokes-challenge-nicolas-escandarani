import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogComponent } from './dialog.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <ui-dialog>
      <p>Test Dialog Content</p>
    </ui-dialog>
  `
})
class TestHostComponent {}

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogComponent, TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display projected content', () => {
    const testFixture = TestBed.createComponent(TestHostComponent);
    testFixture.detectChanges();

    const dialogElement = testFixture.debugElement.query(By.css('ui-dialog'));
    const projectedContent = dialogElement.nativeElement.querySelector('p').textContent;
    expect(projectedContent).toBe('Test Dialog Content');
  });
});
