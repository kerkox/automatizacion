import { Prioridad } from './prioridad.interface';
import { EstadoOrden } from './../enums/estado-orden.enum';
export interface OrdenProduccionDetalle {
  cantidad: number,
  fecha_inicio?: Date
  fecha_terminado?: Date
  id:number,
  lotes_ejecutados: number,
  lotes_totales: number,
  orden_pedido: OrdenPedidoDetalle,
  created_at: Date
}

export interface OrdenPedidoDetalle {
  cantidad: number,
  cliente: string,
  estado: EstadoOrden,
  id: number,
  presentacion_producto: PresentacionProducto
  prioridad: Prioridad,
  receta: RecetaDetalle
}

export interface PresentacionProducto {
  id: number,
  descripcion: string,
  canitdad: number
}

export interface RecetaDetalle {
  id: number,
  materias_primas: MateriaPrimaDetalle[],
  referencia_producto: ReferenciaProducto,
  temperatura_calentamiento: number,
  temperatura_precalentamiento: number,
  tiempo_mezclado: number,
  tiempo_precalentamiento: number,
  tiempo_premezclado: number,
  tipo_producto: TipoProducto
}

export interface ReferenciaProducto {
  id: number,
  descripcion: string
}

export interface TipoProducto {
  id: number,
  descripcion: string
}

export interface MateriaPrimaDetalle {
  id: number,
  descripcion: string,
  MateriaPrimaReceta: MateriaPrimaReceta

}

export interface MateriaPrimaReceta { porcentaje: number }
