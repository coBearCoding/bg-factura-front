export interface Client {
  id?: number;
  nombre: string;
  telefono: string;
  correo: string;
  direccion: string;
  estado?: 'Activo' | 'Inactivo';
  fechaCreacion?: Date;
}
