import { Menu } from './../../interfaces/menu.interface';
import { Component, OnInit } from '@angular/core';
import { types } from 'src/app/types/types';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menus:any = [];
  constructor() {
    this.menus = types.MENUS;
   }

  ngOnInit(): void {
    this.menus = types.MENUS;
    console.log(this.menus)
  }

}
