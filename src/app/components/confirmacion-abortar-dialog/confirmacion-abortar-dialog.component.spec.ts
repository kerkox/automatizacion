import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionAbortarDialogComponent } from './confirmacion-abortar-dialog.component';

describe('ConfirmacionAbortarDialogComponent', () => {
  let component: ConfirmacionAbortarDialogComponent;
  let fixture: ComponentFixture<ConfirmacionAbortarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmacionAbortarDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionAbortarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
