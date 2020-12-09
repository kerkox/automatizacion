import { TanqueInfo } from './../models/tanque-info.model';
import { calentarTypes, calentar_set } from './../actions/calentar.actions';
import { Action, createReducer, createSelector, on } from '@ngrx/store';



export const initialState: TanqueInfo = new TanqueInfo(0,calentarTypes.calentar_base)

const _calentarReducer = createReducer(initialState,
  on(calentar_set, (state, {tanqueInfo}) =>  {
    return new TanqueInfo(tanqueInfo.id,tanqueInfo.calentar_action )
  }),
  // on(calentar_init, (state, { estado }) =>  estado ),
  // on(calentar_end, (state, { estado }) => "calentar_fin" ),
  // on(calentar_base, (state, { estado }) => "calentar_base" ),
);

export function calentarReducer(state, action: Action): TanqueInfo {
  return _calentarReducer(state, action)
}
