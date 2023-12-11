import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewActionDataComponent } from './view-action-data.component';

describe('ViewActionDataComponent', () => {
  let component: ViewActionDataComponent;
  let fixture: ComponentFixture<ViewActionDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewActionDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewActionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
