import { Component, OnInit } from '@angular/core';
import { MateriaPrimaService } from 'src/app/services/materia-prima.service';

@Component({
  selector: 'app-materia-prima',
  templateUrl: './materia-prima.component.html',
  styleUrls: ['./materia-prima.component.css']
})
export class MateriaPrimaComponent implements OnInit {

  materia_prima: {
    descripcion: string
  }
  saved: boolean = false;
  loading: boolean = false;
  error: boolean = false;
  constructor(private materiaPrimaService: MateriaPrimaService) {
    this.materia_prima = { descripcion: '' }
  }

  ngOnInit(): void {
  }

  guardar() {
    this.loading = true;
    this.saved = false;
    this.materiaPrimaService.crear(this.materia_prima.descripcion).then(res => {
      this.saved = true;
      this.loading = false;
    }).catch(err =>  {
      this.loading = false;
      this.saved = false;
    })
  }

}
