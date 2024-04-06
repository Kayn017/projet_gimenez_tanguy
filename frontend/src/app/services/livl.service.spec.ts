import { TestBed } from '@angular/core/testing';

import { LivlService } from './livl.service';

describe('LivlService', () => {
  let service: LivlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
