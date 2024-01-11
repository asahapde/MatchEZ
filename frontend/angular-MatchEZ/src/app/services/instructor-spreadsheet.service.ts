import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InstructorSpreadsheetService {

  constructor(private http:HttpClient) { }

  
  private instructorUrl: string = "http://localhost:3000/api/parseInstructors/uploadInstructors";

  

  uploadInstructorSpreadsheet(data: FormData): Observable<any> {
    return this.http.post(this.instructorUrl, data);
  }

}
