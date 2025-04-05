import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonComponent } from '../components/button/button.component';
import { InputTextModule } from 'primeng/inputtext';
import { Product } from '../models/product';

@Component({
  selector: 'app-users',
  imports: [TableModule, ButtonComponent, InputTextModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  standalone: true,
})
export class UsersComponent implements OnInit {
  products: Product[] = [];

  ngOnInit(): void {
    this.initProducts();
  }

  initProducts() {
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
  }
}
