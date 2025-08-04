import { TestBed } from '@angular/core/testing';

import { SanctionAmountService } from './sanction-amount.service';

describe('SanctionAmountService', () => {
  let service: SanctionAmountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SanctionAmountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
