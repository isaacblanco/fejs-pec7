import { TestBed } from '@angular/core/testing';

import { WineLoadResolverServiceService } from './wine-load-resolver.service.service';

describe('WineLoadResolverServiceService', () => {
  let service: WineLoadResolverServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WineLoadResolverServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
