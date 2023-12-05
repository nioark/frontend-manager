/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HistoricosService } from './historicos.service';

describe('Service: Servidores', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HistoricosService]
    });
  });

  it('should ...', inject([HistoricosService], (service: HistoricosService) => {
    expect(service).toBeTruthy();
  }));
});
