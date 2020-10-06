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
    prioridad: Prioridad,
    codigo: string
    cantidad: number,
  }
  constructor(private ordenesProduccionService: OrdenesProduccionService) { }

  ngOnInit(): void {
  }

  consultarOrdenesProduccion() {
    this.ordenesProduccionService.consultarOrdenesProduccion().then((res:any) => {
      this.ordenes_produccion = res;
    });
  }

}
