import { calentarTypes } from '../actions/calentar.actions';

export class TanqueInfo {

  public id: number;
  public calentar_action: calentarTypes

  constructor(id:number, calentarAction: calentarTypes) {
      this.id = id;
      this.calentar_action = calentarAction;
  }
}