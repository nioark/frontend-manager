/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CargosService } from './cargos.service';

describe('Service: Servidores', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CargosService]
    });
  });

  it('should ...', inject([CargosService], (service: CargosService) => {
    expect(service).toBeTruthy();
  }));
});
