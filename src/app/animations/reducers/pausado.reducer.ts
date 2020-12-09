import { Action, createReducer, createSelector, on } from '@ngrx/store';
import { estado_pausa_set, pausarTypes  } from '../actions/pausado.actions';
import { AppState } from './animation.reducers';

export const initialState: pausarTypes = pausarTypes.pausado_inicial

const _pausadoReducer = createReducer(initialState,
  on(estado_pausa_set, (state,{pausado}) =>  pausado )
);

export function pausadoReducer(state: pausarTypes, action: Action) {
  return _pausadoReducer(state, action)
}
