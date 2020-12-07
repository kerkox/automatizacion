import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenProduccionTerminadaComponent } from './orden-produccion-terminada.component';

describe('OrdenProduccionTerminadaComponent', () => {
  let component: OrdenProduccionTerminadaComponent;
  let fixture: ComponentFixture<OrdenProduccionTerminadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenProduccionTerminadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenProduccionTerminadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
