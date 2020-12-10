import { createAction, props } from "@ngrx/store";


export enum estadoTanqueTypes {
  estado_inicial = "estado_inicial",
  estado_lleno = "estado_lleno"
}

export const tanque_estado_set = createAction('[Tanque] Estado set', props<{ estado: estadoTanqueTypes }>());
