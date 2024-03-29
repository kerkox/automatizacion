import { GeneralService } from './../../services/general.service';
import { AlarmaDialogComponent } from './../alarma-dialog/alarma-dialog.component';
import { InventarioService } from './../../services/inventario.service';
import { OrdenProduccionService } from './../../services/orden-produccion.service';
import { Observable } from 'rxjs';
import { estado_pausa_set, pausarTypes } from './../../animations/actions/pausado.actions';
import { AppState } from '../../animations/reducers/animation.reducers';
import { PruebaCalidadDialogComponent } from './../prueba-calidad-dialog/prueba-calidad-dialog.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Tanque } from '../../animations/tanque/tanque.animation';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { calentarTypes } from 'src/app/animations/actions/calentar.actions';
import { EstadoOrden } from 'src/app/enums/estado-orden.enum';
import { OrdenProduccionDetalle } from '../../interfaces/orden-produccion-detalle.interface';
import Swal from 'sweetalert2';
import { ConfirmacionAbortarDialogComponent } from '../confirmacion-abortar-dialog/confirmacion-abortar-dialog.component';


@Component({
  selector: 'app-animacion',
  templateUrl: './animacion.component.html',
  styleUrls: ['./animacion.component.css']
})
export class AnimacionComponent implements OnInit {
  @ViewChild('canvas', { static: true })

  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  private _nextFunction: Function;

  width = 1600;
  height = 1600;

  posX = 10;
  posY = 10;
  size = 50;

  estado = 0;
  pausado: boolean = true;
  abortada: boolean = false;
  pruebaCalidadAbierta: boolean = false;
  showPruebaCalidad: boolean = true;

  storePausado: Observable<pausarTypes>;
  disponible_tanques: any[] = []
  porcentajes_materias: number[] = []
  orden_produccion: OrdenProduccionDetalle

  tanques: Tanque[] = [];
  formControlTanque: FormControl = new FormControl('')



  constructor(public dialog: MatDialog, private store: Store<AppState>,
    private ordenProduccionService: OrdenProduccionService,
    private inventarioService: InventarioService,
    private generalService: GeneralService) {
    this.formControlTanque.valueChanges.subscribe(index => this.loadDataTanque(index))

  }



  get tanque(): Tanque {
    return this.tanques[this.formControlTanque.value];
  }


  ngOnInit(): void {
    this._nextFunction = () => { };
    this.cargar_base();
    console.log()

    this.ctx = this.canvas.nativeElement.getContext('2d');
    // this.estados()
    this.storePausado = this.store.select('pausado')
    this.storePausado.subscribe(pausado => {
      this.pausado = (pausado == pausarTypes.pausar || pausado == pausarTypes.pausado_inicial)
      // console.log(`%c Pausado: ${this.pausado}`, "color:yellow;font-size:20px",);
    })
    // this.store.select('tanque_lleno').subscribe(tanque_lleno => {
    //   console.log(`%c tanque lleno: ${tanque_lleno}`,`color:yellow;font-size:20px`)
    //   if(tanque_lleno) {
    //     this.paso_next()
    //     this.store.dispatch(tanque_reset())
    //   }
    // })
    this.store.select('calentar').subscribe(tanqueInfo => {
      switch (tanqueInfo.calentar_action) {
        case calentarTypes.calentar_fin:
          this.paso_next();
          break;

        default:
          break;
      }
    })

  }

  addTanque(tanque: Tanque = null, name: string = null) {
    if (tanque == null) {
      tanque = new Tanque(this.ctx, this.store)
      tanque.setPosition(this.posX, this.posY, this.size)
    }
    tanque.id = this.tanques.length;
    tanque.nameTanque(name || "Tanque: " + tanque.id.toString())
    this.tanques.push(tanque)
    // tmp_tanque.draw()
    this.formControlTanque.setValue(tanque.id);
    // console.log("this.tanques", this.tanques)
  }


  tanquesDisponibles(posX: number, posY: number, size: number, color: string = '', colorSimbolo: string = ''): Tanque {
    let tmp_tanque = new Tanque(this.ctx, this.store)
    // tmp_tanque.id = this.tanques.length;
    tmp_tanque.showSides = false;
    tmp_tanque.colorSimbolo = colorSimbolo;
    tmp_tanque.setPosition(posX, posY, size)
    tmp_tanque.lleno(color);
    return tmp_tanque
  }

  tanqueAlmacen(posX: number, posY: number, size: number, showLeft: boolean = true, showRight: boolean = true, color: string = ''): Tanque {
    let tmp_tanque = new Tanque(this.ctx, this.store)
    // tmp_tanque.id = this.tanques.length;
    tmp_tanque.showLeft = showLeft;
    tmp_tanque.showRight = showRight;

    tmp_tanque.setPosition(posX, posY, size)
    tmp_tanque.disponible()
    return tmp_tanque
  }


  premixer(posX: number, posY: number, size: number, color: string = '') {
    let tmp_tanque = new Tanque(this.ctx, this.store)
    // tmp_tanque.id = this.tanques.length;
    tmp_tanque.percentMezclaValue = 0;
    tmp_tanque.colorSimbolo = color;
    tmp_tanque.setPosition(posX, posY, size)
    tmp_tanque.disponible();
    tmp_tanque.showCalentador = true;
    return tmp_tanque;
    // this.tanques.push(tmp_tanque)
  }

  loadTanques() {
    const mixer = this.premixer(295, 446, 100, "#fff");
    mixer.percentMezclaValue = 0;
    mixer.customRightWidth = 100
    // console.warn("mixer.customRightWidth", mixer.customRightWidth)
    const materiaA = this.tanquesDisponibles(0, 10, 100, '#CBECFA');
    const materiaB = this.tanquesDisponibles(273, 10, 100, '#CBECFA')
    const materiaC = this.tanquesDisponibles(470, 10, 100, '#CBECFA', "#fff")
    materiaC.customBottomHeight = 290;

    materiaB.colorSimbolo = "gray"

    materiaA.percentMezclaValue = this.disponible_tanques[0].porcentaje
    materiaB.percentMezclaValue = this.disponible_tanques[1].porcentaje
    materiaC.percentMezclaValue = this.disponible_tanques[2].porcentaje
    // this.addTanque(this.tanquesDisponibles(0, 10, 100, 'rgba(97,188,216,1)'), "MATERIA A")

    const premixer = this.premixer(135, 228, 100)
    premixer.percentMezclaValue = 0;
    this.addTanque(materiaA, "MATERIA A")
    this.addTanque(materiaB, "MATERIA B")
    this.addTanque(materiaC, "MATERIA C")
    this.addTanque(premixer, "PREMIXER")
    this.addTanque(mixer, "MIXER")

    const almacen1 = this.tanqueAlmacen(28, 698, 100, false, true, '#FACB52')
    almacen1.tanqueAlmacenamiento = true;
    this.addTanque(almacen1, "ALMACEN 1")
    this.addTanque(this.tanqueAlmacen(294, 698, 100, true, true, '#2D61FA'), "ALMACEN 2")
    this.addTanque(this.tanqueAlmacen(558, 698, 100, true, false, '#2D61FA'), "ALMACEN 3")

    // this.formControlTanque.setValue(this.tanques.length-1)
    this.dibujar();
  }

  calentar() {
    if (this.tanque.name.includes("MIXER")) {
      this.calentarTanque(this.tanque)
    }
  }

  private calentarTanque(tanque: Tanque) {
    tanque.calentar(5);
  }

  abortar() {
    const dialogRef = this.dialog.open(ConfirmacionAbortarDialogComponent, {
      // width: '1200px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      //Registrar alarma
      if (result) {
        this.abortada = true;
        this.store.dispatch(estado_pausa_set({ pausado: pausarTypes.pausar }))
        this.marcarOrdenProduccion(EstadoOrden.ABORTADA);
      }
      // this.animal = result;
    });

    // Se va a abortar el proceso
    // abrir dialogo si desea confirmar el abortado
  }

  cargar_base() {
    this.inventarioService.obtenerInventarios().then((res: any) => {
      this.abortada = false;
      this.tanques = [];
      // console.log("inventarios", res)
      for (let x = 0; x < 3; x++) {
        this.disponible_tanques[x] = res.data[x]
        // console.log("this.disponible_tanques[x]", this.disponible_tanques[x])
        // this.disponible_tanques[x].porcentaje = (this.disponible_tanques[x].cantidad * 100) / this.disponible_tanques[x].recurso_fisico.capacidad
        this.disponible_tanques[x].porcentaje = 80
      }
      this.loadTanques();
    })
  }




  loadDataTanque(index: number) {
    const { posX, posY, size } = this.tanques[index]
    this.posX = posX
    this.posY = posY
    this.size = size
  }

  estados() {
    this.estado += 1;
    if (this.estado > 5) {
      this.estado = 1;
    }
    this.dibujar();
  }

  vaciarMezcla() {
    this.vaciarMezclaTanque(this.tanque);
  }

  llenarMezcla() {
    this.llenarMezclaTanque(this.tanque, () => { });
  }

  vaciarMezclaTanque(tanque: Tanque, percentUntil: number = 0, speed: number = 1) {
    // tanque.tanqueDebug = true;
    tanque.vaciar();
    tanque.vaciarMezcla(percentUntil, speed);
  }

  async llenarMezclaTanque(tanque: Tanque, nextFunction: Function, percentUntil: number = 100, speed: number = 1, calentar: boolean = true): Promise<any> {
    this._nextFunction = nextFunction
    if (calentar) {
      tanque.secondsCalentar = 5;
    }
    tanque.llenar();
    await tanque.llenarMezcla(percentUntil, speed)
    // console.log("Ha terminado de cargar la materia prima")
    if (calentar) {
      await this.calentarMezclaTanque(tanque)
      console.log("Termino de calentar")
    } else {

    }
    return true;
  }

  private async calentarMezclaTanque(tanque: Tanque): Promise<any> {
    tanque.mezclar()
    return await tanque.calentar(5);
  }

  colorBadgeEstadoOrden(estado: string) {
    return this.generalService.colorBadgeEstadoOrden(estado);
  }

  loadMateriaPrima2() {
    this.ordenProduccionService.consultarOrdenesProduccion([EstadoOrden["EN PRODUCCION"]])
      .then((res: any) => {
        console.log("EN produccion", res.data)
        if (res.data.length > 0) {
          this.orden_produccion = res.data[0];
          this.paso1();
          this.pausado = false;
        } else {
          const class_badge = this.colorBadgeEstadoOrden(EstadoOrden["EN PRODUCCION"])
          Swal.fire('Error', `No hay una orden en estado <span class="${class_badge}" >
            ${EstadoOrden["EN PRODUCCION"].toString()}
        </span>`, 'error')
        }
      })

  }

  pausarContinuar() {
    console.log(`%c after this.pausado: ${this.pausado}`, `color:green;font-size:16px;`)
    if (this.pausado) {
      this.store.dispatch(estado_pausa_set({ pausado: pausarTypes.continuar }))
      console.log("%c Se lanza el evento de continuar", "color:orange;font-size:14px")
    } else {
      this.store.dispatch(estado_pausa_set({ pausado: pausarTypes.pausar }))
      console.log("%c Se lanza el evento de pausar", "color:orange;font-size:14px")
    }
    console.log(`%c Before this.pausado: ${this.pausado}`, `color:green;font-size:16px;`)
    // this.pausado = !this.pausado;
  }




  paso1() {
    // leer de la orden cuanto porcentaje se debe de reducir
    this.porcentajes_materias = [20, 20, 20]
    // for (let materias of this.orden_produccion.orden_pedido.receta.materias_primas){
    //   this.porcentajes_materias.push(materias.MateriaPrimaReceta.porcentaje)
    // }

    let porcentaje_llenar = this.porcentajes_materias[0] + this.porcentajes_materias[1];

    this.vaciarMezclaTanque(this.tanques[0], this.porcentajes_materias[0], 1);
    this.vaciarMezclaTanque(this.tanques[1], this.porcentajes_materias[1], 1);
    this.llenarMezclaTanque(this.tanques[3], this.paso2, porcentaje_llenar, 2).then(() => {
      // this.paso_next();
    })


  }

  public paso_next(): void {
    if (this.abortada) return;
    if (this.showPruebaCalidad) {
      this.openDialog(this._nextFunction);
    } else {
      this._nextFunction();
    }
  }

  paso2() {
    const porcentaje_llenar = this.porcentajes_materias.reduce((acc, cu) => acc + cu, 0)
    const porcentaje_vaciar_premixer = this.porcentajes_materias[0] + this.porcentajes_materias[1]
    this.vaciarMezclaTanque(this.tanques[2], this.porcentajes_materias[2], 1)
    this.vaciarMezclaTanque(this.tanques[3], porcentaje_vaciar_premixer, 1.5)
    this.llenarMezclaTanque(this.tanques[4], this.paso3, porcentaje_llenar, 2).then(() => {
      // this.paso_next()

    })
  }

  paso3() {
    const porcentaje_llenar = this.porcentajes_materias.reduce((acc, cu) => acc + cu, 0)
    this.vaciarMezclaTanque(this.tanques[4], porcentaje_llenar, 1)
    this.tanques[5].percentMezclaValue = 0;
    this.showPruebaCalidad = false;
    this.llenarMezclaTanque(this.tanques[5], this.paso4, porcentaje_llenar, 1, false).then(() => {
      // this.paso_next();
    })
  }

  paso4() {
    console.log("Paso FINAL")
    //Aqui marcar la orden de produccion como terminada
    this.marcarOrdenProduccion(EstadoOrden.TERMINADA);

  }


  marcarOrdenProduccion(estadoOrdenProduccion: EstadoOrden) {
    const estado = {
      estado: estadoOrdenProduccion
    }
    this.ordenProduccionService.actualizarEstadoOrden(this.orden_produccion.id, estado)
      .then(res => {
        Swal.fire('Información', 'Se actualizó la orden de produccion exitosamente', 'success')
        this.cargar_base();
      }).catch(err => {
        console.log(err)
        Swal.fire('Error', 'Ocurrio un error al terminar la orden de produccion', 'error')
        this.cargar_base();
      })
  }

  dibujar() {
    // console.log("Se dibujo ")
    this.ctx.clearRect(0, 0, this.width, this.height); //limpiar ventana
    if (this.tanques.length == 0) return;

    this.tanques[this.formControlTanque.value].setPosition(this.posX, this.posY, this.size)
    this.tanques.forEach(tanque => tanque.draw())
    switch (this.estado) {
      case 1:
        this.tanques[this.formControlTanque.value].llenar()
        break;
      case 2:
        this.tanques[this.formControlTanque.value].mezclar()
        break;
      case 3:
        this.tanques[this.formControlTanque.value].vaciar()
        break;
      case 4:
        this.tanques[this.formControlTanque.value].disponible()
        break;
      case 5:
        this.tanques[this.formControlTanque.value].noDisponible()
        break;
    }
  }

  openDialog(nextStep: Function): void{
    if (this.pruebaCalidadAbierta) {
      return;
    } else {
      this.pruebaCalidadAbierta = true;
    }
    const dialogRef = this.dialog.open(PruebaCalidadDialogComponent, {
      // width: '1200px',
      data: {}
    });
    const local_this = this;
    dialogRef.afterClosed().subscribe(function (result) {
      const nextStepFun = nextStep.bind(local_this);
      local_this.pruebaCalidadAbierta = false;
      if (result) {
        nextStepFun()
      } else {
        local_this.openDialog(nextStep);
      }
    });

  }


  mostrarAlarma() {
    const dialogRef = this.dialog.open(AlarmaDialogComponent, {
      // width: '1200px',
      data: {}
    });
    const local_this = this;
    dialogRef.afterClosed().subscribe(result => {
      //Registrar alarma
      console.log("La alarma fue desaparecida")
      // this.animal = result;
    });
  }

}


