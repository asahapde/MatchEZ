import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(private http: HttpClient) { }
  private SERVER_URL = environment.SERVER_URL;
/*  start():Observable<any>{
   // return this.http.post(this.SERVER_URL + )
  }
 // return this.http
 */

}
