import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewTicketComponent } from './form-new-ticket.component';

describe('FormNewTicketComponent', () => {
  let component: FormNewTicketComponent;
  let fixture: ComponentFixture<FormNewTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormNewTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNewTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
