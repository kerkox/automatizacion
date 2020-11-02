export interface materiaPrima {
  materia_prima_id: string;
  porcentaje: number;
}

export interface CrearMateriaPrima {
  descripcion: string
}

export interface ActualizarMateriaPrima {
  id: number,
  descripcion: string
}
