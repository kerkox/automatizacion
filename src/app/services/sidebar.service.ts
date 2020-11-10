import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  MODULOS: any[] = [
    {
      name: 'ERP',
      menus: [
        { path: '/erp/inventario', name: 'Inventario' },
        { path: '/erp/materia-prima', name: 'Materia Prima' },
        { path: '/erp/orden-pedido', name: 'Orden Pedido' },
        { path: '/erp/parametros-referencia', name: 'Parametros Referencia' }
      ]
    },
    {
      name: 'MES',
      menus: [
        { path: '/mes/orden-produccion', name: 'Orden produccion' },
      ]
    }


  ]
  constructor() { }
}
