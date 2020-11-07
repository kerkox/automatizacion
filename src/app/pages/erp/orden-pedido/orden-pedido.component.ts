import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from './../../../services/general.service';
import { OrdenPedido } from '../../../interfaces/orden-pedido.interface';
import { Component, OnInit } from '@angular/core';
import { OrdenPedidoService } from '../../../services/orden-pedido.service';

@Component({
  selector: 'app-orden-pedido',
  templateUrl: './orden-pedido.component.html',
  styleUrls: ['./orden-pedido.component.css']
})
export class OrdenPedidoComponent implements OnInit {

  formOrdenPedido: FormGroup
  ordenes_pedido: []
  orden_pedido: OrdenPedido 
  referencias: []
  tipos: []
  presentaciones: []
  prioridades: []
  constructor(private OrdenesPedidoService: OrdenPedidoService,
    private generalService: GeneralService,
    private formBuilder: FormBuilder) {
      this.buildForm();
  }

  ngOnInit(): void {
    this.cargarDatos()
  }

  private buildForm() {
    this.formOrdenPedido = this.formBuilder.group({
      cliente: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      referencia_producto_id: ['', [Validators.required]],
      tipo_producto_id: ['', [Validators.required]],
      presentacion_producto_id: ['', [Validators.required]],
      prioridad_id: ['', [Validators.required]],
    });
  }

  get cliente() {
    return this.formOrdenPedido.get('cliente')
  }

  get isInvalid_cliente() {
    return this.cliente.invalid && this.cliente.touched
  }

  get cantidad() {
    return this.formOrdenPedido.get('cantidad')
  }

  get isInvalid_cantidad() {
    return this.cantidad.invalid && this.cantidad.touched
  }

  get referencia_producto_id() {
    return this.formOrdenPedido.get('referencia_producto_id')
  }

  get isInvalid_referencia_producto_id() {
    return this.referencia_producto_id.invalid && this.referencia_producto_id.touched
  }

  get tipo_producto_id() {
    return this.formOrdenPedido.get('tipo_producto_id')
  }

  get isInvalid_tipo_producto_id() {
    return this.tipo_producto_id.invalid && this.tipo_producto_id.touched
  }

  get presentacion_producto_id() {
    return this.formOrdenPedido.get('presentacion_producto_id')
  }

  get isInvalid_presentacion_producto_id() {
    return this.presentacion_producto_id.invalid && this.presentacion_producto_id.touched
  }

  get prioridad_id() {
    return this.formOrdenPedido.get('prioridad_id')
  }

  get isInvalid_prioridad_id() {
    return this.prioridad_id.invalid && this.prioridad_id.touched
  }


  cargarDatos() {
    this.consultarOrdenesPedido();
    this.consultarPresentaciones()
    this.consultarPrioridades()
    this.consultarReferencias()
    this.consultarTipos()
  }

  consultarReferencias() {
    this.OrdenesPedidoService.consultarReferenciasProducto().then((res: any) => {
      this.referencias = res.data;
    });
  }

  consultarTipos() {
    this.OrdenesPedidoService.consultarTiposProducto().then((res: any) => {
      this.tipos = res.data;
    });
  }

  consultarPresentaciones() {
    this.OrdenesPedidoService.consultarPresentacionProducto().then((res: any) => {
      this.presentaciones = res.data;
    });
  }

  consultarPrioridades() {
    this.OrdenesPedidoService.consultarPrioridades().then((res: any) => {
      this.prioridades = res.data;
    });
  }

  guardarOrdenPedido(){
    if(this.formOrdenPedido.valid){
      this.orden_pedido = this.formOrdenPedido.value;
      console.log("this.orden_pedido", this.orden_pedido)
      // this.OrdenesPedidoService.guardarOrdenPedido(this.orden_pedido).then(res => {
      //   this.consultarOrdenesPedido();
      // }).catch(err => {
      //   console.error("ocurrio un error");
      //   console.error(err);
      // })
    } else {
      this.formOrdenPedido.markAllAsTouched();
    }
  }

  consultarOrdenesPedido() {
    this.OrdenesPedidoService.consultarOrdenesPedido().then((res: any) => {
      this.ordenes_pedido = res.data;
    });
  }

  colorBadgeEstadoOrden(estado: string) {
    return this.generalService.colorBadgeEstadoOrden(estado);
  }

}
