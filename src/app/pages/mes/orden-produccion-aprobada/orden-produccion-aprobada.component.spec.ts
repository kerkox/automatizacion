import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenProduccionAprobadaComponent } from './orden-produccion-aprobada.component';

describe('OrdenProduccionAprobadaComponent', () => {
  let component: OrdenProduccionAprobadaComponent;
  let fixture: ComponentFixture<OrdenProduccionAprobadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenProduccionAprobadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenProduccionAprobadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
