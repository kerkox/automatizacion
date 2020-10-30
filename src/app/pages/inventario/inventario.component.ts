import { MateriaPrimaService } from './../../services/materia-prima.service';
import { InventarioService } from './../../services/inventario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {


  inventarios: any
  materias_primas_seleccionar: Array<any>
  inventarioForm: FormGroup
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
    this.inventarioForm = this.formBuilder.group({
      materia_prima_id: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(0)]],      
    });
  }

  get materia_prima_id(){
    return this.inventarioForm.get('materia_prima_id')
  }

  get cantidad() {
    return this.inventarioForm.get('cantidad')
  }

  get isValid_cantidad() {
    return this.inventarioForm.get('cantidad').valid && this.inventarioForm.get('cantidad').touched
  }

  get isInvalid_cantidad() {
    return this.inventarioForm.get('cantidad').invalid && this.inventarioForm.get('cantidad').touched
  }

  get isValid_materia_prima_id() {
    return this.inventarioForm.get('materia_prima_id').valid && this.inventarioForm.get('materia_prima_id').touched
  }

  get isInvalid_materia_prima_id() {
    return this.inventarioForm.get('materia_prima_id').invalid && this.inventarioForm.get('materia_prima_id').touched
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

  guardarInventario() {
    if(this.inventarioForm.valid) {
      console.log("this.inventarioForm.value",this.inventarioForm.value)
      this.inventarioService.crear(this.inventarioForm.value)
      .then(res => {
        this.cargarInventario()
      })
      .catch(err => {
        console.error("err: ",err)
      })
    }else {
      this.inventarioForm.markAllAsTouched();
    }
  }




}
