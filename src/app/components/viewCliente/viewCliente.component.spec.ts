/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ViewClienteComponent } from './viewCliente.component';

describe('ViewClienteComponent', () => {
  let component: ViewClienteComponent;
  let fixture: ComponentFixture<ViewClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
