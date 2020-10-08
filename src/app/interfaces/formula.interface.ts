import { materiaPrima } from './materiaPrima.interface';

export interface IFormula {
  materias_primas: Array<materiaPrima>,
  tiempo_premezclado: number,
  tiempo_precalentamiento: number,
  tiempo_mezclado: number,
  temperatura_precalentamiento: number,
  temperatura_calentamiento: number
}