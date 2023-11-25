import { TestBed } from '@angular/core/testing';

import { MaterialIconService } from './material-icon.service';

describe('MaterialIconService', () => {
  let service: MaterialIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialIconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
