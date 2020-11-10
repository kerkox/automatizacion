import { OrdenPedidoService } from '../../../services/orden-pedido.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { materiaPrima } from './../../../interfaces/materiaPrima.interface';
import { RecetasService } from './../../../services/recetas.service';
import { MateriaPrimaService } from './../../../services/materia-prima.service';


@Component({
  selector: 'app-parametros-referencias',
  templateUrl: './parametros-referencias.component.html',
  styleUrls: ['./parametros-referencias.component.css']
})
export class ParametrosReferenciasComponent implements OnInit {
  
  recetaForm: FormGroup
  recetas: any = [];
  referencias: []
  tipos: []
  receta: {
    densidad: number,
    referencia_producto_id: string,
    materias_primas: materiaPrima[],
    tipo_producto_id: string,
    tiempo_premezclado: number,
    tiempo_precalentamiento: number,
    tiempo_mezclado: number,
    temperatura_precalentamiento: number,
    temperatura_calentamiento: number

  };
  materias_primas_seleccionar: Array<any> = []

  constructor(public recetasService: RecetasService, 
              private materiaPrimaService: MateriaPrimaService,
              public ordenesPedidoService: OrdenPedidoService,
              private formBuilder: FormBuilder) {
    
    this.buildForm()
    this.materias_primas_seleccionar = [];
    this.recetas = [];
    this.receta = {
      densidad: 0,
      referencia_producto_id:'',
      tipo_producto_id:'',
      materias_primas: [
        { materia_prima_id: '', porcentaje: 0 }],
      tiempo_premezclado: 0,
      tiempo_precalentamiento: 0,
      tiempo_mezclado: 0,
      temperatura_precalentamiento: 0,
      temperatura_calentamiento: 0,
    };
  }

  ngOnInit(): void {
    this.cargarRecetas();
    this.cargarMateriasPrimasSeleccionar();
    this.consultarReferencias()
    this.consultarTipos()
  }

  private buildForm(){
    this.recetaForm = this.formBuilder.group({
      densidad: ['', [Validators.required, Validators.min(0)]],
      referencia_producto_id: ['', [Validators.required]],
      tipo_producto_id: ['', [Validators.required, Validators.min(0)]],
      tiempo_premezclado: ['', [Validators.required, Validators.min(0)]],
      tiempo_precalentamiento: ['', [Validators.required, Validators.min(0)]],
      tiempo_mezclado: ['', [Validators.required, Validators.min(0)]],
      temperatura_precalentamiento: ['', [Validators.required, Validators.min(0)]],
      temperatura_calentamiento: ['', [Validators.required, Validators.min(0)]],
      materias_primas:this.formBuilder.array([this.createMateriaPrimaCampos()])
    });
  }

  get materias_primas() {
    return this.recetaForm.get('materias_primas') as FormArray
  }

  get densidad() {
    return this.recetaForm.get('densidad')
  }

  get referencia_producto_id() {
    return this.recetaForm.get('referencia_producto_id')
  }

  get tipo_producto_id(){
    return this.recetaForm.get('tipo_producto_id');
  }
  get tiempo_premezclado(){
    return this.recetaForm.get('tiempo_premezclado');
  }
  get tiempo_precalentamiento(){
    return this.recetaForm.get('tiempo_precalentamiento');
  }
  get tiempo_mezclado(){
    return this.recetaForm.get('tiempo_mezclado');
  }
  get temperatura_precalentamiento(){
    return this.recetaForm.get('temperatura_precalentamiento');
  }
  get temperatura_calentamiento(){
    return this.recetaForm.get('temperatura_calentamiento');
  }

  isInvalid_campo(campo: AbstractControl){
    return campo.invalid && campo.touched
  }

  getErrorMessage(campo: AbstractControl): String {
    if(campo.hasError('required')) {

      return "El campo es requerido"

    } else if(campo.hasError('min')) {

      return `El valor minimo es: ${campo.errors.min.min}`

    }

    return '';
  }

  isValid_campo(campo: AbstractControl){
    return campo.valid && campo.touched
  }

  materia_prima_id_by_index(index: number): AbstractControl{
    return this.materias_primas.controls[index].get('materia_prima_id')
  }

  materia_prima_porcentaje_by_index(index: number): AbstractControl{
    return this.materias_primas.controls[index].get('porcentaje')
  }

  consultarReferencias() {
    this.ordenesPedidoService.consultarReferenciasProducto().then((res: any) => {
      this.referencias = res.data;
    });
  }

  consultarTipos() {
    this.ordenesPedidoService.consultarTiposProducto().then((res: any) => {
      this.tipos = res.data;
    });
  }

  agregarMateriaPrima() {
    this.materias_primas.push(this.createMateriaPrimaCampos());
  }

  private createMateriaPrimaCampos() {
    return this.formBuilder.group({
      materia_prima_id: ['', Validators.required],
      porcentaje: ['', [Validators.required, Validators.min(0)]]
    })
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

  borrarMateriaPrima(index) {
    this.materias_primas.controls.splice(index, 1);
  }

  cargarRecetas() {
    // consultar las formulas guardas
    this.recetasService.consultarRecetas().then((res: any) => {
      this.recetas = res.data;
    }).catch(error => {
      console.error(error)
    });
  }

  guardarReceta() {
    if(this.recetaForm.valid){

      // console.log("this.recetaForm.value",this.recetaForm.value);
      let receta = this.recetaForm.value
      // console.log(this.receta, "Formula");
      this.recetasService.guardarReceta(receta).then(res => {
        this.recetaForm.reset();
        this.cargarRecetas();
      }).catch(error => {
        console.error(error);
      })
    } else {
      this.recetaForm.markAllAsTouched();
    }
  }

  borrarReceta(id: string){
    this.recetasService.borrarReceta(id).then(res => {
      this.cargarRecetas();
    })
    .catch(err => {
      console.error(err)
    })
  }


}
