import { TestBed } from '@angular/core/testing';

import { ParkingLotService } from './parkinglot.service';

describe('ParkinglotService', () => {
  let service: ParkingLotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingLotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
