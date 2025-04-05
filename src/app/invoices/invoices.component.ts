import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import {
  Invoice,
  InvoiceCreateDTO,
  InvoiceDetail,
  InvoicePaymentType,
  InvoiceStatus,
  TempInvoiceDetail,
} from '../models/invoices';
import { ButtonComponent } from '../components/button/button.component';
import { InvoicesService } from './invoices.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Client } from '../models/clients';
import { SelectModule } from 'primeng/select';
import { Product } from '../models/product';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProductsService } from '../products/products.service';
import { ClientsService } from '../clients/clients.service';

@Component({
  selector: 'app-invoices',
  imports: [
    CommonModule,
    ConfirmDialogModule,
    TableModule,
    InputTextModule,
    ButtonComponent,
    ToastModule,
    DialogModule,
    FloatLabelModule,
    ReactiveFormsModule,
    SelectModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css',
  standalone: true,
})
export class InvoicesComponent implements OnInit {
  // * ---- PAGE PROPS ----
  invoices: Invoice[] = [];
  isLoading: boolean = true;
  createInvoiceDialogVisible: boolean = false;
  createInvoiceDetailVisible: boolean = false;
  updateInvoiceDialogVisible: boolean = false;
  addProductDialogVisible: boolean = false;
  selectedClient?: Client;
  selectedSeller?: Client;
  selectedInvoiceDetail: TempInvoiceDetail[] = [];
  invoiceStatusOptions = [
    { label: 'Activo', value: InvoiceStatus.Activo },
    { label: 'Anulado', value: InvoiceStatus.Anulado },
    { label: 'Pagado', value: InvoiceStatus.Pagado },
    { label: 'Pendiente', value: InvoiceStatus.Pendiente },
  ];
  sellers: Client[] = []; // TODO: CAMBIAR CLIENTE A USUARIO
  products: Product[] = [];
  clients: Client[] = [];

  paymentTypeOptions = [
    { label: 'Efectivo', value: InvoicePaymentType.Efectivo },
    { label: 'Tarjeta de Crédito', value: InvoicePaymentType.TarjetaCredito },
    { label: 'Tarjeta de Débito', value: InvoicePaymentType.TarjetaDebito },
  ];

  // * ---- FORMS PROPS ----

  invoiceDetailForm = this.fb.group([
    {
      idProducto: [0, [Validators.required]],
      cantidad: [0, [Validators.required, Validators.min(1)]],
    },
  ]);

  get detalleFacturaCreate(): FormArray {
    return this.updateInvoiceForm.get('detalleFacturaCreate') as FormArray;
  }

  createInvoiceForm = this.fb.group({
    id: [0],
    idCliente: [0, [Validators.required]],
    client: [{} as Client, []],
    idVendedor: [0, [Validators.required]],
    vendedor: [{} as Client, []],
    formaPago: [0, [Validators.required]],
    detalleFacturaCreate: this.fb.array([this.invoiceDetailForm]),
    subtotal: [0, Validators.required],
    iva: [0, Validators.required],
    total: [0, Validators.required],
  });

  updateInvoiceForm = this.fb.group({
    id: [0],
    idCliente: [0, [Validators.required]],
    client: [{} as Client, []],
    idVendedor: [0, [Validators.required]],
    vendedor: [{} as Client, []],
    formaPago: [0, [Validators.required]],
    detalleFacturaCreate: this.fb.array([this.invoiceDetailForm]),
    subtotal: [0, Validators.required],
    iva: [0, Validators.required],
    total: [0, Validators.required],
  });

  productAddForm = this.fb.group({
    idProducto: [0, Validators.required],
    cantidad: [1, [Validators.required, Validators.min(1)]],
  });

  ngOnInit(): void {
    this.initInvoices();
  }

  /**
   *
   */
  constructor(
    private invoiceService: InvoicesService,
    private clientService: ClientsService,
    private userService: ClientsService,
    private productService: ProductsService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmService: ConfirmationService
  ) {}

  initInvoices() {
    this.invoiceService.getInvoice().subscribe({
      next: (data) => {
        this.invoices = data.$values;
        this.isLoading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Exitoso',
          detail: 'Se han cargado facturas exitosamente',
          life: 3000,
        });
      },
      error: (err) => {
        console.error('Error al cargar facturas', err);
        this.isLoading = false;
        this.messageService.add({
          severity: 'danger',
          summary: 'Error',
          detail: 'Hubo un error al cargar facturas, intente nuevamente',
          life: 3000,
        });
      },
    });
  }

  openAddProductDialogVisible() {
    this.addProductDialogVisible = !this.addProductDialogVisible;
  }

  openCreateInvoiceDialog() {
    // Reset the form
    this.updateInvoiceForm.reset();

    // Clear existing FormArray
    this.detalleFacturaCreate.clear();

    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data.$values;
      },
      error: (err) => {
        console.error(err);
      },
    });

    this.userService.getClients().subscribe({
      next: (data) => {
        this.sellers = data.$values;
      },
      error: (err) => {
        console.error(err);
      },
    });

    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = data.$values;
      },
      error: (err) => {
        console.error(err);
      },
    });

    this.createInvoiceDialogVisible = !this.createInvoiceDialogVisible;
  }

  openUpdateInvoiceDialog(invoice: Invoice) {
    // Reset the form
    this.updateInvoiceForm.reset();

    // Clear existing FormArray
    this.detalleFacturaCreate.clear();

    invoice.detalleFactura.$values.forEach((item) => {
      this.detalleFacturaCreate.push(
        this.fb.group({
          idProducto: [item.idProducto, Validators.required],
          cantidad: [item.cantidad, [Validators.required, Validators.min(1)]],
        })
      );
    });

    this.updateInvoiceForm.patchValue({
      id: invoice.id,
      idCliente: invoice.idCliente,
      idVendedor: invoice.idVendedor,
      formaPago: invoice.formaPago,
      subtotal: invoice.subtotal,
      total: invoice.total,
      iva: invoice.iva,
    });

    this.selectedClient = invoice.cliente;
    this.selectedSeller = invoice.vendedor;

    this.updateInvoiceDialogVisible = !this.updateInvoiceDialogVisible;
  }

  onInvoiceSubmit() {
    if (this.createInvoiceForm.valid && this.selectedInvoiceDetail.length > 0) {
      const rawForm = this.createInvoiceForm.value;

      const mappedDetails = this.selectedInvoiceDetail.map((detail) => ({
        idProducto: detail.idProducto,
        cantidad: detail.cantidad,
      }));

      const payload: InvoiceCreateDTO = {
        idCliente: rawForm.idCliente!,
        idVendedor: rawForm.idVendedor!,
        formaPago: rawForm.formaPago!,
        subtotal: this.calculateSubtotal(),
        iva: this.calculateIva(),
        total: this.calculateTotal(),
        detalleFacturaCreate: mappedDetails,
      };

      this.invoiceService.createInvoice(payload).subscribe({
        next: (data) => {
          this.invoices = data.$values;
          this.messageService.add({
            severity: 'success',
            summary: 'Factura creada',
            detail: 'La factura ha sido guardada exitosamente',
            life: 3000,
          });
          this.createInvoiceDialogVisible = false;
          this.createInvoiceForm.reset();
          this.selectedInvoiceDetail = [];
        },
        error: (err) => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error al guardar',
            detail: 'Hubo un problema al guardar la factura',
            life: 3000,
          });
        },
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Datos incompletos',
        detail:
          'Por favor complete todos los campos requeridos y agregue al menos un producto.',
        life: 3000,
      });
    }
  }

  onProductAdded() {
    const productId = this.productAddForm.get('idProducto')!.value;
    const quantity = this.productAddForm.get('cantidad')!.value;

    if (productId === null || quantity === null) {
      console.error('Producto o cantidad no seleccionados');
      return;
    }

    const selectedProduct = this.products.find((p) => p.id === productId);
    if (!selectedProduct) return;

    // Add to FormArray
    this.detalleFacturaCreate.push(
      this.fb.group({
        idProducto: [productId, Validators.required],
        cantidad: [quantity, [Validators.required, Validators.min(1)]],
      })
    );

    // Add to UI display array
    this.selectedInvoiceDetail.push({
      idProducto: productId,
      cantidad: quantity,
      producto: selectedProduct,
    });

    // Clear form and close dialog
    this.productAddForm.reset({ cantidad: 1 });
    this.addProductDialogVisible = false;
  }

  // * ---- CALCULATE TOTALS ----
  calculateSubtotal(): number {
    return this.selectedInvoiceDetail.reduce((sum, item) => {
      return sum + item.producto.precio * item.cantidad;
    }, 0);
  }

  calculateIva(): number {
    return this.calculateSubtotal() * 0.12; // Assuming 12% VAT
  }

  calculateTotal(): number {
    return this.calculateSubtotal() + this.calculateIva();
  }
}
