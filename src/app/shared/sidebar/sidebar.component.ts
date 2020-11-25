import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from './../../services/usuario.service';
import { SidebarService } from './../../services/sidebar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  modulos:any = [];
  usuario: Usuario;
  constructor(private sidebarService: SidebarService, private usuarioService: UsuarioService ) {
    this.modulos = this.sidebarService.cargarMenu(this.usuarioService.usuario.role);
    this.usuario = this.usuarioService.usuario;
   }

  ngOnInit(): void {
    this.modulos = this.sidebarService.cargarMenu(this.usuarioService.usuario.role);
  }

  nothing() {
    
  }

}
