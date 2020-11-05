import { ApiService } from './api.service';
import { IInventario } from './../interfaces/inventario.interface';
import { Injectable } from '@angular/core';
import { types } from '../types/types';


@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private api: ApiService) {}

  crear(inventario: IInventario) {
    return this.api.post(types.API.Inventario, inventario);
  }

  obtenerInventarios() {
    return this.api.get(types.API.Inventario);
  }

  borrar(id: string) {
    return this.api.delete(types.API.Inventario,id);
  }

  actualizar(id: string, inventario: IInventario) {
    return this.api.put(types.API.Inventario,id, inventario);
  }
}
