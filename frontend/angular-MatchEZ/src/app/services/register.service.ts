import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }
  private SERVER_URL = environment.SERVER_URL;

  register(firstName: string, lastName: string, password: string, email: string, role: string): Observable<any>{
    return this.http.post(this.SERVER_URL + "/auth/signup", {
      fname: firstName,
      lname: lastName,
      email: email,
      password: password,
      type: role
    })
  }
}
