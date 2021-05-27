import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppItemsComponent } from './app-items.component';

describe('AppItemsComponent', () => {
  let component: AppItemsComponent;
  let fixture: ComponentFixture<AppItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
