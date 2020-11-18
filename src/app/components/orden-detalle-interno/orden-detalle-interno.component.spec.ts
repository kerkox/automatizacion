import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenDetalleInternoComponent } from './orden-detalle-interno.component';

describe('OrdenDetalleInternoComponent', () => {
  let component: OrdenDetalleInternoComponent;
  let fixture: ComponentFixture<OrdenDetalleInternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenDetalleInternoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenDetalleInternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
