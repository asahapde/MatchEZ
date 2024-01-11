import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username:string, password:string):Observable<any>{
    console.log(username + " " + password);
    return this.http.post("/api/auth/login",{"email":username,"password":password})
  }
}
