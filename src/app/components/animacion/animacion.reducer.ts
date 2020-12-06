import { pausar, continuar } from './animacion.actions';
import { Action } from '@ngrx/store';


export function animacionReducer(state: boolean, action: Action) {
  switch (action.type) {
    case pausar.type:
      return !state;
    case continuar.type: 
      return !state;
  
    default:
      return state;
  }
}