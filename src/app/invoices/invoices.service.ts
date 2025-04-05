import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralAPI } from '../models/general';
import { Invoice, InvoiceCreateDTO } from '../models/invoices';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  baseUrl?: string = 'http://localhost:5081/api/factura';

  constructor(private http: HttpClient) {}

  getInvoice() {
    return this.http.get<GeneralAPI<Invoice>>(`${this.baseUrl}/consultar`);
  }

  createInvoice(invoice: InvoiceCreateDTO) {
    return this.http.post<GeneralAPI<Invoice>>(
      `${this.baseUrl}/crear`,
      invoice
    );
  }

  deleteInvoiceProduct(invoice: Invoice) {
    return this.http.put<GeneralAPI<Invoice>>(
      `${this.baseUrl}/modificar`,
      invoice
    );
  }
}
