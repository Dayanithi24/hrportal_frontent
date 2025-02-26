import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  baseUrl!: string;
  
  constructor(private http: HttpClient) { 
    this.baseUrl = 'http://127.0.0.1:8080/';
  }
  
  getAllUsers() {
    return this.http.get(`${this.baseUrl}user/all`);
  }
  
  getUsers(page: number, size: number | null) {
    return this.http.get(`${this.baseUrl}user/?page=${page}&size=${size}`);    
  }

  getUser(userId: string) {
    return this.http.get(`${this.baseUrl}user/${userId}`);
  }
}
