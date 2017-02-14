/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CategoriaProductoService } from './categoria-producto.service';

describe('CategoriaProductoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriaProductoService]
    });
  });

  it('should ...', inject([CategoriaProductoService], (service: CategoriaProductoService) => {
    expect(service).toBeTruthy();
  }));
});
