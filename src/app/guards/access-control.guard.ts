import { SidebarService } from '../services/sidebar.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AccessControlGuard implements CanActivate {
  
  constructor(private usuarioService: UsuarioService,
              private sidebarService: SidebarService,
              private router: Router) {

  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const url: string = state.url;
      if(this.validateContinue(url)){
        return true;
      } else {
        this.router.navigateByUrl('/')
        return false;
      }
  }

  validateContinue(url: string){
    //Se consulta cual es la ruta con ese path
    let valid = false;
    for( let modulo of this.sidebarService.cargarMenu(this.usuarioService.role)){
      for(let menu of modulo.menus){
        console.log("menu.path", menu.path)
        console.log("url: ", url)
        if(menu.path == url){
          valid = true;
          break;
        }
      }
    }

    return valid;
  }
  
}
