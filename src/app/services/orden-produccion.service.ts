import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { types } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class OrdenProduccionService {

  constructor(private api: ApiService) { }


  consultarOrdenesProduccion() {
    return this.api.get(types.API.OrdenesProducciones);
  }


}
