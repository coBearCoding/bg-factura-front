import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/clients';
import { GeneralAPI } from '../models/general';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl?: string = 'http://localhost:5081/api/usuario';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<GeneralAPI<User>>(`${this.baseUrl}/consultar`);
  }

  updateUser(user: User) {
    return this.http.put<GeneralAPI<User>>(
      `${this.baseUrl}/modificar?id=${user.id}`,
      user
    );
  }

  deleteUser(id: number) {
    if (!id) return;

    return this.http.delete<GeneralAPI<User>>(
      `${this.baseUrl}/eliminar?id=${id}`
    );
  }
}