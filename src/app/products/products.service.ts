import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralAPI } from '../models/general';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseUrl?: string = 'http://localhost:5081/api/producto';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<GeneralAPI<Product>>(`${this.baseUrl}/consultar`);
  }

  createProduct(product: Product) {
    return this.http.post<GeneralAPI<Product>>(
      `${this.baseUrl}/crear`,
      product
    );
  }

  updateProduct(client: Product) {
    return this.http.put<GeneralAPI<Product>>(
      `${this.baseUrl}/modificar?id=${client.id}`,
      client
    );
  }

  deleteProduct(id: number) {
    if (!id) return;

    return this.http.delete<GeneralAPI<Product>>(
      `${this.baseUrl}/eliminar?id=${id}`
    );
  }
}
