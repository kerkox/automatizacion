import { Component, OnInit } from '@angular/core';
import { OrdenesProduccionService } from 'src/app/services/ordenes-produccion.service';

@Component({
  selector: 'app-orden-produccion',
  templateUrl: './orden-produccion.component.html',
  styleUrls: ['./orden-produccion.component.css']
})
export class OrdenProduccionComponent implements OnInit {

  ordenes_produccion: []
  orden_produccion: {
    referencia_producto: string,
    tipo_producto: string,
    presentacion_producto: string,
    cliente: string,
    prioridad: string,
    codigo: string
    cantidad: number,
  }
  referencias: []
  tipos: []
  presentaciones: []
  prioridades: []
  constructor(private ordenesProduccionService: OrdenesProduccionService) {
    this.orden_produccion = {
      referencia_producto: '',
      tipo_producto: '',
      presentacion_producto: '',
      cliente: null,
      prioridad: '',
      codigo: null,
      cantidad: 0,
    }
  }

  ngOnInit(): void {
    this.cargarDatos()
  }

  cargarDatos() {
    this.consultarOrdenesProduccion();
    this.consultarPresentaciones()
    this.consultarPrioridades()
    this.consultarReferencias()
    this.consultarTipos()
  }

  consultarReferencias() {
    this.ordenesProduccionService.consultarReferenciasProducto().then((res: any) => {
      this.referencias = res.data;
    });
  }

  consultarTipos() {
    this.ordenesProduccionService.consultarTiposProducto().then((res: any) => {
      this.tipos = res.data;
    });
  }

  consultarPresentaciones() {
    this.ordenesProduccionService.consultarPresentacionProducto().then((res: any) => {
      this.presentaciones = res.data;
    });
  }

  consultarPrioridades() {
    this.ordenesProduccionService.consultarPrioridades().then((res: any) => {
      this.prioridades = res.data;
    });
  }

  consultarOrdenesProduccion() {
    this.ordenesProduccionService.consultarOrdenesProduccion().then((res: any) => {
      this.ordenes_produccion = res.data;
    });
  }

}
