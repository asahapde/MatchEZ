import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  private SERVER_URL = environment.SERVER_URL;

  login(username:string, password:string):Observable<any>{
    localStorage.setItem('email', username )
    return this.http.post(this.SERVER_URL + "/auth/login", {"email":username,"password":password})
  }

  loggedIn():boolean{
    return !!localStorage.getItem('token');
  }

  signOut():void{
    localStorage.clear();
  }
}
