export interface User {
    id?: number;
    nombre: string;
    contrasena: string;
    correo: string;
    estado?: 'Activo' | 'Inactivo';
    fechaCreacion?: Date;
  }
  