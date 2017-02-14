/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MetricasService } from './metricas.service';

describe('MetricasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MetricasService]
    });
  });

  it('should ...', inject([MetricasService], (service: MetricasService) => {
    expect(service).toBeTruthy();
  }));
});
