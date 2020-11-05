import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orden-produccion',
  templateUrl: './orden-produccion.component.html',
  styleUrls: ['./orden-produccion.component.css']
})
export class OrdenProduccionComponent implements OnInit {

  ordenes_produccion:any
  constructor() { 
    this.ordenes_produccion = []
  }

  ngOnInit(): void {
  }

}
