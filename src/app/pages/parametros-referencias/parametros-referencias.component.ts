import { OrdenesProduccionService } from './../../services/ordenes-produccion.service';
import { Component, OnInit } from '@angular/core';
import { materiaPrima } from 'src/app/interfaces/materiaPrima.interface';
import { FormulasService } from 'src/app/services/formulas.service';
import { MateriaPrimaService } from 'src/app/services/materia-prima.service';


@Component({
  selector: 'app-parametros-referencias',
  templateUrl: './parametros-referencias.component.html',
  styleUrls: ['./parametros-referencias.component.css']
})
export class ParametrosReferenciasComponent implements OnInit {
  formulas: any = [];
  referencias: []
  tipos: []
  formula: {
    densidad: number,
    referencia_producto: string,
    tipo_producto: string,
    materias_primas: materiaPrima[],
    tiempo_premezclado: number,
    tiempo_precalentamiento: number,
    tiempo_mezclado: number,
    temperatura_precalentamiento: number,
    temperatura_calentamiento: number

  };
  materias_primas_seleccionar: Array<any> = []

  constructor(public formulasService: FormulasService, 
              private materiaPrimaService: MateriaPrimaService,
              public ordenesProduccionService: OrdenesProduccionService) {
    this.materias_primas_seleccionar = [];
    this.formulas = [];
    this.formula = {
      densidad: 0,
      referencia_producto:'',
      tipo_producto:'',
      materias_primas: [
        { materia_prima: '', porcentaje: 0 }],
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
    this.consultarReferencias()
    this.consultarTipos()
  }

  consultarReferencias() {
    this.ordenesProduccionService.consultarReferenciasProducto().then((res: any) => {
      this.referencias = res.data;
    });
  }

  consultarTipos() {
    this.ordenesProduccionService.consultarTiposProducto().then((res: any) => {
      this.tipos = res.data;
    });
  }

  agregarMateriaPrima() {
    this.formula.materias_primas.push({ materia_prima: '', porcentaje: 0 });
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
    this.formula.materias_primas.splice(index, 1);
  }

  cargarFormulas() {
    // consultar las formulas guardas
    this.formulasService.consultarFormulas().then((res: any) => {
      this.formulas = res.data;
    }).catch(error => {
      console.error(error)
    });
  }

  guardarFormula() {
    console.log(this.formula, "Formula");
    this.formulasService.guardarFormula(this.formula).then(res => {
      this.cargarFormulas();
    }).catch(error => {
      console.error(error);
    })
  }

  borrarFormula(id: string){
    this.formulasService.borrarFormula(id).then(res => {
      this.cargarFormulas();
    })
    .catch(err => {
      console.error(err)
    })
  }


}
