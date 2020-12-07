import { calentarTypes, calentar_set } from './../actions/calentar.actions';
import { AppState } from './animation.reducers';
import { Action, createReducer, createSelector, on } from '@ngrx/store';



export const initialState: calentarTypes = calentarTypes.calentar_base

const _calentarReducer = createReducer(initialState,
  on(calentar_set, (state, { estado }) =>  estado ),
  // on(calentar_init, (state, { estado }) =>  estado ),
  // on(calentar_end, (state, { estado }) => "calentar_fin" ),
  // on(calentar_base, (state, { estado }) => "calentar_base" ),
);

export function calentarReducer(state, action: Action): calentarTypes {
  return _calentarReducer(state, action)
}
