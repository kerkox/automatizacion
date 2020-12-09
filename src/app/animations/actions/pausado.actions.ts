import { createAction, props } from "@ngrx/store";


export enum pausarTypes {
  pausado_inicial = "pausado_inicial",
  continuar = "continuar",
  pausar = "pausar"
}



export const estado_pausa_set = createAction('[Pausado] estado_pausa_set', props<{ pausado: pausarTypes}>());
// export const continuar = createAction('[Pausado] continuar', props<{ pausado: pausarTypes }>());