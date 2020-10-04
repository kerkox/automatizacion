import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrosReferenciasComponent } from './parametros-referencias.component';

describe('ParametrosReferenciasComponent', () => {
  let component: ParametrosReferenciasComponent;
  let fixture: ComponentFixture<ParametrosReferenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametrosReferenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametrosReferenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
