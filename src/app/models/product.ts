export enum Estado {
  Activo = 'Activo',
}

export interface Product {
  $id: string;
  id: number;
  nombre: string;
  precio: number;
  estado: Estado;
  fechaCreacion: Date;
}
