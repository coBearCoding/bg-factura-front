import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { Invoices } from '../models/invoices';
import { ButtonComponent } from '../components/button/button.component';

@Component({
  selector: 'app-invoices',
  imports: [TableModule, InputTextModule, ButtonComponent],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css',
  standalone: true,
})
export class InvoicesComponent implements OnInit {
  invoices: Invoices[] = [];

  ngOnInit(): void {
    this.initInvoices();
  }

  initInvoices() {
    this.invoices = [
      {
        invoiceNumber: '1273',
        date: '31/03/2025',
        client: 'Juan Carlos',
        seller: 'Obed Alvarado',
        status: 'Pendiente',
        Total: 146.9,
      },
      {
        invoiceNumber: '1274',
        date: '31/03/2025',
        client: 'Juan Carlos',
        seller: 'Obed Alvarado',
        status: 'Pendiente',
        Total: 146.9,
      },
    ];
  }
}
