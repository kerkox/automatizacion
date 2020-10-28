import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IFormula as IReceta } from '../interfaces/formula.interface';
import { types } from '../types/types';

const BASE_URL = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  constructor(private http: HttpClient) { }

  consultarRecetas() {
    // Consultar informacion de local storeage
    return this.http.get(`${BASE_URL}/${types.API.recetas}`).toPromise();
  }

  guardarReceta(receta: IReceta) {
    return this.http.post(`${BASE_URL}/${types.API.recetas}`, receta).toPromise();
  }

  borrarReceta(id: string) {
    return this.http.delete(`${BASE_URL}/${types.API.recetas}/${id}`).toPromise();
  }

  


}
