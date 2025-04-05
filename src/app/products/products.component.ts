import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonComponent } from '../components/button/button.component';
import { Product } from '../models/product';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from './products.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    TableModule,
    ButtonComponent,
    InputTextModule,
    DialogModule,
    FloatLabelModule,
    SelectModule,
    ToastModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  standalone: true,
})
export class ProductsComponent implements OnInit {
  // products: Product[] = [];

  // ngOnInit(): void {
  //   this.initProducts();
  // }

  // initProducts() {
  // this.products = [
  //   {
  //     code: '1273',
  //     name: 'Pistacho',
  //     quantity: 10,
  //     category: 'Comida',
  //   },
  //   {
  //     code: '1274',
  //     name: 'Pistacho',
  //     quantity: 10,
  //     category: 'Comida',
  //   },
  // ];
  // }

  // * ---- PAGES PROPS ----
  products: Product[] = [];
  isLoading: boolean = true;
  createProductDialogVisible: boolean = false;
  updateProductDialogVisible: boolean = false;
  deleteProductDialogVisible: boolean = false;

  // statusOptions = [
  //   { label: 'Activo', value: 'Activo' },
  //   { label: 'Inactivo', value: 'Inactivo' },
  // ];

  // * ---- FORMS PROPS ----
  createProductForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    precio: [0, [Validators.max(10000)]],
  });

  updateProductForm = this.fb.group({
    id: [0],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    precio: [0, [Validators.max(10000)]],
  });

  constructor(
    private productService: ProductsService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.initProducts();
  }

  initProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data.$values;
        this.isLoading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Exitoso',
          detail: 'Se ha cargado clientes exitosamente',
          life: 3000,
        });
      },
      error: (err) => {
        console.error('Error al cargar clientes', err);
        this.isLoading = false;
        this.messageService.add({
          severity: 'danger',
          summary: 'Error',
          detail: 'Hubo un error al cargar clientes, intente nuevamente',
          life: 3000,
        });
      },
    });
  }

  openCreateProductDialog() {
    this.createProductDialogVisible = !this.createProductDialogVisible;
  }

  openUpdateProductDialog(product: Product) {
    this.updateProductForm.patchValue({
      id: product.id,
      nombre: product.nombre,
      precio: product.precio,
    });
    this.updateProductDialogVisible = !this.updateProductDialogVisible;
  }
  openDeleteProductDialog(id: number) {
    this.confirmService.confirm({
      message: '¿Seguro que deseas eliminar este product?',
      header: 'Confirmar eliminación',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      accept: () => {
        console.log(id);

        this.productService.deleteProduct(id)?.subscribe({
          next: () => {
            this.initProducts();
          },
          error: (err) => {
            console.error('Error deleting product', err);
          },
        });
      },
      reject: () => {
        this.confirmService.close();
      },
    });
  }

  onCreateProductSubmit() {
    if (this.createProductForm.valid) {
      this.productService
        .createProduct(this.createProductForm.value as Product)
        .subscribe({
          next: () => {
            this.initProducts();
            this.createProductDialogVisible = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Exitoso',
              detail: 'Se ha guardado el cambio exitosamente',
              life: 3000,
            });
          },
          error: (err) => {
            console.error(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Hubo un error al guardar el cambio, intente nuevamente',
              life: 3000,
            });
            this.createProductDialogVisible = false;
          },
        });
    }
  }

  onUpdateProductSubmit() {
    if (this.updateProductForm.valid) {
      this.productService
        .updateProduct(this.updateProductForm.value as Product)
        .subscribe({
          next: () => {
            this.initProducts();
            this.updateProductDialogVisible = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Exitoso',
              detail: 'Se ha guardado el cambio exitosamente',
              life: 3000,
            });
          },
          error: (err) => {
            console.error(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Hubo un error al guardar el cambio, intente nuevamente',
              life: 3000,
            });
            this.updateProductDialogVisible = false;
          },
        });
    } else {
      this.updateProductForm.markAllAsTouched();
    }
  }
}
