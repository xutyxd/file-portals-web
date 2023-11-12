import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { configuredGuard } from './configured.guard';

describe('configuredGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => configuredGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
