/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotificacionService } from './notificacion.service';

describe('NotificacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificacionService]
    });
  });

  it('should ...', inject([NotificacionService], (service: NotificacionService) => {
    expect(service).toBeTruthy();
  }));
});
