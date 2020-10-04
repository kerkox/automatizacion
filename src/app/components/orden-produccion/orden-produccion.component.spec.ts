import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenProduccionComponent } from './orden-produccion.component';

describe('OrdenProduccionComponent', () => {
  let component: OrdenProduccionComponent;
  let fixture: ComponentFixture<OrdenProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenProduccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
