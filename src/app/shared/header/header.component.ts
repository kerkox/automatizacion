import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent  {

  public usuario: Usuario;

  constructor(private usuarioService: UsuarioService,
    private router: Router) {
    this.usuario = usuarioService.usuario;
  }

  logout() {
    this.usuarioService.logout();
  }


}
