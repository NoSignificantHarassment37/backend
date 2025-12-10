export interface FilaExcel {
  proveedor: string;
  tipo_servicio: string;
  nombre_servicio: string;
  fecha_inicio: Date | string;
  fecha_fin: Date | string;
  precio: number;
  cupo: number;
  estado: string;
  detalles: string;
}
