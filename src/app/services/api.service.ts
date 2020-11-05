import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(endpoint: any) {
    return this.http.get(`${BASE_URL}/${endpoint}`).toPromise();
  }
  
  post(endpoint: any, valor: any) {
    return this.http.post(`${BASE_URL}/${endpoint}`, valor).toPromise();
  }

  put(endpoint: any, id: any,valor: any){
    return this.http.put(`${BASE_URL}/${endpoint}/${id}`, valor).toPromise();
  }

  delete(endpoint: any, id: any){
    return this.http.delete(`${BASE_URL}/${endpoint}/${id}`).toPromise();
  }
}
