import { Component, OnInit } from '@angular/core';
import { Prioridad } from 'src/app/interfaces/prioridad.interface';

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
    prioridad: Prioridad,
    codigo: string
    cantidad: number,
  }
  constructor() { }

  ngOnInit(): void {
  }

}
