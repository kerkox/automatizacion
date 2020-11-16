import { EstadoOrden } from './../../../enums/estado-orden.enum';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ColumnsTable } from 'src/app/components/orden-produccion-tabla/orden-produccion-tabla.component';

@Component({
  selector: 'app-orden-produccion',
  templateUrl: './orden-produccion.component.html',
  styleUrls: ['./orden-produccion.component.css']
})
export class OrdenProduccionComponent implements OnInit {

  @ViewChild('canvas', { static: true })

  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;
  
  orden_generada= [EstadoOrden.GENERADA]
  columns_show = [
      ColumnsTable.id,
      ColumnsTable.cliente,
      ColumnsTable.prioridad,
      ColumnsTable.referencia_producto,
      ColumnsTable.tipo_producto,
      ColumnsTable.presentacion_producto,
      ColumnsTable.cantidad,
      ColumnsTable.lotes_ejecutados,
      ColumnsTable.lotes_totales,
      // ColumnsTable.fecha_inicio,
      // ColumnsTable.fecha_terminado,
      ColumnsTable.estado,
      ColumnsTable.materias_primas,
      ColumnsTable.detalle,
  ]

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.animate()
  }

  animate(): void {
    const canvas = this.ctx.canvas;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.fillStyle = 'red';
    const square = new Square(this.ctx);
    square.draw(5, 1, 20);
    square.move(2, 30);
  }

  


}

export class Square {
  constructor(private ctx: CanvasRenderingContext2D) { }

  draw(x: number, y: number, z: number) {
    this.ctx.fillRect(z * x, z * y, z, z);
  }

  move(y: number, z: number) {
    const max = this.ctx.canvas.width / z;
    const canvas = this.ctx.canvas;
    let x = 0;
    const i = setInterval(() => {
      // this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.draw(x, y, z);
      x++;
      if (x >= max) {
        clearInterval(i);
      }
    }, 100);
  }
}