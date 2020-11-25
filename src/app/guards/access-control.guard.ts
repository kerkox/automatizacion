import { SidebarService } from '../services/sidebar.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessControlGuard implements CanActivate, CanLoad {
  
  constructor(private usuarioService: UsuarioService,
              private sidebarService: SidebarService,
              private router: Router) {

  }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    console.log("segments: ", segments)
    const url: string = this.getPath(segments);
    console.log("path laod: ", url)
    if (this.validateContinue(url)) {
      return true;
    } else {
      this.router.navigateByUrl('/')
      return false;
    }
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

  getPath(segments: UrlSegment[]): string{
    let path = "/app";
    for(const segment of segments){
      path += "/" + segment.path
    }
    return path;
  }

  validateContinue(url: string){
    //Se consulta cual es la ruta con ese path
    let valid = false;
    for( let modulo of this.sidebarService.cargarMenu(this.usuarioService.role)){
      for(let menu of modulo.menus){
        if(menu.path == url){
          valid = true;
          break;
        }
      }
    }

    return valid;
  }
  
}
