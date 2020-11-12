import { EstadoOrden } from './../../../enums/estado-orden.enum';
import Swal from 'sweetalert2';
import { GeneralService } from './../../../services/general.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdenProduccionService } from './../../../services/orden-produccion.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-orden-produccion-aprobada',
  templateUrl: './orden-produccion-aprobada.component.html',
  styleUrls: ['./orden-produccion-aprobada.component.css']
})
export class OrdenProduccionAprobadaComponent implements OnInit {

  ordenes_produccion: any = []
  orden_generada = EstadoOrden.GENERADA
  orden_en_produccion = EstadoOrden["EN PRODUCCION"]
  orden_terminada = EstadoOrden.TERMINADA
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
    // 'detalle',
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

  consultarOrdenesProduccion() {
    this.ordenProduccionService.consultarOrdenesProduccion().then((res: any) => {
      this.ordenes_produccion = res.data.map((orden: any) => {
        return {
          select: false,
          ...orden
        }
      });
    })
      .catch(err => {
        console.error(err)
      })
  }

  colorBadgeEstadoOrden(estado: string) {
    return this.generalService.colorBadgeEstadoOrden(estado);
  }

  colorBadgePrioridad(nivel: number) {
    return this.generalService.colorBadgePrioridad(nivel);
  }

  aprobar_ordenes() {
    let ordenes = this.ordenes_produccion
      .filter(orden => orden.select)
      .map(orden => {
        return { id: orden.id }
      });
    console.log("Ordenes seleccionadas para aprobar", ordenes)

    this.ordenProduccionService.aprobar(ordenes).then(res => {
      // mensaje de se aprobo correctamente
      Swal.fire("Aprobadas", "Las ordenes de produccion han sido aprobadas", 'success')
      this.consultarOrdenesProduccion();
    })
      .catch(err => {
        // mensaje ocurrio algun error
        Swal.fire("Aprobacion Error", "Ocurrrio un error al intentar aprobar las ordenes de produccion", 'error')
      })
  }

  detalle_orden_produccion(id: number) {
    console.log("Detalle de la orden de produccion")
    // Navegar a una pantalla donde a traves del ID de la orden se puedan ver mas detalles

  }


}
