/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RolService } from './rol.service';

describe('RolService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RolService]
    });
  });

  it('should ...', inject([RolService], (service: RolService) => {
    expect(service).toBeTruthy();
  }));
});
