import { pausar, continuar } from './animacion.actions';
import { Action, createReducer, on } from '@ngrx/store';


// export function animacionReducer(state: boolean, action: Action) {
//   switch (action.type) {
//     case pausar.type:
//       return !state;
//     case continuar.type: 
//       return !state;
  
//     default:
//       return state;
//   }
// }

export const initialState = true;

const _animacionReducer = createReducer(initialState,
  on(pausar, state => !state),
  on(continuar, state => !state)
);

export function animacionReducer(state: boolean, action: Action) {
  return _animacionReducer(state,action)
}