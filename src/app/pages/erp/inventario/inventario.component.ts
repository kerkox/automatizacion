import { MateriaPrimaService } from './../../../services/materia-prima.service';
import { InventarioService } from './../../../services/inventario.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {


  inventarios: any
  materias_primas_seleccionar: Array<any>
  formInventario: FormGroup
  constructor(private inventarioService: InventarioService, 
    private materiaPrimaService: MateriaPrimaService,
    private formBuilder: FormBuilder) {
      this.inventarios = [];
      this.buildForm();
     }

  ngOnInit(): void {
    this.cargarMateriasPrimasSeleccionar();
    this.cargarInventario();
  }

  private buildForm() {
    this.formInventario = this.formBuilder.group({
      materia_prima_id: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(0)]],      
    });
  }

  get materia_prima_id(){
    return this.formInventario.get('materia_prima_id')
  }

  get cantidad() {
    return this.formInventario.get('cantidad')
  }

  isValid_campo(campo: AbstractControl) {
    return campo.valid && campo.touched
  }

  isInvalid_campo(campo: AbstractControl) {
    return campo.invalid && campo.touched
  }

  cargarMateriasPrimasSeleccionar() {
    this.materiaPrimaService.obtenerMateriasPrimas()
      .then((res: any) => {
        this.materias_primas_seleccionar = res.data;
      })
      .catch(error => {
        console.error(error)
      })
  }

  cargarInventario() {
    this.inventarioService.obtenerInventarios()
      .then((res: any) => {
        this.inventarios = res.data;
      })
      .catch(error => {
        console.error(error)
      })
  }

  resetearFormulario() {
    this.formInventario.reset();    
  }

  guardarInventario() {
    if(this.formInventario.valid) {
      // console.log("this.inventarioForm.value",this.inventarioForm.value)
      this.inventarioService.crear(this.formInventario.value)
      .then(res => {
        this.resetearFormulario();
        this.cargarInventario()
      })
      .catch(err => {
        console.error("err: ",err)
      })
    }else {
      this.formInventario.markAllAsTouched();
    }
  }




}
