import { GeneralService } from './../../services/general.service';
import { OrdenProduccionDetalle } from './../../interfaces/orden-produccion-detalle.interface';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-orden-produccion-detalle',
  templateUrl: './orden-produccion-detalle.component.html',
  styleUrls: ['./orden-produccion-detalle.component.css']
})
export class OrdenProduccionDetalleComponent implements OnInit {

  data_mostrar: RowDetalleOrden[] = []
  constructor(
    private generalService:  GeneralService,
    public dialogRef: MatDialogRef<OrdenProduccionDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrdenProduccionDetalle) { }

  ngOnInit(): void {
    console.log("this.data", this.data)
    this.loadData();
  }

  colorBadgeEstadoOrden(estado: string) {
    return this.generalService.colorBadgeEstadoOrden(estado);
  }

  colorBadgePrioridad(nivel: number) {
    return this.generalService.colorBadgePrioridad(nivel);
  }
  materiaPrimaPorcentaje(materia_prima: any, toneladas_totales: number) {
    return (materia_prima.MateriaPrimaReceta.porcentaje / 100) * toneladas_totales
  }


  getColumnClassCalculated(colSize:ColSize){
    const getColumnsClassSize = (colSize: ColSize) => {
      return ` ${ 'col-sm-' + (colSize.sm || 6)}`
            + ` ${ colSize.md && 'col-md-' + colSize.md || ''}`
            + ` ${ colSize.lg && 'col-lg-' + colSize.lg || ''}`
    }
    let calculated = { 
                        col: colSize.col && 12-colSize.col||null,
                        sm:  colSize.sm  && 12-colSize.sm ||null,
                        md:  colSize.md  && 12-colSize.md ||null,
                        lg:  colSize.lg  && 12-colSize.lg ||null 
                      }
    return {
      class_propiedad: getColumnsClassSize(colSize),
      class_valor: getColumnsClassSize(calculated)
    }
  }

  loadData() {
    this.data_mostrar = [
      {
        col_left: 
        {
          propiedad:"Cliente:",
          valor:this.data.orden_pedido.cliente
        },
        col_right:
        {
          propiedad: 'Cantidad en Toneladas:',
          valor: this.data.orden_pedido.cantidad,
          ...this.getColumnClassCalculated({col:8,sm:8,lg:8})          
        },
      },
      {
        col_left:
        {
          propiedad:'Lotes Ejecutados:',
          valor: this.data.lotes_ejecutados,
          ...this.getColumnClassCalculated({col:8})
        }, 
        col_right:
        {
          propiedad:'Lotes Totales:',
          valor: this.data.lotes_totales
        }
      },
      {
        col_left:
        {
          propiedad:'Cantidad de productos pedido:',
          valor: this.data.orden_pedido.cantidad,
          ...this.getColumnClassCalculated({col:10,sm:8,md:8,lg:10})
        }, 
        col_right:
        {
          propiedad:'Estado:',
          template: `
          <span class="${this.colorBadgeEstadoOrden(this.data.orden_pedido.estado)}">
            ${ this.data.orden_pedido.estado }
          </span>
          `
        }
      },
      {
        col_left:
        {
          propiedad:'Presentacion producto:',
          valor: this.data.orden_pedido.presentacion_producto.descripcion,
          ...this.getColumnClassCalculated({col:8,sm:8, md:8})          
        }, 
        col_right:
        {
          propiedad:'Prioridad:',
          template: `
          <span class="${this.colorBadgePrioridad(this.data.orden_pedido.prioridad.nivel)}">
            ${ this.data.orden_pedido.prioridad.descripcion.toUpperCase() }
          </span>
          `
        }
      },
      {
        col_left:
        {
          propiedad:'Referencia:',
          valor: this.data.orden_pedido.receta.referencia_producto.descripcion
        }, 
        col_right:
        {
          propiedad:'Tipo:',
          valor: this.data.orden_pedido.receta.tipo_producto.descripcion
        }
      },
      {
        col_left:
        {
          propiedad:'Temperatura Precalentamiento:',
          valor: this.data.orden_pedido.receta.temperatura_precalentamiento,
          ...this.getColumnClassCalculated({col:10,sm:9, md:10})
        }, 
        col_right:
        {
          propiedad:'Tiempo Precalentamiento:',
          valor: this.data.orden_pedido.receta.tiempo_precalentamiento,
          ...this.getColumnClassCalculated({col:10,sm:8, md:9})
        }
      },
      {
        col_left:
        {
          propiedad:'Temperatura Calentamiento:',
          valor: this.data.orden_pedido.receta.temperatura_calentamiento,
          ...this.getColumnClassCalculated({col:10,sm:8,md:9})
        }, 
        col_right:
        {
          propiedad:'Tiempo Premezclado:',
          valor: this.data.orden_pedido.receta.tiempo_premezclado,
          ...this.getColumnClassCalculated({col:8,md:8})          
        }
      },
      {
        col_left:
        {
          propiedad:'Tiempo Mezclado:',
          valor: this.data.orden_pedido.receta.tiempo_mezclado,
          ...this.getColumnClassCalculated({col:8,md:8})          
        }, 
        col_right:null
      },
    ]
  }

}

export interface ColSize {
  col?:number
  sm?:number,
  md?:number,
  lg?:number
}

export interface RowDetalleOrden {
    col_left: DetalleOrden,
    col_right: DetalleOrden
}


export interface DetalleOrden {
  propiedad: string,
  valor?: string | number,
  class_propiedad?: string,
  class_valor?: string,
  template?:any


}