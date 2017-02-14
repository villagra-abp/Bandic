/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HabitacionService } from './habitacion.service';

describe('HabitacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HabitacionService]
    });
  });

  it('should ...', inject([HabitacionService], (service: HabitacionService) => {
    expect(service).toBeTruthy();
  }));
});
