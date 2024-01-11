import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseInfoService {

  private SERVER_URL = environment.SERVER_URL;
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  constructor(private http: HttpClient) {}


  getAllCoursesInfo(){
    return this.http.get<[]>(this.SERVER_URL + '/parse', this.noAuthHeader);
  }

  editHours(course: String, hours: Number){
    return this.http.post(this.SERVER_URL + '/parse/editHours', { course: course, hours: hours});
  }

  getInstructorCourses(email:string){
    return this.http.get<[]>(this.SERVER_URL + `/parse/instructorCourses${email}`);
  }

  getApplications(): Observable<any>{
    return this.http.get<[]>(this.SERVER_URL + `/addQuestions/getApplications`);
  }

}
