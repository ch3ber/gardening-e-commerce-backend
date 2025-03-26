export interface CreateProductDTO {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  departamento: string;
  descuento?: number;
  precioConDescuento?: number;
  mesesSinIntereses?: boolean;
  mesesConIntereses?: number;
  calificacion?: number;
  marca: string;
  disponible?: boolean;
  caracteristicas?: string;
  tiempoEntrega?: string;
  estaEnRebaja?: boolean;
  creadoPor: string;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> { }
