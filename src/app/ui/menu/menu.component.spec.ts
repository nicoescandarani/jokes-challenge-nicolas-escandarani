import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <ui-menu>
      <p>Test Menu Content</p>
    </ui-menu>
  `
})
class TestHostComponent {}

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComponent, TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display projected content', () => {
    const testFixture = TestBed.createComponent(TestHostComponent);
    testFixture.detectChanges();

    const menuElement = testFixture.debugElement.query(By.css('ui-menu'));
    const projectedContent = menuElement.nativeElement.querySelector('p').textContent;
    expect(projectedContent).toBe('Test Menu Content');
  });
});
