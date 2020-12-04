import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaCalidadDialogComponent } from './prueba-calidad-dialog.component';

describe('PruebaCalidadDialogComponent', () => {
  let component: PruebaCalidadDialogComponent;
  let fixture: ComponentFixture<PruebaCalidadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PruebaCalidadDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaCalidadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
