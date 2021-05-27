import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsTopNavComponent } from './actions-top-nav.component';

describe('ActionsTopNavComponent', () => {
  let component: ActionsTopNavComponent;
  let fixture: ComponentFixture<ActionsTopNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsTopNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsTopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
