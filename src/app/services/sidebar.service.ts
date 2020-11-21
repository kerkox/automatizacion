import { Role } from './../enums/roles.enum';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  MODULOS: any[] = [
    {
      name:'DASHBOARD',
      menus:[
        {path: '/dashboard', 'name': 'Dashboard', roles:[Role.ADMIN,Role.ADMINISTRATIVO,Role.INGENIERO_QUIMICO,Role.OPERARIO]}
      ]
    },
    {
      name: 'ERP',
      menus: [
        { path: '/erp/inventario', name: 'Inventario', roles:[Role.ADMIN, Role.ADMINISTRATIVO] },
        { path: '/erp/orden-pedido', name: 'Orden Pedido', roles: [Role.ADMIN, Role.ADMINISTRATIVO] },
        { path: '/erp/materia-prima', name: 'Materia Prima', roles: [Role.ADMIN, Role.INGENIERO_QUIMICO] },
        { path: '/erp/parametros-referencia', name: 'Parametros Referencia', roles: [Role.ADMIN, Role.INGENIERO_QUIMICO] }
      ]
    },
    {
      name: 'MES',
      menus: [
        { path: '/mes/orden-produccion', name: 'Orden produccion', roles: [Role.ADMIN, Role.INGENIERO_QUIMICO]},
        { path: '/mes/orden-produccion-aprobada', name: 'Orden produccion Aprobadas', roles: [Role.ADMIN, Role.INGENIERO_QUIMICO] },
      ]
    },
    {
      name: 'Sistema de Control',
      menus: [
        {path: '/control/sistema-control', name:'Sistema Control', roles: [Role.ADMIN, Role.OPERARIO]}
      ]
    }


  ]
  constructor() { }

  cargarMenu(role: Role){
    return this.filterByRole(role)
  }

  private filterByRole(role: Role){
    // console.log("rol a filtrar", role)
    let modulos_filter = []
    for (let modulo of this.MODULOS) {
      let module_filter = JSON.parse(JSON.stringify(modulo));
      module_filter.menus = module_filter.menus.filter(menu => menu.roles.includes(role))
      module_filter.menus.length > 0 && modulos_filter.push(module_filter)
    }
    return modulos_filter;
  }


}
