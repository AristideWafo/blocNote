import { TestBed } from '@angular/core/testing';

import { KeyPressService } from './key-press.service';

describe('KeyPressService', () => {
  let service: KeyPressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyPressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
