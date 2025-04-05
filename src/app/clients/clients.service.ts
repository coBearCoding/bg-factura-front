import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/clients';
import { GeneralAPI } from '../models/general';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  baseUrl?: string = 'http://localhost:5081/api/cliente';

  constructor(private http: HttpClient) {}

  getClients() {
    return this.http.get<GeneralAPI<Client>>(`${this.baseUrl}/consultar`);
  }

  createClient(client:Client){
    return this.http.post<GeneralAPI<Client>>(`${this.baseUrl}/crear`, client);
  }

  updateClient(client: Client) {
    return this.http.put<GeneralAPI<Client>>(
      `${this.baseUrl}/modificar?id=${client.id}`,
      client
    );
  }

  deleteClient(id: number) {
    if (!id) return;

    return this.http.delete<GeneralAPI<Client>>(
      `${this.baseUrl}/eliminar?id=${id}`
    );
  }
}
