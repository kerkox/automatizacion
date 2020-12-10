import { AppState } from './animation.reducers';
import { estadoTanqueTypes, tanque_estado_set } from './../actions/tanque.actions';
import { Action, createReducer, createSelector, on } from '@ngrx/store';

export const initialState: estadoTanqueTypes = estadoTanqueTypes.estado_inicial

const _tanqueReducer = createReducer(initialState,
  on(tanque_estado_set, (state, {estado}) =>  estado ),
);

export function tanqueReducer(state: estadoTanqueTypes, action: Action) {
  return _tanqueReducer(state, action)
}
