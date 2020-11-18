import { Usuario } from './../models/usuario.model';
import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';



import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor(private http: HttpClient,
    private router: Router,
    private ngZone: NgZone) {

    // this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get role(): 'ADMINISTRATIVO' | 'INGENIERO_QUIMICO' {
    return this.usuario.role;
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'Authorization': "Bearer "+this.token
      }
    }
  }


  // googleInit() {

  //   return new Promise(resolve => {
  //     gapi.load('auth2', () => {
  //       this.auth2 = gapi.auth2.init({
  //         client_id: '',
  //         cookiepolicy: 'single_host_origin',
  //       });

  //       resolve();
  //     });
  //   })

  // }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');

    // this.auth2.signOut().then(() => {

    //   this.ngZone.run(() => {
    //     this.router.navigateByUrl('/login');
    //   })
    // });

  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    // console.log("base_url", base_url)
    return this.http.get(`${base_url}/user/login/renew`, {
      headers: {
        'Authorization': "Bearer "+token
      }
    }).pipe(
      tap((resp: any) => {
        // console.log("resp",resp)
        localStorage.setItem('token', resp.data.token);
      }),
      map(resp =>{
        // console.log("resp", resp)
        return true;
      } ),
      catchError(error =>{
        console.log("error", error)
        return of(false)
      } )
    );

  }


  crearUsuario(formData: RegisterForm) {

    return this.http.post(`${base_url}/user/register`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.data.token)
        })
      )

  }

  login(formData: LoginForm) {

    return this.http.post(`${base_url}/user/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.data.token)
        })
      );

  }

  // loginGoogle(token) {

  //   return this.http.post(`${base_url}/login/google`, { token })
  //     .pipe(
  //       tap((resp: any) => {
  //         localStorage.setItem('token', resp.token)
  //       })
  //     );

  // }



}