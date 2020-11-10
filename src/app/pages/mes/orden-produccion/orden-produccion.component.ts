import { GeneralService } from './../../../services/general.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdenProduccionService } from './../../../services/orden-produccion.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-orden-produccion',
  templateUrl: './orden-produccion.component.html',
  styleUrls: ['./orden-produccion.component.css']
})
export class OrdenProduccionComponent implements OnInit {

  ordenes_produccion:any = []
  titulos_columnas: string[] = [
    'id',
    'cliente',
    'prioridad',
    'referencia_producto',
    'tipo_producto',
    'presentacion_producto',
    'cantidad',
    'lotes_ejecutados',
    'lotes_totales',
    'fecha_inicio',
    'fecha_terminado',
    'estado',
  ];
  constructor(private ordenProduccionService: OrdenProduccionService,
    private generalService: GeneralService) { 
    this.ordenes_produccion = []
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.ordenes_produccion.sort = this.sort;
  }

  ngOnInit(): void {
    this.consultarOrdenesProduccion();
  }

  consultarOrdenesProduccion(){
    this.ordenProduccionService.consultarOrdenesProduccion().then((res:any) => {
      this.ordenes_produccion = res.data;      
    })
    .catch(err => {
      console.error(err)
    })
  }

  colorBadgeEstadoOrden(estado: string){
    return this.generalService.colorBadgeEstadoOrden(estado);
  }

}
