import { Component, OnInit } from '@angular/core';
import { Prioridad } from 'src/app/interfaces/prioridad.interface';
import { OrdenesProduccionService } from 'src/app/services/ordenes-produccion.service';

@Component({
  selector: 'app-orden-produccion',
  templateUrl: './orden-produccion.component.html',
  styleUrls: ['./orden-produccion.component.css']
})
export class OrdenProduccionComponent implements OnInit {

  ordenes_produccion: []
  orden_produccion: {
    referencia: string,
    tipo: string,
    presentacion: string,
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
      referencia: '',
      tipo: '',
      presentacion: '',
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
    this.ordenesProduccionService.consultarData('referencias').then((res: any) => {
      this.referencias = res;
    });
  }

  consultarTipos() {
    this.ordenesProduccionService.consultarData('tipos').then((res: any) => {
      this.tipos = res;
    });
  }

  consultarPresentaciones() {
    this.ordenesProduccionService.consultarData('presentaciones').then((res: any) => {
      this.presentaciones = res;
    });
  }

  consultarPrioridades() {
    this.ordenesProduccionService.consultarData('prioridades').then((res: any) => {
      this.prioridades = res;
    });
  }

  consultarOrdenesProduccion() {
    this.ordenesProduccionService.consultarData('ordenes').then((res: any) => {
      this.ordenes_produccion = res;
    });
  }

}
