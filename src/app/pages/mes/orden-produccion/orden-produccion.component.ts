import { GeneralService } from './../../../services/general.service';
import { Component, OnInit } from '@angular/core';
import { OrdenProduccionService } from './../../../services/orden-produccion.service';

@Component({
  selector: 'app-orden-produccion',
  templateUrl: './orden-produccion.component.html',
  styleUrls: ['./orden-produccion.component.css']
})
export class OrdenProduccionComponent implements OnInit {

  ordenes_produccion:any
  constructor(private ordenProduccionService: OrdenProduccionService,
    private generalService: GeneralService) { 
    this.ordenes_produccion = []
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
