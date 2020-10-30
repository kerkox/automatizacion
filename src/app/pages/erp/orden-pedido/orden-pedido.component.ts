import { OrdenPedido } from './../../../interfaces/OrdenPedido.interface';
import { Component, OnInit } from '@angular/core';
import { OrdenesPedidoService } from './../../../services/ordenes-pedido.service';

@Component({
  selector: 'app-orden-pedido',
  templateUrl: './orden-pedido.component.html',
  styleUrls: ['./orden-pedido.component.css']
})
export class OrdenPedidoComponent implements OnInit {

  ordenes_pedido: []
  orden_pedido: OrdenPedido 
  referencias: []
  tipos: []
  presentaciones: []
  prioridades: []
  constructor(private OrdenesPedidoService: OrdenesPedidoService) {
    this.orden_pedido = {
      referencia_producto_id: '',
      tipo_producto_id: '',
      presentacion_producto_id: '',
      cliente: null,
      prioridad_id: '',
      cantidad: 0,
    }
  }

  ngOnInit(): void {
    this.cargarDatos()
  }

  cargarDatos() {
    this.consultarOrdenesPedido();
    this.consultarPresentaciones()
    this.consultarPrioridades()
    this.consultarReferencias()
    this.consultarTipos()
  }

  consultarReferencias() {
    this.OrdenesPedidoService.consultarReferenciasProducto().then((res: any) => {
      this.referencias = res.data;
    });
  }

  consultarTipos() {
    this.OrdenesPedidoService.consultarTiposProducto().then((res: any) => {
      this.tipos = res.data;
    });
  }

  consultarPresentaciones() {
    this.OrdenesPedidoService.consultarPresentacionProducto().then((res: any) => {
      this.presentaciones = res.data;
    });
  }

  consultarPrioridades() {
    this.OrdenesPedidoService.consultarPrioridades().then((res: any) => {
      this.prioridades = res.data;
    });
  }

  guardarOrdenPedido(){
    this.OrdenesPedidoService.guardarOrdenPedido(this.orden_pedido).then(res => {
      this.consultarOrdenesPedido();
    }).catch(err => {
      console.error("ocurrio un error");
      console.error(err);
    })
  }

  consultarOrdenesPedido() {
    this.OrdenesPedidoService.consultarOrdenesPedido().then((res: any) => {
      this.ordenes_pedido = res.data;
    });
  }

  colorBadgeEstadoOrden(estado:string){
    switch(estado){
      case 'GENERADA':
        return 'badge badge-secondary'
      case 'EN PRODUCCION':
        return 'badge badge-secondary'
      case 'TERMINADA':
        return 'badge badge-success'
    }
  }

}
