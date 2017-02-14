/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProfileBarService } from './profile-bar.service';

describe('ProfileBarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileBarService]
    });
  });

  it('should ...', inject([ProfileBarService], (service: ProfileBarService) => {
    expect(service).toBeTruthy();
  }));
});
