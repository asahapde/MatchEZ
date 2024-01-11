import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectCoursesService {

  constructor(private http: HttpClient) { }

  private SERVER_URL = environment.SERVER_URL;

  getCourseCodes(): Observable<any> {
    return this.http.get(this.SERVER_URL + "/courses/codes");
  }

  getInstructorEmails(): Observable<any> {
    return this.http.get(this.SERVER_URL + "/courses/emails");
  }

  addCourse(code: string, email: string): Observable<any> {
    let header = { headers: new HttpHeaders({ 'authorization': localStorage.getItem("token") }) };
    return this.http.post(this.SERVER_URL + "/courses/instructor/" + email, { courseId: code }, header);
  }

  deleteCourse(code: string, email: string): Observable<any> {
    let header = { headers: new HttpHeaders({ 'authorization': localStorage.getItem("token") }) };
    return this.http.post(this.SERVER_URL + "/courses/instructor/deleteCourse/" + email, { courseId: code }, header);
  }

  getInstructorCourses(email: string): Observable<any> {
    let header = { headers: new HttpHeaders({ 'authorization': localStorage.getItem("token") }) };
    return this.http.get(this.SERVER_URL + "/courses/instructor/" + email, header);
  }
}
