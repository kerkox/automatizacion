import { Component, OnInit } from '@angular/core';
import { materiaPrima } from 'src/app/interfaces/materiaPrima.interface';
import { FormulasService } from 'src/app/services/formulas.service';

@Component({
  selector: 'app-parametros-referencias',
  templateUrl: './parametros-referencias.component.html',
  styleUrls: ['./parametros-referencias.component.css'],
})
export class ParametrosReferenciasComponent implements OnInit {
  formulas: any = [];
  formula: {
    materias_primas:materiaPrima[],
    
  };
  constructor(public formulasService: FormulasService) {
    this.formula = {
      materias_primas:  [
        {nombre: "Materia Prima A", porcentaje:50},
        {nombre: "Quimico #400Z ", porcentaje:50},
      ],
    };
  }

  ngOnInit(): void {
    this.cargarFormulas();
  }

  agregarMateriaPrima() {
    this.formula.materias_primas.push({nombre:'',porcentaje:0});
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
