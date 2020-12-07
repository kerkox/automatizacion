import { ActionReducerMap } from '@ngrx/store';
import { calentarTypes } from '../actions/calentar.actions';
import { calentarReducer } from './calentar.reducer';
import { pausadoReducer } from './pausado.reducer';
import { tanqueReducer } from './tanque.reducer';

export interface AppState {
  pausado: boolean,
  tanque_lleno: boolean,
  calentar: calentarTypes
}

export const animationReducers: ActionReducerMap<AppState> = {
  pausado: pausadoReducer,
  tanque_lleno: tanqueReducer,
  calentar:calentarReducer
}
