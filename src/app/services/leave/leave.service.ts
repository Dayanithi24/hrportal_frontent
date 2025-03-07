import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  baseUrl!: string;
  timezone!: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://127.0.0.1:8080/v1/api/';
    this.timezone = 'Asia/Kolkata'
   }

  addEvent(leave: any) {
    return this.http.post(`${this.baseUrl}leave/?timezone=${this.timezone}`, leave);
  }

  getEvents(year: number, month: number) {
    return this.http.get(`${this.baseUrl}leave/month?year=${year}&month=${month}&timezone=${this.timezone}`);
  }

  deleteEvent(id: string) {
    return this.http.delete(`${this.baseUrl}leave/${id}`, { responseType: 'text'});
  }

  createLeavePolicy(policy: any, userId: string | undefined) {
    return this.http.post(`${this.baseUrl}leave-policy/?userId=${userId}&timezone=${this.timezone}`, policy);
  }

}
