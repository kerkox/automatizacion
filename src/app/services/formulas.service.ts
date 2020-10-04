import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormulasService {

  constructor() { }

  consultarFormulas() {
    // Consultar informacion de local storeage
    return new Promise((resolve, reject) => {

      let formulas = localStorage.getItem('formulas') ;
      if(formulas) {
        resolve(JSON.parse(formulas))  
      } else {
        resolve([]);
      }
    })
  }

  guardarFormula(formula: any) {
      let formulasGuardadas = localStorage.getItem('formulas');
      let formulas = []
      formulas = JSON.parse(formulasGuardadas) || [];
      formulas.push(formula);
      localStorage.setItem('formulas',JSON.stringify(formulas))
  }

  


}
