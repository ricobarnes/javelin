import { TestBed } from '@angular/core/testing';

import { NgxDynamicThemeService } from './ngx-dynamic-theme.service';

describe('NgxDynamicThemeService', () => {
  let service: NgxDynamicThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxDynamicThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
