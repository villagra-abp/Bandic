/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PromocionService } from './promocion.service';

describe('PromocionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PromocionService]
    });
  });

  it('should ...', inject([PromocionService], (service: PromocionService) => {
    expect(service).toBeTruthy();
  }));
});
