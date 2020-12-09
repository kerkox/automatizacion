import { ActionReducerMap } from '@ngrx/store';
import { calentarTypes } from '../actions/calentar.actions';
import { pausarTypes } from '../actions/pausado.actions';
import { calentarReducer } from './calentar.reducer';
import { pausadoReducer } from './pausado.reducer';
import { tanqueReducer } from './tanque.reducer';

export interface AppState {
  pausado: pausarTypes,
  tanque_lleno: boolean,
  calentar: calentarTypes
}

export const animationReducers: ActionReducerMap<AppState> = {
  pausado: pausadoReducer,
  tanque_lleno: tanqueReducer,
  calentar:calentarReducer
}
