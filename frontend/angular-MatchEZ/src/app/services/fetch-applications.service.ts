import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchApplicationsService {

  constructor(private http: HttpClient) { }

  private SERVER_URL = environment.SERVER_URL;

  getApplications(courseCode: string): Observable<any>{
    return this.http.get<[]>(`${this.SERVER_URL}/applications/${courseCode}`);
  }

  setRankings(rankings: Object): Observable<any>{
    return this.http.post(`${this.SERVER_URL}/applications/setRankings`, rankings);
  }

  getAllocations(): Observable<any>{
    return this.http.get(`${this.SERVER_URL}/matchtest/getAllocations`);
  }

  setAllocations(taInfo: Object, courseCode: string): Observable<any>{
    return this.http.post(`${this.SERVER_URL}/matchtest/editAllocations`, {
      taInfo: taInfo,
      course: courseCode
    });
  }

  startMatching(): Observable<any>{
    return this.http.get(`${this.SERVER_URL}/matchtest`);
  }

  getTaAllocations(course: string): Observable<any>{
    return this.http.get(`${this.SERVER_URL}/matchtest/getTaAllocations/` + course);
  }

  addTA(taInfo: Object, courseCode: string): any{
    return this.http.post(`${this.SERVER_URL}/matchtest/addTA`, {
      taInfo: taInfo,
      course: courseCode
    })
  }

  delete(ta:Object): any{
    return this.http.post(`${this.SERVER_URL}/matchtest/deleteAllocation`, {
      ta: ta
    })
  }
}
