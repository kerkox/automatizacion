import { TestBed } from '@angular/core/testing';

import { OrdenProduccionService } from './orden-produccion.service';

describe('OrdenProduccionService', () => {
  let service: OrdenProduccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdenProduccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
