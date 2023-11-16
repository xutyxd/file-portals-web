import { TestBed } from '@angular/core/testing';

import { PeerDnsClientService } from './peer-dns-client.service';

describe('PeerDnsClientService', () => {
  let service: PeerDnsClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeerDnsClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
