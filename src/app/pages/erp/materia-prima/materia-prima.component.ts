import { Component, OnInit } from '@angular/core';
import { MateriaPrimaService } from './../../../services/materia-prima.service';

@Component({
  selector: 'app-materia-prima',
  templateUrl: './materia-prima.component.html',
  styleUrls: ['./materia-prima.component.css']
})
export class MateriaPrimaComponent implements OnInit {

  materia_prima: {
    id: string,
    descripcion: string
  }
  texto_boton: string
  materias_primas: [];
  actualizar: boolean = false;
  saved: boolean = false;
  loading: boolean = false;
  loadingTable: boolean = false;
  error: boolean = false;
  constructor(private materiaPrimaService: MateriaPrimaService) {
    this.materia_prima = { id: '', descripcion: '' }
    this.materias_primas = []
    this.texto_boton = "Crear";
  }

  ngOnInit(): void {
    this.cargarMateriasPrimas();
  }

  resetarFormulario() {

    this.loading = false;
    this.materia_prima.descripcion = "";
    this.ocultarMensajeGuardado()
    this.cargarMateriasPrimas();
  }

  cancelarActualizacion() {
    this.resetarFormulario()
    this.texto_boton = "Crear";
    this.actualizar = false;
  }



  cargarMateriasPrimas() {
    this.loadingTable = true;
    this.materiaPrimaService.obtenerMateriasPrimas().then((res: any) => {
      this.materias_primas = res.data;
      this.loadingTable = false;
    }).catch(error => {
      this.loadingTable = false;
      console.error(error)
    })
  }

  guardar() {
    this.loading = true;
    this.saved = false;
    if (this.actualizar) {
      this.materiaPrimaService.actualizar(this.materia_prima.id, this.materia_prima.descripcion)
        .then(res => {
          this.resetarFormulario()
          this.cancelarActualizacion()
          this.saved = true;
        }).catch(error => {
          this.resetarFormulario()
          this.error = true;
          console.error(error)
        })
    } else {
      this.materiaPrimaService.crear(this.materia_prima.descripcion).then(res => {
        this.resetarFormulario()
        this.saved = true;
      }).catch(err => {
        this.resetarFormulario()
        this.error = true;
      })
    }
  }

  ocultarMensajeGuardado() {
    setTimeout(() => this.saved = false, 1500);
  }

  editar(index: number) {
    console.log("Ahora se va a editar el id: " + index);
    console.log(this.materias_primas[index])
    this.actualizar = true;
    this.texto_boton = "Actualizar"
    this.materia_prima.descripcion = this.materias_primas[index]['descripcion']
    this.materia_prima.id = this.materias_primas[index]['id']

  }

  borrar(index: number) {
    this.loadingTable = true;
    this.materiaPrimaService.borrar(this.materias_primas[index]['id'])
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
