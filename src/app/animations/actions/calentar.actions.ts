import { TanqueInfo } from './../models/tanque-info.model';
import { createAction, props } from "@ngrx/store";

export enum calentarTypes {
  calentar_iniciar = "calentar_iniciar",
  calentar_pausa = "calentar_pausa",
  calentar_fin = "calentar_fin",
  calentar_base = "calentar_base"
}


export const calentar_set = createAction('[Calentar] calentar set', props<{tanqueInfo:TanqueInfo}>());
// export const calentar_init = createAction('[Calentar] calentar iniciar', props<{estado:calentarTypes}>());
// export const calentar_end = createAction('[Calentar] calentar end', props<{ estado: calentarTypes }>());
// export const calentar_base = createAction('[Calentar] calentar base', props<{ estado: calentarTypes }>());