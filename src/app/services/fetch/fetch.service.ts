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

  createUser(user: any) {
    return this.http.post(`${this.baseUrl}user/`,user);
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

  uploadProfileImage(userId: string, imageFile: File) {
    const formData = new FormData();
    formData.append('img', imageFile); 
    return this.http.put(`${this.baseUrl}user/profile/${userId}`, formData, {responseType: 'text'});
  }

  getProfileImage(id: string) {
    return this.http.get(`${this.baseUrl}file/${id}`, { responseType: 'blob' });
  }

  searchUserByName(name: String) {
    return this.http.get(`${this.baseUrl}user/search?name=${name}`);
  }

  forgetPassword(email: string) {
    return this.http.post(`${this.baseUrl}user/forgot-password?email=${email}`, {}, {responseType: 'text'});
  }

  validateResetToken(token: string) {
    return this.http.get(`${this.baseUrl}user/validate-reset-token?token=${token}`)
  }

  resetToken(token: string, password: string) {
    return this.http.post(`${this.baseUrl}user/reset-password?token=${token}&newPassword=${password}`, {}, {responseType: 'text'});
  }

}
