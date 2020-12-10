import { ReporteOrdenDialogComponent } from './../reporte-orden-dialog/reporte-orden-dialog.component';
import { OrdenProduccionDetalle, OrdenProduccionDetalleFlat } from './../../interfaces/orden-produccion-detalle.interface';
import { EstadoOrden } from './../../enums/estado-orden.enum';
import Swal from 'sweetalert2';
import { MatSort } from '@angular/material/sort';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from './../../services/general.service';
import { OrdenProduccionService } from './../../services/orden-produccion.service';
import { MatDialog } from '@angular/material/dialog';
import { OrdenProduccionDetalleComponent } from '../orden-produccion-detalle/orden-produccion-detalle.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-orden-produccion-tabla',
  templateUrl: './orden-produccion-tabla.component.html',
  styleUrls: ['./orden-produccion-tabla.component.css']
})
export class OrdenProduccionTablaComponent implements OnInit, AfterViewInit {

  @Input('estadosOrden') estadosOrden: EstadoOrden[]
  ordenes_produccion: any = []
  @Input('columns_show') columns_show: ColumnsTable[]
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
    'tiene_observaciones',
    'materias_primas',
    'detalle',
  ];
  dataSource: MatTableDataSource<any>
  constructor(private ordenProduccionService: OrdenProduccionService,
    private generalService: GeneralService,
    public dialog: MatDialog) {
    this.ordenes_produccion = []
    this.dataSource = new MatTableDataSource(this.ordenes_produccion)
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    if (this.columns_show) {
      this.titulos_columnas = this.columns_show;
    }
    this.consultarOrdenesProduccion();
  }

  get isGenerada() {
    return this.estadosOrden.includes(EstadoOrden.GENERADA);
  }

  get showReportes(): boolean {
    return this.estadosOrden.includes(EstadoOrden.TERMINADA);
  }

  consultarOrdenesProduccion() {
    this.ordenProduccionService.consultarOrdenesProduccion(this.estadosOrden).then((res: any) => {
      this.ordenes_produccion = res.data;
      this.dataSource = new MatTableDataSource(res.data.map((orden: any) => {
        return {
          select: false,
          ...this.flatOrdenProduccion(orden)
        }
      }))
      if(this.estadosOrden.includes(EstadoOrden["EN PRODUCCION"])){
        this.reintentarOrdenes();
      }
    })
      .catch(err => {
        console.error(err)
      })
  }

  reporte(){
    //vamos a mostrar el reporte
    const dialogRef = this.dialog.open(ReporteOrdenDialogComponent, {
      // width: '1200px',
      // data: orden_produccion
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed result:', result);
      // this.animal = result;
    });
  }

  flatOrdenProduccion(orden: OrdenProduccionDetalle): OrdenProduccionDetalleFlat {
    return {
      id_orden_produccion: orden.id,
      id_orden_pedido: orden.orden_pedido.id,
      receta_id: orden.orden_pedido.receta.id,
      cantidad_toneladas: orden.cantidad,
      cliente: orden.orden_pedido.cliente,
      lotes_ejecutados: orden.lotes_ejecutados,
      lotes_totales: orden.lotes_totales,
      cantidad_productos: orden.orden_pedido.cantidad,
      estado: orden.orden_pedido.estado,
      presentacion_descripcion: orden.orden_pedido.presentacion_producto.descripcion,
      presentacion_cantidad: orden.orden_pedido.presentacion_producto.cantidad,
      prioridad_nivel: orden.orden_pedido.prioridad.nivel,
      prioridad_descripcion: orden.orden_pedido.prioridad.descripcion,
      referencia_producto_descripcion: orden.orden_pedido.receta.referencia_producto.descripcion,
      tipo_producto_descripcion: orden.orden_pedido.receta.tipo_producto.descripcion,
      temperatura_precalentamiento: orden.orden_pedido.receta.temperatura_precalentamiento,
      tiempo_precalentamiento: orden.orden_pedido.receta.tiempo_precalentamiento,
      temperatura_calentamiento: orden.orden_pedido.receta.temperatura_calentamiento,
      tiempo_premezclado: orden.orden_pedido.receta.tiempo_premezclado,
      tiempo_mezclado: orden.orden_pedido.receta.tiempo_mezclado,
      materias_primas: orden.orden_pedido.receta.materias_primas,
      observaciones: orden.observaciones
    }
  }

  showMateriaPrima(materia_prima: any, toneladas_totales: number) {
    const toneladas = this.materiaPrimaPorcentaje(materia_prima, toneladas_totales)
    return `${materia_prima.descripcion}: ${toneladas} Ton (${materia_prima.MateriaPrimaReceta.porcentaje}%)`
  }

  materiaPrimaPorcentaje(materia_prima: any, toneladas_totales: number) {
    return (materia_prima.MateriaPrimaReceta.porcentaje / 100) * toneladas_totales
  }

  colorBadgeEstadoOrden(estado: string) {
    return this.generalService.colorBadgeEstadoOrden(estado);
  }

  colorBadgePrioridad(nivel: number) {
    return this.generalService.colorBadgePrioridad(nivel);
  }

  get ordenes_seleccionadas() {
    let ordenes = this.dataSource.data
      .filter(orden => orden.select)
      .map(orden => {

        return { id: orden.id_orden_produccion }
      });
      return ordenes;
  }

  aprobar_ordenes() {
    let ordenes = this.ordenes_seleccionadas
    // console.log("Ordenes seleccionadas para aprobar", ordenes)
    if (ordenes.length > 0) {
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
  }

  detalle_orden_produccion(orden_produccion_flat: OrdenProduccionDetalleFlat) {
    const orden_produccion = this.ordenes_produccion.find(orden => orden.id === orden_produccion_flat.id_orden_produccion)
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reintentarOrdenes() {
    if (!this.isNotEnProduccion()) return;
    this.ordenProduccionService.ejecutarOrden({ id: this.ordenes_produccion[0].id })
      .then(res => {
        Swal.fire("Ejecutada", "La ordenes de produccion ha sido ejecutada", 'success')
        console.log("res", res)
        this.consultarOrdenesProduccion();
      })
      .catch(err => {
        console.log("err", err)
        const message = err.error.message;
        Swal.fire("Ejecucion Error", `Ocurrrio un error al intentar ejecutar la orden: \n<br><strong>${message}</strong>`, 'error')
        // this.consultarOrdenesProduccion();
      })

  }

  isNotEnProduccion(): boolean {
    return this.ordenes_produccion.filter(orden => orden.orden_pedido.estado == EstadoOrden["EN PRODUCCION"]).length == 0
  }

  showBotonReintentoEjecutar(): boolean {
    return this.isNotEnProduccion() && this.estadosOrden.includes(EstadoOrden["EN PRODUCCION"])
  }


}


export enum ColumnsTable {
  id = 'id',
  cliente = 'cliente',
  prioridad = 'prioridad',
  referencia_producto = 'referencia_producto',
  tipo_producto = 'tipo_producto',
  presentacion_producto = 'presentacion_producto',
  cantidad = 'cantidad',
  lotes_ejecutados = 'lotes_ejecutados',
  lotes_totales = 'lotes_totales',
  fecha_inicio = 'fecha_inicio',
  fecha_terminado = 'fecha_terminado',
  estado = 'estado',
  materias_primas = 'materias_primas',
  detalle = 'detalle',
  tiene_observaciones = 'tiene_observaciones'
}