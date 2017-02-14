/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EstanciaService } from './estancia.service';

describe('EstanciaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstanciaService]
    });
  });

  it('should ...', inject([EstanciaService], (service: EstanciaService) => {
    expect(service).toBeTruthy();
  }));
});
