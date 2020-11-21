import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemaControlComponent } from './sistema-control.component';

describe('SistemaControlComponent', () => {
  let component: SistemaControlComponent;
  let fixture: ComponentFixture<SistemaControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SistemaControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SistemaControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
