import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpreadsheetService {

  constructor(private http: HttpClient) { }

  private url: string = "http://localhost:3000/api/parse/upload";
  private applicantUrl: string = "http://localhost:3000/api/parseApplicants/uploadApplicant";
  private setupURL: string = "http://localhost:3000/api/parseCourseSetup/upload";

  uploadSpreadsheet(data: FormData): Observable<any> {
    return this.http.post(this.url, data);
  }

  uploadApplicantSpreadsheet(data: FormData): Observable<any> {
    return this.http.post(this.applicantUrl, data);
  }

  uploadCourseSetupSpreadsheet(data: FormData): Observable<any>{
    return this.http.post(this.setupURL, data);
  }



}
