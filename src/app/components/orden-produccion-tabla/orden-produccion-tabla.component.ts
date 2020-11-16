import { OrdenProduccionDetalle } from './../../interfaces/orden-produccion-detalle.interface';
import { EstadoOrden } from './../../enums/estado-orden.enum';
import Swal from 'sweetalert2';
import { MatSort } from '@angular/material/sort';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from './../../services/general.service';
import { OrdenProduccionService } from './../../services/orden-produccion.service';
import { MatDialog } from '@angular/material/dialog';
import { OrdenProduccionDetalleComponent } from '../orden-produccion-detalle/orden-produccion-detalle.component';

@Component({
  selector: 'app-orden-produccion-tabla',
  templateUrl: './orden-produccion-tabla.component.html',
  styleUrls: ['./orden-produccion-tabla.component.css']
})
export class OrdenProduccionTablaComponent implements OnInit {

  @Input() estadoOrden: EstadoOrden
  ordenes_produccion: any = []
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
    'materias_primas',
    'detalle',
  ];
  constructor(private ordenProduccionService: OrdenProduccionService,
    private generalService: GeneralService, 
    public dialog: MatDialog) {
    this.ordenes_produccion = []
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.ordenes_produccion.sort = this.sort;
  }

  ngOnInit(): void {
    this.consultarOrdenesProduccion();
  }

  get isGenerada() {
    return this.estadoOrden == EstadoOrden.GENERADA;
  }

  consultarOrdenesProduccion() {
    this.ordenProduccionService.consultarOrdenesProduccion(this.estadoOrden).then((res: any) => {
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

  showMateriaPrima(materia_prima:any, toneladas_totales:number){
    const toneladas = this.materiaPrimaPorcentaje(materia_prima,toneladas_totales)
    return `${materia_prima.descripcion}: ${toneladas} Ton (${materia_prima.MateriaPrimaReceta.porcentaje}%)`
  }

  materiaPrimaPorcentaje(materia_prima:any, toneladas_totales:number){
    return   (materia_prima.MateriaPrimaReceta.porcentaje / 100) * toneladas_totales
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

  detalle_orden_produccion(orden_produccion: OrdenProduccionDetalle) {
    console.log("Detalle de la orden de produccion")
    this.openDialog(orden_produccion)
    // Navegar a una pantalla donde a traves del ID de la orden se puedan ver mas detalles

  }

  openDialog(orden_produccion: OrdenProduccionDetalle): void {
    const dialogRef = this.dialog.open(OrdenProduccionDetalleComponent, {
      width: '1200px',
      data: orden_produccion
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed result:', result);
      // this.animal = result;
    });
  }


}
