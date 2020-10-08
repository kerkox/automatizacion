import { Component, OnInit } from '@angular/core';
import { materiaPrima } from 'src/app/interfaces/materiaPrima.interface';
import { FormulasService } from 'src/app/services/formulas.service';
import { MateriaPrimaService } from 'src/app/services/materia-prima.service';

@Component({
  selector: 'app-parametros-referencias',
  templateUrl: './parametros-referencias.component.html',
  styleUrls: ['./parametros-referencias.component.css'],
})
export class ParametrosReferenciasComponent implements OnInit {
  formulas: any = [];
  formula: {
    materias_primas:materiaPrima[],
    tiempo_premezclado:number,
    tiempo_precalentamiento:number,
    tiempo_mezclado:number,
    temperatura_precalentamiento:number,
    temperatura_calentamiento:number

  };
  materias_primas_seleccionar:Array<any> =  []

  constructor(public formulasService: FormulasService, private materiaPrimaService: MateriaPrimaService) {
    this.materias_primas_seleccionar = [];
    this.formula = {
      materias_primas: [
        {id:'',porcentaje:0}],
      tiempo_premezclado: 0,
      tiempo_precalentamiento: 0,
      tiempo_mezclado: 0,
      temperatura_precalentamiento: 0,
      temperatura_calentamiento: 0,
    };
  }

  ngOnInit(): void {
    this.cargarFormulas();
    this.cargarMateriasPrimasSeleccionar();
  }

  handleChangeMateriaPrima(index: number) {
    console.log("index: "+ index);
    console.log("seleccionada: ", this.formula.materias_primas[index]);
    let seleccionada = this.formula.materias_primas[index]['id'];
    this.materias_primas_seleccionar = this.materias_primas_seleccionar.filter(x => x['_id'] != seleccionada);
  }

  filtradoSeleccionadas(id: string){
    return this.formula.materias_primas.filter(x => x['_id'] == id).length == 0; 
  }

  agregarMateriaPrima() {
    this.formula.materias_primas.push({id:'',porcentaje:0});    
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

  borrarMateriaPrima(index){
    this.formula.materias_primas.splice(index,1);
  }

  cargarFormulas() {
    // consultar las formulas guardas
    this.formulasService.consultarFormulas().then((res: any) => {
      this.formulas = res;
    });
  }

  guardarFormula() {
    console.log(this.formula,"Formula");
    this.formulasService.guardarFormula(this.formula)
    this.cargarFormulas();
  }

}
