/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditServidorComponent } from './editServidor.component';

describe('EditServidorComponent', () => {
  let component: EditServidorComponent;
  let fixture: ComponentFixture<EditServidorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditServidorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditServidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
