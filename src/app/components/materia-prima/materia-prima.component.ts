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
  texto_boton: string
  materias_primas: []
  saved: boolean = false;
  loading: boolean = false;
  loadingTable: boolean = false;
  error: boolean = false;
  constructor(private materiaPrimaService: MateriaPrimaService) {
    this.materia_prima = { descripcion: '' }
    this.texto_boton = "Crear";
  }

  ngOnInit(): void {
    this.cargarMateriasPrimas();
  }

  cargarMateriasPrimas() {
    this.loadingTable = true;
    this.materiaPrimaService.obtenerMateriasPrimas().then((res:any) => {
      this.materias_primas = res.data;
      this.loadingTable = false;
    }).catch( error => {
      this.loadingTable = false;
      console.error(error)
    })
  }

  guardar() {
    this.loading = true;
    this.saved = false;
    this.materiaPrimaService.crear(this.materia_prima.descripcion).then(res => {
      this.saved = true;
      this.loading = false;
      this.materia_prima.descripcion = "";
      this.cargarMateriasPrimas();
      setTimeout(() => this.saved = false, 1500);
    }).catch(err =>  {
      this.loading = false;
      this.saved = false;
    })
  }

  editar(index: number) {
    console.log("Ahora se va a editar el id: "+ index);
    console.log(this.materias_primas[index])
  }

  borrar(index: number) {
    this.loadingTable = true;
    this.materiaPrimaService.borrarMateriaPrima(this.materias_primas[index]['_id'])
    .then(res => {
      console.log("Borrado correctamente")
      this.cargarMateriasPrimas();
      this.loadingTable = false;
    })
    .catch(error => {
      console.error(error)
      this.loadingTable = false;
    })
  }


}
