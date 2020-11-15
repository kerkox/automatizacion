import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenProduccionDetalleComponent } from './orden-produccion-detalle.component';

describe('OrdenProduccionDetalleComponent', () => {
  let component: OrdenProduccionDetalleComponent;
  let fixture: ComponentFixture<OrdenProduccionDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenProduccionDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenProduccionDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
