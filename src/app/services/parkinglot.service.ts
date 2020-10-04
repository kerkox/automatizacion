import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParkingTicket } from '../interfaces/parkingTicket.interface';
import { environment } from '../../environments/environment';

const BASE_URL = environment.base_url; 
@Injectable({
  providedIn: 'root'
})
export class ParkingLotService {

  constructor(public http: HttpClient) { }

  getVehicleTypes() {
    return [
      { value: 0, name: "Carro" },
      { value: 1, name: "Moto" }
    ];
  }

  sendParkingTicketService(parkingTicket:ParkingTicket){
    return this.http.post(`${BASE_URL}/parkingTicket`, parkingTicket).toPromise();
  }

  getParkingTickets(active:boolean=true){
    return this.http.get(`${BASE_URL}/parkingTicket?active=${active}`).toPromise();
  }

  stopParkingTicket(LicensePlate: string){
    return this.http.post(`${BASE_URL}/parkingTicket/stop`, {LicensePlate}).toPromise();
  }
}
