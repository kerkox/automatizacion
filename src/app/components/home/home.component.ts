import { ParkingLotService } from '../../services/parkinglot.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  parkingTickets = [];
  active:boolean = true;
  constructor(public parkingLotService:ParkingLotService) { }

  ngOnInit(): void {
    this.loadParkingTickets();
  }
  showActions(){
     return typeof this.active == 'string' ? this.active == 'true' : this.active
  }
  
  loadParkingTickets() {
    this.parkingLotService.getParkingTickets(this.active)
      .then((resp:any) => {
        console.log("resp", resp)
        this.parkingTickets = resp;

      }).catch(error => {
        console.log('error', error);
      })
  }

  StopParkingTicket(LicensePlate:string){
    this.parkingLotService.stopParkingTicket(LicensePlate)
    .then(resp => {
      this.showInformationAmountCharge(resp);
      this.loadParkingTickets();
    })
  }

  showInformationAmountCharge(info){
    console.log("info",info);
    alert("Valor a pagar: " + info.Price);
  }

}
