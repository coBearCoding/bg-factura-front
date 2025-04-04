import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonComponent } from '../components/button/button.component';
import { Product } from '../models/product';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-products',
  imports: [TableModule, ButtonComponent, InputTextModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  standalone: true,
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  ngOnInit(): void {
    this.initProducts();
  }

  initProducts() {
    this.products = [
      {
        code: '1273',
        name: 'Pistacho',
        quantity: 10,
        category: 'Comida',
      },
      {
        code: '1274',
        name: 'Pistacho',
        quantity: 10,
        category: 'Comida',
      },
    ];
  }
}
