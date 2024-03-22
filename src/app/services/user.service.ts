import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private URL:string = "http://localhost:4200/api/"
  constructor(private http:HttpClient) { }
  getusers(){
    return this.http.get(this.URL+"users")
  }
  getuser(id:number){
    return this.http.get(`${this.URL}users/${id}`)
  }
  adduser(user:User){
    return this.http.post(`${this.URL}users`,user)
  }
  updateuser(user:User){
    return this.http.put(`${this.URL}users/${user.id}`,user)
  }
  deleteuser(id:number){
    return this.http.delete(`${this.URL}users/${id}`)
  }
}