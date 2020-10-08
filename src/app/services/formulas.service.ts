import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IFormula } from '../interfaces/formula.interface';
import { types } from '../types/types';

const BASE_URL = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class FormulasService {

  constructor(private http: HttpClient) { }

  consultarFormulas() {
    // Consultar informacion de local storeage
    return this.http.get(`${BASE_URL}/${types.API.Formulas}`).toPromise();
  }

  guardarFormula(formula: IFormula) {
    return this.http.post(`${BASE_URL}/${types.API.Formulas}`, formula).toPromise();
  }

  borrarFormula(id: string) {
    return this.http.delete(`${BASE_URL}/${types.API.Formulas}/${id}`).toPromise();
  }

  


}
