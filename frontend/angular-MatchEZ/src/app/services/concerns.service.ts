import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConcernsService {

  constructor(private http: HttpClient) { }

  private SERVER_URL = environment.SERVER_URL;

  addConcern(course: string, title: string, instructor: string, concern: string): Observable<any> {
    let concernObject = {
      course: course,
      title: title,
      instructor: instructor,
      concern: concern,
      resolved: false
    }

    let header = { headers: new HttpHeaders({ 'authorization': localStorage.getItem("token") }) };
    return this.http.post(this.SERVER_URL + "/concerns", concernObject, header);
  }


  getConcerns(flag: Boolean): any {
    return this.http.get(`${this.SERVER_URL}/concerns/${flag}`);
  }

  resolve(concern: Object): any {
    return this.http.post(`${this.SERVER_URL}/concerns/resolve`, concern)
  }

  dismiss(concern: Object): any {
    return this.http.post(`${this.SERVER_URL}/concerns/dismiss`, concern)
  }
}
