import { TestBed } from '@angular/core/testing';

import { ProjectService } from './project.service';
import { TestsModule } from 'src/app/shared/tests/tests.module';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestsModule],
    });
    service = TestBed.inject(ProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
