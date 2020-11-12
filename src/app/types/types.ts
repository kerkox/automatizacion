export const types = {
  API: {
    ReferenciaProductos: "referencia-producto",
    MateriaPrimas: "materia-prima",
    recetas: "receta",
    TipoProductos: "tipo-producto",
    PresentacionProductos: "presentacion-producto",
    Prioridades: "prioridad",
    OrdenesProducciones: "orden-produccion",
    OrdenProduccionByEstado: (estado:string) => "orden-produccion/estado/"+estado,
    OrdenesPedidos: "orden-pedido",
    Inventario: "inventario",
    OrdenProduccionAprobar: "orden-produccion/aprobar"
  },  
}