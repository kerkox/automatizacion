import { Action, createReducer, createSelector, on } from '@ngrx/store';
import { continuar, pausar } from '../actions/pausado.actions';
import { AppState } from './animation.reducers';

export const initialState: boolean = true

const _pausadoReducer = createReducer(initialState,
  on(pausar, state =>  true ),
  on(continuar, state => false ),
);

export function pausadoReducer(state:boolean, action: Action) {
  return _pausadoReducer(state, action)
}

export const selectPausado = createSelector(
  (state: AppState) => state.pausado,
  (pausado: boolean) => pausado
)