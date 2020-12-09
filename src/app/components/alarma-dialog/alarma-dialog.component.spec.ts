import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmaDialogComponent } from './alarma-dialog.component';

describe('AlarmaDialogComponent', () => {
  let component: AlarmaDialogComponent;
  let fixture: ComponentFixture<AlarmaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlarmaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
