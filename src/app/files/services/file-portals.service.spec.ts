import { TestBed } from '@angular/core/testing';

import { FilePortalsService } from './file-portals.service';

describe('FilePortalsService', () => {
  let service: FilePortalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilePortalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
