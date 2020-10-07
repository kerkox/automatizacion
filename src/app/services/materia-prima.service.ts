import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


const BASE_URL = environment.base_url; 
@Injectable({
  providedIn: 'root'
})
export class MateriaPrimaService {

  constructor(private http: HttpClient) {

  }

 
  crear(materiaPrima: string) {
    return this.http.post(`${BASE_URL}/materiaPrimas`, {descripcion: materiaPrima}).toPromise();
  }

  obtenerMateriasPrimas() {
    return this.http.get(`${BASE_URL}/materiaPrimas`).toPromise();
  }

  borrarMateriaPrima(id: string){
    return this.http.delete(`${BASE_URL}/materiaPrimas/${id}`).toPromise();
  }

}
