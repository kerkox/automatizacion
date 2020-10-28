import { OrdenesPedidoService } from '../../services/ordenes-pedido.service';
import { Component, OnInit } from '@angular/core';
import { materiaPrima } from 'src/app/interfaces/materiaPrima.interface';
import { RecetasService } from 'src/app/services/recetas.service';
import { MateriaPrimaService } from 'src/app/services/materia-prima.service';


@Component({
  selector: 'app-parametros-referencias',
  templateUrl: './parametros-referencias.component.html',
  styleUrls: ['./parametros-referencias.component.css']
})
export class ParametrosReferenciasComponent implements OnInit {
  recetas: any = [];
  referencias: []
  tipos: []
  receta: {
    densidad: number,
    referencia_producto_id: string,
    tipo_producto_id: string,
    materias_primas: materiaPrima[],
    tiempo_premezclado: number,
    tiempo_precalentamiento: number,
    tiempo_mezclado: number,
    temperatura_precalentamiento: number,
    temperatura_calentamiento: number

  };
  materias_primas_seleccionar: Array<any> = []

  constructor(public recetasService: RecetasService, 
              private materiaPrimaService: MateriaPrimaService,
              public ordenesPedidoService: OrdenesPedidoService) {
    this.materias_primas_seleccionar = [];
    this.recetas = [];
    this.receta = {
      densidad: 0,
      referencia_producto_id:'',
      tipo_producto_id:'',
      materias_primas: [
        { materia_prima_id: '', porcentaje: 0 }],
      tiempo_premezclado: 0,
      tiempo_precalentamiento: 0,
      tiempo_mezclado: 0,
      temperatura_precalentamiento: 0,
      temperatura_calentamiento: 0,
    };
  }

  ngOnInit(): void {
    this.cargarRecetas();
    this.cargarMateriasPrimasSeleccionar();
    this.consultarReferencias()
    this.consultarTipos()
  }

  consultarReferencias() {
    this.ordenesPedidoService.consultarReferenciasProducto().then((res: any) => {
      this.referencias = res.data;
    });
  }

  consultarTipos() {
    this.ordenesPedidoService.consultarTiposProducto().then((res: any) => {
      this.tipos = res.data;
    });
  }

  agregarMateriaPrima() {
    this.receta.materias_primas.push({ materia_prima_id: '', porcentaje: 0 });
  }

  cargarMateriasPrimasSeleccionar() {
    this.materiaPrimaService.obtenerMateriasPrimas()
      .then((res: any) => {
        this.materias_primas_seleccionar = res.data;
      })
      .catch(error => {
        console.error(error)
      })
  }

  borrarMateriaPrima(index) {
    this.receta.materias_primas.splice(index, 1);
  }

  cargarRecetas() {
    // consultar las formulas guardas
    this.recetasService.consultarRecetas().then((res: any) => {
      this.recetas = res.data;
    }).catch(error => {
      console.error(error)
    });
  }

  guardarReceta() {
    console.log(this.receta, "Formula");
    this.recetasService.guardarReceta(this.receta).then(res => {
      this.cargarRecetas();
    }).catch(error => {
      console.error(error);
    })
  }

  borrarReceta(id: string){
    this.recetasService.borrarReceta(id).then(res => {
      this.cargarRecetas();
    })
    .catch(err => {
      console.error(err)
    })
  }


}
