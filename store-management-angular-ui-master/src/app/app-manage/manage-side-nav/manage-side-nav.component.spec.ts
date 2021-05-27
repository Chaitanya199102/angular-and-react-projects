import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSideNavComponent } from './manage-side-nav.component';

describe('ManageSideNavComponent', () => {
  let component: ManageSideNavComponent;
  let fixture: ComponentFixture<ManageSideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
