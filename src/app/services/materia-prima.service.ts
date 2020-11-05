import { ApiService } from './api.service';
import { ActualizarMateriaPrima } from './../interfaces/materiaPrima.interface';
import { Injectable } from '@angular/core';
import { CrearMateriaPrima } from '../interfaces/materiaPrima.interface';
import { types } from '../types/types';


@Injectable({
  providedIn: 'root'
})
export class MateriaPrimaService {

  constructor(private api: ApiService) {}
 
  crear(crearMateriaPrima: CrearMateriaPrima) {
    return this.api.post(types.API.MateriaPrimas, crearMateriaPrima);
  }

  obtenerMateriasPrimas() {
    return this.api.get(types.API.MateriaPrimas);
  }

  borrar(id: string){
    return this.api.delete(types.API.MateriaPrimas,id);
  }

  actualizar(actualizarMateriaPrima:ActualizarMateriaPrima ) {
    return this.api.put(types.API.MateriaPrimas,actualizarMateriaPrima.id, actualizarMateriaPrima);
  }

}
