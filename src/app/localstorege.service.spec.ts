import { TestBed } from '@angular/core/testing';

import { LocalstoregeService } from './localstorege.service';

describe('LocalstoregeService', () => {
  let service: LocalstoregeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalstoregeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
