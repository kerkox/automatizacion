import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenProduccionTablaComponent } from './orden-produccion-tabla.component';

describe('OrdenProduccionTablaComponent', () => {
  let component: OrdenProduccionTablaComponent;
  let fixture: ComponentFixture<OrdenProduccionTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenProduccionTablaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenProduccionTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
