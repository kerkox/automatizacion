import { Menu } from './../../interfaces/menu.interface';
import { Component, OnInit } from '@angular/core';
import { types } from './../../types/types';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  modulos:any = [];
  constructor() {
    this.modulos = types.MODULOS;
   }

  ngOnInit(): void {
    this.modulos = types.MODULOS;
  }

}
