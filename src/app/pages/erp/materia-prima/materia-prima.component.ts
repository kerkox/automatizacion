import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MateriaPrimaService } from './../../../services/materia-prima.service';

@Component({
  selector: 'app-materia-prima',
  templateUrl: './materia-prima.component.html',
  styleUrls: ['./materia-prima.component.css']
})
export class MateriaPrimaComponent implements OnInit {

  formMateriaPrima: FormGroup
  texto_boton: string
  materias_primas: [];
  actualizar: boolean = false;
  saved: boolean = false;
  loading: boolean = false;
  loadingTable: boolean = false;
  error: boolean = false;
  trimText: boolean = true;
  constructor(private materiaPrimaService: MateriaPrimaService,
              private formBuilder:FormBuilder) {
    this.materias_primas = []
    this.texto_boton = "Crear";
    this.buildForm()
  }

  ngOnInit(): void {
    this.cargarMateriasPrimas();
  }

  private buildForm(){
    // const regExp = new RegExp('^[\s.*]|[\s\w\W]', 'gi')
    const regExp = new RegExp('^[^\\s][\\w\\W\\d]+')
    this.formMateriaPrima = this.formBuilder.group({
      id: [''],
      descripcion: ['', [Validators.required, Validators.pattern(regExp)]]
    })

  }

  isInvalid_campo(campo: AbstractControl) {
    return campo.invalid && campo.touched
  }

  getErrorMessage(campo: AbstractControl): String {
    if (campo.hasError('required')) {

      return "El campo es requerido"

    } else if (campo.hasError('pattern')) {

      return `No se permiten espacios solamente`

    }

    return '';
  }


  get descripcion () {
    return this.formMateriaPrima.get('descripcion')
  }
  get isInvalid_descripcion() {
    return this.descripcion.invalid && this.descripcion.touched
  }
  
  get materia_prima_id() {
    return this.formMateriaPrima.get('id');
  }

  resetarFormulario() {

    this.loading = false;
    this.formMateriaPrima.reset();
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
    if(this.formMateriaPrima.valid){
      this.loading = true;
      this.saved = false;
      let materia_prima = this.formMateriaPrima.value;
      materia_prima.descripcion = materia_prima.descripcion.trim()
      if (this.actualizar) {
        if(this.descripcion.pristine){
          // Aqui se retorno si no fue modificado y se resetea
          this.cancelarActualizacion()
          this.saved = true;
          return;
        }
        this.materiaPrimaService.actualizar(materia_prima)
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
        this.materiaPrimaService.crear(materia_prima).then(res => {
          this.resetarFormulario()
          this.saved = true;
        }).catch(err => {
          this.resetarFormulario()
          this.error = true;
        })
      }
    } else {
      this.formMateriaPrima.markAllAsTouched()
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

    this.descripcion.setValue(this.materias_primas[index]['descripcion']);
    this.materia_prima_id.setValue(this.materias_primas[index]['id']);

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
