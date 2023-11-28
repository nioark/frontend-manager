/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServidoresService } from './servidores.service';

describe('Service: Servidores', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServidoresService]
    });
  });

  it('should ...', inject([ServidoresService], (service: ServidoresService) => {
    expect(service).toBeTruthy();
  }));
});
