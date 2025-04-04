import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [MenubarModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: true,
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        command: () => this.router.navigate(['/dashboard']),
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Facturas',
        icon: 'pi pi-home',
        command: () => this.router.navigate(['/invoices']),
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Productos',
        icon: 'pi pi-home',
        command: () => this.router.navigate(['/products']),
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Clientes',
        icon: 'pi pi-home',
        command: () => this.router.navigate(['/clients']),
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Usuarios',
        icon: 'pi pi-home',
        command: () => this.router.navigate(['/users']),
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Configuración',
        icon: 'pi pi-home',
        command: () => this.router.navigate(['/settings']),
        routerLinkActiveOptions: { exact: true },
      },
    ];
  }
}
