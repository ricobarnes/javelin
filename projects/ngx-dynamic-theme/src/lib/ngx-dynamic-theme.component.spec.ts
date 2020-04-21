import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDynamicThemeComponent } from './ngx-dynamic-theme.component';

describe('NgxDynamicThemeComponent', () => {
  let component: NgxDynamicThemeComponent;
  let fixture: ComponentFixture<NgxDynamicThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxDynamicThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDynamicThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
