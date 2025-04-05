import { Client } from './clients';
import { GeneralAPI } from './general';
import { Product } from './product';

export enum InvoicePaymentType {
  Efectivo,
  TarjetaCredito,
  TarjetaDebito,
}

export enum InvoiceStatus {
  Activo = 'Activo',
  Anulado = 'Anulado',
  Pagado = 'Pagado',
  Pendiente = 'Pendiente',
}

export interface InvoiceDetail {
  $id: string;
  id: number;
  idFactura: number;
  factura: Invoice;
  idProducto: number;
  producto: Product;
  cantidad?: number | null;
}

export interface Invoice {
  $id: string;
  id: number;
  idCliente: number;
  cliente?: Client;
  idVendedor: number;
  vendedor?: Client;
  formaPago: number;
  detalleFactura: GeneralAPI<InvoiceDetail>;
  subtotal: number;
  iva: number;
  total: number;
  estado: InvoiceStatus;
  fechaCreacion: Date;
}

export interface TempInvoiceDetail {
  idProducto: number;
  producto: Product;
  cantidad: number;
}

export interface InvoiceCreateDTO {
  idCliente: number;
  idVendedor: number;
  formaPago: number;
  subtotal: number;
  iva: number;
  total: number;
  detalleFacturaCreate: {
    idProducto: number;
    cantidad: number;
  }[];
}
