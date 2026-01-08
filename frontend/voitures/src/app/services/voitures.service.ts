import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class VoituresService {
  private apiUrl = `${environment.apiUrl}/${environment.prefix}/voitures`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.apiUrl);
  }

  get(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  update(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  uploadImage(formData: FormData) {
    return this.http.post<{ imageUrl: string }>('http://localhost:3000/api/upload', formData);
  }
  
}
