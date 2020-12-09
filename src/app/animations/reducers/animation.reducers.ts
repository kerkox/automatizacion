import { TanqueInfo } from './../models/tanque-info.model';
import { ActionReducerMap } from '@ngrx/store';
import { pausarTypes } from '../actions/pausado.actions';
import { calentarReducer } from './calentar.reducer';
import { pausadoReducer } from './pausado.reducer';
import { tanqueReducer } from './tanque.reducer';

export interface AppState {
  pausado: pausarTypes,
  tanque_lleno: boolean,
  calentar: TanqueInfo
}

export const animationReducers: ActionReducerMap<AppState> = {
  pausado: pausadoReducer,
  tanque_lleno: tanqueReducer,
  calentar:calentarReducer
}
