import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteOrdenDialogComponent } from './reporte-orden-dialog.component';

describe('ReporteOrdenDialogComponent', () => {
  let component: ReporteOrdenDialogComponent;
  let fixture: ComponentFixture<ReporteOrdenDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteOrdenDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteOrdenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
