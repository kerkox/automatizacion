import { Component, OnInit } from '@angular/core';
import { FormulasService } from 'src/app/services/formulas.service';

@Component({
  selector: 'app-parametros-referencias',
  templateUrl: './parametros-referencias.component.html',
  styleUrls: ['./parametros-referencias.component.css'],
})
export class ParametrosReferenciasComponent implements OnInit {
  formulas: any = [];
  formula: {
    cantidad_materia_prima_a: 0,
    cantidad_materia_prima_b: 0,
    cantidad_materia_prima_c:0
  };
  constructor(public formulasService: FormulasService) {
    this.formula = {
    cantidad_materia_prima_a: 0,
    cantidad_materia_prima_b: 0,
    cantidad_materia_prima_c:0
  };
  }

  ngOnInit(): void {
    this.cargarFormulas();
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
