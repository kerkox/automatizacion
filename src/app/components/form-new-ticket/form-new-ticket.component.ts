import { ParkingLotService } from './../../services/parkinglot.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ParkingTicket } from '../../interfaces/parkingTicket.interface';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form-new-ticket',
  templateUrl: './form-new-ticket.component.html',
  styleUrls: ['./form-new-ticket.component.css']
})
export class FormNewTicketComponent implements OnInit {

  vehicleTypes = [];
  parkingTicket: ParkingTicket = {
    LicensePlate: null,
    VehicleType: -1,
    Displacement: 0
  }

  @Output() createdParkinTicket = new EventEmitter<string>();

  public parkingTicketForm = this.fb.group({
    LicensePlate: [null, [Validators.required, Validators.minLength(6)]],
    VehicleType: [-1, [Validators.required]],
    Displacement: [0, Validators.min(0)]
  })

  constructor(private fb: FormBuilder, public parkingLotService: ParkingLotService) {
    this.vehicleTypes = this.parkingLotService.getVehicleTypes();
  }

  ngOnInit(): void {
    console.log(this.vehicleTypes);
  }



  sendParkingTicket() {
    if (this.parkingTicketForm.invalid) {
      return;
    }
    console.log(this.parkingTicketForm.value);
    this.parkingLotService.sendParkingTicketService(this.parkingTicketForm.value)
      .then(resp => {
        console.log("Se creo el Ticket");        
        this.createdParkinTicket.emit("created")
      })
      .catch(err => {
        // alert(err.error.error)
        Swal.fire('Error', err.error.error, 'error');
        console.log("Error en la peticion: ", err);
      })


  }

}
