import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonComponent } from '../components/button/button.component';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { Client } from '../models/clients';
import { ClientsService } from './clients.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-clients',
  imports: [
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
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
  standalone: true,
})
export class ClientsComponent {
  // * ---- PAGES PROPS ----
  clients: Client[] = [];
  isLoading: boolean = true;
  createClientDialogVisible: boolean = false;
  updateClientDialogVisible: boolean = false;
  deleteClientDialogVisible: boolean = false;

  // statusOptions = [
  //   { label: 'Activo', value: 'Activo' },
  //   { label: 'Inactivo', value: 'Inactivo' },
  // ];

  // * ---- FORMS PROPS ----

  createClientForm = this.fb.group({
    id: [0],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    telefono: ['', [Validators.minLength(10), Validators.maxLength(10)]],
    correo: ['', [Validators.email]],
    direccion: ['', [Validators.minLength(3)]],
  });

  updateClientForm = this.fb.group({
    id: [0],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    telefono: ['', [Validators.maxLength(10)]],
    correo: ['', [Validators.email]],
    direccion: ['', [Validators.minLength(3)]],
    // estado: ['', [Validators.required]],
  });

  constructor(
    private clientService: ClientsService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.initClients();
  }

  initClients() {
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = data.$values;
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

  openCreateClientDialog() {
    this.createClientDialogVisible = !this.createClientDialogVisible;
  }

  openUpdateClientDialog(client: Client) {
    this.updateClientForm.patchValue({
      id: client.id,
      nombre: client.nombre,
      telefono: client.telefono,
      correo: client.correo,
      direccion: client.direccion,
    });
    this.updateClientDialogVisible = !this.updateClientDialogVisible;
  }
  openDeleteClientDialog(id: number) {
    this.confirmService.confirm({
      message: '¿Seguro que deseas eliminar este cliente?',
      header: 'Confirmar eliminación',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      accept: () => {
        console.log(id);

        this.clientService.deleteClient(id)?.subscribe({
          next: () => {
            this.initClients();
          },
          error: (err) => {
            console.error('Error deleting client', err);
          },
        });
      },
      reject: () => {
        this.confirmService.close();
      },
    });
  }

  onCreateClientSubmit() {
    if (this.createClientForm.valid) {
      this.clientService
        .createClient(this.createClientForm.value as Client)
        .subscribe({
          next: () => {
            this.initClients();
            this.createClientDialogVisible = false;
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

            this.createClientDialogVisible = false;
          },
        });
    }
  }

  onUpdateClientSubmit() {
    if (this.updateClientForm.valid) {
      this.clientService
        .updateClient(this.updateClientForm.value as Client)
        .subscribe({
          next: () => {
            this.initClients();
            this.updateClientDialogVisible = false;
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
            this.updateClientDialogVisible = false;
          },
        });
    } else {
      this.updateClientForm.markAllAsTouched();
    }
  }
}
