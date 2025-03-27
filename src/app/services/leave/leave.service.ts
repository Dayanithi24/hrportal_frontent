import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  baseUrl!: string;
  timezone!: string;

  constructor(private http: HttpClient) {
    this.baseUrl = env.baseUrl;
    this.timezone = env.timezone;
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

  getCurrentLeavePolicy() {
    return this.http.get(`${this.baseUrl}leave-policy/active?timezone=${this.timezone}`)
  }

  createLeaveRequest(obj: any, files: File[]) {
    console.log(files);
    const formData = new FormData();
    
    formData.append('leaveRequest', new Blob([JSON.stringify(obj)], { type: 'application/json' }));
    Array.from(files).forEach((file, index) => {
      formData.append('files', file);
    });
  
    return this.http.post(`${this.baseUrl}leave-request/`, formData);
  }

  getMyLeaveRequests(id: string | undefined) {
    return this.http.get(`${this.baseUrl}leave-request/?userId=${id}`);
  }
  
  getMyTeamLeaveRequests(id: string | undefined) {
    return this.http.get(`${this.baseUrl}leave-request/my-team?userId=${id}`);
  }

  approveLeaveRequest(id: string){
    return this.http.put(`${this.baseUrl}leave-request/approve/${id}`,{});
  }

  rejectLeaveRequest(id: string){
    return this.http.put(`${this.baseUrl}leave-request/reject/${id}`,{});
  }

  cancelLeaveRequest(id: string, userId: string){
    return this.http.put(`${this.baseUrl}leave-request/cancel/${id}`,{});
  }

}
