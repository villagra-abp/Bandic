/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PulseraService } from './pulsera.service';

describe('PulseraService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PulseraService]
    });
  });

  it('should ...', inject([PulseraService], (service: PulseraService) => {
    expect(service).toBeTruthy();
  }));
});
