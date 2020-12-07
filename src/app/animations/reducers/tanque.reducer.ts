import { AppState } from './animation.reducers';
import { tanque_lleno, tanque_reset } from './../actions/tanque.actions';
import { Action, createReducer, createSelector, on } from '@ngrx/store';

export const initialState: boolean = false

const _tanqueReducer = createReducer(initialState,
  on(tanque_lleno, state =>  true ),
  on(tanque_reset, state =>  false ),
);

export function tanqueReducer(state:boolean, action: Action) {
  return _tanqueReducer(state, action)
}
