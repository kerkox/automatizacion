import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-orden-detalle-interno',
  templateUrl: './orden-detalle-interno.component.html',
  styleUrls: ['./orden-detalle-interno.component.css']
})
export class OrdenDetalleInternoComponent implements OnInit {

  @Input('propiedad') propiedad: string
  @Input('valor') valor: any
  @Input('class_propiedad') class_propiedad: string
  @Input('class_valor') class_valor: string
  
  constructor() { }

  ngOnInit(): void {
  }

}
