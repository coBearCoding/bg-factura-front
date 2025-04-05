import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonComponent } from '../components/button/button.component';
import { InputTextModule } from 'primeng/inputtext';
import { User } from '../models/users';
import { UsersService } from './users.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-users',
  imports: [TableModule, ButtonComponent, InputTextModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  standalone: true,
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  isLoading: boolean = true;
  updateUserDialogVisible: boolean = false;
  deleteUserDialogVisible: boolean = false;

  // * ---- FORMS PROPS ----
  updateUserForm = this.fb.group({
    id: [0],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    contrasena: ['', [Validators.maxLength(10)]],
    correo: ['', [Validators.email]],
    // estado: ['', [Validators.required]],
  });

  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmService: ConfirmationService
  ) {}
    
  ngOnInit(): void {
    this.initUsers();
  }

  initUsers() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data.$values;
        this.isLoading = true;
      },
      error: (err) => {
        console.error('Error al cargar usuarios', err);
        this.isLoading = false;
      },
    });
  }

openUpdateUserDialog(user: User) {
    this.updateUserForm.patchValue({
      id: user.id,
      nombre: user.nombre,
      contrasena: user.contrasena,
      correo: user.correo,
    });
    this.updateUserDialogVisible = !this.updateUserDialogVisible;
  }

  openDeleteUserDialog(id: number) {
    this.confirmService.confirm({
      message: '¿Seguro que deseas eliminar este usuario?',
      header: 'Confirmar eliminación',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      accept: () => {
        console.log(id);

        this.userService.deleteUser(id)?.subscribe({
          next: () => {
            this.initUsers();
          },
          error: (err) => {
            console.error('Error deleting user', err);
          },
        });
      },
      reject: () => {
        this.confirmService.close();
      },
    });
  }

  onUpdateUserSubmit() {
      if (this.updateUserForm.valid) {
        this.userService
          .updateUser(this.updateUserForm.value as User)
          .subscribe({
            next: () => {
              this.initUsers();
              this.updateUserDialogVisible = false;
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
              this.updateUserDialogVisible = false;
            },
          });
      } else {
        this.updateUserForm.markAllAsTouched();
      }
    }
  
    onDeleteUserSubmit() {}
  }