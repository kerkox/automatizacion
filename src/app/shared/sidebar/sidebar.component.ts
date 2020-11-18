import { SidebarService } from './../../services/sidebar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  modulos:any = [];
  constructor(private sidebarService: SidebarService) {
    this.modulos = this.sidebarService.MODULOS;
   }

  ngOnInit(): void {
    this.modulos = this.sidebarService.MODULOS;
  }

}
